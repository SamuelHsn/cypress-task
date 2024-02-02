#!/bin/bash
mkdir dist/images
cp ./images/cypress.png dist/images
cp package*.json dist
cd dist
npm install --production 