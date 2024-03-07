import tornado.web
import random
import Users

class Handler(tornado.web.RequestHandler):
    def get(self):
        myUserName = self.request.path[9:]
        myUser = Users.get_user(myUserName)
        self.render("Profile.html",
                    name=myUser.name,
                    login=myUser.login,
                    DOB=myUser.dob,
                    email=myUser.email,
                    image=myUser.pfp)
