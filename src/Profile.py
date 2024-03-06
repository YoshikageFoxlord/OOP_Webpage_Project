import tornado.web
import random

class User():
    def __init__(self, name, login, dob, email, pfp):
        self.name = name
        self.login = login
        self.dob = dob
        self.email = email
        self.pfp = pfp

alice = User("Alice Smith", "alice", "Jan. 1", "alice@example.com", "Doomer_Girl.jpg")
bob = User("Bob Jones", "bob", "Dec. 31", "bob@bob.xyz", "Wojak.jpg")
carol = User("Carol Ling", "carol", "Jul. 17", "carol@example.com", "Trad_Girl.jpg")
dave = User("Dave N. Port", "dave", "Mar. 14", "dave@dave.dave", "Soyjak.jpg")

users = {"alice": alice, "bob": bob, "carol": carol, "dave": dave}

class Handler(tornado.web.RequestHandler):
    def get(self):
        myUser = self.request.path[9:]
        self.render("Profile.html",
                    name=users[myUser].name,
                    login=users[myUser].login,
                    DOB=users[myUser].dob,
                    email=users[myUser].email,
                    image="/static/" + users[myUser].pfp)
