require.config({
    "paths":{
        // Libraries
        // ---------
        "vendor": "./bower_components",
        
        "underscore": "./bower_components/underscore/underscore",
        "jquery": "./bower_components/jquery/dist/jquery.min",
        "bootstrap": "./bower_components/bootstrap/dist/js/bootstrap.min", //non-amd
        "mustache": "./bower_components/mustache/mustache",
        
        "backbone": "./bower_components/backbone/backbone", //fully amd
        //"backbone.wreqr": "./bower_components/backbone.wreqr/lib/backbone.wreqr.min", //kept for the backbone only example
        //"backbone.babysitter": "./bower_components/backbone.babysitter/lib/backbone.babysitter.min",

        "marionette": "./bower_components/marionette/lib/backbone.marionette.min", //already includes wreqr and babysitter

        // Require Modules to be used as pragmas
        // ---------
        "text": "./bower_components/requirejs-text/text",

        // Backbone Folder Structure
        // -------------------
        "models": "js/models",
        "collections": "js/collections",
        "controllers": "js/controllers",
        "views": "js/views",
        "templates": "templates"
    },
    "shim":{
        //Globally exposed variables:
        //$ jQuery Backbone _ Marionette
        //unexposed globally variables:
        //mustache(need exposing inorder to be used) 
        //bootstrap(built ontop of $)
        "backbone":{
            "deps":[
                "underscore",
                "mustache",
                "text"
            ]
        },
        // "backbone.wreqr":{
        //     "deps": ["backbone"]
        // },
        // "backbone.babysitter":{
        //     "deps": ["backbone"]
        // },
        "marionette":{
            "deps":[
                "backbone"
            ]
        },
        "bootstrap":{
            "deps":["jquery"]
        }

    }
});