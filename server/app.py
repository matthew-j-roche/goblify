#!/usr/bin/env python3
from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, User, Block, Game, UserGame, Location, UserLocation
from config import app, db



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
    return '<h1>Trick-or-Treatster</h1>'


class Account(Resource):
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


class Login(Resource):
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

        return make_response(jsonify({'message': 'User logged in successfully'}), 200)


class Logout(Resource):
    def post(self):
        if 'user_id' in session:
            session.clear()  # Clear the entire session
            return make_response(jsonify({'message': 'Logged out successfully'}), 200)
        else:
            return make_response(jsonify({'message': 'No user logged in'}), 200)


class CheckLoginStatus(Resource):
    def get(self):
        if 'user_id' in session:
            return {'loggedIn': True}, 200
        else:
            return {'loggedIn': False}, 200
        
    


class UserGames(Resource):
    @login_required
    def get(self, user):
        user = get_authenticated_user()  # Retrieve the authenticated user
        user_games = UserGame.query.filter_by(user_id=user.id).all()
        user_games_data = [ug.to_dict() for ug in user_games]
        return jsonify(user_games_data)


class UserLocations(Resource):
    @login_required
    def get(self, user):
        user = get_authenticated_user()  # Retrieve the authenticated user
        user_locations = UserLocation.query.filter_by(user_id=user.id).all()
        user_locations_data = [ul.to_dict() for ul in user_locations]
        return jsonify(user_locations_data)
   


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Account, '/account')
api.add_resource(Signup, '/signup')
api.add_resource(CheckLoginStatus, '/check-login-status')
api.add_resource(UserGames, '/user-games')
api.add_resource(UserLocations, '/user-locations')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
