from sqlalchemy_serializer import SerializerMixin
from config import db
from datetime import datetime
from flask_bcrypt import bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)    

    def to_dict(self):
     return {
        'id': self.id,
        'first_name': self.first_name,
        'last_name': self.last_name,
        'username': self.username,
        'password': self.password,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
     }
    
class Worblin(db.Model, SerializerMixin):
   __tablename__ = 'worblins'
   id = db.Column(db.Integer, primary_key=True)
   word = db.Column(db.String)
   title = db.Column(db.String)

   def to_dict(self):
     return {
       'id': self.id,
       'title': self.title,
       'word': self.word,
     }
   
class UserWorblin(db.Model, SerializerMixin):
   __tablename__ = 'user_worblins'
   id = db.Column(db.Integer, primary_key=True)
   worblin_id = db.Column(db.Integer,  db.ForeignKey('worblins.id'), nullable=False)
   user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
   guesses = db.Column(db.Integer)

   def to_dict(self):
    return {
       'id': self.id,
       'Worblin_id': self.worblin_id,
       'user_id':self.user_id,
       'guesses': self.guesses,
    }   

   
class GobJoke(db.Model, SerializerMixin):
   __tablename__ = 'gobjokes'
   id = db.Column(db.Integer, primary_key=True)
   q = db.Column(db.String)
   a = db.Column(db.String)

   def to_dict(self):
      return {
         'id': self.id,
         'q': self.q,
         'a': self.a
   }

class Letter(db.Model, SerializerMixin):
   __tablename__ = 'letters'
   key = db.Column(db.String, primary_key=True)

   def to_dict(self):
      return {
         'key': self.key
   }