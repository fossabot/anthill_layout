/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pet.passport/mvc/pet.passport.controller',
    'plugins/widgets/pet.passport/mvc/pet.passport.model',
    'plugins/widgets/pet.passport/mvc/pet.passport.view',
    'plugins/widgets/pet.passport/mvc/pet.passport.event.manager',
    'plugins/widgets/pet.passport/mvc/pet.passport.permission'
], function definePetPassport(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PetPassport
     * @param containment
     * @param [opts]
     * @constructor
     * @class PetPassport
     * @extends AntHill
     */
    var PetPassport = function PetPassport(containment, opts) {

        /**
         * Define containment
         * @member PetPassport
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member PetPassport
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
         * Init observer
         * @member PetPassport
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member PetPassport
         * @type {PetPassportEventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member PetPassport
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member PetPassport
         * @type {PetPassportModel}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member PetPassport
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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

    return PetPassport.extend('PetPassport', {

    }, AntHill.prototype);
});