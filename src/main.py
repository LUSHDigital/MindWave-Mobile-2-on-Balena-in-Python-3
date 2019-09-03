from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context
from random import random
from time import sleep
from threading import Thread, Event
import time
import bluetooth
from mindwavemobile.MindwaveDataPoints import RawDataPoint
from mindwavemobile.MindwaveDataPoints import EEGPowersDataPoint
from mindwavemobile.MindwaveDataPointReader import MindwaveDataPointReader


__author__ = "slynn"

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
app.config["DEBUG"] = True

# turn the flask app into a socketio app
socketio = SocketIO(app)

# random number Generator Thread
thread = Thread()
thread_stop_event = Event()


class RandomThread(Thread):
    def __init__(self):
        self.delay = 1
        super(RandomThread, self).__init__()

    def randomNumberGenerator(self):
        while not thread_stop_event.isSet():
            mindwaveDataPointReader = MindwaveDataPointReader()
            mindwaveDataPointReader.start()
            if mindwaveDataPointReader.isConnected():
                while True:
                    dataPoint = mindwaveDataPointReader.readNextDataPoint()
                    if dataPoint.__class__ is EEGPowersDataPoint:
                        print(*dataPoint)
                        # socketio.emit(
                        #     "newnumber", {"output": output}, namespace="/test"
                        # )
            else:
                output = "Could not connect to the Mindwave Mobile device, retrying ..."

            socketio.emit("newnumber", {"output": output}, namespace="/test")
            sleep(self.delay)

    def run(self):
        self.randomNumberGenerator()


@app.route("/")
def index():
    # only by sending this page first will the client be connected to the socketio instance
    return render_template("index.html")


@socketio.on("connect", namespace="/test")
def test_connect():
    # need visibility of the global thread object
    global thread
    print("Client connected")

    # Start the random number generator thread only if the thread has not been started before.
    if not thread.isAlive():
        print("Starting Thread")
        thread = RandomThread()
        thread.start()


@socketio.on("disconnect", namespace="/test")
def test_disconnect():
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=80)
