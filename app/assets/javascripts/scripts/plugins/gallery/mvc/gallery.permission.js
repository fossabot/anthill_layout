/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Permission'
], function defineGalleryPermission(BasePermission) {

  /**
   * Define Permissions
   * @class GalleryPermission
   * @constructor
   * @extends BasePermission
   */
  var GalleryPermission = function GalleryPermission() {

  };

  return GalleryPermission.extend('GalleryPermission', {},
      BasePermission.prototype);
});