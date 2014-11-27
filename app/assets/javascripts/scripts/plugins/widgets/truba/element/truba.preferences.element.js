/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTrubaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Truba Preferences Element
     * @param view
     * @param opts
     * @returns {TrubaPreferencesElement}
     * @constructor
     * @class TrubaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TrubaPreferencesElement = function TrubaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TrubaPreferencesElement.extend('TrubaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
