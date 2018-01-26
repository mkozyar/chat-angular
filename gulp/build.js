'use strict';

var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del'],
    lazy: true
});

gulp.task('partials', ['markups'], function () {
	return gulp.src([
		path.join(conf.paths.src, '/app/**/*.html'),
		path.join(conf.paths.tmp, '/serve/app/**/*.html')
	])
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe($.angularTemplatecache('templateCacheHtml.js', {
			module: 'chat',
			root: 'app'
		}))
		.pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var nothtmlFilter = $.filter('!*.html');
    var jsFilter = $.filter(['**/*.js', '!**/arbor*.js']);
    //var arborFilter = $.filter(['**/*', '!scripts/arbor.js']);
    var cssFilter = $.filter('**/*.css');
    var assets = $.useref;

    var temp = through.obj(function (file, enc, cb) {
        console.log(file);
        console.log( file.path);
        console.log( file.base);



       /* if (file.isBuffer()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
            return cb();
        }*/

        if (file.isStream()) {
            // define the streamer that will transform the content
            var streamer = prefixStream(prefixText);
            // catch errors from the streamer and emit a gulp plugin error
            streamer.on('error', this.emit.bind(this, 'error'));
            // start the transformation
            file.contents = file.contents.pipe(streamer);
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    });

	return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
		.pipe($.inject(partialsInjectFile, partialsInjectOptions))
		.pipe(assets())
		//.pipe(temp)
		.pipe(jsFilter)
		.pipe($.ngAnnotate({"showStack":true}).on('error',function(){
			console.log('ngAnnotate ERROR ' + JSON.stringify(arguments))
		}))
		// .pipe($.uglify({preserveComments: $.uglifySaveLicense,compress:false,mangle:false })).on('error', conf.errorHandler('Uglify'))

        .pipe($.rev())
		.pipe(jsFilter.restore())

		//.pipe(arborFilter.restore())
		.pipe(cssFilter)
		.pipe($.cssmin())

        .pipe($.rev())
		.pipe(cssFilter.restore())
		//.pipe(assets.restore())
		//.pipe($.useref())
		.pipe($.revReplace())
		.pipe(htmlFilter)
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(htmlFilter.restore())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
		.pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
	return gulp.src($.mainBowerFiles())
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/fonts/')));
});

gulp.task('other', function () {
	var fileFilter = $.filter(function (file) {
		return file.stat.isFile();
	});

	return gulp.src([
		path.join(conf.paths.src, '/**/*'),
		path.join('!' + conf.paths.src, '/**/*.{html,css,js,styl,jade}')
	])
		.pipe(fileFilter)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
	$.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['html', 'fonts', 'other']);
