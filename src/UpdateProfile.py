import base64

import tornado.web
import json
import Users

class Handler(tornado.web.RequestHandler):
    def get(self):
        resp = {"ok": True}
        myType = self.get_query_argument("type", None);
        print("OUR TYPE GET: ", myType);
        self.render("InputPopup.html",
                    type=myType)

    def post(self):
        input = json.loads(self.request.body)
        myType = self.request.headers.get('type')
        dataKey = self.request.headers.get('dataKey')

        print("OUR TYPE POST: ", myType)
        print("OUR DATA KEY: ", dataKey)
        print("WE GOT: ", input)

        if input.__contains__('<' or '>'):
            raise tornado.web.HTTPError(500,
                                        "Still don't know how to get this to appear.",
                                        reason="Response contained invalid characters '<' or '>'.")
        else:
            if myType == "file":
                urlFile = base64.urlsafe_b64encode(base64.urlsafe_b64decode(input))
                Users.set_user_data('alice', dataKey, "data:image/png;base64," + str(urlFile))
                print(type(urlFile))
            else:
                Users.set_user_data('alice', dataKey, input)

            resp = {"ok": True}
            self.write(json.dumps(resp))