/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineWorkspaceController(BaseController) {

    /**
     * Define workspace controller
     * @class Controller
     * @extends BaseController
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {

        /**
         * Set page height
         * @member Controller
         */
        setPageContainerHeight: function setPageContainerHeight() {
            this.view.elements.$pages.defineHeight();
        }

    }, BaseController.prototype);
});