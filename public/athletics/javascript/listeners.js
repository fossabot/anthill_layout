/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application',
    'config/workspace',
    'config/page',
    'config/layout',
    'config/template',
    'config/widget'
], function defineListeners(Application, Workspace, Page, Layout, Template, Widget) {

    /**
     * Load listeners
     */
    Application.prototype.globalListeners = Application.prototype.globalListeners || {};
    Workspace.prototype.globalListeners = Workspace.prototype.globalListeners || {};
    Page.prototype.globalListeners = Page.prototype.globalListeners || {};
    Template.prototype.globalListeners = Template.prototype.globalListeners || {};
    Layout.prototype.globalListeners = Layout.prototype.globalListeners || {};
    Widget.prototype.globalListeners = Widget.prototype.globalListeners || {};

    /**
     * Define Application Global listeners
     * @member App
     * @type {{successRendered: {name: string, callback: successRenderedCallback}}}
     */
    Application.prototype.globalListeners = {

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {

                /**
                 * Define app
                 * @type {*}
                 */
                var app = this;

                require([
                    'plugins/panel/panel',
                    'plugins/bar/bar',
                    'plugins/gallery/gallery',
                    'plugins/page.data/page.data',
                    'plugins/workspace.data/workspace.data',
                    'plugins/widget.rules/widget.rules'
                ], function definePanel(Panel, Bar, Gallery, PageData, WorkspaceData, WidgetRules){

                    /**
                     * Init panel plugin
                     * @type {Panel}
                     */
                    app.panel = new Panel({
                        config: {renderAt: 'right'},
                        modules: [Gallery, PageData, WorkspaceData, WidgetRules],
                        packages: [Bar]
                    }, app);

                    app.panel.view.render();
                });
            }
        }

    };

    /**
     * Define Workspace Global listeners
     * @member Workspace
     * @type {{
     * }}
     */
    Workspace.prototype.globalListeners = {
    };

    /**
     * Define Page Global listeners
     * @member Page
     * @type {{
     * }}
     */
    Page.prototype.globalListeners = {
    };

    /**
     * Define Template Global listeners
     * @member Template
     * @type {{
     * }}
     */
    Template.prototype.globalListeners = {
    };

    /**
     * Define Widget Global listeners
     * @member Widget
     * @type {{
     * }}
     */
    Widget.prototype.globalListeners = {
    };

});