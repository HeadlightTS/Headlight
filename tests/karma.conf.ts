module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai', 'chai-as-promised', 'karma-typescript'],
        files: [
            '../src/**/*.ts', 
            '../tests/**/*.test.ts',
            '../node_modules/tslib/tslib.js',
        ],
        preprocessors: {
            '../**/*.ts': ['karma-typescript'], 
        },
        reporters: ['progress', 'karma-typescript'],
        browsers: ['Chrome'],
        singleRun: true,
        karmaTypescriptConfig: {
            tsconfig: '../tests/tsconfig.tests.json',
            reports: {
                html: 'coverage',
                'json-summary': {
                    directory: 'coverage',
                    filename: 'coverage.json'
                },
                'text-summary': ''
            }
        },
        customLaunchers: {  
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    });

    if ((<any>process.env).TRAVIS) {  
        config.browsers = ['Chrome_travis_ci', 'Firefox'];
    }
};
