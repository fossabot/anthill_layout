/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/base',
    'controller/workspace/workspace'
], function (BaseModel, Base, Workspace) {
    var Model = function Model() {
    };

    return Model.extend({
        createWorkspace: function createWorkspace(opts) {
            var app = this.scope,
                workspace = this.updateCollector(
                    Workspace,
                    opts,
                    app.workspaces
                );
            if (workspace) {
                app.workspace = workspace;
            }
            return app.workspace;
        },
        destroyWorkspace: function destroyWorkspace(workspace) {
            var scope = this.scope,
                workspaces = scope.workspaces,
                index = workspace.model.getUUID();

            if (workspaces.hasOwnProperty(index)) {
                delete workspaces[index];
            }

            this.scope.workspace = this.base.lib.hash.firstHashElement(workspaces);

            return workspaces;

        },
        destroyWorkspaces: function destroyWorkspace(force) {
            var index,
                workspaces = this.scope.workspaces;
            for (index in workspaces) {
                if (workspaces.hasOwnProperty(index)) {
                    this.destroy(workspaces[index])
                }
            }
            return workspaces;
        }
    }, BaseModel.prototype, Base);

});