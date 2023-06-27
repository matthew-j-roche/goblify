#!/usr/bin/env python3
from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from datetime import date
from models import db, User, UserLocation, GobJoke, Worblin, Letter
from config import app, db
from datetime import datetime




migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)



def get_authenticated_user():
    user_id = session.get('user_id')
    if user_id:
        return User.query.get(user_id)
    return None


def login_required(f):
    def wrapper(*args, **kwargs):
        user = get_authenticated_user()
     
        if not user:
            return {'error': 'Not Authorized'}, 401
        return f(user, *args, **kwargs)

    return wrapper


@app.route('/')
def index():
    return '<h1>GOBLIFY</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return jsonify(user_list)
    
class UserById(Resource):
    @login_required
    def patch(self, user):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)
        if 'username' in data:
            new_username = data['username']
            user.username = new_username
        if 'password' in data:
            new_password = data['password']
            hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
            user.password = hashed_password
        db.session.commit()
        return make_response(jsonify({'message': 'Account updated successfully'}), 200)
    @login_required
    def get(self, user):
        return jsonify(user.to_dict())

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(first_name=data.get('first_name'), last_name=data.get('last_name'), username=data.get('username'), password=hashed_password)
        user.created_at = datetime.now()

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User created successfully'}), 201)


class Bloodlogin(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user:
            return {'error': 'User not found'}, 401

        if not bcrypt.check_password_hash(user.password, password):
            return {'error': 'Invalid credentials'}, 401

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User bloodloggedin successfully'}), 200)


class Bloodlogout(Resource):
    def post(self):
        if 'user_id' in session:
            session.clear()  # Clear the entire session
            return make_response(jsonify({'message': 'Bloodloggedout successfully'}), 200)
        else:
            return make_response(jsonify({'message': 'No user bloodloggedin'}), 200)


class CheckLoginStatus(Resource):
    def get(self):
        if 'user_id' in session:
            return {'bloodloggedIn': True}, 200
        else:
            return {'bloodloggedIn': False}, 200
        
  # Retrieve the authenticated userter_by(user_id=user.id).all() for ug in user_games]

class UserLocations(Resource):
    @login_required
    def get(self, user):
        user = get_authenticated_user()  # Retrieve the authenticated user
        user_locations = UserLocation.query.filter_by(user_id=user.id).all()
        user_locations_data = [ul.to_dict() for ul in user_locations]
        return jsonify(user_locations_data)
    
class GobJokeByDay(Resource):
    today = datetime.today().day
    def get(self, day):
        joke = GobJoke.query.get(day)
        if joke:
            return jsonify(joke.to_dict())
        return jsonify({'error': 'No GobJoke. Why not?'})
    
class GobJokes(Resource):
    def get(self):
        gobjokes = GobJoke.query.all()
        gobjoke_list = [gobjoke.to_dict() for gobjoke in gobjokes]
        return jsonify(gobjoke_list)
    
class Worblins(Resource):
    def get(self):
        worblins = Worblin.query.all()
        worblin_list = [worblin.to_dict() for worblin in worblins]
        return jsonify(worblin_list)   

class Letters(Resource):
    def get(self):
        letters = Letter.query.all()
        letter_list = [letter.to_dict() for letter in letters]
        return jsonify(letter_list)

class Users(Resource):
    @login_required
    def get(self, user):
        return make_response(jsonify({}), 200)
    
    
# class UserWorblin(Resource):
    # @login_required
    # def get(self, user):
        # user = get_authenticated_user()
        # user_worblins = UserWorblin.query.filter_by(user_id=user.id).all()
        # user_worblins_data = [uw.to_dict() for uw in user_worblins]
        # return jsonify(user_worblins_data)

api.add_resource(GobJokeByDay, '/gobjokes/<int:day>')
api.add_resource(GobJokes, '/gobjokes')
api.add_resource(Worblins, '/worblins')
api.add_resource(Bloodlogin, '/bloodlogin')
api.add_resource(Bloodlogout, '/bloodlogout')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Signup, '/signup')
api.add_resource(Letters, '/letters')
api.add_resource(CheckLoginStatus, '/check-login-status')
# api.add_resource(UserWorblin, '/user-worblins')
api.add_resource(UserLocations, '/user-locations')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
