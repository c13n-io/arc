![lint](https://github.com/c13n-io/c13n-web/actions/workflows/eslint-check.yml/badge.svg)
![MIT License](https://img.shields.io/badge/license-MIT-%2333BB33)
![Version](https://img.shields.io/badge/version-0.0.2-%233333BB)

<h1 align="center">c13n-web</h1>
<p align="center">
  <img src="public/logo192.png" alt="drawing" width="100"/>
</p>

<p align="center">
A web client for messaging and managing money over Bitcoin's Lightning Network based on <a href="https://github.com/c13n-io/c13n-go/">c13n-go</a>.
</p>

# Contents
- [Overview](#overview)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Usage](#usage)
- [Contributing](#contributing)


# Overview

`c13n-web` is a web client for messaging and managing money over Lightning. It is using the [c13n-go](https://github.com/c13n-io/c13n-go/) API.

# Installation
## Requirements
* node
* npm

## Steps
- Clone the source code:
  ```bash
  git clone https://github.com/c13n-io/c13n-web.git
  cd c13n-web
  ```
- Fetch and install dependencies:
  ```bash
  npm install
  ```

# Usage
- Start the c13n-web local server:
  ```bash
  npm start
  ```
  c13n-web will be served at http://localhost:3000
# Contributing

If you want to contribute to this project, either by **authoring code** or by **reporting bugs & issues**, make sure to read the [Contribution Guidelines](CONTRIBUTING.md).
