/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePremiereTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PremiereTv Preferences Element
     * @param view
     * @param opts
     * @returns {PremiereTvPreferencesElement}
     * @constructor
     * @class PremiereTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PremiereTvPreferencesElement = function PremiereTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PremiereTvPreferencesElement.extend('PremiereTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
