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
    'plugins/widgets/login/element/login.element',
    'plugins/widgets/login/element/login.preferences.element',
    'plugins/widgets/login/element/login.rules.element'
], function defineLoginView(BaseView, Header, Footer, LoginElement, LoginPreferencesElement, LoginRulesElement) {

    /**
     * Define view
     * @class LoginView
     * @extends BaseView
     * @constructor
     */
    var LoginView = function LoginView() {
    };

    return LoginView.extend('LoginView', {

        /**
         * Render login element
         * @member LoginView
         */
        renderLogin: function renderLogin() {

            this.header(Header, this.elements.$container);

            /**
             * Define $login
             * @type {LoginElement}
             */
            this.elements.$login = new LoginElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member LoginView
         * @returns {LoginPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Login Preferences Element
             * @type {LoginPreferencesElement}
             */
            this.elements.$preferences = new LoginPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member LoginView
         * @param widgetRules
         * @param contentRules
         * @returns {LoginRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Login Rules Element
             * @type {LoginRulesElement}
             */
            this.elements.$rules = new LoginRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render login
         * @member LoginView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLogin.bind(this)
            );
        }

    }, BaseView.prototype)

});