define(function defineBaseConfig() {

    requirejs.config({

        baseUrl: '../../scripts/core',

        paths: {
            // Define public application path
            'public': '../../public',

            config: 'config',

            api: 'api',

            controller: 'controller',
            model: 'model',
            view: 'view',

            event: 'event',
            permission: 'permission',

            'extends': 'lib/extends',
            modules: 'lib/modules',

            test: 'test',

            jquery: 'lib/jquery/jquery-2.0.3.min',
            jqueryui: 'lib/jquery/jquery-ui-1.10.3.custom.min'
        },

        shim: {
            jqueryui: {deps: ['jquery']},
            'extends/function': {deps: ['jquery']},
            'extends/string': {deps: ['jquery']},
            'extends/array': {deps: ['jquery']}
        }

    });

});