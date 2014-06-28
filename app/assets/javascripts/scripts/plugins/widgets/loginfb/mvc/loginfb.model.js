/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineLoginfbModel(BaseModel) {

    /**
     * Define Loginfb model
     * @extends BaseModel
     * @class LoginfbModel
     * @constructor
     */
    var LoginfbModel = function LoginfbModel() {

        /**
         * Define preferences
         * @member LoginfbModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member LoginfbModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LoginfbModel.extend('LoginfbModel', {


    }, BaseModel.prototype);
});