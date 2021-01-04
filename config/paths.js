const path = require('path')

module.exports = {
  // Source files
  // Исходники
  src: path.resolve(__dirname, '../src'),

  // Production build files
  // Директория для файлов сборки
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  // Статические файлы, которые будут скопированы в директорию для файлов сборки
  static: path.resolve(__dirname, '../src/assets/static')
}
