from backend.app import app
from click import confirm
from flask import flash, redirect, url_for, render_template, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from datetime import datetime
from sqlalchemy import func

from backend.app.db.database import session_scope
from backend.app.db.models import User, Book, Author, Genre, CartItem, HistoryOrder, OrderItem, Feedback
from werkzeug.security import generate_password_hash, check_password_hash   

@app.route('/')
def main_all():
    return render_template('home_all.html')

@app.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()

    required_fields = ['name', 'email', 'phone', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), 400

    name = data['name']
    email = data['email']
    phone = data['phone']
    password = data['password']

    with session_scope() as session:
        user = session.query(User).filter_by(email=email).first()
        if user:
            return jsonify({"message": "User with this email already exists!"}), 409

        new_user = User(
            name=name,
            email=email,
            phone=phone,
            password=generate_password_hash(password)
        )
        
        session.add(new_user)

    return jsonify({"message": "User created successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({"message": "Missing email or password"}), 400

    email = data['email']
    password = data['password']

    with session_scope() as session:
        user = session.query(User).filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return jsonify({"message": "Login successful!"}), 200
        else:
            return jsonify({"message": "Login failed"}), 401
        
@app.route('/main')
@login_required
def main():
    return render_template('home_login.html')

@app.route('/logout')
def logout():
    logout_user()  
    return redirect(url_for('main_all'))

@app.route('/books/<book_id>', methods=['GET'])
def get_book_details(book_id):
    with session_scope() as session:
        book = session.query(Book).filter_by(isbn=book_id).first()
        
        if not book:
            return jsonify({"message": "Book not found"}), 404
        
        author = session.query(Author).filter_by(id_author=book.author_id).first()
        
        rating_info = session.query(
            func.avg(Feedback.rating).label('avg_rating'),
            func.count(Feedback.rating).label('count')
        ).filter(
            Feedback.feedback_isbn_book == book_id
        ).first()
        
        book_data = {
            "isbn": book.isbn,
            "title": book.title,
            "author": {
                "name": f"{author.surname} {author.name} {author.patronymic}".strip(),
                "id": author.id_author
            },
            "genre": book.genre_name,
            "price": book.price,
            "cover_image": book.cover_image,
            "description": book.description,
            "year": book.year,
            "rating": {
                    "average": round(float(rating_info.avg_rating or 0), 2),
                    "count": rating_info.count or 0
                }
        }
        
        return jsonify(book_data), 200
    
@app.route('/genres', methods=['GET'])
def get_genres():
    with session_scope() as session:
            genres = session.query(Genre).all()
            
            genres_list = [{
                "name": genre.name,
                "books_count": len(genre.books)
            } for genre in genres]
            
            return jsonify({"genres": genres_list}), 200

@app.route('/books', methods=['GET'])
def get_books():
    genre_filter = request.args.get('genre')
    search_query = request.args.get('search', '').lower()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort_by = request.args.get('sort_by', default='default')
        
    with session_scope() as session:
        query = session.query(Book)
            
        if genre_filter:
            query = query.filter(Book.genre_name == genre_filter)
            
        if search_query:
            query = query.join(Author).filter(
            (Book.title.ilike(f'%{search_query}%')) | 
            (Author.surname.ilike(f'%{search_query}%')) |
            (Author.name.ilike(f'%{search_query}%')) |
            (Author.patronymic.ilike(f'%{search_query}%'))
            )
        
        if min_price is not None:
            query = query.filter(Book.price >= min_price)
        if max_price is not None:
            query = query.filter(Book.price <= max_price)
        
        if sort_by == 'rating':
            query = query.outerjoin(Feedback, Book.isbn == Feedback.feedback_isbn_book).group_by(Book.isbn).order_by(func.avg(Feedback.rating).desc())
            
        elif sort_by == 'price_asc':
            query = query.order_by(Book.price.asc())
            
        elif sort_by == 'price_desc':
            query = query.order_by(Book.price.desc())
            
        elif sort_by == 'date':
            query = query.order_by(Book.year.desc()) 
            
        else:
            query = query.order_by(Book.title.asc())
                    
        books = query.all()
            
        books_list = []
        for book in books:
            author = session.query(Author).filter_by(id_author=book.author_id).first()
            books_list.append({
                "isbn": book.isbn,
                "title": book.title,
                "author": f"{author.surname} {author.name} {author.patronymic}".strip(),
                "genre": book.genre_name,
                "price": book.price,
                "cover_image": book.cover_image,
                "description": book.description[:200] + '...' if book.description else None,
                "year": book.year
            })
            
        return jsonify({
            "count": len(books_list),
            "books": books_list,
            "filters": {
                "genre": genre_filter,
                "search": search_query,
                "min_price": min_price,
                "max_price": max_price,
                "sort_by": sort_by
            }
        }), 200
    
@app.route('/cart', methods=['POST'])
@login_required
def add_to_cart():
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    book_id = data.get('book_id')
    quantity = data.get('quantity', 1) 

    if not book_id:
        return jsonify({"message": "Book ID is required"}), 400

    with session_scope() as session:
        book = session.query(Book).filter_by(isbn=book_id).first()
        if not book:
            return jsonify({"message": "Book not found"}), 404


        cart_item = session.query(CartItem).filter_by(
            user_email=current_user.email,
            isbn_book=book_id
        ).first()

        if cart_item:
            cart_item.quantity += quantity
        else:
            new_item = CartItem(
                user_email=current_user.email,
                isbn_book=book_id,
                quantity=quantity
            )
            session.add(new_item)

        total_quantity = session.query(func.sum(CartItem.quantity)).filter_by(user_email=current_user.email).scalar() or 0

        return jsonify({
            "message": "Cart updated successfully",
            "total_books": int(total_quantity)  
        }), 200
    
@app.route('/cart', methods=['GET'])
@login_required
def get_cart():
    with session_scope() as session:
        cart_items = session.query(CartItem).filter_by(
            user_email=current_user.email
        ).all()

        cart_contents = []
        total_price = 0.0
        total_books = 0

        for item in cart_items:
            book = session.query(Book).filter_by(isbn=item.isbn_book).first()
            if book:
                author = session.query(Author).filter_by(id_author=book.author_id).first()
                item_total = book.price * item.quantity
                cart_contents.append({
                    "book_id": book.isbn,
                    "title": book.title,
                    "author": {
                        "id": author.id_author,
                        "name": f"{author.surname} {author.name} {author.patronymic}".strip()
                    },
                    "price": book.price,
                    "quantity": item.quantity,
                    "item_total": item_total,
                    "cover_image": book.cover_image,
                    "year": book.year
                })
                total_price += item_total
                total_books += item.quantity

        return jsonify({
            "items": cart_contents,
            "total_price": total_price,
            "total_books": total_books,
            "count": len(cart_contents)
        }), 200            
            
@app.route('/cart/<book_id>', methods=['DELETE'])
@login_required
def remove_from_cart(book_id):
    with session_scope() as session:
        cart_item = session.query(CartItem).filter_by(
            user_email=current_user.email,
            isbn_book=book_id
        ).first()

        if not cart_item:
            return jsonify({"message": "Item not found in cart"}), 404

        session.delete(cart_item)
        return jsonify({"message": "Item removed from cart"}), 200

@app.route('/cart/<book_id>', methods=['PUT'])
@login_required
def update_cart_item(book_id):
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    quantity = data.get('quantity')

    if not quantity or not isinstance(quantity, int) or quantity < 1:
        return jsonify({"message": "Valid quantity is required"}), 400

    with session_scope() as session:
        cart_item = session.query(CartItem).filter_by(
            user_email=current_user.email,
            isbn_book=book_id
        ).first()

        if not cart_item:
            return jsonify({"message": "Item not found in cart"}), 404

        cart_item.quantity = quantity
        return jsonify({"message": "Cart item updated"}), 200

@app.route('/orders', methods=['POST'])
@login_required
def create_order():
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    delivery_type = data.get('delivery_type')
    address = data.get('address')
    delivery_comment = data.get('delivery_comment', '')

    if not delivery_type or delivery_type not in ['самовывоз', 'до двери']:
        return jsonify({"message": "Invalid delivery type"}), 400
    
    if delivery_type == 'до двери':
        if not address:
            return jsonify({"message": "Address is required for door delivery"}), 400
        delivery_fee = 300  # Стоимость доставки
    else:
        delivery_fee = 0
        delivery_comment = ''
        
    with session_scope() as session:
        cart_items = session.query(CartItem).filter_by(
            user_email=current_user.email
        ).all()

        if not cart_items:
            return jsonify({"message": "Cart is empty"}), 400

        order_number = f"ORD-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{current_user.email[:4]}"
        new_order = HistoryOrder(
            order_number=order_number,
            user_email=current_user.email,
            date=datetime.now(),
            status="Создан",
            address=address if delivery_type == 'до двери' else None,
            delivery_type=delivery_type,
            delivery_comment=delivery_comment,  
            delivery_fee=delivery_fee
        )
        session.add(new_order)

        subtotal = 0.0
        for item in cart_items:
            book = session.query(Book).filter_by(isbn=item.isbn_book).first()
            if book:
                order_item = OrderItem(
                    order_number=order_number,
                    order_isbn_book=book.isbn,
                    quantity=item.quantity,
                    price=book.price
                )
                session.add(order_item)
                subtotal += book.price * item.quantity

                session.delete(item)
        
        total = subtotal + delivery_fee        

        return jsonify({
            "message": "Order created successfully",
            "order_number": order_number,
            "subtotal": subtotal,
            "delivery_fee": delivery_fee,
            "total": total,
            "delivery_type": delivery_type,
            "delivery_comment": delivery_comment if delivery_comment else None
        }), 201

@app.route('/orders/<order_id>', methods=['GET'])
@login_required
def get_order_details(order_id):
    with session_scope() as session:
        order = session.query(HistoryOrder).filter_by(
            order_number=order_id,
            user_email=current_user.email
        ).first()

        if not order:
            return jsonify({"message": "Order not found"}), 404

        order_items = session.query(OrderItem).filter_by(
            order_number=order_id
        ).all()

        items = []
        for item in order_items:
            book = session.query(Book).filter_by(isbn=item.order_isbn_book).first()
            if book:
                items.append({
                    "isbn": book.isbn,
                    "title": book.title,
                    "quantity": item.quantity,
                    "price": item.price,
                    "total": item.price * item.quantity,
                    "cover_image": book.cover_image
                })

        total = sum(item['total'] for item in items)

        return jsonify({
            "order_number": order.order_number,
            "date": order.date.isoformat(),
            "status": order.status,
            "delivery_type": order.delivery_type,
            "address": order.address,
            "total": total,
            "items": items,
            "items_count": len(items)
        }), 200
                    
                    
@app.route('/orders', methods=['GET'])
@login_required
def get_user_orders():
    with session_scope() as session:
        orders = session.query(HistoryOrder).filter_by(
            user_email=current_user.email
        ).order_by(HistoryOrder.date.desc()).all()

        orders_list = []
        for order in orders:
            
            order_items = session.query(OrderItem).filter_by(
                order_number=order.order_number
            ).all()
            
            items_details = []
            subtotal = 0.0
            for item in order_items:
                book = session.query(Book).filter_by(isbn=item.order_isbn_book).first()
                if book:
                    author = session.query(Author).filter_by(id_author=book.author_id).first()
                    item_total = item.price * item.quantity
                    items_details.append({
                        "isbn": book.isbn,
                        "title": book.title,
                        "author": f"{author.surname} {author.name} {author.patronymic}".strip(),
                        "quantity": item.quantity,
                        "price": item.price,
                        "item_total": item_total,
                        "cover_image": book.cover_image
                    })
                    subtotal += item_total  
                      
            total = subtotal + (order.delivery_fee or 0)
                
            orders_list.append({
                "order_number": order.order_number,
                "date": order.date.isoformat(),
                "status": order.status,
                "delivery_type": order.delivery_type,
                "delivery_fee": order.delivery_fee or 0,
                "address": order.address,
                "delivery_comment": order.delivery_comment,
                "subtotal": subtotal,
                "total": total,
                "items_count": len(order_items),
                "items": items_details
            })

        return jsonify({
            "orders": orders_list,
            "count": len(orders_list)
        }), 200
        
@app.route('/books/<book_id>/review', methods=['POST'])
@login_required
def add_book_review(book_id):
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400

    data = request.get_json()
    rating = data.get('rating')
    feedback_text = data.get('feedback_text', '')

    if not rating or not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
        return jsonify({"message": "Rating must be a number between 1 and 5"}), 400

    with session_scope() as session:
        book = session.query(Book).filter_by(isbn=book_id).first()
        if not book:
            return jsonify({"message": "Book not found"}), 404

        new_feedback = Feedback(
            user_email=current_user.email,
            feedback_isbn_book=book_id,
            feedback_date=datetime.now(),
            feedback_text=feedback_text,
            rating=rating
        )
        session.add(new_feedback)

        feedbacks = session.query(Feedback).filter_by(feedback_isbn_book=book_id).all()
        avg_rating = sum(fb.rating for fb in feedbacks) / len(feedbacks) if feedbacks else 0

        return jsonify({
            "message": "Review added successfully",
            "average_rating": round(avg_rating, 2),
            "your_ratings": [
                {"rating": fb.rating, "date": fb.feedback_date.isoformat()}
                for fb in session.query(Feedback)
                .filter_by(user_email=current_user.email, feedback_isbn_book=book_id).all()
            ]
        }), 201

@app.route('/books/<book_id>/reviews', methods=['GET'])
def get_book_reviews(book_id):
    with session_scope() as session:
        book = session.query(Book).filter_by(isbn=book_id).first()
        if not book:
            return jsonify({"message": "Book not found"}), 404

        reviews = session.query(Feedback, User.name).join(
            User, Feedback.user_email == User.email
        ).filter(
            Feedback.feedback_isbn_book == book_id
        ).order_by(
            Feedback.feedback_date.desc()
        ).all()

        reviews_list = []
        for feedback, user_name in reviews:
            reviews_list.append({
                "user_name": user_name,
                "rating": feedback.rating,
                "text": feedback.feedback_text,
                "date": feedback.feedback_date.strftime("%d.%m.%Y %H:%M")
            })

        avg_rating = session.query(
            func.avg(Feedback.rating).label('average'),
            func.count(Feedback.rating).label('count')
        ).filter(
            Feedback.feedback_isbn_book == book_id
        ).first()

        return jsonify({
            "book_title": book.title,
            "average_rating": round(float(avg_rating.average or 0), 2),
            "reviews_count": avg_rating.count or 0,
            "reviews": reviews_list
        }), 200

@app.route('/books/top', methods=['GET'])
def get_top_books():
    limit = request.args.get('limit', default=3, type=int)
        
    with session_scope() as session:
        subquery = session.query(
            Feedback.feedback_isbn_book,
            func.avg(Feedback.rating).label('avg_rating'),
            func.count(Feedback.rating).label('reviews_count')
        ).group_by(Feedback.feedback_isbn_book).subquery()

        top_books = session.query(
            Book,
            subquery.c.avg_rating,
            subquery.c.reviews_count
        ).join(
            subquery, Book.isbn == subquery.c.feedback_isbn_book
        ).order_by(
            subquery.c.avg_rating.desc(),
            subquery.c.reviews_count.desc()
        ).limit(limit).all()

        result = []
        for book, avg_rating, reviews_count in top_books:
            result.append({
                "isbn": book.isbn,
                "title": book.title,
                "author": session.query(Author).filter_by(id_author=book.author_id).first().name,
                "description": book.description,
                "cover_image": book.cover_image,
                "average_rating": round(float(avg_rating), 2),
                "reviews_count": reviews_count,
                "price": book.price,
                "year": book.year
            })

        return jsonify({"top_books": result}), 200
    