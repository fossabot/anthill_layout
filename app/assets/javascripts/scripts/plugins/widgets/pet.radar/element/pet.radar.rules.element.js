/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function definePetRadarRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define PetRadar Rules Element
     * @param view
     * @param opts
     * @returns {PetRadarRulesElement}
     * @constructor
     * @class PetRadarRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var PetRadarRulesElement = function PetRadarRulesElement(view, opts) {

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

    return PetRadarRulesElement.extend('PetRadarRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});