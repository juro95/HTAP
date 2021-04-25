from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@ app.route("/template")
def template():
    return render_template("template.html")

@app.route("/About")
def about():
    return render_template("About.html")


@app.route("/kitchen")
def kitchen():
    return render_template("kitchen-compartment.html")


@app.route("/left-wing")
def left():
    return render_template("left-wing.html")

@app.route("/left-wing2")
def left2():
    return render_template("left-wing2.html")

@app.route("/office")
def office():
    return render_template("office.html")


@app.route("/right-wing")
def right():
    return render_template("right-wing.html")


@app.route("/bikini-bottom")
def bikini():
    return render_template("bikini-bottom.html")



if __name__ == "__main__":
    app.run()
