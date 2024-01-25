import tornado.web

class Handler(tornado.web.RequestHandler):
    def get(self):
        self.write('<a href="profile/alice">Alice Smith</a><br>')
        self.write('<a href="profile/bob">Bob Jones</a><br>')
        self.write('<a href="profile/carol">Carol Ling</a><br>')
        self.write('<a href="profile/dave">Dave N. Port</a><br>')


