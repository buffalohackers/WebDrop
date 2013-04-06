import os
import flask
from flask import Flask, g

app = Flask(__name__)
app.debug = True

@app.route("/")
def hello():
	return flask.render_template("upload.html")
@app.route("/index")
def index():
	return flask.render_template("base.html")
@app.route("/receive")
def receive():
	return flask.render_template("receive.html")



	#return flask.render_template("splash.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 1337))
    app.run(host='0.0.0.0', port=port)