/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Permission'
], function defineMaximizePermission(BasePermission) {

  /**
   * Define Permissions
   * @class MaximizePermission
   * @constructor
   * @extends BasePermission
   */
  var MaximizePermission = function MaximizePermission() {

  };

  return MaximizePermission.extend('MaximizePermission', {},
      BasePermission.prototype);
});