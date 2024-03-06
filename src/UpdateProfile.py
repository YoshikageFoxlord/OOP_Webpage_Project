import base64

import tornado.web
import json

class Handler(tornado.web.RequestHandler):
    def get(self):
        resp = {"ok": True}
        myType = self.get_query_argument("type", None);
        print("OUR TYPE: ", myType);
        self.render("InputPopup.html",
                    type=myType)

    def post(self):
        input = json.loads(self.request.body)
        # print("WE GOT:", input)
        myType = self.request.headers.get('type')

        if myType == 'file':
            print("WE GOT RAW: ", input)
            print("WE GOT: ", base64.b64decode(input)[:20])

        if input.__contains__('<' or '>'):
            raise tornado.web.HTTPError(500,
                                        "Still don't know how to get this to appear.",
                                        reason="Response contained invalid characters '<' or '>'.")
        else:
            # ppic = base64.b64decode(J["pic"])
            resp = {"ok": True}
            self.write(json.dumps(resp))