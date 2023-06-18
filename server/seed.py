#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from models import db, User, Block, Game, User_Game, Location, User_Location
from app import app


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        def seed_data():
            fake = Faker()
            
            fake.seed_locale('en_US', 0)

            print("Deleting data...")
            db.session.query(User).delete()
            db.session.query(Block).delete()
            db.session.query(Game).delete()
            db.session.query(User_Game).delete()
            db.session.query(Location).delete()
            db.session.query(User_Location).delete()

            print("Creating users...")
            users = []
            for _ in range(5):
                first_name = fake.first_name()
                last_name = fake.last_name()
                password = fake.password()
                username = fake.user_name()
                created_at = fake.date_time_this_year()
                user = User(
                    first_name=first_name, 
                    last_name=last_name, 
                    username=username,
                    password=password, 
                    created_at=created_at)

                users.append(user)
                db.session.add(user)
                db.session.commit()

            print("Creating blocks...")
            blocks = []
            for _ in range(2):
                name = fake.last_name
                block = Block()
                blocks.append(block)
                db.session.add(block)
                db.session.commit()

            print("Creating games")
            games = []
            for _ in range(5):
                name = fake.first_name()
                game = Game()
                games.append(game)
                db.session.add(game)
                db.session.commit()

            print("Creating Locations")
            locations = []
            for i in range(5):
                name = fake.address()
                location = Location()
                location.block_id =blocks[i % len(blocks)].id
                locations.append(location)
                db.session.add(location)
                db.session.commit()

            print("Mapping user_games...")
            user_games = []
            for i in range(2):
                user = users[i]
                game = games[i]
                user_game = User_Game(
                    user_id=user.id,
                    game_id=game.id
                )
                user_games.append(user_game)
                db.session.add(user_game)
                db.session.commit()

            print("Mapping user_locations...")
            user_locations = []
            for i in range(2):
                location = locations[i]
                user = users[i]
                user_location = User_Location(
                    user_id=user.id,
                    location_id=location.id
                )
                user_locations.append(user_location)
                db.session.add(user_location)
                db.session.commit()

        seed_data()
