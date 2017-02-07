/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/sound.cloud/mvc/sound.cloud.controller',
  'plugins/widgets/sound.cloud/mvc/sound.cloud.model',
  'plugins/widgets/sound.cloud/mvc/sound.cloud.view',
  'plugins/widgets/sound.cloud/mvc/sound.cloud.event.manager',
  'plugins/widgets/sound.cloud/mvc/sound.cloud.permission'
], function defineSoundCloud(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define SoundCloud
   * @param containment
   * @param [opts]
   * @constructor
   * @class SoundCloud
   * @extends AntHill
   */
  var SoundCloud = function SoundCloud(containment, opts) {

    /**
     * Define containment
     * @memberOf SoundCloud
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf SoundCloud
     * @type {*}
     */
    this.referrer = undefined;

    /**
     * Define defaults
     * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
         * }}
     */
    var DEFAULTS = {
      plugin: true,
      html: {
        style: 'default',
        header: false,
        footer: false,
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
     * @memberOf SoundCloud
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [
        {uuid: this.containment.model.getContentUUID()},
        DEFAULTS
      ],
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
        this.eventmanager.eventList.initWidget,
        opts
    );
  };

  return SoundCloud.extend('SoundCloud', {}, AntHill.prototype);
});
