/**
 * A Collection of Models
 * @param  Object require add dependencies
 * @return Object         Class Object
 */
define(function(require) {
    "use strict";
    
   	var LayerModel= require("models/LayerModel");

    var LayersCollection = Backbone.Collection.extend({
    	model: LayerModel,
    	url: "http://gisn.tel-aviv.gov.il/wsgis/service.asmx/GetLayersCodes",
        initialize: function(options){
            this.on("error", this.error, this);
            this.fetch({reset: true, parse: true});

        }, 
        sync: function(method, model, options) {
            Backbone.emulateHTTP = true; // set to true if server cannot handle HTTP PUT or HTTP DELETE
            Backbone.emulateJSON = true; // set to true if server cannot handle application/json requests      
            var methodMap = {
              'create': 'POST',
              'update': 'PUT',
              'patch':  'PATCH',
              'delete': 'DELETE',
              'read':   'GET'
            };
            var params = _.extend({
                type:         methodMap[method],
                xcontentType: 'application/xml',
                contentType:  'text/plain',
                dataType:     'xml',
                processData:  false
            }, options);
            return Backbone.sync(method, model, params);
        },
        parse: function(response) {
            var str= response.firstChild.innerHTML;
            return JSON.parse(str);
        },
        error: function (model, response, options) {
            console.log(model);
            console.log(response);
            console.log(options);
        }

    	

    });
   
    return LayersCollection; 
});