# Grunt-Template-Builder
 Simple Grunt configuration for a template builder, using partial component template 

## How to use
1 ) `git clone https://github.com/shayanypn/grunt-template-builder.git`
2 ) `npm install`
3 ) `bower install`

now your engine is ready

`app`  your partial template and pages located here
`dist` your final pages build in here

you can change these option by changing 

	// Gruntfile.js
	let CONFIG={
		dir_temp: 'tmp/',
		// path to your pages
		dir_templates: 'app/templates/',
		// first project
		APP:{
			css: 'app/css/*.css',
			js: 'app/js/*.js',
		},
		//final build teamplate
		DIST:{
			css: 'dist/assets/app.css',
			js: 'dist/assets/app.js'
		}
	};

Let create a page and call it `home`.
	
	// app/templates/home.html
	<!-- {{partials/header}} -->

	<!-- {{nav/fixed}} -->

	<!-- {{table/default}} -->

	<!-- {{partials/footer}} -->

and
 
    // app/template/partials/header.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="utf-8">
    	<title>Theme Template for Bootstrap</title>
    	<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css" />
    
    	<!-- this replace with link of style -->  
    	<!-- {{script-header}} -->  
    </head>
    <body>
and
	
    // app/template/partials/footer.html
        <script src="~/jquery.min.js"></script>
        <script src="~/bootstrap.min.js"></script>
        <!-- bellow replace with your custom js code -->
        <!-- {{script-footer}} -->
    </body>
    </html>


