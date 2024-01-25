import tornado.web

class Handler(tornado.web.RequestHandler):
    def get(self):
        self.write('<a href="profile/alice">Alice Smith\n</a>')
        self.write('<a href="profile/bob">Bob Jones\n</a>')
        self.write('<a href="profile/carol">Carol Ling\n</a>')
        self.write('<a href="profile/dave">Dave N. Port\n</a>')


