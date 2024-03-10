import tornado.websocket

activeClients=[]

class Handler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("THE CONNECTION IS OPEN ")
        for c in activeClients:
            c.write_message("Someone has joined the chat");
        activeClients.append(self)

    def on_message(self, msg):
        print("SERVER GOT:", msg)
        #Maybe I should do some typechecking here? I think all the checking I need is done on the JS side though.
        for c in activeClients:
            c.write_message(msg)

    def on_close(self):
        activeClients.remove(self)
        for c in activeClients:
            c.write_message("Someone has left the chat");

    def check_origin(self, *args):
        return True   #trust everyone!

