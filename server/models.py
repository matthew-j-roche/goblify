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

class Block(db.Model, SerializerMixin):
   __tablename__ = 'blocks'
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255))
   notes = db.Column(db.String(255))
   #favorited = db.Column(db.Boolean)

   def to_dict(self):
    return {
       'id': self.id,
       'name': self.name,
       'notes': self.notes,
       #'favorited': self.favorited,
       'notes': self.notes
    }

class Game(db.Model, SerializerMixin):
   __tablename__ = 'games'
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255))
   notes = db.Column(db.String(512))

   def to_dict(self):
    return {
       'id': self.id,
       'name': self.name,
       'notes': self.notes
    }

class User_Game(db.Model, SerializerMixin):
   __tablename__ = 'user_games'
   id = db.Column(db.Integer, primary_key=True)
   game_id = db.Column(db.Integer,  db.ForeignKey('games.id'), nullable=False)
   user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
   completed_on = db.Column(db.DateTime)

   def to_dict(self):
    return {
       'id': self.id,
       'game_id': self.notes,
       'user_id':self.user_id,
       'completed_on':self.completed_on,
    }   
   
class Location(db.Model, SerializerMixin):
   __tablename__ = 'locations'
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255))
   block_id = db.Column(db.Integer,  db.ForeignKey('blocks.id'), nullable=False)
   is_business = db.Column(db.Boolean)
   notes = db.Column(db.String(512))

   def to_dict(self):
    return {
       'id': self.id,
       'name': self.name,
       'block_id':self.block_id,
       'is_business':self.is_business,
       'notes':self.notes,
       'block_id': self.block_id,
       'is_business':self.is_business,
       'notes':self.notes,
    } 

class User_Location(db.Model, SerializerMixin):
   __tablename__ = 'user_locations'
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
   location_id = db.Column(db.Integer,  db.ForeignKey('locations.id'), nullable=False)
   is_tricked = db.Column(db.Boolean)
   is_treated = db.Column(db.Boolean)

   def to_dict(self):
    return {
       'id': self.id,
       'user_id': self.user_id,
       'location_id': self.location_id,
       'is_tricked':self.is_tricked,
       'is_treated':self.is_treated,
    } 