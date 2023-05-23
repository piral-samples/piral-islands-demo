#!/bin/bash

cd mf-red
npm run debug-all &

cd ..

sleep 5

cd my-app
npm start &

cd ..

wait
