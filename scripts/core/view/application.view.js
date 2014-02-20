/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/application/application.element',
    'element/header.element',
    'element/footer.element',
    'element/application/application.element.content',
    'element/application/application.element.debug'
], function defineApplicationView(BaseView, AppHTML, Header, Footer, WorkspaceContainer, Debugger) {

    /**
     * View
     * @constructor View
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render Application
         */
        renderApplication: function renderApplication() {
            this.elements.$application = new AppHTML(this, {
                $container: this.getConfigHTML().container,
                id: this.createUUID()
            });
            this.header(Header, this.elements.$application);
            this.workspaces();
            this.footer(Footer, this.elements.$application);
        },
        /**
         * Render Workspaces container
         */
        workspaces: function workspaces() {
            this.elements.$workspaces = new WorkspaceContainer(this, {
                $container: this.elements.$application.$,
                style: 'workspaces'
            });
        },
        /**
         * Render Debugger window
         */
        debug: function debug() {
            this.elements.$debugger = new Debugger(this, {
                $container: this.elements.$application.$,
                style: 'debugger',
                opacity: 0.6,
                events: {
                    click: 'activateDebugger'
                }
            });
        },
        /**
         * Start rendering
         */
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }
    }, BaseView.prototype)

});