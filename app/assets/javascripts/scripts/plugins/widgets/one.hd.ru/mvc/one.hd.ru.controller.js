/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineOneHdRuController(PluginBase, WidgetContentController) {

    /**
     * Define onehdru controller
     * @class OneHdRuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OneHdRuController = function OneHdRuController() {
    };

    return OneHdRuController.extend('OneHdRuController', {

        /**
         * Set embedded content
         * @member OneHdRuController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$onehdru.renderEmbeddedContent(
                this.model.getPrefs('onehdruEmbedCode')
            );
        },

        /**
         * Add OneHdRu rule
         * @member OneHdRuController
         * @param e
         */
        addOneHdRuRule: function addOneHdRuRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});