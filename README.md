![video](git-assets/blumtap_logo.png)

![PyPI - Python Version](https://img.shields.io/pypi/pyversions/django)![GitHub commit activity](https://img.shields.io/github/commit-activity/m/nhassl3/Blumtap-clicker)![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/nhassl3/Blumtap-clicker/total)![GitHub last commit](https://img.shields.io/github/last-commit/nhassl3/Blumtap-clicker)![GitHub contributors from allcontributors.org](https://img.shields.io/github/all-contributors/nhassl3/Blumtap-clicker)
# Blum Tap 👆

### It is clicker for Blum webapp in telegram
The application is designed to automatically collect stars in a new crypto-bot, as well as an innovative platform that combines the best aspects of modern cryptocurrency technologies

**This script allows you to quickly and as much as possible collect viruses in the game from Blum**

## Instruction for user
You should just download file from **RELEASE** and install in your machine. Enjoy!

## Dev Instruction
- #### Instruction:
1. Download and install poetry from the official [website](https://python-poetry.org/docs);

2. After this steps you should clonning this repository from:
    > git clone https://github.com/nhassl3/Blumtap-clicker.git
3. Activate the new work environment and update the project to install all dependencies for the script and the backend of the project;

    > poetry shell

    > poetry update
4. Run backend develop server:
    > cd blumtap_tap_clicker & cd blumtap_backend & python manage.py runserver 8084
5. Install all dependencies for fronted, but you should be shure that you download and install node.js:
    > cd .. & cd app & cd blumtap-app & npm i
6. Change in `src-tauri/tauri.conf.json` file this code:

        "build": {
            "beforeBuildCommand": "npm run build",
            "beforeDevCommand": "npm run dev",
            "devPath": "https://luxury-gumption-209ef5.netlify.app/",
            "distDir": "https://luxury-gumption-209ef5.netlify.app/"
          },

on

          "build": {
            "beforeBuildCommand": "npm run build",
            "beforeDevCommand": "npm run dev",
            "devPath": "../dist",
            "distDir": "../dist"
          },

7. Run frontend:
    > tauri run dev

- **THIS VERSION IS TEST. PLEASE ADD YOUR ISSUE FOR FIX SOME BAGS! EVERYONE THANK WHO DO THIS!**

## Requirements
python = ">=3.11,<3.13"\
django = "5.0.6"\
djangorestframework = "^3.15.1"\
django-cors-headers = "^4.3.1"\
mss = "^9.0.1"\
pyautogui = "^0.9.54"\
opencv-python = "^4.10.0.82"\
keyboard = "^0.13.5"\
nuitka = "^2.3.4"

## Version
v0.1.2