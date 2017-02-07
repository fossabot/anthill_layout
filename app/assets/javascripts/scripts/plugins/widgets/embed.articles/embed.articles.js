/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/embed.articles/mvc/embed.articles.controller',
  'plugins/widgets/embed.articles/mvc/embed.articles.model',
  'plugins/widgets/embed.articles/mvc/embed.articles.view',
  'plugins/widgets/embed.articles/mvc/embed.articles.event.manager',
  'plugins/widgets/embed.articles/mvc/embed.articles.permission'
], function defineEmbedArticles(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define EmbedArticles
   * @param containment
   * @param [opts]
   * @constructor
   * @class EmbedArticles
   * @extends AntHill
   */
  var EmbedArticles = function EmbedArticles(containment, opts) {

    /**
     * Define containment
     * @property EmbedArticles
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property EmbedArticles
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
     * @property EmbedArticles
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

  return EmbedArticles.extend('EmbedArticles', {}, AntHill.prototype);
});
