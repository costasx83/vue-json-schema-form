/**
 * Created by Liu.Jun on 2018/5/31.
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const envConfig = require('./envConfig');

// Get intersection of n arrays
// const arrayIntersection = (...arg) => {
//     arg.reduce((previousValue, currentValue) => previousValue.filter(v => currentValue.includes(v)), arg[0]);
// };

// Check if this is a current entry
const isEntry = (filePath, curDir) => {
    // Folders to ignore
    const exclude = ['/template/', '/component/', '/components/', '/module/', '/modules/'];

    // Same name - check if last folder name equals filename
    const isSame = (path.dirname(filePath).split('/').pop() === path.basename(filePath).split('.')[0]);

    // Exclude special folders
    const isEntryFile = isSame && exclude.every(exStr => !filePath.includes(exStr));

    if (isEntryFile && curDir.length > 0) {
        // Include path
        return curDir.some(dirItem => ~filePath.indexOf(dirItem));
    }
    return isEntryFile;
};

// Default template file
const defaultTemp = path.resolve(__dirname, '../default.html');

function entryFn({ dir, chunks = [] }) {
    // Entry file relative directory
    const dirPath = path.normalize(path.resolve(__dirname, '../src/pages'));

    // Entry file
    const filePath = path.normalize(path.resolve(__dirname, '../src/pages/**/*.js'));

    const temFiles = glob.sync(filePath);
    const curDir = dir ? String(dir).split(',') : [];

    // isEntry + non-component for folder exclusion
    const files = temFiles.filter(v => isEntry(v, curDir));

    let openPage = null;
    const entries = files.reduce((preValue, entry, index) => {
        const dirName = path.normalize(path.dirname(entry));
        const entryName = dirName.substring(path.normalize(dirPath).length + 1).replace(/\\/g, '/');

        // const fileName = path.basename(entry, path.extname(entry));

        // First entry is the default browser page
        if (index === 0) openPage = `${entryName}.html`;

        preValue[entryName] = {
            entry,
            template: fs.existsSync(entry.replace('.js', '.html')) ? entry.replace('.js', '.html') : defaultTemp,
            filename: `${entryName}.html`,
            title: `${entryName} - Test Demo`,
            chunks: [
                entryName,
                ...chunks
            ]
            // chunks to include on this pages, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-runtime', 'chunk-vendors-polyfill', 'index']
        };
        return preValue;
    }, {});

    return {
        entries,
        openPage
    };
}

module.exports = ({
    chunks = []
} = {}) => {
    // Relative to root directory
    const {
        dir, // Specify compile directory
    } = envConfig.getConfig();

    return entryFn({
        dir,
        chunks
    });
};
