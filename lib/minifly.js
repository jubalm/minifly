#! /usr/bin/env node

var command = require('commander'),
    path = require('path'),
    fs = require('fs'),
    pkg = require('../package.json'),
    minify = require('imagemin')();

// command-line
command
    .version(pkg.version)
    .option('-q, --quality [level]', 'specify quality of compression', app.quality)
    .parse(process.argv);

var mozjpeg = require('imagemin-mozjpeg'),
    defaults = {
        jpegQuality: 90
    };

// minification
minify
    .src('*.{gif,jpg,png,svg}')
    .dest('optimized')
    .use(mozjpeg({
        quality: (app.quality) ? app.quality : defaults.jpegQuality
    }))
    .use(pngquant({

    }))
    .run(function(err, files) {
        files.forEach(function(file) {
            fs.stat(file.path, function(err, stat) {
                console.log(path.basename(file.path) + ' - ' + stat.size + 'kb');
            });
        });
    });
