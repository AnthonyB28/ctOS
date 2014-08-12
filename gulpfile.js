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
	return gulp.src([
			'source/scripts/*.ts',
			'source/scripts/host/*.ts',
			'source/scripts/os/*.ts'
		])
        .pipe(typescript({
        	emitError: false
        }))
        .pipe(gulp.dest('dist/scripts/'));
});

// This is the default task that will run when you run
// `gulp` at your command line!
gulp.task('default', function() {
	gulp.watch('source/scripts/*.ts', ['compile-typescript']);
	gulp.watch('source/scripts/host/*.ts', ['compile-typescript']);
	gulp.watch('source/scripts/os/*.ts', ['compile-typescript']);
});
