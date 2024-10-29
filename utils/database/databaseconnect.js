const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.json');

module.exports = {
    readData() {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    },

    saveData(data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};
