# Creator: Logan Brown | Foxlord
# ETEC 2104
# Project: Tornado Webpage
# Date: 18 Jan 2024

import asyncio
import tornado.web
import os, os.path
import Index
import ProfileSelection

HTMLDIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..","html"
    )
)


def makeApp():
    endpoints = [
        ("/", Index.Handler),
        ("/profile/.*", ProfileSelection.Handler)
    ]
    app = tornado.web.Application(
            endpoints,
            static_path=HTMLDIR)
    app.listen(8000)
    return app


if __name__ == "__main__":
    app = makeApp()
    asyncio.get_event_loop().run_forever()