const fs = require('fs');

const DIR = 'coverage';

const file = `${DIR}/${fs.readdirSync(DIR)[0]}/coverage.json`;
const result = JSON.parse(fs.readFileSync(file).toString());

['lines', 'statements', 'functions', 'branches'].forEach(function(item) {
    if (result.total[item].pct < 100) {
        process.exit(1);
    }
});

process.exit();
