var gulp = require('gulp');
var lint = require('gulp-jshint');

// ----- lint
// ---------------------------------------
gulp.task('default', function() {
	return gulp.src('index.js')
		.pipe(lint('etc/.jshintrc'))
		.pipe(lint.reporter('jshint-stylish'));
});