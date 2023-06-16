#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Neighborhood, Games, Games2Users, Locations, Locations2Users

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        fake = Faker()
        
        fake.seed_locale('en_US', 0)


        print("Deleting data...")
        db.session.query(User).delete()
        db.session.query(Neighborhood).delete()
        db.session.query(Games).delete()
        db.session.query(Games2Users).delete()
        db.session.query(Locations).delete()
        db.session.query(Locations2Users).delete()

        print("Creating users...")
        users = []
        for _ in range(5):
          first_name = fake.name()
          last_name = fake.name()
          password = fake.password()
          username = fake.user_name()
          created_at = fake.date_time_this_decade()
          user = User(
             first_name=first_name, 
             last_name=last_name, 
             username=username,
             password=password, 
             created_at=created_at)

          users.append(user)
          db.session.add(user)
          db.session.commit()

        print("Creating neighborhoods...")
        neighborhoods = []
        for _ in range(2):
           neighborhood = Neighborhood()
           neighborhoods.append(neighborhood)
           db.session.add(neighborhood)
           db.session.commit()

        print("Creating games")
        games = []
        for _ in range(5):
           game = Games()
           games.append(game)
           db.session.add(game)
           db.session.commit()

        print("Creating locations")
        locations = []
        for i in range(5):
           location = Locations()
           locations.append(location)
           location.neighborhood_id = neighborhoods[i].id
           db.session.add(location)
           db.session.commit()


        print("Mapping games to users...")
        for i in range(2):
           user = users[i]
           game = games[i]
           game2user = Games2Users(
              user_id = user.id,
              game_id = game.id
           )

        print("Mapping locations to users...")
        for i in range(2):
           location = locations[i]
           user = users[i]
           location2User = Locations2Users(
              user_id = user.id
              location_id = location.id
           )
