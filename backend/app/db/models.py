from flask_login import UserMixin

from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = 'users'

    name = Column(String(150), nullable=False)
    email = Column(String(150), primary_key=True)
    phone = Column(String(150), nullable=False)
    password = Column(String(255), nullable=False)

    cart_items = relationship('CartItem', backref='user', lazy=True)
    history_orders = relationship('HistoryOrder', backref='user', lazy=True)
    feedbacks = relationship('Feedback', backref='user', lazy=True)

    def get_id(self):
        return self.email

class Author(Base):
    __tablename__ = 'authors'

    id_author = Column(String(100), primary_key=True)
    surname = Column(String(150), nullable=False)
    name = Column(String(150), nullable=False)
    patronymic = Column(String(150), nullable=False)

    books = relationship('Book', backref='author', lazy=True)

class Genre(Base):
    __tablename__ = 'genres'

    name = Column(String(150), primary_key=True)

    books = relationship('Book', backref='genre', lazy=True)

class Book(Base):
    __tablename__ = 'books'

    isbn = Column(String(100), primary_key=True)
    title = Column(String(150), nullable=False)
    author_id = Column(String(100), ForeignKey('authors.id_author'), nullable=False)  
    genre_name = Column(String(100), ForeignKey('genres.name'), nullable=False)  
    price = Column(Float, nullable=False)
    cover_image = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    year = Column(String(200), nullable=True)

    cart_items = relationship('CartItem', backref='book', lazy=True)
    order_items = relationship('OrderItem', backref='book', lazy=True)
    feedbacks = relationship('Feedback', backref='book', lazy=True)

class CartItem(Base):
    __tablename__ = 'cart_items'

    user_email = Column(String(100), ForeignKey('users.email'), primary_key=True)
    isbn_book = Column(String(200), ForeignKey('books.isbn'), primary_key=True)
    quantity = Column(Integer, nullable=False)

class HistoryOrder(Base):
    __tablename__ = 'history_orders'

    order_number = Column(String(100), primary_key=True)
    user_email = Column(String(100), ForeignKey('users.email'), nullable=False)
    date = Column(DateTime, nullable=False)
    status = Column(String(100), nullable=False)
    address = Column(String(200), nullable=True)
    delivery_type = Column(String(100), nullable=False)
    delivery_comment = Column(Text, nullable=True)  
    delivery_fee = Column(Float, default=0.0)

    order_items = relationship('OrderItem', backref='history_order', lazy=True) 

class OrderItem(Base):
    __tablename__ = 'order_items'

    order_number = Column(String(100), ForeignKey('history_orders.order_number'), primary_key=True)
    order_isbn_book = Column(String(200), ForeignKey('books.isbn'), primary_key=True)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

class Feedback(Base):
    __tablename__ = 'feedbacks'

    user_email = Column(String(150), ForeignKey('users.email'), primary_key=True)
    feedback_isbn_book = Column(String(200), ForeignKey('books.isbn'), primary_key=True)
    feedback_date = Column(DateTime, primary_key=True)  
    feedback_text = Column(Text, nullable=True)  
    rating = Column(Float, nullable=True)
