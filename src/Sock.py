import tornado.websocket
import json

activeClients=[]

class Handler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("THE CONNECTION IS OPEN ")
        for c in activeClients:
            c.write_message("Someone has joined the chat");
        activeClients.append(self)

    def on_message(self, msg):
        msg = msg.split(",")
        print("SERVER GOT:", msg)
        for c in activeClients:
            c.write_message(json.dumps(msg))

    def on_close(self):
        activeClients.remove(self)
        for c in activeClients:
            c.write_message("Someone has left the chat");

    def check_origin(self, *args):
        return True   #trust everyone!

