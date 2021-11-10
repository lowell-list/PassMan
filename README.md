# Lowell's Password Manager (PassMan)

## Goal

Create a personal password manager that can work on desktop, mobile, and web.
Password data will be encrypted and stored in a personal private GitHub repo.

## Data

App will need:

- GitHub credentials
  - access key
  - repo name
  - user name
  - branch name
- master password
  - required to decrypt passwords
  - entered by user whenever the app is opened or the apps's been in the
    background for over a time limit

## Features

- Quick search
- Passwords not visible by default, may be revealed or copied with button click
- Prompt-to-save if any data has changed!

## Screens

- Passwords
  - search bar
  - add button
  - password item:
    - icon (with first letter of name)
    - name
    - description
    - password
    - notes (not visible by default)
- Settings
  - GitHub Connect Screen
    - inputs for access key, repo name, etc.
- Message
  - Easy screen to quickly encrypt / decrypt a simple message
  - Plain text input area
  - Encrypted text input area
  - Both text inputs may be typed in or copy/pasted, and both have a "Copy"
    button

## Resources

- [Figma Passwords Project](https://www.figma.com/file/c2H8nYWUqOBP4n2QKhCe5H/Passwords?node-id=0%3A1)

- [PassMan GitHub Repo](https://github.com/lowell-list/PassMan)

- [Infinite Red Ignite Repo](https://github.com/infinitered/ignite)

- [Octokit Libary](https://github.com/octokit/octokit.js) - looks promising for GitHub connection

- [Octokit article](https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0) - how to push files
