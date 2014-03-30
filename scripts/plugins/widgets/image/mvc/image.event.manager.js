/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineImageEventManager(BaseEvent) {

    /**
     * Define Image event manager
     * @class ImageEventManager
     * @constructor
     * @extends BaseEvent
     */
    var ImageEventManager = function ImageEventManager() {

        /**
         * Define events
         * @member ImageEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member ImageEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      loadRules: string,
         *      transferRules: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            defineReferrer: 'define.referrer',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences',
            loadRules: 'load.rules',
            transferRules: 'transfer.rules'
        };
    };

    return ImageEventManager.extend('ImageEventManager', {
    }, BaseEvent.prototype);
});