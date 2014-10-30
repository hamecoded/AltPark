/**
 * View
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
    "use strict";

   	var template = require( "text!templates/layer.html");

    var LayerView = Backbone.View.extend({
    	template: template,
    	events: {
            'change #end': "changeEnd"
    	},
    	initialize: function (options) {
            this.listenTo(this.model, "change", this.render);
            this.model.fetch({reset: true});

            
    	},
    	render: function() {
    		var rendered = Mustache.to_html(this.template, this.model.toJSON()); 
			this.$el.html(rendered); //detached DOM element

			return this;
		},
        changeEnd: function(event){
            var destination= event.currentTarget.value;
            GoogleAPI.calc({destination: destination});
        }
		

    });
   
    return LayerView; 
});