# Contributing to NextFTC

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. Please make sure to
read the relevant section before making your contribution. It will make it a lot
easier for us maintainers and smooth out the experience for all involved. The
community looks forward to your contributions. 🎉

> And if you like NextFTC, but just don't have time to contribute, that's fine.
> There are other easy ways to support and show your appreciation, which we
> would
> also be very happy about:
> - Star it on GitHub
> - Tell your friends about it
> - Refer NextFTC in your team's GitHub
> - Mention NextFTC at local meetups and competitions

## Code of Conduct

This project and everyone participating in it is governed by
the [Code of Conduct](/code-of-conduct).
By participating, you are expected to uphold this code. Please report
unacceptable behavior to <NextFTCLibrary@gmail.com>.

## I Have a Question

> If you want to ask a question, we assume that you have read the
> available [documentation](https://nextftc.dev).

If you then still feel the need to ask a question and need clarification, we
recommend one of the following:

- Open an [issue](https://github.com/NextFTC/NextFTC/issues/new).
- Ask in the [Discord server](https://nextftc.dev/discord).

Regardless, please provide as much context as you can about what you're running
into. We will then try to get back to you as soon as possible.

## I Want To Contribute

> ### Legal Notice
> When contributing to this project, you must agree that you have authored 100%
> of the content, that you have the necessary rights to the content and that the
> content you contribute may be provided under the project license,
> the
> [GNU General Public License, version 3](https://www.gnu.org/licenses/gpl-3.0.html).

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more
information. Therefore, we ask you to investigate carefully, collect information
and describe the issue in detail in your report. Please complete the following
steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using
  incompatible versions (Make sure that you have read
  the [documentation](https://nextftc.dev). If you are looking for support, you
  might want to check [this section](#i-have-a-question)).
- Can you reliably reproduce the issue? And can you also reproduce it with older
  versions?

#### How Do I Submit a Good Bug Report?

We use GitHub issues to track bugs and errors. If you run into an issue with the
project:

- Open an [Issue](https://github.com/NextFTC/NextFTC/issues/new).
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction
  steps* that someone else can follow to recreate the issue on their own. This
  usually includes your code. For good bug reports you should isolate the
  problem and create a reduced test case.
- Provide the information you collected in the previous section.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for
NextFTC, **including completely new features and minor improvements to existing
functionality**. Following these guidelines will help maintainers and the
community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://nextftc.dev) carefully and find out if the
  functionality is already covered, maybe by an individual configuration.
- Find out whether your idea fits with the scope and aims of the project. It's
  up to you to make a strong case to convince the project's developers of the
  merits of this feature. Keep in mind that we want features that will be useful
  to the majority of our users and not just a small subset. If you're just
  targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked
as [GitHub issues](https://github.com/NextFTC/NextFTC/issues).

- Use a **clear and descriptive title** for the issue to identify the
  suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many
  details as possible.
- **Describe the current behavior** and **explain which behavior you expected to
  see instead** and why. At this point you can also tell which alternatives do
  not work for you.
- **Explain why this enhancement would be useful** to most NextFTC users. You
  may also want to point out the other projects that solved it better and which
  could serve as inspiration.

### Your First Code Contribution

We welcome all contributions, including yours.

#### Bug fixes

For bug fixes, if you would like to fix it yourself, please do the following.

1. Fork the repo.
2. Create a branch from the `main` branch.
3. Make your changes.
4. Create a pull request to merge your branch back into the `main` branch of the
   original repo.

#### Features

> [!IMPORTANT]
> For bigger changes, please create
> an [issue](https://github.com/NextFTC/NextFTC/issues/new) first.

For features, please do the following:

1. Fork the repo.
2. Create a branch from the `develop` branch.
3. Make your changes.
4. Create a pull request to merge your branch back into the `develop` branch of
   the original repo.

#### Testing Changes Locally

If you had made changes to the library and would like to test them locally first
before making a pull request, follow these steps.

1. In the library repo, run `./gradlew deployLocal`.
2. In your team code, in the `repositories { }` block, add `mavenLocal()`.
3. In the `implementation` dependency for the library you changed, add `-LOCAL`
   to the end of the version.
4. Click sync.

### Improving The Documentation

To suggest an edit to any page on the documentation, click "edit this page" at
the bottom of the docs.

## Attribution

This guide is based on [CONTRIBUTING.md](https://contributing.md/example).
