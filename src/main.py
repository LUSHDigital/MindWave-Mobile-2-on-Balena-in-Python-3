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
                return dataPoint
    else:
        return "Exiting because the program could not connect to the Mindwave Mobile device."


app = Flask(__name__)


@app.route("/json")
def json():
    return render_template("json.html")


@app.route("/output")
def background_process_test():
    mindwave = start_treatment()

    print("here:")
    print(mindwave)

    return render_template("output.html", output=mindwave)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
