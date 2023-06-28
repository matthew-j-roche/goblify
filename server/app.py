#!/usr/bin/env python3
from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from datetime import date
from models import db, User, GobJoke, Worblin, Letter, UserWorblin, GobxamQuestion, UserGobxam
from config import app, db
from datetime import date




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
    def patch(self, id):  # Accept user ID as a parameter
        user = User.query.get(id)  # Fetch the user by ID
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

    def get(self, id):
        user = User.query.get(id)
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

        return make_response(jsonify(user.to_dict()), 200) 


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

    

class UserWorblins(Resource):
    def get(self, user):
        user_worblins = UserWorblin.query.filter_by(user_id=user.id).all()
        user_worblins_data = [uw.to_dict() for uw in user_worblins]
        return jsonify(user_worblins_data)

    def post(self):
        data = request.get_json()
        worblin_id = data['worblin_id']
        user_id = data['user_id']
        guesses = data['guesses']

        existing_game = UserWorblin.query.filter_by(worblin_id=worblin_id, user_id=user_id).first()
        if existing_game:
            return {'message': 'You have already played this game.'}, 400
    
        # Create a new UserWorblin object and save it to the database
        user_worblin = UserWorblin(worblin_id=worblin_id, user_id=user_id, guesses=guesses)
        db.session.add(user_worblin)
        db.session.commit()
    
        return {'message': 'Game saved successfully'}
    
class UserWorblinsById(Resource):
    def get(self, user_id):
        user_worblins = UserWorblin.query.filter_by(user_id=user_id).all()
        user_worblins_data = [uw.to_dict() for uw in user_worblins]
        return jsonify(user_worblins_data)

class GobxamQuestions(Resource):
    def get(self):
        today = date.today()
        day_of_month = today.day

        questions = GobxamQuestion.query.filter_by(day_of_month=day_of_month).all()
        if questions:
            questions_list = [question.to_dict() for question in questions]
            return jsonify(questions_list)
        else:
            return jsonify({'message': 'No questions found for the current day.'}), 404


class UserGobxams(Resource):
    def get(self, user_id):
        user_gobxams = UserGobxam.query.filter_by(user_id=user_id).all()
        user_gobxams_data = [ug.to_dict() for ug in user_gobxams]
        return jsonify(user_gobxams_data)

    def post(self):
        data = request.get_json()
        user_id = data['user_id']
        score = data.get('score')

        gobxam_date = datetime.now().date()

        existing_gobxam = UserGobxam.query.filter_by(user_id=user_id, gobxam_date=gobxam_date).first()
        if existing_gobxam:
            return {'message': 'You have already taken the Gobxam for today.'}, 400

        user_gobxam = UserGobxam(user_id=user_id, gobxam_date=gobxam_date, score=score)
        db.session.add(user_gobxam)
        db.session.commit()

        return {'message': 'Gobxam score saved successfully'}, 201

class UserGobxamsById(Resource):
    def get(self, user_id):
        user_gobxams = UserGobxam.query.filter_by(user_id=user_id).all()
        user_gobxams_data = [ug.to_dict() for ug in user_gobxams]
        return jsonify(user_gobxams_data)


api.add_resource(GobJokes, '/gobjokes')
api.add_resource(Worblins, '/worblins')
api.add_resource(Bloodlogin, '/bloodlogin')
api.add_resource(Bloodlogout, '/bloodlogout')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Signup, '/signup')
api.add_resource(Letters, '/letters')
api.add_resource(CheckLoginStatus, '/check-login-status')
api.add_resource(UserWorblins, '/user-worblins')
api.add_resource(UserWorblinsById, '/user-worblins/<int:user_id>')
api.add_resource(GobxamQuestions, '/gobxam-questions')
api.add_resource(UserGobxams, '/user-gobxams')
api.add_resource(UserGobxamsById, '/user-gobxams/<int:user_id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
