/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill'
], function defineBasePage(AntHill) {

    var BasePage = function BasePage() {

    };

    return BasePage.extend({

        /**
         * Create page layout
         * @param {Function} Layout
         * @param {{}} opts
         */
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts, this);
        },

        /**
         * Destroy layout
         */
        destroyLayout: function destroyLayout() {
            this.logger.info(
                'Destroy Layout',
                this.layout
            );
            delete this.layout;
        },

        /**
         * Get Layout
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.scope.layout;
        },

        /**
         * Update layout config
         */
        updateLayout: function updateLayout() {

            /**
             * Define scope
             * @type {*}
             */
            var layout = this.scope.layout;

            layout.observer.publish(
                layout.eventmanager.eventList.updateMinCellWidth
            );

            this.updateWidgetsConfig();
        },

        /**
         * Create template
         * @param {Function} Template
         * @param {{}} opts
         */
        createTemplate: function createTemplate(Template, opts) {

            /**
             * Define template instance
             * @type {Template}
             */
            this.template = new Template(opts, this);
        },

        /**
         * Destroy template
         */
        destroyTemplate: function destroyTemplate() {

            this.logger.info(
                this.i18n.t('destroy.template'),
                this.template
            );

            delete this.template;
        }

    }, AntHill.prototype);
});