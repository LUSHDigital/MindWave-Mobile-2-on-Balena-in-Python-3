from flask import Flask, render_template, Response, request, redirect, url_for
import requests
from bs4 import BeautifulSoup
import time
import bluetooth
from mindwavemobile.MindwaveDataPoints import RawDataPoint
from mindwavemobile.MindwaveDataPointReader import MindwaveDataPointReader
import textwrap


def start_treatment():
    mindwaveDataPointReader = MindwaveDataPointReader()
    mindwaveDataPointReader.start()
    if mindwaveDataPointReader.isConnected():
        while True:
            dataPoint = mindwaveDataPointReader.readNextDataPoint()
            if not dataPoint.__class__ is RawDataPoint:
                print(dataPoint)
    else:
        print(
            (
                textwrap.dedent(
                    """\
            Exiting because the program could not connect
            to the Mindwave Mobile device."""
                ).replace("\n", " ")
            )
        )


app = Flask(__name__)


@app.route("/json")
def json():
    return render_template("json.html")


@app.route("/background_process_test")
def background_process_test():
    print("Hello")
    return "nothing"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/suggestions")
def suggestions():
    text = request.args.get("jsdata")

    suggestions_list = []

    if text:
        r = requests.get(
            "http://suggestqueries.google.com/complete/search?output=toolbar&hl=ru&q={}&gl=in".format(
                text
            )
        )
        r.encoding = "utf-8"
        result = r.content

        soup = BeautifulSoup(page, "lxml")

        suggestions = soup.find_all("suggestion")

        for suggestion in suggestions:
            suggestions_list.append(suggestion.attrs["data"])

        # print(suggestions_list)

    return render_template("suggestions.html", suggestions=suggestions_list)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
