from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
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

   @validates('user_worblin')
   def validate_user_worblin(self, worblin_id):
       if user_worblin.worblin_id == worblin_id and user_worblin.user_id == self.id:
           raise ValueError("User has already played this game")

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

class Dracquote(db.Model, SerializerMixin):
   __tablename__ = 'dracquotes'
   id = db.Column(db.Integer, primary_key=True)
   drac_q = db.Column(db.String)

   def to_dict(self):
      return {
         'id': self.id,
         'drac_q': self.drac_q
      }

class Letter(db.Model, SerializerMixin):
   __tablename__ = 'letters'
   key = db.Column(db.String, primary_key=True)

   def to_dict(self):
      return {
         'key': self.key
   }

class GobxamQuestion(db.Model, SerializerMixin):
   __tablename__ = 'gobxam_questions'
   id = db.Column(db.Integer, primary_key=True)
   question = db.Column(db.Text)
   choice1 = db.Column(db.Text)
   choice2 = db.Column(db.Text)
   choice3 = db.Column(db.Text)
   choice4 = db.Column(db.Text)
   correct_answer = db.Column(db.String(255))
   day_of_month = db.Column(db.Integer)

   def to_dict(self):
      return {
         'id': self.id,
         'question': self.question,
         'choice1': self.choice1,
         'choice2': self.choice2,
         'choice3': self.choice3,
         'choice4': self.choice4,
         'correct_answer': self.correct_answer
   }

class UserGobxam(db.Model, SerializerMixin):
   __tablename__ = 'user_gobxams'
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   gobxam_day_of_month = db.Column(db.Integer, nullable=False)
   score = db.Column(db.Integer)

   def to_dict(self):
      return {
         'id': self.id,
         'user_id': self.user_id,
         'gobxam_day_of_month': self.gobxam_day_of_month,
         'score': self.score
   }
