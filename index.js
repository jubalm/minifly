#!/usr/bin/env node

var
  command = require('commander'),
  pkg = require('./package.json'),
  imagemin = require('gulp-imagemin'),
  vfs = require('vinyl-fs'),
  mozjpeg = require('imagemin-mozjpeg'),
  defaults = {
    source: ['*.png', '*.jpg', '*.jpeg', '*.svg', '*.gif'],
    destination: 'optimized',
    jpegQuality: 90
  };

// Command-line
command
  .version(pkg.version)
  .option('-q, --quality [level]', 'specify quality of compression', command.quality)
  .option('-s, --source [path]', 'specify the source path', command.source)
  .option('-d, --destination [path]', 'specify the destination path', command.destination)
  .parse(process.argv);

var read = vfs.src(command.source || defaults.source);

read
  .pipe(imagemin({
    verbose: true,
    use: [mozjpeg({ quality: defaults.jpegQuality })]
  }))
  .pipe(vfs.dest(command.destination || defaults.destination));
