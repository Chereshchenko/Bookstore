import json
from sqlalchemy.exc import IntegrityError
from backend.app.db.models import Base, Author, Genre, Book
from backend.app.db.database import engine, session_scope, init_db

def extract_author_names(full_name):
    """Разбивает полное имя автора на фамилию, имя и отчество"""
    parts = full_name.split()
    if len(parts) == 3:
        return {'surname': parts[0], 'name': parts[1], 'patronymic': parts[2]}
    elif len(parts) == 2:
        return {'surname': parts[0], 'name': parts[1], 'patronymic': ''}
    else:
        return {'surname': full_name, 'name': '', 'patronymic': ''}

def migrate_books(json_file_path):
    # Создаем таблицы в БД (если они еще не созданы)
    init_db()
    
    with open(json_file_path, 'r', encoding='utf-8') as file:
        books_data = json.load(file)
    
    with session_scope() as session:
        for book_data in books_data:
            try:
                # Обрабатываем автора
                author_full_name = book_data.get('author', 'Неизвестный автор')
                author_names = extract_author_names(author_full_name)
                
                # Создаем ID автора (фамилия_имя)
                author_id = f"{author_names['surname']}_{author_names['name']}".lower()
                
                author = session.query(Author).filter_by(id_author=author_id).first()
                
                if not author:
                    author = Author(
                        id_author=author_id,
                        surname=author_names['surname'],
                        name=author_names['name'],
                        patronymic=author_names['patronymic']
                    )
                    session.add(author)
                    session.flush()  # Чтобы получить ID автора
                
                # Обрабатываем жанр
                genre_name = book_data.get('genre', 'Неизвестный жанр')
                genre = session.query(Genre).filter_by(name=genre_name).first()
                
                if not genre:
                    genre = Genre(name=genre_name)
                    session.add(genre)
                    session.flush()
                
                # Обрабатываем книгу
                book = Book(
                    isbn=str(book_data.get('isbn', '')),
                    title=book_data.get('title', 'Без названия'),
                    author_id=author.id_author,
                    genre_name=genre.name,
                    price=float(book_data.get('price', 0.0)),
                    cover_image=book_data.get('cover', ''),
                    description=book_data.get('description', ''),
                    year=book_data.get('year', '')
                )
                session.add(book)
                
            except IntegrityError as e:
                session.rollback()
                continue
            except Exception as e:
                session.rollback()
                continue
    