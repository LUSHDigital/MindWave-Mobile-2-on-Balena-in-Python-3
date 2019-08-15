import flask
import time

app = flask.Flask(__name__)


@app.route("/")
def index():
    def inner():
        for x in range(100):
            time.sleep(1)
            yield "%s<br/>\n" % x

    return flask.Response(
        inner(), mimetype="text/html"
    )  # text/html is required for most browsers to show the partial page immediately


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
