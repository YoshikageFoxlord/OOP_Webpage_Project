import tornado.web
import random

class User():
    def __init__(self, name, login, dob, email):
        self.name = name
        self.login = login
        self.dob = dob
        self.email = email

alice = User("Alice Smith", "alice", "Jan. 1", "alice@example.com")
bob = User("Bob Jones", "bob", "Dec. 31", "bob@bob.xyz")
carol = User("Carol Ling", "carol", "Jul. 17", "carol@example.com")
dave = User("Dave N. Port", "dave", "Mar. 14", "dave@dave.dave")

users = {"alice": alice, "bob": bob, "carol": carol, "dave": dave}

class Handler(tornado.web.RequestHandler):
    def get(self):
        myUser = self.request.path[9:]
        print(myUser)
        self.render("ProfileTemplate.html",
                    name=users[myUser].name,
                    login=users[myUser].login,
                    DOB=users[myUser].dob,
                    email=users[myUser].email)
