const fs = require('fs');

const DIR = 'coverage';
const TO_CHECK = ['lines', 'statements', 'functions', 'branches'];
let status = 0;

fs.readdirSync(DIR).forEach(function (subdir) {
    const result = JSON.parse(fs.readFileSync(`${DIR}/${subdir}/coverage.json`).toString());

    TO_CHECK.forEach(function(item) {
        if (result.total[item].pct < 100) {
            console.error(subdir, ':', item, 'coverage is', `${result.total[item].pct}%`);
            status = 1;
        }
    });
});

process.exit(status);
