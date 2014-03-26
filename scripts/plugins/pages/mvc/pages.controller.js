/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePagesController(PluginBase) {

    /**
     * Define pages controller
     * @class PagesController
     * @extends PluginController
     * @constructor
     */
    var PagesController = function PagesController() {
    };

    return PagesController.extend('PagesController', {

        /**
         * Get data
         * @member PagesController
         * @returns {*}
         */
        getData: function getData() {
            return this.model.getDataItems(
                this.getWorkspace()
            );
        },

        /**
         * Load pages content
         * @member PagesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        /**
         * Get Prefs
         * @member PagesController
         * @returns {PagesModel.preferences}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Define preferences
         * @member PagesController
         * @param {string} uuid
         * @returns {*}
         */
        definePreferences: function definePreferences(uuid) {

            return this.scope.view.renderPreferences(
                this.getWorkspace().model.getItemByUUID(uuid)
            );
        },

        /**
         * Check if content was updated
         * @member PagesController
         * @param data
         * @param content
         * @returns {boolean}
         */
        isUpdate: function isUpdate(data, content) {

            /**
             * Define hash
             * @type {*}
             */
            var hash = this.base.lib.hash;

            return hash.hashLength(data || {}) ===
                hash.hashLength(content || {})
        },

        /**
         * Set active content
         * @member PagesController
         * @param uuid
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Define workspace
             * @type {Workspace}
             */
            var workspace = this.controller.getWorkspace();

            /**
             * Set active content
             * @type {Page}
             */
            this.activeContent = workspace.model.getItemByUUID(uuid);
        },

        /**
         * Update prefs
         * @member PagesController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             */
            var scope = this.scope;

            scope.activeContent.controller.updatePreferences(
                scope.view.elements.$modal
            );
        },

        /**
         * Define publisher
         * @member PagesController
         * @param page
         */
        definePublisher: function definePublisher(page) {
            this.scope.eventmanager.subscribePublishOn(
                page,
                this.updateCounter.bind(this.scope)
            );
        },

        /**
         * Locate page data element
         * @member PagesController
         */
        locatePages: function locatePages() {

            /**
             * Define $item
             * @type {PageElement}
             */
            var $item = this.scope.activeContent.view.get$item();

            this.locateElement($item);
        },

        /**
         * Get page data
         * @member PagesController
         * @returns {Panel}
         */
        getPanel: function getPanel() {

            return this.scope.containment;
        },

        /**
         * Get page data
         * @member PagesController
         * @returns {PageData}
         */
        getPageData: function getPageData() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getPanel();

            return panel.model.getModule(
                panel.model.getIndex('pagedata')
            ).module;
        },

        /**
         * Update widgets counter
         * @member PagesController
         */
        updateCounter: function updateCounter() {

            var workspace = this.controller.getWorkspace(),
                pages = workspace.model.getItems(),
                index, page, $item,
                cname = '-pages-view';

            for (index in pages) {

                if (pages.hasOwnProperty(index)) {

                    /**
                     * Define page
                     * @type {Page}
                     */
                    page = pages[index];

                    /**
                     * Define pages content element
                     * @type {PagesContentElement}
                     */
                    $item = this.view.elements.items[page.model.getConfig('uuid') + cname];

                    $item.updateCounter(page);
                }
            }
        }

    }, PluginBase.prototype);
});