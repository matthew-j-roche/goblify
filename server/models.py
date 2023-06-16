from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask_bcrypt import Bcrypt

# local imports
from config import db

class User(db.model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    created_at = db.Column(db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self)
    return {
        'id': self.id,
        'username':self.username,
        'created_at': self.created_at,;
    }
