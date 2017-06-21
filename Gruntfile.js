module.exports = function(grunt) {
	let CONFIG={
		dir_temp: 'tmp/',
		dir_templates: 'app/templates/',
		APP:{
			css: 'app/css/*.css',
			js: 'app/js/*.js',
		},
		DIST:{
			css: 'dist/assets/app.css',
			js: 'dist/assets/app.js'
		}
	};



	function _replacor(path , match, p1){
		try{
			file = grunt.file.read( CONFIG.dir_templates + p1 + '.html');
		}catch( e ){

		}

		return file;
	}
	
	grunt.initConfig({
		concat: {
			options: {
				stripBanners: true,
				keepSpecialComments: 0,
				separator: '\r\n',
			},
			js_app: {
				src: CONFIG.APP.js,
				dest: CONFIG.DIST.js,
			},
			css_app: {
				src: CONFIG.APP.css,
				dest: CONFIG.DIST.css,
			}
		},
		'string-replace': {
			tmp:{
				files: [{
					expand: true,
					cwd: CONFIG.dir_templates,
					src: '*.html',
					dest: 'tmp/stringReplace/'
				}],
				options: {
					replacements: [{
						pattern: /<!-- {{(.*?)}} -->/ig,
						replacement: function(match, p1) {
							return _replacor(CONFIG.dir_templates , match, p1);
						}
					},{
						pattern: '<!-- {{script-header}} -->',
						replacement: '<link href="assets/app.css" rel="stylesheet">'
					},{
						pattern: '<!-- {{script-footer}} -->',
						replacement: '<script src="assets/app.js"></script>'
					}]
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'tmp/stringReplace/',
					src: '*.html',
					dest: 'dist/'
				}],
				options: {
					replacements: [{
						pattern: /<!-- {{(.*?)}} -->/ig,
						replacement: function(match, p1) {
							return _replacor(CONFIG.dir_templates , match, p1);
						}
					},{
						pattern: '<!-- {{script-header}} -->',
						replacement: '<link href="assets/app.css" rel="stylesheet">'
					},{
						pattern: '<!-- {{script-footer}} -->',
						replacement: '<script src="assets/app.js"></script>'
					}]
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true,cwd: 'app/images/' , src: '**', dest: 'dist/images/'},
					{expand: true,cwd: 'app/fonts/' , src: '**', dest: 'dist/fonts/'},
				]
			}
		},
		watch: {
			css_app: {
				files: [CONFIG.APP.css],
				tasks: ['concat:css_app']
			},
			js_app: {
				files: [CONFIG.APP.js],
				tasks: ['concat:js_app']
			},
			assets:{
				files: ['app/images/**/**','app/fonts/**/**'],
				tasks: ['copy']
			},
			template:{
				files: [CONFIG.dir_templates + '**/*.html'],
				tasks: ['string-replace:tmp','string-replace:dist']
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'concat',
		'string-replace:tmp',
		'string-replace:dist',
		'copy',
		'watch'
	]);
};
