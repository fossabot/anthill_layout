(function () {

    /**
     * Define public loader
     * @returns {boolean}
     * @private
     */
    function _loadPublic() {

        var script = document.getElementById('require-init'),
            dataset = script.dataset || {},
            site = dataset.resource,
            uuid = dataset.uuid,
            version = parseInt(dataset.version || 0, 10) || 1,
            user = dataset.user,
            mode = dataset.mode,
            environment = dataset.environment;

        /**
         * Define Setup
         * @returns Application
         * @private
         */
        function _setup() {

            require([

                'bootstrap',
                '_',

                'lz-string',
                'jquery.ujs',
                'jquery.resizestop',
                'jquery.zoomooz',

                'extends/function',
                'extends/json',
                'extends/event',
                'extends/string',
                'extends/array',

                'config/listeners',
                'config/permissions',

                'public/' + site + '/javascript/listeners',
                'public/' + site + '/javascript/permissions'

            ], function init() {

                require([
                    'config/application',
                    'public/' + site + '/javascript/config'
                ], function loadApplication(Application, config) {

                    $.extend(true, config, {
                        user: user,
                        uuid: uuid,
                        version: version,
                        environment: environment,
                        appName: site,
                        mode: mode,
                        isConsumption: mode === 'consumption'
                    });

                    /**
                     * Define application
                     * @type {Application}
                     */
                    return new Application({config: config});
                });
            });
        }

        require(['../scripts/core/config/main'], _setup);
    }

    _loadPublic();

})();