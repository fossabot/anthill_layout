/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Event'
], function definePanelEventManager(BaseEvent) {

  /**
   * Define layout event manager
   * @class PanelEventManager
   * @constructor
   * @extends BaseEvent
   */
  var PanelEventManager = function PanelEventManager() {

    /**
     * Define events
     * @memberOf PanelEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @memberOf PanelEventManager
     * @type {{
         *      updateTranslations: string,
         *      showContent: string,
         *      defineModules: string,
         *      definePackages: string,
         *      openPanel: string,
         *      closePanel: string,
         *      refreshModulesContent: string,
         *      subscribeGenericEvent: string
         * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      showContent: 'show.content',
      defineModules: 'define.modules',
      definePackages: 'define.packages',
      openPanel: 'open.panel',
      closePanel: 'close.panel',
      refreshModulesContent: 'refresh.modules.content',
      subscribeGenericEvent: 'subscribe.generic.event'
    };
  };

  return PanelEventManager.extend('PanelEventManager', {}, BaseEvent.prototype);
});