const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env');
module.exports = {
    plugins: [
        autoprefixer,
        presetEnv(), 
        cssnano({
            preset: 'default'
        })
    ]
};

