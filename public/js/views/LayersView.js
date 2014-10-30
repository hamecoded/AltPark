/**
 * View
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
    "use strict";

   	var template = require("text!templates/layers.html");
    var LayerView= require("views/LayerView");
    var LayerModel= require("models/LayerModel");


    var LayersView = Backbone.View.extend({
    	template: template,
    	events: {
            'click .layer': "showLayer"
    	},
    	initialize: function (options) {
            this.listenTo( this.collection, "reset", this.render);
        },
        /**
         * subsequently aim for this function to rebuild and override the entire DOM content for that view.
         * partial renders need be considered on a case by case basis 
         * @return {PostsListView} [description]
         */
        render: function (collection, options) {
            // DOM insert the ListView template
            var data= {layer:collection.toJSON()};
            var rendered = Mustache.to_html(this.template, data ); 
            this.$el.html(rendered); //detached DOM element
            
            

            return this;
        },
        
        showLayer: function (event) {
            console.log('LayersView:showLayer');
            var code= $(event.currentTarget).data('code');
            window.router.navigate("/layers/" + code, {trigger: true, replace: true});
        }
		

    });
   
    return LayersView; 
});