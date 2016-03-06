/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTextEditorRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TextEditor Rules Element
     * @param view
     * @param opts
     * @returns {TextEditorRulesElement}
     * @constructor
     * @class TextEditorRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TextEditorRulesElement = function TextEditorRulesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBaseRulesData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return TextEditorRulesElement.extend('TextEditorRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});