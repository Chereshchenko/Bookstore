from flask import Flask
from flask_login import LoginManager

from backend.app.config import settings
from backend.app.db.models import User, Book, Author, Genre


app = Flask(__name__)
app.config['SECRET_KEY'] = settings.SECRET_KEY

from backend.app import routes
from backend.app.routes import session_scope

login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_email):
    with session_scope() as session:
        user = session.query(User).filter_by(email=user_email).first()
        if user:
            session.expunge(user)
        return user    

