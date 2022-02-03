![lint](https://github.com/c13n-io/arc/actions/workflows/eslint-check.yml/badge.svg)
![MIT License](https://img.shields.io/badge/license-MIT-%2333BB33)
![Version](https://img.shields.io/badge/version-0.0.2-%233333BB)

<h1 align="center">arc</h1>
<p align="center">
  <img src="public/logo192.png" alt="drawing" width="100"/>
</p>

<p align="center">
A web client for messaging and managing money over Bitcoin's Lightning Network based on <a href="https://github.com/c13n-io/c13n-go/">c13n-go</a>.
</p>



# Contents
- [Contents](#contents)
- [Overview](#overview)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Usage](#usage)
- [Contributing](#contributing)


# Overview

`Arc` is a web client for messaging and managing money over Lightning. It is using the [c13n-go](https://github.com/c13n-io/c13n-go/) API.

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
  
- (Alternative) Use our ready made Arc client:
  Browse to https://c13n-io.github.io/arc/
  
# Contributing

If you want to contribute to this project, either by **authoring code** or by **reporting bugs & issues**, make sure to read the [Contribution Guidelines](CONTRIBUTING.md).
