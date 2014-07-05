/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePostToolController(PluginBase, WidgetContentController) {

    /**
     * Define post.tool controller
     * @class PostToolController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PostToolController = function PostToolController() {
    };

    return PostToolController.extend('PostToolController', {

        /**
         * Set embedded content
         * @member PostToolController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$posttool.renderEmbeddedContent();
        },

        /**
         * Add PostTool rule
         * @member PostToolController
         * @param e
         */
        addPostToolRule: function addPostToolRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});