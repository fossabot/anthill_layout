(function () {

    var script = document.getElementById('require-init'),
        site = script.getAttribute('data-resource'),
        mode = script.getAttribute('data-mode');

    require(['../scripts/core/config/main'], function loadConfig() {

        require([
            'public/' + site + '/javascript/listeners',
            'public/' + site + '/javascript/permission'
        ], function loadGlobals() {

            require([
                'config/application'
            ], function init(App) {

                /**
                 * Define application
                 * @type {App}
                 */
                return new App({
                    config: {
                        html: {
                            container: 'body',
                            header: true
                        },
                        appName: site,
                        mode: mode
                    }
                });
            });
        });
    });
})();