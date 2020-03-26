# gulp-typescript-jenkins-reporter
gulp-typescript pmd reporter, to be used by Jenkins (Hudson). Writes output to an xml file.

## Install
```bash
npm install gulp-typescript-jenkins-reporter -D
```

## Usage
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var reporter = require('gulp-typescript-jenkins-reporter').default;

gulp.task('compile', function() {
	return gulp.src('./src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}, {}, reporter()))
		.pipe(gulp.dest('./build'));
});
```

see [gulp-typescript](https://www.npmjs.com/package/gulp-typescript) for a detailed documentation on how to compile 
your project

## Advanced usage
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var reporter = require('gulp-typescript-jenkins-reporter').default;

gulp.task('compile', function() {
	return gulp.src('./src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}, {}, reporter({
		    filename: 'pmd-report.xml'
		    pathBase: '/workspace',
		    pathPrefix: 'project',
		    sort: false
		})))
		.pipe(gulp.dest('./build'));
});
```

## Options

**sort**  
type: `boolean`  
default: `false`  
will sort the files alphabetically within the report using their path.

**filename**  
type: `string`  
default: `pmd.xml`  
the filename to write the report.

**pathBase**  
type: `string`  
default: `''`  
If given, the path of the files will be rebased according to the value. For instance, if your file path is
```
/my/awesome/yet/too/long/path/for/my/file.ts
```
and that you set 
```javascript
{
    pathBase: '/path/for/my'
}
```
you will end up with
```
/my/file.ts
```

**pathPrefix**  
type: `string`  
default: `''`  
a prefix to add to the path. Given the previous example, you could also add this :
```javascript
{
    pathBase: '/path/for/my',
    pathPrefix: '/src'
}
```
and end up with
```
/src/file.ts
```

## LICENSE

The MIT License (MIT)
