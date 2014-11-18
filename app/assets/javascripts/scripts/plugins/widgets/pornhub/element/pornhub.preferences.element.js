/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePornhubPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Pornhub Preferences Element
     * @param view
     * @param opts
     * @returns {PornhubPreferencesElement}
     * @constructor
     * @class PornhubPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PornhubPreferencesElement = function PornhubPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PornhubPreferencesElement.extend('PornhubPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});