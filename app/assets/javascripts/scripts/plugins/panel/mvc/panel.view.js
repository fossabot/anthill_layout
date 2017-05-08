/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/panel/element/panel.content.element',
  'plugins/panel/element/panel.content.container.element',
  'plugins/panel/element/panel.element'
], function definePanelView(BaseView, Header, Footer, PanelContentElement,
    PanelContentContainer, Panel) {

  /**
   * Define view
   * @class PanelView
   * @constructor
   * @extends BaseView
   */
  var PanelView = function PanelView() {
  };

  return PanelView.extend('PanelView', {

    /**
     * Render Panel
     * @memberOf PanelView
     */
    renderPanel: function renderPanel() {

      if (this.isCached('$panel', Panel)) {
        return false;
      }

      /**
       * Define Panel element
       * @property PanelView.elements
       * @type {PanelElement}
       */
      this.elements.$panel = new Panel(this, {
        $container: 'body',
        style: [
          'panel-container',
          this.controller.getRenderAt()
        ].join(' ')
      });

      this.renderContentContainer();

      this.footer(Footer, this.get$item());

      this.controller.renderPackages();

    },

    /**
     * Render content container
     * @memberOf PanelView
     */
    renderContentContainer: function renderContentContainer() {

      /**
       * Define Panel element
       * @type {PanelContentContainerElement}
       */
      this.elements.$content = new PanelContentContainer(this, {
        $container: this.get$item().getContentContainer(),
        style: 'panel-content'
      });
    },

    /**
     * Render panel content
     * @memberOf PanelView
     * @param module
     * @param {Boolean} [force]
     * @returns {boolean}
     */
    renderContent: function renderContent(module, force) {

      /**
       * Define style
       * @type {string}
       */
      var style = [
            this.scope.model.getPanelEntityResourceName(module),
            'content'
          ].join('-'),
          sname = '$' + style;

      this.updateElementItems();

      if ((this.isCachedItems() || this.elements.items.hasOwnProperty(sname)) &&
          !force) {
        return false;
      }

      /**
       * Render item
       * @type {PanelContentElement}
       */
      var $item = new PanelContentElement(this, {
        style: style,
        $container: this.elements.$content.$
      });

      module.view.defineContainer($item);

      this.updateElementItems($item, sname);
    },

    /**
     * Render panel
     * @memberOf PanelView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderPanel.bind(this)
      );
    }

  }, BaseView.prototype)
});