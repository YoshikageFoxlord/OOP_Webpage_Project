class User(object):
    def __init__(self, name, login, dob, email, pfp):
        self.name = name
        self.login = login
        self.dob = dob
        self.email = email
        self.pfp = pfp

    def set(self, value_name:str, new_value):
        self.__setattr__(value_name, new_value)

alice = User("Alice Smith", "alice", "Jan. 1", "alice@example.com", "/static/Doomer_Girl.jpg")
bob = User("Bob Jones", "bob", "Dec. 31", "bob@bob.xyz", "/static/Wojak.jpg")
carol = User("Carol Ling", "carol", "Jul. 17", "carol@example.com", "/static/Trad_Girl.jpg")
dave = User("Dave N. Port", "dave", "Mar. 14", "dave@dave.dave", "/static/Soyjak.jpg")

users = {"alice": alice, "bob": bob, "carol": carol, "dave": dave}


def get_user(username:str):
    return users[username]

def set_user_data(username:str, data_key:str, new_value):
    users[username].set(data_key, new_value)