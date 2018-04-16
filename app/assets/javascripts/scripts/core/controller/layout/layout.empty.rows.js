/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 6/12/13
 * Time: 3:22 PM
 */

defineP([
  'config/anthill'
], function defineLayoutLayoutEmptyRows(AntHill) {

  /**
   * Define LayoutEmptyRows
   * @class LayoutEmptyRows
   * @param {Layout} layout
   * @constructor
   */
  var LayoutEmptyRows = function LayoutEmptyRows(layout) {

    /**
     * Define layout
     * @property LayoutEmptyRows
     * @type {Layout}
     */
    this.layout = layout;

    /**
     * Define page
     * @property LayoutEmptyRows
     * @type {Page}
     */
    this.page = this.layout.controller.getContainment();
  };

  return LayoutEmptyRows.extend('LayoutEmptyRows', {

    /**
     * Check if remove empty spaces is allowed
     * @returns {boolean}
     */
    isAllowed: function isAllowed() {
      return this.layout.controller._getLayoutMode('emptySpaces') ===
          this.page.ORGANIZE_MODES.row;
    },

    /**
     * Find busy rows
     * @returns {Array}
     */
    findRows: function findRows() {
      var rows = [],
          widget, index, i, l, dom,
          widgets = this.page.model.getItems();

      for (index in widgets) {
        if (widgets.hasOwnProperty(index)) {
          widget = widgets[index];
          dom = widget.dom;
          l = dom.relHeight + dom.row - 1;

          for (i = dom.row; i <= l; i += 1) {
            rows[i] = this.base.define(rows[i], [], true);
            rows[i].push(widget);
          }
        }
      }
      return rows;
    },

    /**
     * Remove empty rows
     * @return {Boolean}
     */
    remove: function remove() {

      /**
       * Define layout
       * @type {Layout}
       */
      var layout = this.layout;

      if (!this.isAllowed()) {
        layout.logger.warn('Remove empty spaces by row does not allowed');
        return false;
      }

      var rows = this.findRows(),
          moveIndex = 0,
          alreadyFixed = [],
          i = 0, rl = rows.length;

      for (i; i <= rl; i += 1) {

        if (this.base.isDefined(rows[i])) {

          /**
           * Define already fixed widgets
           * @type {*}
           */
          alreadyFixed = this._updateWidgetDOM(
              rows[i],
              alreadyFixed,
              moveIndex
          );

        } else {
          moveIndex += 1;
          alreadyFixed = [];
        }
      }
    },

    /**
     * Get widget to update dom
     * @param {*} widgets
     * @param {Array} alreadyFixed
     * @param {Number} moveIndex
     * @returns {*}
     * @private
     */
    _updateWidgetDOM: function _updateWidgetDOM(widgets, alreadyFixed,
        moveIndex) {
      var widget, uuid, y = 0,
          wl = widgets.length,
          row, top, dom;

      for (y; y <= wl; y += 1) {

        if (widgets[y]) {

          /**
           * Define widget
           * @type {Widget}
           */
          widget = widgets[y];

          /**
           * Define UUID
           * @type {string}
           */
          uuid = widget.model.getUUID();

          if ($.inArray(uuid, alreadyFixed) === -1) {
            alreadyFixed.push(uuid);

            dom = widget.map.getDOM();
            row = widget.dom.row - moveIndex;
            top = widget.map.widgetTop(row);

            widget.model.updateDOM({
              row: row,
              top: top,
              bottom: widget.map.widgetBottom(top, dom.height)
            });
          }
        }
      }

      return alreadyFixed;
    }

  }, AntHill.prototype);

});