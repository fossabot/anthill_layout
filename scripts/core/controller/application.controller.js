/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineApplicationController(BaseController) {

    /**
     * Define application controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Define setting
         */
        defineSetting: function defineSetting() {
            this.model.defineSetting();
        },

        /**
         * Init window resize
         */
        initResizeWindow: function initResizeWindow() {
            this.logger.debug('Init window resize');

            var callback = this.controller.resizeWindowPublisher.
                bind(this).debounce();

            window.attachEvent ?
                window.attachEvent('onresize', callback) :
                window.addEventListener('resize', callback);
        },

        /**
         * Resize window publisher
         */
        resizeWindowPublisher: function resizeWindowPublisher(e) {

            this.observer.publish(
                this.eventmanager.eventList.resizeWindow
            );
        },

        /**
         * Resize window callback
         */
        resizeWindow: function resizeWindow() {
            this.logger.debug('Start resize window');
            this.model.setConfig('isResized', true);

            this.observer.publish(
                this.eventmanager.eventList.resizeWindowHooks
            );
        },

        /**
         * Resize window hooks
         */
        resizeWindowHooks: function resizeWindowHooks() {
            this.logger.debug('Start resize window hooks', arguments);
        },

        /**
         * Approve clear data
         */
        approveClearData: function approveClearData() {

            /**
             * Define setting
             * @type {config.setting}
             */
            var setting = this.scope.model.setting,
                $modal = this.scope.view.elements.$modal;

            setting.clear();

            this.scope.logger.warn('localStorage', setting.getStorage());

            if (anthill.base.isDefined($modal)) {
                $modal.selfDestroy();
            }
        }

    }, BaseController.prototype);

});