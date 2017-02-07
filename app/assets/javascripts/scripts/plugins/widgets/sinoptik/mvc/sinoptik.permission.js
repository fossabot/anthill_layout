/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSinoptikPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SinoptikPermission
   * @constructor
   * @extends BasePermission
   */
  var SinoptikPermission = function SinoptikPermission() {
  };

  return SinoptikPermission.extend(
      'SinoptikPermission', {},
      BasePermission.prototype
  );
});
