/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/geolocation/element/geolocation.element',
    'plugins/widgets/geolocation/element/geolocation.preferences.element',
    'plugins/widgets/geolocation/element/geolocation.rules.element'
], function defineGeolocationView(BaseView, Header, Footer, GeolocationElement, GeolocationPreferencesElement, GeolocationRulesElement) {

    /**
     * Define view
     * @class GeolocationView
     * @extends BaseView
     * @constructor
     */
    var GeolocationView = function GeolocationView() {
    };

    return GeolocationView.extend('GeolocationView', {

        /**
         * Render geolocation element
         * @memberOf GeolocationView
         */
        renderGeolocation: function renderGeolocation() {

            this.header(Header, this.get$container());

            /**
             * Define $geolocation
             * @type {GeolocationElement}
             */
            this.elements.$geolocation = new GeolocationElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.showPosition();
        },

        /**
         * Render Prefs
         * @memberOf GeolocationView
         * @returns {GeolocationPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Geolocation Preferences Element
             * @type {GeolocationPreferencesElement}
             */
            this.elements.$preferences = new GeolocationPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf GeolocationView
         * @param widgetRules
         * @param contentRules
         * @returns {GeolocationRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Geolocation Rules Element
             * @type {GeolocationRulesElement}
             */
            this.elements.$rules = new GeolocationRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Show position
         * @memberOf GeolocationView
         */
        showPosition: function showPosition() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render geolocation
         * @memberOf GeolocationView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGeolocation.bind(this)
            );
        }

    }, BaseView.prototype)

});