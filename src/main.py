from time import sleep
from flask import Flask, render_template
from math import sqrt

app = Flask(__name__)


@app.route("/")
def index():
    # render the template (below) that will use JavaScript to read the stream
    return render_template("index.html")


@app.route("/stream_sqrt")
def stream():
    def generate():
        for i in range(500):
            yield "{}\n".format(sqrt(i))
            sleep(1)

    return app.response_class(generate(), mimetype="text/plain")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
