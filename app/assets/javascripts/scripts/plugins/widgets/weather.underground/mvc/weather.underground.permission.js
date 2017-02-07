/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineWeatherUndergroundPermission(BasePermission) {

  /**
   * Define Permissions
   * @class WeatherUndergroundPermission
   * @constructor
   * @extends BasePermission
   */
  var WeatherUndergroundPermission = function WeatherUndergroundPermission() {
  };

  return WeatherUndergroundPermission.extend(
      'WeatherUndergroundPermission', {},
      BasePermission.prototype
  );
});
