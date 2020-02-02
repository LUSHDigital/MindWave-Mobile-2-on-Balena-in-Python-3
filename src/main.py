from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context
from random import random
from time import sleep
from threading import Thread, Event
from collections import deque
from superjson import json
import time
import bluetooth
from mindwavemobile.MindwaveDataPoints import RawDataPoint
from mindwavemobile.MindwaveDataPoints import EEGPowersDataPoint
from mindwavemobile.MindwaveDataPointReader import MindwaveDataPointReader


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
app.config["DEBUG"] = True

# turn the flask app into a socketio app
socketio = SocketIO(app)

# random number Generator Thread
thread = Thread()
thread_stop_event = Event()


class Wave:
    def __init__(self):
        self.data = deque(maxlen=10)

    def __str__(self):
        return str(list(self.data))


delta = Wave()
theta = Wave()
lowAlpha = Wave()
highAlpha = Wave()
lowBeta = Wave()
highBeta = Wave()
lowGamma = Wave()
midGamma = Wave()


class RandomThread(Thread):
    def __init__(self):
        self.delay = 1
        super(RandomThread, self).__init__()

    def mindwaveArray(self):
        output = {
            "delta": delta,
            "theta": theta,
            "lowAlpha": lowAlpha,
            "highAlpha": highAlpha,
            "lowBeta": lowBeta,
            "highBeta": highBeta,
            "lowGamma": lowGamma,
            "midGamma": midGamma,
        }
        while not thread_stop_event.isSet():
            mindwaveDataPointReader = MindwaveDataPointReader()
            mindwaveDataPointReader.start()
            if mindwaveDataPointReader.isConnected():
                while True:
                    dataPoint = mindwaveDataPointReader.readNextDataPoint()
                    if dataPoint.__class__ is EEGPowersDataPoint:
                        newData = dataPoint.__dict__
                        for k, v in newData.items():
                            if k in output.keys():
                                output[k].appendleft(v)
                        socketio.emit(
                            "newnumber",
                            {"output": json.dumps(output)},
                            namespace="/test",
                        )
            else:
                output = "Could not connect to the Mindwave Mobile device, retrying ..."

            socketio.emit("newnumber", {"output": output}, namespace="/test")
            sleep(self.delay)

    def run(self):
        self.mindwaveArray()


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
