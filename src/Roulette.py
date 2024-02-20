import tornado.web
import random

class Handler(tornado.web.RequestHandler):
    def get(self):
        self.render("Roulette.html")