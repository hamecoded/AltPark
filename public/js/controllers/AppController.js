/**
 * App Router
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(["require",
    "models/LayerModel", "views/LayerView",
    "collections/LayersCollection", "views/LayersView"], 
	function (require, LayerModel, LayerView, LayersCollection, LayersView) {
    "use strict";

	
    var AppController = Backbone.Router.extend({
    	routes: {
    		"": "home",
            "layers(/)": "showLayers",
    		"layers/:code": "showLayer"
    	},
    	initialize: function(){

    	},
		// Handlers
		home: function(){
			this.navigate("/layers/970", {trigger: true, replace: true});
		},
        showLayers: function () {
            console.log("AppController:showLayers");
            var layersCollection= new LayersCollection();

            var layersView= new LayersView({
                el: "#main",
                collection: layersCollection
            });
        },
    	showLayer: function (code) {
    		console.log("AppController:showLayer");
			var layerModel = new LayerModel({code: code});
            var layerView = new LayerView({
                el: "#main",
                model: layerModel
            }); 
    	}

    });
			
   
    return AppController; 
});