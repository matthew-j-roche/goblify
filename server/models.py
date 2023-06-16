from sqlalchemy_serializer import SerializerMixin
from config import db
from datetime import datetime
from flask_bcrypt import bcrypt


class User(db.model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    #current_neighborhood_id
    #monster_name = db.Column(db.String(255))
    
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

class Neighborhood(db.model, SerializerMixin):
   __tablename__ = 'neighborhoods'
   id = db.Column(db.integer, primary_key=True)
   notes = db.Column(db.String(255))
   #favorited = db.Column(db.Boolean)

   def to_dict(self):
    return {
       'id': self.id,
       'notes': self.notes
    }

class Games(db.model, SerializerMixin):
   __tablename__ = 'games'
   id = db.Column(db.integer, primary_key=True)
   notes = db.Column(db.String(512))

   def to_dict(self):
    return {
       'id': self.id,
       'notes': self.notes
    }

class Games2Users(db.model, SerializerMixin):
   __tablename__ = 'games2users'
   id = db.Column(db.integer, primary_key=True)
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
   
class Locations(db.model, SerializerMixin):
   __tablename__ = 'locations'
   id = db.Column(db.integer, primary_key=True)
   neighborhood_id = db.Column(db.Integer,  db.ForeignKey('neighborhoods.id'), nullable=False)
   is_business = db.Column(db.Boolean)
   notes = db.Column(db.String(512))

   def to_dict(self):
    return {
       'id': self.id,
       'neighborhood_id': self.neighborhood_id,
       'is_business':self.is_business,
       'notes':self.notes,
    } 

class Locations2Users(db.model, SerializerMixin):
   __tablename__ = 'locations2users'
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