/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSublimeVideoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SublimeVideo Preferences Element
     * @param view
     * @param opts
     * @returns {SublimeVideoPreferencesElement}
     * @constructor
     * @class SublimeVideoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SublimeVideoPreferencesElement = function SublimeVideoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SublimeVideoPreferencesElement.extend('SublimeVideoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
