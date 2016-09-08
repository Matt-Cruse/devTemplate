var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),	
	browserSync = require('browser-sync').create(),
	pump = require('pump'),
	rename = require('gulp-rename'),
	bulkSass = require('gulp-sass-bulk-import'),
	sourcemaps = require('gulp-sourcemaps');
	
var config = {
    /*bootstrapDir: './node_modules/bootstrap-sass',*/
	bootstrapDir: 'D:/Dropbox/working files/fish-dev.net/node_modules/bootstrap-sass',
    publicDir: './dist'
};
	
gulp.task('sassdev', function(){
	return gulp.src('css/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: [config.bootstrapDir + '/assets/stylesheets']
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({
		stream: true
    }))
});	
	
gulp.task('sassdist', function(){
	return gulp.src('css/sass/*.scss')
	.pipe(sass({
		includePaths: [config.bootstrapDir + '/assets/stylesheets'],
		outputStyle: 'compressed'
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(config.publicDir + '/css'))
});

gulp.task('jsdist', function() {
    return gulp.src('js/*.js')
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

/*PROXY E.G. localhost/fish-dev/opportunity-nottingham/website/build_v2/*/	

gulp.task('browserSync', function() {
	browserSync.init({
		/*server: {
			baseDir: './'
		},*/
		/*browser: ["google chrome", "firefox", "iexplore"],*/			
		/*proxy: ""*/
	})
})

gulp.task('watch', ['browserSync', 'sassdev'], function (){
	gulp.watch('css/sass/**/*.scss', ['sassdev']); 	
})

gulp.task('dev', ['sassdev'], function (){})
gulp.task('dist', ['sassdist', 'jsdist'], function (){})