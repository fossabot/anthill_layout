/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

defineP([
  'config/anthill',
  'modules/MVC',
  'plugins/widget.rules/mvc/widget.rules.controller',
  'plugins/widget.rules/mvc/widget.rules.model',
  'plugins/widget.rules/mvc/widget.rules.view',
  'plugins/widget.rules/mvc/widget.rules.event.manager',
  'plugins/widget.rules/mvc/widget.rules.permission'
], function defineWidgetRules(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define WidgetRules
   * @constructor
   * @param containment
   * @class WidgetRules
   * @extends AntHill
   */
  var WidgetRules = function WidgetRules(containment) {

    /**
     * Define containment
     * @property WidgetRules
     */
    this.containment = containment;

    /**
     * Define active content
     * @property WidgetRules
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property WidgetRules
     * @type {boolean}
     */
    this.allowToLocate = true;

    /**
     * Define defaults
     * @type {{
     *      plugin: boolean,
     *      getter: boolean,
     *      html: {
     *          style: string,
     *          header: boolean,
     *          footer: boolean,
     *          floating: boolean,
     *          padding: {
     *              top: number,
     *              right: number,
     *              bottom: number,
     *              left: number
     *          }
     *      }
     * }}
     */
    var DEFAULTS = {
      plugin: true,
      getter: true,
      html: {
        style: 'default',
        header: true,
        footer: true,
        floating: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define MVC
     * @property WidgetRules
     * @type {MVCJs}
     */
    this.mvc = new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        Controller,
        Model,
        View,
        EventManager,
        Permission
      ],
      render: true
    });

    this.observer.publish(
        this.eventmanager.eventList.successCreated
    );

    this.observer.publish(
        this.eventmanager.eventList.updateTranslations,
        ['plugins/widget.rules/translations/en-us']
    );

    this.controller.subscribeRefreshContentAfterDestroyItems();
    this.controller.subscribeRefreshContentSwitchPage();
  };

  return WidgetRules.extend('WidgetRules', {}, AntHill.prototype);
});