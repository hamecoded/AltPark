require(["js/require.config"], function (baseConfig) {
    "use strict";
    //debugger; //jshint ignore:line

    //common requires to be loaded now that the require paths have been set
    require(["require", "backbone", "marionette", "mustache", "bootstrap"], 
        function(require, backbone, marionette, mustache){
        window.Mustache = mustache; //http://stackoverflow.com/questions/16556419/requirejs-not-loading-mustache-window-object


        //app specific require
        require(["controllers/AppController", "controllers/GoogleAPI"], function (AppController) {
            window.router = new AppController();

            Backbone.history.start({pushState: true});
            /**
             * incase the Browser supports pushState then disable anchors-inks default browser server-calls
             * so they'll be handled on the client side only.
             * http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
             * https://gist.github.com/tbranyen/1142129
             * @param  {[type]} evt [description]
             * @return {[type]}     [description]
             */
            if (Backbone.history && Backbone.history._hasPushState) {
                $(document).on('click', 'a:not([data-bypass])', function (evt) {
                    var href = $(this).attr('href');
                    var protocol = this.protocol + '//';
                    //TODO: replace hash calls with absolute path
                    if (href.slice(protocol.length) !== protocol) {
                      evt.preventDefault();
                      router.navigate(href, true);
                    }
                });
            }    

        });
        
    });
});