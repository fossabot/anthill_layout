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
  'element/modal.element',
  'element/page/page.element',
  'element/page/page.content.element',
  'element/page/page.delta.scroll.element'
], function definePageView(BaseView, Header, Footer, Modal, Page, Content,
    DeltaScroll) {

  /**
   * Define PageView
   * @class PageView
   * @extends BaseView
   * @constructor
   */
  var PageView = function PageView() {
  };

  return PageView.extend('PageView', {

    /**
     * Render Page
     * @memberOf PageView
     */
    renderPage: function renderPage() {

      /**
       * Define page element
       * @type {PageElement}
       */
      this.elements.$page = new Page(this, {
        $container: this.getContainerSelector()
      });

      this.header(Header, this.get$item());
      this.widgets();
      this.deltaScroll();
      this.footer(Footer, this.get$item());

      /**
       * Get workspace
       * @type {Workspace}
       */
      var containment = this.controller.getContainment();

      containment.observer.publish(
          containment.eventmanager.eventList.adoptContentWidth
      );
    },

    /**
     * Define delta scroll
     * @memberOf PageView
     */
    deltaScroll: function deltaScroll() {

      /**
       * Define delta scroll element
       * @type {DeltaScroll}
       */
      this.elements.$deltaScroll = new DeltaScroll(this, {
        $container: this.get$item().$,
        style: 'delta-scroll'
      });
    },

    /**
     * Define widgets container
     * @memberOf PageView
     */
    widgets: function widgets() {

      /**
       * Define widgets container element
       * @type {PageContent}
       */
      this.elements.$widgets = new Content(this, {
        style: 'widgets',
        $container: this.get$item().$
      });
    },

    /**
     * Show destroy widgets confirmation modal dialog
     * @memberOf PageView
     */
    destroyWidgetsModalDialog: function destroyWidgetsModalDialog(widgets) {

      this.modalDialog({
        style: this.scope.name.toLowerCase() + '-modal',
        items: widgets,
        type: 'warning',
        title: 'Remove widgets',
        html: [
          '<p>Are you sure want to destroy:</p>',
          this.get$item().getItemsList(widgets)
        ].join(''),
        cover: true,
        autoclose: true,
        buttons: {
          approve: {
            text: 'OK',
            type: 'success',
            events: {
              click: 'approveItemsDestroy'
            }
          },
          reject: {
            text: 'Cancel',
            events: {
              click: 'rejectModalEvent'
            }
          }
        }
      });
    },

    /**
     * Render page
     * @memberOf PageView
     * @param {boolean} silent
     */
    render: function render(silent) {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          silent
      );
    }

  }, BaseView.prototype)
});