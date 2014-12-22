/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/tube.eight/mvc/tube.eight.controller',
    'plugins/widgets/tube.eight/mvc/tube.eight.model',
    'plugins/widgets/tube.eight/mvc/tube.eight.view',
    'plugins/widgets/tube.eight/mvc/tube.eight.event.manager',
    'plugins/widgets/tube.eight/mvc/tube.eight.permission'
], function defineTubeEight(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TubeEight
     * @param containment
     * @param [opts]
     * @constructor
     * @class TubeEight
     * @extends AntHill
     */
    var TubeEight = function TubeEight(containment, opts) {

        /**
         * Define containment
         * @member TubeEight
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member TubeEight
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
         * @member TubeEight
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

    return TubeEight.extend('TubeEight', {

    }, AntHill.prototype);
});