// Gulp is a task runner, it helps you automate things!
// In this case, we're going to use it so it can automatically
// update your js files when you edit your TypeScript files!
// Read more about Gulp: http://gulpjs.com/
var gulp = require('gulp');
// This is a Gulp Plugin for TypeScript!
// It lets Gulp interface with TypeScript easily!
var typescript = require('gulp-tsc');

// The task for compiling your typescript source files and outputting them
gulp.task('compile-typescript', function() {
	var typescriptPaths = {
		src: [
			'source/scripts/*.ts',
			'source/scripts/host/*.ts',
			'source/scripts/os/*.ts'
		],
		dest: 'dist/scripts/'
	};

	return gulp.src(typescriptPaths.src)
        .pipe(typescript({
        	emitError: false
        }))
        .pipe(gulp.dest(typescriptPaths.dest));
});

// Task for copying over your css to the dist dir
// This really doesn't do much, but if you were to use a CSS preprocesser (LESS/SASS),
// then you would build your LESS/SASS files and then copy the CSS to the dist folder
// This is just to show good front-end web techniques
gulp.task('copy-css', function() {
	var cssPaths = {
		src: ['source/styles/*.css'],
		dest: 'dist/styles/'
	};

	return gulp.src(cssPaths.src)
		.pipe(gulp.dest(cssPaths.dest));
});

// This is the default task that will run when you run
// `gulp` at your command line!
gulp.task('default', function() {
	gulp.watch('source/scripts/*.ts', ['compile-typescript']);
	gulp.watch('source/scripts/host/*.ts', ['compile-typescript']);
	gulp.watch('source/scripts/os/*.ts', ['compile-typescript']);
	gulp.watch('source/styles/*.css', ['copy-css']);
});
