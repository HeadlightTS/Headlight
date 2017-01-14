#!/usr/bin/env bash

#echo 'Compiling karma.conf.ts'
#node_modules/typescript/bin/tsc ./tests/karma.conf.ts --outDir tmp --module umd  || exit 1

echo 'Compiling tests'
node_modules/typescript/bin/tsc -p ./tests/tsconfig.tests.json || exit 1

echo 'Start tests'
node_modules/karma/bin/karma start tmp/tests/karma.conf.js || exit 1

sh scripts/clean.sh

echo '\nDONE'

exit 0
