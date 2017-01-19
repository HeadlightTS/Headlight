/// <reference path="../typings/index.d.ts" />

module.exports = function(config: any): void {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['commonjs', 'mocha', 'chai', 'chai-as-promised'],

        // list of files / patterns to load in the browser
        files: [
            //'../../node_modules/phantomjs-polyfill/bind-polyfill.js',
            '../../node_modules/tslib/tslib.js',
            '../**/*.js'
        ],

        // list of files to exclude
        exclude: [
            '../../src/**/*.d.ts'   
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../src/**/*.js': ['coverage'],
            '../**/*.js': ['commonjs']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,

        coverageReporter: {
            reporters: [{
                type: 'json',
                subdir: '../../',
                file: 'coverage.json'
            }],
            check: {
                global: {
                statements: 100,
                lines: 100,
                functions: 100,
                branches: 100
                }
            }
        },

        remapIstanbulReporter: {
            src: 'tmp/coverage.json',
            reports: {
                html: 'coverage'
            },
            timeoutNotCreated: 3000,
            timeoutNoMoreFiles: 3000
        },

        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'bdd'
            }
        }
    });
};
