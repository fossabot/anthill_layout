/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * @class PageDataRulesElement
 * @extends PluginElement
 */
module.exports = class PageDataRulesElement extends PluginElement {

  /**
   * @param {PageDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageDataRulesElement', view, false);
    this._config(view, opts, $('<li class="content" />')).build(opts);

    /**
     * Define title
     * @property PageDataRulesElement
     * @type {string}
     */
    this.title = 'Show page content visual rules';

    /**
     * Define description
     * @property PageDataRulesElement
     * @type {string}
     */
    this.description = 'Clicking a button will take you to the show page content rules';

    this.init();
  }

  /**
   * Define inner content
   * @memberOf WorkspaceDataContentElement
   */
  getTemplate() {
    $('<a class="page-rules" />').appendTo(this.$);
  }

  /**
   * Define Init
   * @memberOf PageDataRulesElement
   * @returns {PageDataRulesElement}
   */
  init() {
    this.setTitle(this.title);
    this.renderTooltip({
      title: this.title,
      description: this.description,
      selector: this.$
    });

    this.getTemplate();
  }

  /**
   * Render content rules wizard
   * @memberOf PageDataRulesElement
   * @param {Page} page
   * @returns {*|jQuery|HTMLElement}
   */
  renderWizard(page) {
    const uuid = this.base.lib.generator.UUID();
    const $html = $('<div class="canvas-rules" />').attr({id: uuid});

    /**
     * @constant GenerateRules
     * @type {module.GenerateRules}
     */
    const GenerateRules = require('../../rules/page/page.rules.js');

    /**
     * @constant rules
     * @type {module.GenerateRules}
     */
    const rules = new GenerateRules(uuid, page);

    return $html;
  }
};