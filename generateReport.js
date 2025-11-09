const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

async function generateReport() {
    const jsonReport = await merge({
        files: ['cypress/reports/*.json'],
    });
    
    await generator.create(jsonReport, {
        reportDir: 'cypress/reports/html',
        overwrite: true,
        reportTitle: 'Sauce Demo Test Report',
    });
}

generateReport();