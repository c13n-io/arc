# Table of Contents
- [Table of Contents](#table-of-contents)
- [Contents](#contents)
  - [Contributing with code to arc](#contributing-with-code-to-arc)
    - [We Develop on Github](#we-develop-on-github)
    - [We Use Github Flow model](#we-use-github-flow-model)
    - [Making good commits](#making-good-commits)
    - [gRPC](#grpc)
  - [Reporting Bugs](#reporting-bugs)
    - [Report bugs using Github's issues](#report-bugs-using-githubs-issues)
    - [Write bug reports with detail, background, and sample code](#write-bug-reports-with-detail-background-and-sample-code)
  - [License](#license)

# Contents

## Contributing with code to arc

Any input by the community is welcome, so we want to make the process of contributing as easy as possible. Your contributions may include any of the following:

- Bug reports, discussions on current state of project, or proposals for new features. For more info read [this](#Bugs-amp-Issues).
- Fix submissions


### We Develop on Github
We use github to host code, track issues, and review Pull Requests. The project's life cycle is taking place here.

### We Use [Github Flow](https://guides.github.com/introduction/flow/index.html) model
We actively review and discuss pull requests.

The desired format & flow for this procedure is as follows:

1. Fork the repo under your namespace (user or organisation). Then clone locally:
```
git clone github.com/<my_namespace>/arc
```
2. Create a branch from `develop`.
```
git checkout develop
git checkout -b <my_branch_name>
```
3. Add your changes, by creating simple & understandable commits. Never include artifacts, media or binary files to your commits.
```
git add <file_1>, <file_2>, ...
git commit -m "Descriptive commit message"
git push origin <my_branch_name>
```
4. Ensure that the project builds correctly and the webpage launches normally.
5. Make sure your code lints.
```bash
npm run lint
```

6. Make the Pull Request. Don't forget to write a small description of the changes you are introducing.
7. Stay active for the review phase, as fixes and/or tweaks may be required for your PR to be approved.
8. Final Merge from the dev team.

### Making good commits
These are the seven rules of a great Git commit messages:

* Separate subject from body with a blank line
* Limit the subject line to 50 characters (if possible)
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

Try to solve a single problem per each commit.
If your description ends up too long, that’s an indication that you probably need to split up your commit.

Create commit or pull-request descriptions that are self-contained.
This benefits both the maintainers and reviewers.
Always use your real name and e-mail address for committing changes.

If the commit fixes a reported issue, refer to that bug entry by issue number.

### gRPC

This app utilizes gRPC to communicate with `c13n-backend`. Currently, the generated `.js` client code for the API's protobuf file is included in the git source code.

To generate new protobuf javascript client code, you need to have [protoc](https://grpc.io/docs/protoc-installation/) and [grpc-web](https://github.com/grpc/grpc-web/tags) plugin installed.

You can use `make protofile` inside the `src/rpc/` directory to invoke the protobuf compiler with its default settings.

## Reporting Bugs

### Report bugs using Github's issues
We use GitHub issues to track public bugs. Report a bug by opening a new [issue]().

### Write bug reports with detail, background, and sample code

**Great** Bug Reports tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License


This project is licensed under the [MIT License](http://choosealicense.com/licenses/mit/).

When you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.
