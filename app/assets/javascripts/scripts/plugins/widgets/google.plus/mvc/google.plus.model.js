/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineGooglePlusModel(BaseModel, WidgetContentModel) {

    /**
     * Define GooglePlus model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class GooglePlusModel
     * @constructor
     */
    var GooglePlusModel = function GooglePlusModel() {

        /**
         * Define preferences
         * @member GooglePlusModel
         * @type {{
         *      googlePlusApi: {type: string, disabled: boolean, value: string, visible: boolean},
         *      googlePlusUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            googlePlusApi: {
                type: 'text',
                disabled: true,
                value: 'https://apis.google.com/js/plusone.js',
                visible: true
            },
            googlePlusUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member GooglePlusModel
         * @type {{}}
         */
        this.rules = {};
    };

    return GooglePlusModel.extend('GooglePlusModel', {

        /**
         * Set google plus url
         * @member GooglePlusModel
         * @param {string} url
         */
        setGooglePlusUrl: function setGooglePlusUrl(url) {
            this.setPrefs('googlePlusUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});