/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineKickStarterController(PluginBase, WidgetContentController) {

    /**
     * Define kickstarter controller
     * @class KickStarterController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var KickStarterController = function KickStarterController() {
    };

    return KickStarterController.extend('KickStarterController', {

        /**
         * Set embedded content
         * @member KickStarterController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('kickstarterEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$kickstarter.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate kickstarter
         * @member KickStarterController
         * @param {string} embed
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(embed) {

            if (!embed) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            embed += '';

            if (embed.match(/^<iframe/)) {

                return $(embed).attr('src');

            } else {

                this.scope.logger.warn('Invalid KickStarter embed code');
                return false;
            }
        },

        /**
         * Add KickStarter rule
         * @member KickStarterController
         * @param e
         */
        addKickStarterRule: function addKickStarterRule(e) {

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