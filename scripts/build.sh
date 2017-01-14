#!/usr/bin/env bash

echo 'Linting sources'
#find ./src -name '*.ts' -print0 | xargs -0 node_modules/.bin/tslint -c ./tslint.json || exit 1

rm -rf ./build

echo 'Compiling Headlight'
node_modules/.bin/tsc -p ./ || exit 1

echo '\nDONE'

exit 0
