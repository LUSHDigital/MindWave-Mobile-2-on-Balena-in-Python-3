import flask
import time

from flask import request
from jinja2 import Environment
from jinja2.loaders import FileSystemLoader

app = flask.Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        counter = int(request.form.get("counter", 0))

        def inner():
            for x in range(counter):  # eg: 100 should input value from browser
                time.sleep(1)
                yield "%s<br/>\n" % x

        result = inner
    return render_template("result.html", result=result if result is None else result())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
