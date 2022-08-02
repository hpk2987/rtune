#!/bin/sh
scp -r ./src/app.py hernan@mxq:/home/hernan/mnt/usb0/rtune-server/src/app.py
ssh hernan@mxq systemctl --user restart rtune
