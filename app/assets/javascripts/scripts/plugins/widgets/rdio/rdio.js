/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/rdio/mvc/rdio.controller',
    'plugins/widgets/rdio/mvc/rdio.model',
    'plugins/widgets/rdio/mvc/rdio.view',
    'plugins/widgets/rdio/mvc/rdio.event.manager',
    'plugins/widgets/rdio/mvc/rdio.permission'
], function defineRdio(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Rdio
     * @param containment
     * @param [opts]
     * @constructor
     * @class Rdio
     * @extends AntHill
     */
    var Rdio = function Rdio(containment, opts) {

        /**
         * Define containment
         * @memberOf Rdio
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Rdio
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
         * @memberOf Rdio
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return Rdio.extend('Rdio', {

    }, AntHill.prototype);
});
