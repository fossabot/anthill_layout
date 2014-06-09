/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widget.rules/mvc/widget.rules.controller',
    'plugins/widget.rules/mvc/widget.rules.model',
    'plugins/widget.rules/mvc/widget.rules.view',
    'plugins/widget.rules/mvc/widget.rules.event.manager',
    'plugins/widget.rules/mvc/widget.rules.permission'
], function defineWidgetRules(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

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
         * @member WidgetRules
         */
        this.containment = containment;

        /**
         * Define active content
         * @member WidgetRules
         * @type {*}
         */
        this.activeContent = undefined;

        /**
         * Allow to locate element
         * @member WidgetRules
         * @type {boolean}
         */
        this.allowToLocate = true;

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
         * Init observer
         * @member WidgetRules
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member WidgetRules
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member WidgetRules
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define controller
         * @member WidgetRules
         * @type {*}
         */
        this.controller = undefined;

        /**
         * Define model
         * @member WidgetRules
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define view
         * @member WidgetRules
         * @type {*}
         */
        this.view = undefined;

        /**
         * Define permissions
         * @member WidgetRules
         * @type {*}
         */
        this.permission = undefined;

        /**
         * Define MVC
         * @member WidgetRules
         * @type {MVC}
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
    };

    return WidgetRules.extend('WidgetRules', {

    }, AntHill.prototype);
});