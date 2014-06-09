define([
    'config/anthill'
], function defineSetting(AntHill) {

    /**
     * Define Setting
     * @class Setting
     * @param {*} scope
     * @param {String} name
     * @constructor
     * @extends AntHill
     */
    var Setting = function Setting(scope, name) {

        /**
         * Define scope
         * @member Setting
         * @type {*}
         */
        this.scope = scope;

        /**
         * Define setting mode
         * @member Setting
         * @type {String}
         */
        this.mode = this.scope.controller.getMode();

        /**
         * Define storage modes
         * @member Setting
         * @type {{localStorage: Storage}}
         */
        this.STORAGE_MODES = {
            localStorage: window.localStorage
        };
        /**
         * Define setting storage
         * @member Setting
         * @type {{development: Storage}}
         */
        this.storage = {
            development: this.STORAGE_MODES.localStorage,
            authorize: this.STORAGE_MODES.localStorage,
            consumption: this.STORAGE_MODES.localStorage,
            test: this.STORAGE_MODES.localStorage
        };

        /**
         * Get storage namespace
         * @member Setting
         * @returns {String}
         */
        this.getNameSpace = function getNameSpace() {
            return name;
        };

        this.init();
    };

    return Setting.extend('Setting', {

        /**
         * Init storage
         * @memberOf Setting
         */
        init: function init() {

            /**
             * Load storage
             * @type {*}
             */
            var storage = this.load();

            /**
             * Define base
             * @type {*}
             */
            var base = this.base;

            if (!base.isDefined(storage)) {

                this.save();

                /**
                 * Init storage
                 * @type {*}
                 */
                storage = this.load();
            }

            if (!base.isDefined(storage.token)) {

                /**
                 * Define token
                 * @member Setting
                 * @type {String}
                 */
                this.token = base.lib.generator.UUID();

                this.save(storage);
            }
        },

        /**
         * Clear local storage
         * @member Setting
         */
        clear: function clear() {
            window.localStorage.clear();
        },

        /**
         * Get Storage
         * @member Setting
         * @returns {*}
         */
        getStorage: function getStorage() {
            return this.storage[this.mode];
        },

        /**
         * Import data
         * @param data
         */
        importData: function importData(data) {

            /**
             * Set data
             * @type {*}
             */
            this.getStorage()[this.getNameSpace()] = JSON.stringify(data);
        },

        /**
         * Save
         * @member Setting
         * @param [opts]
         */
        save: function save(opts) {

            /**
             * Init opts
             * @type {*}
             */
            opts = this.base.define(opts, {}, true);

            var data = this.load(),
                _dt = this.base.lib.datetime;

            if (this.base.isDefined(data)) {

                /**
                 * Load created at
                 * @type {*}
                 */
                opts.createdAt = data.createdAt;

            } else {

                /**
                 * Define created at
                 * @type {*}
                 */
                opts.createdAt = _dt.timestamp();
            }

            /**
             * Define updated at
             * @type {*}
             */
            opts.updatedAt = _dt.timestamp();

            /**
             * Define token
             * @type {*}
             */
            opts.token = this.token;

            this.getStorage().setItem(
                this.getNameSpace(),
                LZString.compress(
                    JSON.stringify(opts)
                )
            );

            this.scope.logger.debug('Save', opts);
        },

        /**
         * Load
         * @member Setting
         */
        load: function load() {

            /**
             * Define data
             * @type {*}
             */
            var data = JSON.parse(
                LZString.decompress(
                    this.getStorage().getItem(
                        this.getNameSpace()
                    )
                ) || '[]'
            );

            this.scope.logger.debug('Load', data);

            return data;
        }

    }, AntHill.prototype);
});