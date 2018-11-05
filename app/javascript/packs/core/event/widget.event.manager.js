/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseEvent
 * @type {BaseEvent}
 */
const BaseEvent = require('../lib/modules/Event.js');

/**
 * @class WidgetEventManager
 * @extends BaseEvent
 */
module.exports = class WidgetEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {Page} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetEventManager', scope, false);

    /**
     * Define events
     * @property WidgetEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property WidgetEventManager
     * @type {{
     *  initDraggable: string,
     *  enableDraggable: string,
     *  disableDraggable: string,
     *  destroyDraggable: string,
     *  createDraggable: string,
     *  startDraggable: string,
     *  dragDraggable: {eventName: string, params: {buffer: number}},
     *  stopDraggable: string,
     *  updateDraggable: string,
     *  initResizable: string,
     *  enableResizable: string,
     *  disableResizable: string,
     *  destroyResizable: string,
     *  createResizable: string,
     *  startResizable: string,
     *  resizeResizable: {eventName: string, params: {buffer: number}},
     *  stopResizable: string,
     *  updateResizable: string,
     *  updateContainment: string,
     *  afterExpand: string,
     *  loadContent: string,
     *  loadPreferences: string,
     *  transferPreferences: string,
     *  afterUpdatePreferences: string,
     *  setContent: string,
     *  afterSetContent: string,
     *  afterRenderContent: string,
     *  adoptDimensions: string,
     *  restoreLayerIndex: string,
     *  setLayerUp: string,
     *  setLayerDown: string,
     *  setAlwaysOnTop: string,
     *  setOnClickUrl: string,
     *  clearThumbnail: string,
     *  customClassName: string,
     *  saveDom: string,
     *  afterMaximize: string,
     *  beforeMaximize: string,
     *  setZoomable: string,
     *  unsetZoomable: string,
     *  afterReduce: string,
     *  beforeReduce: string,
     *  enlargeWidget: string,
     *  reduceWidget: string,
     *  stretchHeight: string,
     *  stretchWidth: string,
     *  unsetStick: string,
     *  setStickToCenterLeft: string,
     *  setStickToCenterTop: string,
     *  setStickToCenter: string,
     *  setStickToCenterBottom: string,
     *  setStickToCenterRight: string,
     *  setStickToTopLeft: string,
     *  setStickToBottomLeft: string,
     *  setStickToTopRight: string,
     *  setStickToBottomRight: string,
     *  restoreWidgetSticker: string,
     *  toggleContentExpander: string,
     *  toggleFreeze: string,
     *  expandContent: string,
     *  collapseContent: string,
     *  scrollContent: string,
     *  scrollSpeedParallaxBehavior: string,
     *  commentableContent: string
     * }}
     */
    this.eventList = {

      // Drag events
      initDraggable: 'init.draggable',
      enableDraggable: 'enable.draggable',
      disableDraggable: 'disable.draggable',
      destroyDraggable: 'destroy.draggable',
      createDraggable: 'create.draggable',
      startDraggable: 'start.draggable',
      dragDraggable: {
        name: 'drag.draggable',
        params: {buffer: 50}
      },
      stopDraggable: 'stop.draggable',
      updateDraggable: 'update.draggable',

      // Resize events
      initResizable: 'init.resizable',
      enableResizable: 'enable.resizable',
      disableResizable: 'disable.resizable',
      destroyResizable: 'destroy.resizable',
      createResizable: 'create.resizable',
      startResizable: 'start.resizable',
      resizeResizable: {
        name: 'resize.resizable',
        params: {buffer: 50}
      },
      stopResizable: 'stop.resizable',
      updateResizable: 'update.resizable',

      updateContainment: 'update.containment',

      afterExpand: 'after.expand',

      adoptDimensions: 'adopt.dimensions',

      loadContent: 'load.content',
      setContent: 'set.content',
      afterSetContent: 'after.set.content',
      afterRenderContent: 'after.render.content',

      loadPreferences: 'load.preferences',
      transferPreferences: 'transfer.preferences',
      afterUpdatePreferences: 'after.update.preferences',

      setLayerUp: 'set.layer.up',
      setLayerDown: 'set.layer.down',
      restoreLayerIndex: 'restore.layer.index',
      updateLayerIndex: 'update.layer.index',
      setAlwaysOnTop: 'set.always.on.top',

      setOnClickUrl: 'set.on.click.url',
      clearThumbnail: 'clear.thumbnail',

      customClassName: 'custom.class.name',

      saveDom: 'save.dom',

      enlargeWidget: 'enlarge.widget',
      reduceWidget: 'reduce.widget',

      afterMaximize: 'after.maximize',
      beforeMaximize: 'before.maximize',

      setZoomable: 'set.zoomable',
      unsetZoomable: 'unset.zoomable',

      afterReduce: 'after.reduce',
      beforeReduce: 'before.reduce',

      stretchHeight: 'stretch.height',
      stretchWidth: 'stretch.width',

      unsetStick: 'unset.stick',
      setStickToCenterLeft: 'set.stick.to.center.left',
      setStickToCenterTop: 'set.stick.to.center.top',
      setStickToCenter: 'set.stick.to.center',
      setStickToCenterBottom: 'set.stick.to.center.bottom',
      setStickToCenterRight: 'set.stick.to.center.right',
      setStickToTopLeft: 'set.stick.to.top.left',
      setStickToBottomLeft: 'set.stick.to.bottom.left',
      setStickToTopRight: 'set.stick.to.top.right',
      setStickToBottomRight: 'set.stick.to.bottom.right',

      restoreWidgetSticker: 'restore.widget.sticker',

      toggleFreeze: 'toggle.freeze',
      toggleContentExpander: 'toggle.content.expander',
      expandContent: 'expand.content',
      collapseContent: 'collapse.content',
      scrollContent: 'scroll.content',
      scrollSpeedParallaxBehavior: 'scroll.speed.parallax.behavior',
      commentableContent: 'commentable.content'
    };
  }
};