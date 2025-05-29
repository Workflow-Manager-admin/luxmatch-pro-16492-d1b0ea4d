#!/bin/bash
cd /home/kavia/workspace/code-generation/luxmatch-pro-16492-d1b0ea4d/luxmatch_pro
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

