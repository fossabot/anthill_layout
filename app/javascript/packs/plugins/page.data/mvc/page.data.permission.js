/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BasePermission} from '../../../modules/Permission';

/**
 * @extends BasePermission
 * @class PageDataPermission
 */
export class PageDataPermission extends BasePermission {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataPermission', scope);
  }
}