'use strict';

module.exports = function(grunt) {
	
	/**
	 * Use built-in Node module (matchdep) to dynamically match & load package dependencies
	 * https://github.com/tkellen/js-matchdep
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	/**
	 * Set project info
	 */
	var project = {
		imagePath: 'img/',
		sassPath: 'stylesheets/',
		cssPath: 'stylesheets/',
		jsPath: 'js/',
		minCss: 'css/styles.min.css',
		watchFiles: ['stylesheets/*', 'js/*'],
		configFiles: ['Gruntfile.js']
	};
	
	var LIVERELOAD_PORT = 1337;

	grunt.initConfig({
		
		/**
		 * Load package info variables from package.json
		 */
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * Project banner
		 * Dynamically appended to CSS/JS files
		 * Inherits text from package.json
		 */
		tag: {
			banner: '/*!\n' +
							' * <%= pkg.name %>\n' +
							' * <%= pkg.url %>\n' +
							' * @author <%= pkg.author %>\n' +
							' * @version <%= pkg.version %>\n' +
							' * <%= pkg.license %> licensed.\n' +
							' */\n'
		},
		
		/**
		 * Configuring Grunt tasks
		 * http://gruntjs.com/configuring-tasks
		 */
		 
		/** 
		 * Local server via grunt-contrib-connect package
		 */
		connect: {
			server: {
				options: {
					port: LIVERELOAD_PORT,
					hostname: 'localhost'
				}
			}
		},
		
		sass: {
			development: {
				options: {
				},
				expand: true,
				cwd: project.sassPath,
				src: "*.less",
				dest: project.cssPath,
				ext: ".css",
			}
		},
		
		cssmin: {
			production: {
				files: {
					"<%= project.minCss %>" : ["css/*.css", "!<%= project.minCss %>"]
				}
			}
		},
		
		watch: {
			options: {
				livereload: LIVERELOAD_PORT
			},
			// Enables grunt watch to reload upon config file changes
			configFiles: {
				files: project.configFiles,
				options: {
					reload: true
				}
			},
			src: {
				files: project.watchFiles,
				tasks: ['default']
			}
		}
	});
	
	/**
	 * Manual way of loading plugins
	 * Remember to add these plugins to devDependencies in package.json
	 */
	/*
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	*/
	
	/**
	 * Create/Define grunt tasks commands to run
	 *
	 * Register task specific command
	 *	grunt.registerTask('development', ['sass:development']);
	 * To run it:
	 *	> grunt development
	 *
	 * http://gruntjs.com/creating-tasks
	 */
	grunt.registerTask('default', [
			'sass'
	]);
	
	grunt.registerTask('server', [
			'connect',
			'watch'
	]);
	
	grunt.registerTask('release', [
			'sass', 
			'cssmin:production'
	]);
	
	/**
	 * Add custom logic to a grunt task
	 */
	/*
	grunt.event.on('watch', function(action, filepath) {
		grunt.log.writeln(filepath + ' has been ' + action);
	});
	*/
};