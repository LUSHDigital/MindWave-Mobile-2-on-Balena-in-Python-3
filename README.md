<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/j6CDEN6.png" alt="LUSH logo"></a>
</p>

<h3 align="center">MindWave Mobile 2 on Balena in Python 3</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![GitHub Issues](https://img.shields.io/github/issues/LUSHDigital/MindWave-Mobile-2-on-Balena-in-Python-3.svg)](https://github.com/LUSHDigital/MindWave-Mobile-2-on-Balena-in-Python-3/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/LUSHDigital/MindWave-Mobile-2-on-Balena-in-Python-3.svg)](https://github.com/LUSHDigital/MindWave-Mobile-2-on-Balena-in-Python-3/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

Based on [python-mindwave-mobile](https://github.com/robintibor/python-mindwave-mobile) by [@robintibor](https://github.com/robintibor).

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Example App](#example_app)
- [Extending & Developing](#extending--developing)
- [Built Using](#built_using)
- [TODO](#TODO)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)

## 📖 About <a name = "about"></a>
A [Balena Engine](https://www.balena.io/engine/) based project to capture [Neurosky Mindwave Mobile](http://developer.neurosky.com/) data streamed via a Raspberry Pi.

## 👟 Getting Started <a name = "getting_started"></a>
We suggest getting a copy of this project up and running in [Balena Cloud](https://www.balena.io/cloud/) by following the [Deployment](#deployment) instructions, and then working in [Balena's local development mode](https://www.balena.io/docs/learn/develop/local-mode/) to make your changes using the information list under [Usage](#usage) as a guide.

### Prerequisites

• A Raspberry Pi 3 Model B or B+.
• A 4GB or larger microSD card.
• A 2A micro USB power supply.
• A Balena account.


## 🚀 Deployment <a name = "deployment"></a>
This project can be deployed to Balena Cloud and subsequently your Raspberry Pi devices by following the instructions from the [Balena Docs](https://www.balena.io/docs/learn/getting-started/raspberrypi3/python/), but substituting the "simple-server-python" example project for this one.

## 🧠 Example App <a name="example_app"></a>
Out of the box, this project comes with a simple web UI for starting, stopping & viewing Mindwave Mobile data readings.

Once deployed, and with the headset set in [pairing mode](http://support.neurosky.com/kb/mindwave-mobile/how-do-i-put-the-mindwave-mobile-into-discovery-mode) visit you devices IP (listed in the Balena Cloud Console).

## ⌨️ Extending & Developing <a name="extending_&amp_developing"></a>
Afterward deploying, you can work in [Balena's local development mode](https://www.balena.io/docs/learn/develop/local-mode/) to quickly see changes. The example app hopefully gives a clear base to work from, but for an even simpler example you can try the following to see Mindwave datapoints printed to the console, these will be viewable in the Balena Cloud logs.

```
from mindwavemobile.MindwaveDataPointReader import MindwaveDataPointReader
mindwaveDataPointReader = MindwaveDataPointReader()
# connect to the mindwave mobile headset...
mindwaveDataPointReader.start()
# read one data point, data point types are specified in  MindwaveDataPoints.py'
dataPoint = mindwaveDataPointReader.readNextDataPoint()
print(dataPoint)
```

## ⛏️ Built Using <a name = "built_using"></a>
- [Python 3](https://www.python.org/download/releases/3.0/) - Language.
- [Balena Engine](https://www.balena.io/engine/) - Container Engine.
- [PyBluez](https://github.com/pybluez/pybluez) - Python Module.

## 🔧 TODO <a name = "TODO"></a>

- [x] Basics of README.
- [ ] This TODO list.

## ✍️ Authors <a name = "authors"></a>
- [@robintibor](https://github.com/robintibor) - Original groundwork, Python 3 and MindWave Mobile 2 integration.
- [@Simon-Ince](https://github.com/Simon-Ince) - Balena & Raspberry Pi integration + alterations & modifications.

See also the list of [contributors](https://github.com/robintibor/python-mindwave-mobile/graphs/contributors) for the original [robintibor/python-mindwave-mobile](https://github.com/robintibor/python-mindwave-mobile) project.
