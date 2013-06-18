/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/permission'
], function defineWidgetPermission(Base, BasePermission) {
    /**
     * Define Permissions
     * @constructor
     */
    var Permission = function Permission() {

    };

    return Permission.extend({

        /**
         * Get draggable capabilities
         * @returns {Array}
         */
        draggableCapabilities: function draggableCapabilities() {
            return this._checkCapability('draggable');
        },

        /**
         * Get resizable capabilities
         * @returns {Array}
         */
        resizableCapabilities: function resizableCapabilities() {
            return this._checkCapability('resizable');
        },

        /**
         * Check widget capabilities
         * @param {String} capability
         * @private
         * @returns {*|boolean}
         */
        _checkCapability: function _checkCapability(capability) {
            var scope = this.scope,
                list = scope.eventmanager.eventList,
                name = capability.capitalize();
            if (!scope.permission.getCapability(capability)) {
                scope.logger.warn('Unauthorized capability', capability);
                return false;
            }

            if (list) {
                var res = [
                    list.init[name],
                    list.enable[name],
                    list.disable[name],
                    list.destroy[name]
                ];

                scope.logger.debug('Capabilities', name,  res);
                return res;
            }

            scope.logger.warn('Undefined capability', capability);

        }

    }, Base, BasePermission.prototype);
});