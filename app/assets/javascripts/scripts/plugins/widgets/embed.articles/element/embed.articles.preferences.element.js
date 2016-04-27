/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEmbedArticlesPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define EmbedArticles Preferences Element
     * @constructor
     * @class EmbedArticlesPreferencesElement
     * @param {EmbedArticlesView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {EmbedArticlesPreferencesElement}
     */
    var EmbedArticlesPreferencesElement = function EmbedArticlesPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmbedArticlesPreferencesElement.extend(
        'EmbedArticlesPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
