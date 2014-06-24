/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'plugins/plugin',
        'plugins/preferences/preferences.controller'
    ],

    /**
     * Define WorkspaceDataController
     * @param {PluginController} PluginBase
     * @returns {WorkspaceDataController}
     */
        function defineWorkspaceDataController(PluginBase, PreferencesController) {

        /**
         * Define pages controller
         * @class WorkspaceDataController
         * @extends PluginController
         * @extends PreferencesController
         * @constructor
         */
        var WorkspaceDataController = function WorkspaceDataController() {

        };

        return WorkspaceDataController.extend('WorkspaceDataController', {

            /**
             * Get data
             * @member WorkspaceDataController
             * @returns {*}
             */
            getData: function getData() {
                return this.model.getDataItems(
                    this.getWorkspace()
                );
            },

            /**
             * Load pages content
             * @member WorkspaceDataController
             * @param opened
             */
            loadContent: function loadContent(opened) {
                if (opened) {
                    this.getView().renderContent(
                        this.getData()
                    );
                }
            },

            /**
             * Get Prefs
             * @member WorkspaceDataController
             * @returns {WorkspaceDataModel.preferences}
             */
            getPreferences: function getPreferences() {
                return this.model.preferences;
            },

            /**
             * Define preferences
             * @member WorkspaceDataController
             * @param {string} uuid
             * @returns {*}
             */
            definePreferences: function definePreferences(uuid) {

                return this.scope.view.renderPreferences(
                    this.getWorkspace().model.getItemByUUID(uuid)
                );
            },

            /**
             * Set active content
             * @member WorkspaceDataController
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
             * @member WorkspaceDataController
             */
            approveUpdatePreferences: function approveUpdatePreferences() {

                /**
                 * Define scope
                 * @type {WorkspaceData}
                 */
                var scope = this.scope;

                scope.activeContent.controller.updatePreferences(
                    scope.view.elements.$modal,
                    false
                );
            },

            /**
             * Define publisher
             * @member WorkspaceDataController
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
             * @member WorkspaceDataController
             * @param e
             */
            locateWorkspaceData: function locateWorkspaceData(e) {

                /**
                 * Define $item
                 * @type {PageElement}
                 */
                var $item = this.scope.activeContent.view.get$item();

                this.locateElement($item, e);
            },

            /**
             * Destroy page widgets
             * @member WorkspaceDataController
             */
            destroyPageWidgets: function destroyPageWidgets() {

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = this.scope.activeContent;

                page.api.destroyItems(
                    page.model.getItems()
                );

                this.scope.view.elements.$modal.selfDestroy();
            },

            /**
             * Update widgets counter
             * @member WorkspaceDataController
             */
            updateCounter: function updateCounter() {

                /**
                 * Get workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace(),
                    pages = workspace.model.getItems(),
                    index, page, $item, uuid,
                    cname = '-workspacedata-view';

                for (index in pages) {

                    if (pages.hasOwnProperty(index)) {

                        /**
                         * Define page
                         * @type {Page}
                         */
                        page = pages[index];

                        /**
                         * Define uuid
                         * @type {string}
                         */
                        uuid = page.model.getConfig('uuid');

                        /**
                         * Define pages content element
                         * @type {WorkspaceDataContentElement}
                         */
                        $item = this.view.elements.items[uuid + cname];

                        $item.updateCounter(page);
                    }
                }
            },

            /**
             * Create new page
             * @member WorkspaceDataController
             */
            createPage: function createPage() {

                /**
                 * Get workspace
                 * @type {Workspace}
                 */
                var workspace = this.getWorkspace();

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = workspace.api.createPage([], true);

                this.store(
                    this.root()
                );

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    [page, true]
                );

                /**
                 * Get panel
                 * @type {Panel}
                 */
                var panel = this.getAuthorPanel();

                panel.observer.publish(
                    panel.eventmanager.eventList.showContent,
                    [true, panel.active]
                );

            }

        }, PluginBase.prototype, PreferencesController.prototype);
    }
);