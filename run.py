from backend.app import app
from backend.app.config import settings
from backend.app.db.database import init_db
from backend.app.migrate_books import migrate_books


if __name__ == "__main__":
    init_db()
    migrate_books('books_catalog.json')
    app.run(port=settings.APP_PORT,debug=settings.DEBUG)