const fs = require('fs');

const writeJsonObj = async(obj, filename) => {
    const str = JSON.stringify(obj, null, 4);
    fs.writeFile(filename, str, (err) => {
        if (err) {
            throw err;
        }
    });    
}

module.exports = {
    writeJsonObj
};