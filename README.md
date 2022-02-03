![lint](https://github.com/c13n-io/arc/actions/workflows/eslint-check.yml/badge.svg)
![MIT License](https://img.shields.io/badge/license-MIT-%2333BB33)
![Version](https://img.shields.io/badge/version-0.0.2-%233333BB)

<h1 align="center">arc</h1>
<p align="center">
  <img src="public/logo192.png" alt="drawing" width="100"/>
</p>

<p align="center">
Arc is a social wallet.</p> 

A progressive web app that natively combines messages with micropayments based on Lightning Network and <a href="https://github.com/c13n-io/c13n-go/">c13n-go</a>.
If you have a c13n node up and running, you can immediately start using Arc here: https://c13n-io.github.io/arc/

# Contents
- [Contents](#contents)
- [Overview](#overview)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Usage](#usage)
- [c13n-go](#c13n-go)
- [Contributing](#contributing)


# Overview

`Arc` is a web client for messaging and managing money over Lightning. The app runs completely in-browser and is using the [c13n-go](https://github.com/c13n-io/c13n-go/) API. It is written in React and communicates with the c13n node natively via grpcweb.

# Installation
## Requirements
* node
* npm

## Steps
- Clone the source code:
  ```bash
  git clone https://github.com/c13n-io/arc.git
  cd arc
  ```
- Fetch and install dependencies:
  ```bash
  npm install
  ```

# Usage
- Start the arc local server:
  ```bash
  npm start
  ```
  arc will be served at http://localhost:3000
  
- (Alternative) Use our ready made Arc client. Browse to https://c13n-io.github.io/arc/.
  
# c13n-go

c13n-go is a deployable open-source component for LND that encapsulates and manages payload and message transfers within Lightning payments. For more information browse to [c13n-go](https://github.com/c13n-io/c13n-go/).
  
# Contributing

If you want to contribute to this project, either by **authoring code** or by **reporting bugs & issues**, make sure to read the [Contribution Guidelines](CONTRIBUTING.md).
