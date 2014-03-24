/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/page.data/mvc/page.data.controller',
    'plugins/page.data/mvc/page.data.model',
    'plugins/page.data/mvc/page.data.view',
    'plugins/page.data/mvc/page.data.event.manager',
    'plugins/page.data/mvc/page.data.permission'
], function definePageData(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PageData
     * @constructor
     * @param containment
     * @class PageData
     * @extends AntHill
     */
    var PageData = function PageData(containment) {

        /**
         * Define containment
         * @member PageData
         */
        this.containment = containment;

        /**
         * Define active content
         * @member PageData
         * @type {*}
         */
        this.activeContent = undefined;

        /**
         * Allow to locate element
         * @member PageData
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
                footer: false,
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
         * @member PageData
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member PageData
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member PageData
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define controller
         * @member PageData
         * @type {*}
         */
        this.controller = undefined;

        /**
         * Define model
         * @member PageData
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define view
         * @member PageData
         * @type {*}
         */
        this.view = undefined;

        /**
         * Define permissions
         * @member PageData
         * @type {*}
         */
        this.permission = undefined;

        /**
         * Define MVC
         * @member PageData
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
            ['plugins/page.data/translations/en-us']
        );
    };

    return PageData.extend('PageData', {

    }, AntHill.prototype);
});