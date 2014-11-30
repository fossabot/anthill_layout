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
], function definePhotobucketModel(BaseModel, WidgetContentModel) {

    /**
     * Define Photobucket model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PhotobucketModel
     * @constructor
     */
    var PhotobucketModel = function PhotobucketModel() {

        /**
         * Define preferences
         * @member PhotobucketModel
         * @type {{
         *      photobucketEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            photobucketHtmlCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member PhotobucketModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PhotobucketModel.extend('PhotobucketModel', {

        /**
         * Set Photobucket embed code
         * @member PhotobucketModel
         * @param {string} embed
         */
        setPhotobucketHtmlCode: function setPhotobucketHtmlCode(embed) {
            this.setPrefs('photobucketEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});