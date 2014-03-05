/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

define([
    'config/anthill',
    'modules/controller'
], function definePluginControllerBase(AntHill, BaseController){

    /**
     * Define Plugin controller
     * @class PluginController
     * @constructor
     */
    var PluginController = function PluginController() {

    };

    PluginController.extend({

        /**
         * Get Workspace
         * @returns {*|Workspace}
         */
        getWorkspace: function getWorkspace() {
            return this.root().controller.getCurrentItem();
        },

        /**
         * Get Page
         * @returns {*|Page}
         */
        getPage: function getPage() {
            return this.getWorkspace().controller.getCurrentItem();
        },

        /**
         * Get Widget
         * @returns {*|Widget}
         */
        getWidget: function getWidget() {
            return this.getPage().controller.getCurrentItem();
        },

        /**
         * Check if data was existing
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {

            return this.base.lib.hash.isHashEmpty(
                this.scope.view.elements.content
            );
        },

        /**
         * Update translations
         */
        updateTranslations: function updateTranslations(data) {

            /**
             * Define this reference
             * @type {AntHill}
             */
            var plugin = this;

            require([data], function defineEnUs(EnUs){
                plugin.i18n.updateData(EnUs);
            });
        }

    }, AntHill.prototype, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = PluginController.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     */
    PluginController.prototype.successRendered = function successRendered(callback) {

        successRenderedSuper.bind(this)();

        if (typeof(callback) === 'function') {

            callback();

        } else {

            this.logger.warn('Undefined callback');
        }
    };

    return PluginController;
});