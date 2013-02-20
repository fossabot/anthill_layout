/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/debugger',
    'config/application',
    'config/workspace',
    'config/page',
    'config/widget'
], function defineListeners(Debugger, Application, Workspace, Page, Widget) {

    Application.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderApplication();
                this.view.debug();
            }
        }
    };

    Workspace.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderWorkspace();
            }
        },
        createPage: {
            name: 'create.page',
            callback: function createPageCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageContainerHeight);
            }
        }
    };

    Page.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderPage();
                this.controller.updateLayout();
            }
        },
        createWidget: {
            name: 'create.widget',
            callback: function createWidgetCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageHeight);
            }
        },
        debugStart: {
            name: 'debug.start',
            callback: function debugStartCallback() {
                /**
                 * Define Debugger
                 * @type {modules.debugger}
                 */
                this.debugger = new Debugger(this);
            }
        }
    };

    Widget.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderWidget();
                this.controller.setupInteractions();
            }
        }

    };

});