/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLifestreamPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Lifestream Preferences Element
     * @param view
     * @param opts
     * @returns {LifestreamPreferencesElement}
     * @constructor
     * @class LifestreamPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var LifestreamPreferencesElement = function LifestreamPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LifestreamPreferencesElement.extend('LifestreamPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
