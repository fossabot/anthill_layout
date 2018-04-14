/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP([
  'plugins/plugin.controller',
  'config/routes'
], function defineGalleryController(PluginBase, Routes) {

  /**
   * Define gallery controller
   * @class GalleryController
   * @extends PluginController
   * @constructor
   */
  var GalleryController = function GalleryController() {
  };

  return GalleryController.extend('GalleryController', {

    /**
     * Define init model
     * @memberOf GalleryController
     */
    initModel: function initModel() {

      this.logger.debug('Init model');
      this.model.loadStaticData();
    },

    /**
     * Get providers data
     * @memberOf GalleryController
     */
    getProvidersData: function getProvidersData() {
      return this.model.getProvidersList();
    },

    /**
     * Get current provider data
     * @memberOf GalleryController
     * @returns {{name: string, data: *[]}[]}
     */
    getModuleData: function getModuleData() {
      return this.model.currentProvider;
    },

    /**
     * Set current provider
     * @memberOf GalleryController
     * @param name
     */
    setCurrentProvider: function setCurrentProvider(name) {
      this.model.setProviderAsCurrent(name);
    },

    /**
     * Set providers
     * @memberOf GalleryController
     */
    setProviders: function setProviders() {

      this.logger.debug('Set providers');

      /**
       * Get available providers
       * @type {*}
       */
      var data = this.model.providers,
          index, i = 0, pl;

      for (index in data) {

        if (data.hasOwnProperty(index)) {

          pl = data[index].data.length;

          for (; i < pl; i++) {

            // Categorize providers data list
            this.model.setProvider(data[index].data[i]);
          }
        }
      }
    },

    /**
     * Change current provider
     * @memberOf GalleryController
     * @param provider
     * @returns {boolean}
     */
    changeProvider: function changeProvider(provider) {

      if (provider === this.getModuleData().key) {
        return false;
      }

      this.setCurrentProvider(provider);

      /**
       * Get scope
       * @type {Gallery}
       */
      var scope = this.scope;

      scope.observer.publish(
          scope.eventManager.eventList.loadModuleContent, [
            true, true
          ]
      );
    },

    /**
     * Filter search results
     * @memberOf GalleryController
     * @param {Event} e
     */
    filterResults: function filterResults(e) {

      e.preventDefault();

      if (e.which === 13) {
        return false;
      }

      if (e.which === 27) {
        e.target.value = '';
      }

      /**
       * Get item elements
       * @type {object}
       */
      var items = this.getView().elements.items,
          index, $item,
          value = e.target.value,
          regex;

      for (index in items) {

        if (items.hasOwnProperty(index)) {

          /**
           * Define item
           * @type {GalleryContentElement}
           */
          $item = items[index];

          if (!value.length) {

            $item.$.removeAttr('style');

          } else {

            /**
             * Define regex
             * @type {RegExp}
             */
            regex = new RegExp(value, 'ig');

            ($item.data.name.match(regex) || $item.data.type.match(regex)) ?
                $item.$.removeAttr('style') :
                $item.hide();
          }
        }
      }

      this.getView().updateFooterContent();
    },

    /**
     * Add widget
     * @memberOf GalleryController
     * @param $element
     */
    addWidget: function addWidget($element) {

      /**
       * Get page
       * @type {Page}
       */
      var page = this.getPage(),
          data = $element.data;

      page.controller.createWidgetFromResource({
        width: data.dimensions.width,
        height: data.dimensions.height,
        resource: $element.$.attr('resource'),
        thumbnail: data.thumbnail,
        external_resource: data.external_resource,
        title: data.name,
        description: data.description
      }, true, false);
    }

  }, PluginBase.prototype, Routes.prototype);
});