#!/usr/bin/env bash

echo 'Compiling Karma configuration'
node_modules/typescript/bin/tsc ./tests/karma.conf.ts --outFile ./tmp/karma.conf.js

echo 'Start tests'
node_modules/karma/bin/karma start tmp/karma.conf.js || exit 1

exit 0
