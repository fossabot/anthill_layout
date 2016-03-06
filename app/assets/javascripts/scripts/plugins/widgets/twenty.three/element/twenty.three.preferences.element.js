/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTwentyThreePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TwentyThree Preferences Element
     * @param view
     * @param opts
     * @returns {TwentyThreePreferencesElement}
     * @constructor
     * @class TwentyThreePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TwentyThreePreferencesElement = function TwentyThreePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwentyThreePreferencesElement.extend('TwentyThreePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
