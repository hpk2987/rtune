#!/bin/sh
npm run build
scp -r ./build/* hernan@mxq:/home/hernan/mnt/usb0/rtune-server/src/static/
ssh hernan@mxq systemctl --user restart rtune
