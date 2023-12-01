// postcss.config.js

// Подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // Подключите плагины к PostCSS
  plugins: [
    // Подключите autoprefixer
    autoprefixer,
    // Cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
