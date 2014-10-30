define(function(require) {
    "use strict";

    var LayerModel = Backbone.Model.extend({
        defaults: {
            "displayFieldName": "",
            "fieldAliases": {
                "oid_hof": "",
                "rowid": "",
                "code_achoza": "",
                "ControllerID": "",
                "shem_chenyon": "",
                "ktovet": "",
                "lon": "",
                "lat": "",
                "taarif_yom": "",
                "chalon_taarif_yom": "",
                "taarif_layla": "",
                "chalon_zman_taarif_layla": "",
                "taarif_yomi": "",
                "chalon_zman_taarif_yomi": "",
                "taarif_yom_manuy_chodshi": "",
                "chalon_zman_yom_taarif_yomi": "",
                "taarif_layla_manuy_chodshi": "",
                "chalon_zman_layal_taarif_yomi": "",
                "hearot_taarif": "",
                "chalon_zman_chenyon_patoach": "",
                "mispar_mekomot_bchenyon": "",
                "mispar_mekomot_manuy_bchenyon": "",
                "status_chenyon": "",
                "tr_status_chenyon": "",
                "y": "",
                "x": "",
                "date_import": ""
            },
            "geometryType": "",
            "spatialReference": {
                "wkid": 0
            },
            "fields": [{
                "name": "",
                "type": "",
                "alias": ""
            }],
            "features": [{
                "attributes": {
                    "oid_hof": 0,
                    "rowid": 0,
                    "code_achoza": 0,
                    "ControllerID": 0,
                    "shem_chenyon": "",
                    "ktovet": "",
                    "lon": 0,
                    "lat": 0,
                    "taarif_yom": "",
                    "chalon_taarif_yom": "",
                    "taarif_layla": "",
                    "chalon_zman_taarif_layla": "",
                    "taarif_yomi": "",
                    "chalon_zman_taarif_yomi": "",
                    "taarif_yom_manuy_chodshi": "",
                    "chalon_zman_yom_taarif_yomi": "",
                    "taarif_layla_manuy_chodshi": "",
                    "chalon_zman_layal_taarif_yomi": "",
                    "hearot_taarif": "",
                    "chalon_zman_chenyon_patoach": "",
                    "mispar_mekomot_bchenyon": 0,
                    "mispar_mekomot_manuy_bchenyon": 0,
                    "status_chenyon": "",
                    "tr_status_chenyon": 0,
                    "y": 0,
                    "x": 0,
                    "date_import": ""
                },
                "geometry": {
                    "x": 0,
                    "y": 0
                }
            }]
        },
        params: {
            layerCode: null,
            layerWhere: null,
            xmin: null,
            ymin: null,
            xmax: null,
            ymax: null,
            projection: null
        },
        urlRoot: "http://gisn.tel-aviv.gov.il/wsgis/service.asmx/GetLayer",
        url : function(){
            var url = this.urlRoot;
            url += "?layerCode=" + this.params.layerCode + "&layerWhere=&xmin=&ymin=&xmax=&ymax=&projection=";
            return url;
        },
        initialize: function(options) {
            this.params.layerCode = options.code;
            this.on("error", this.error, this);
        },
        sync: function(method, model, options) {
            Backbone.emulateHTTP = true; // set to true if server cannot handle HTTP PUT or HTTP DELETE
            Backbone.emulateJSON = true; // set to true if server cannot handle application/json requests      
            var methodMap = {
                'create': 'POST',
                'update': 'PUT',
                'patch': 'PATCH',
                'delete': 'DELETE',
                'read': 'GET'
            };
            var params = _.extend({
                type: methodMap[method],
                contentType: 'text/plain',
                dataType: 'xml',
                processData: false
            }, options);
            return Backbone.sync(method, model, params);
        },
        parse: function(response) {
            if(_.has(response,"firstChild")){
                var origin,tmp= response.firstChild.innerHTML;
                tmp= JSON.parse(tmp);
                return tmp;
            }else{
                return response;
            }
        },
        getParkingsDirections: function(){
            //defered call to Google API
            var features= this.get('features');
            for(var i=0; i < features.length; i++){
                var lat= features[i].attributes.lat;
                var lon= features[i].attributes.lon;
                var destination= lat + "," + lon;
                GoogleAPI.calc({destination: destination});
                return;
            }
        },
        loadDestination: function(destination){

        },
        error: function(model, response, options) {
            console.log(model);
            console.log(response);
            console.log(options);
        }
       


    });

return LayerModel;
});
