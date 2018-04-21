/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../extends/aggregation.js');

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @constant Renderer
 * @type {Renderer}
 */
const Renderer = require('../modules/Renderer.js');

/**
 * Define Base element
 * @class BaseElement
 * @extends AntHill
 */
module.exports = class BaseElement extends aggregation(AntHill, Renderer) {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseElement', scope, false);

    /**
     * Define plugin path
     * @property BaseElement
     */
    this.pluginPath = '/assets/scripts/plugins';
  }

  /**
   * Element config before build
   * @property BaseElement
   * @param {BaseView} view
   * @param {{[style]: string, [uuid], [id]: boolean, [css], [events],
   *  [opacity], [id]: boolean, [disabled]: boolean}} opts
   * @param $html
   * @returns {*}
   * @protected
   */
  _config(view, opts, $html) {

    opts = opts || {};

    /**
     * Define view
     * @property BaseElement
     * @type {BaseView}
     */
    this.view = view;

    /**
     * Define style
     * @property BaseElement
     * @type {string}
     */
    this.style = opts.style || view.createStyle();

    /**
     * Define id
     * @property BaseElement
     * @type {string}
     */
    this.id = view.renderUUID(opts.uuid);

    /**
     * Define disabled
     * @property BaseElement
     * @type {boolean}
     */
    this.disabled = this.utils.getStatic('setBoolean')(opts.disabled, false);

    /**
     * Define events
     * @property BaseElement
     * @type {*}
     */
    this.events = opts.events;

    /**
     * Define opacity
     * @property BaseElement
     * @type {*|number}
     */
    this.opacity = opts.opacity || 1.0;

    /**
     * Define CSS
     * @property BaseElement
     * @type {*}
     */
    this.css = opts.css || {};

    /**
     * Define jQuery element
     * @property BaseElement
     */
    this.$ = $html.addClass(this.style).css(this.css);

    if (opts.id) {
      this.$.attr({id: this.id});
    }

    this.view.controller.updateCache(this.id, this);

    // Get scope
    const scope = this.view.scope;
    scope.observer.publish(scope.eventManager.eventList.successCreateElement, this);

    return this;
  }

  /**
   * Get $element by uuid
   * @param {string} uuid
   * @returns {*}
   */
  getElementByUuid(uuid) {
    return this.view.controller.getCache(uuid);
  }

  /**
   * Bind element events
   * @property BaseElement
   */
  bindEvents() {

    const scope = this.view.scope,
        $element = this.$;

    $.each(
        this.base.define(this.events, [], true),
        function each(index, event) {
          scope.eventManager.onEvent.bind({
            scope: scope,
            $: $element
          })(event, index);
        }
    );
  }

  /**
   * Get element container
   * @property BaseElement
   * @param {string} title
   * @returns {*}
   */
  getElementContainer(title) {
    return this.$.find('.' + title + 's');
  }

  /**
   * Get text metrics
   * @property BaseElement
   * @param $element
   * @return {Object}
   */
  textMetrics($element) {

    // Define new div
    const $div = $('<div />').appendTo('body');

    $div.css({
      position: 'absolute',
      left: -1000,
      top: -1000,
      display: 'none'
    });

    $div.html($element.html());

    const styles = [
      'font-size',
      'font-style',
      'font-weight',
      'font-family',
      'line-height',
      'text-transform',
      'letter-spacing'
    ];

    $(styles).each(function textMetricsLoop() {
      const s = this.toString();
      $div.css({
        s: $element.css(s)
      });
    });

    /**
     * Set metrics
     * @type {{height: (*|jQuery), width: (*|jQuery)}}
     */
    const metrics = {
      height: $div.outerHeight(true),
      width: $div.outerWidth(true)
    };

    $div.remove();

    return metrics;
  }

  /**
   * Centralize element into container
   * @property BaseElement
   * @param {{$container, $item, css, position: String}} opts
   * Position options:
   *      ['tl' 'tc' 'tr']
   *      ['cl' 'cc' 'cr']
   *      ['bl' 'bc' 'br']
   * @returns {opts.$item}
   */
  setPosition(opts) {

    const rectC = opts.$container[0].getBoundingClientRect(),
        cWidth = rectC.width,
        cHeight = rectC.height,

        $item = opts.$item,
        rectI = $item[0].getBoundingClientRect(),
        eWidth = rectI.width,
        eHeight = rectI.height;

    let offsetLeft = 0,
        offsetTop = 0;

    if ($item.css('position') === 'fixed') {
      offsetLeft = rectC.left;
      offsetTop = rectC.top;
    }

    let top = 'auto',
        bottom = 'auto',
        left = 'auto',
        right = 'auto',
        mw = cWidth - eWidth,
        cw = offsetLeft + (mw / 2),
        mh = cHeight - eHeight,
        ch = offsetTop + (mh / 2);

    if (opts.position === 'tl') {
      top = 0;
      left = 0;
    } else if (opts.position === 'tc') {
      top = 0;
      left = cw;
    } else if (opts.position === 'tr') {
      right = 0;
      top = 0;
    } else if (opts.position === 'cl') {
      top = ch;
      left = 0;
    } else if (opts.position === 'cc') {
      top = ch;
      left = cw;
    } else if (opts.position === 'cr') {
      top = ch;
      right = 0;
    } else if (opts.position === 'bl') {
      bottom = 0;
      left = 0;
    } else if (opts.position === 'bc') {
      bottom = 0;
      left = cw;
    } else if (opts.position === 'br') {
      bottom = 0;
      right = 0;
    }

    /**
     * Define css
     */
    const css = Object.assign({
      left: left,
      right: right,
      top: top,
      bottom: bottom
    }, opts.css);

    return $item.css(css);
  }

  /**
   * Destroy element before create
   * @property BaseElement
   * @param {Boolean} destroy
   */
  destroyB4Create(destroy) {

    if (this.utils.getStatic('setBoolean')(destroy, false)) {

      // Get scope
      const scope = this.view.scope;
      scope.observer.publish(scope.eventManager.eventList.successDestroyElement, this);

      $('.' + this.$.attr('class').replace(/ /g, '.'), this.$container).remove();
    }
  }

  /**
   * Build element
   * @property BaseElement
   * @param {{
   *    $container,
   *    [append]: boolean,
   *    [destroy]: boolean,
   *    [callback]: function
   * }} opts
   * @returns {*}
   */
  build(opts) {

    opts = opts || {};

    /**
     * Define append/prepend
     */
    const append = opts.append;

    if (this.$) {

      /**
       * Define $container
       * @property BaseElement
       * @type {*|jQuery|HTMLElement}
       */
      this.$container = $(opts.$container);

      this.destroyB4Create(opts.destroy);

      this.$[append ? 'appendTo' : 'prependTo'](opts.$container);

      if (this.util._.isFunction(opts.callback)) {
        opts.callback();
      }
    }

    this.bindEvents();

    // Get scope
    const scope = this.view.scope;
    scope.observer.publish(
        scope.eventManager.eventList.successBuildElement,
        this
    );

    return this;
  }

  /**
   * Dynamic CSS
   * @property BaseElement
   * @param {string} type
   * @param {{
     *    [type]: string,
     *    [url]: string,
     *    [rel]: string,
     *    [media]: string,
     *    [resource]: string
     * }} [opts]
   */
  addCSS(type, opts) {

    // Get link name
    const linkName = type + 'LinkCSS',
        scope = this.view.scope;

    if (this[linkName]) {
      scope.logger.debug('CSS already loaded');
      return false;
    }

    opts = opts || {};
    opts.resource = opts.resource || '';

    /**
     * Get widget
     * @type {Widget|*}
     */
    const item = scope.controller.getContainment();

    if (!item) {
      scope.logger.warn('Item with no containment', arguments);
      return false;
    }

    item.logger.log('Add custom css', arguments);

    /**
     * Create url
     * @type {string}
     */
    let url = opts.url ? opts.url :
        this.pluginPath + opts.resource + ('/' + type).repeat(2) + '.css';

    if (item.controller.isWidget() && item.controller.isExternalContent()) {
      url = item.controller.fetchExternalResource() + type + '.css';
    }

    // Get cache
    const cache = item.controller.root().cache;

    if (cache.css && cache.css[url]) {
      item.logger.debug('CSS already loaded', cache.css[url]);
      cache.css[url].push(this);

      this[type + 'LinkCSS'] = {path: url, link: ''};

      return false;
    }

    /**
     * Define css link instance
     * @type {*|jQuery|HTMLElement}
     */
    this[type + 'LinkCSS'] = {
      path: url,
      link: this.createLinkCss({
        href: url,
        type: opts.type,
        rel: opts.rel,
        media: opts.media
      })
    };

    item.controller.updateCacheCss(url, [this]);
  }

  /**
   * Define create script
   * @param opts
   * @param {HTMLElement} [container]
   * @param {string} [code]
   */
  createScript(opts, container, code) {

    opts = opts || {};

    // Create script node
    const s = document.createElement('script');

    s.setAttribute('type', 'text/javascript');

    for (const index in opts) {
      if (opts.hasOwnProperty(index)) {
        s.setAttribute(index, opts[index]);
      }
    }

    if (typeof(code) !== 'undefined') {
      try {
        s.appendChild(document.createTextNode(code));
      } catch (e) {
        s.text = code;
      }
    }

    (container || document.body).appendChild(s);
  }

  /**
   * Create link css
   * @property BaseElement
   * @param opts
   * @returns {HTMLElement|boolean} link
   */
  createLinkCss(opts) {

    /**
     * Define defaults
     * @type {{type: string, rel: string, media: string}}
     */
    const defaults = {
      type: 'text/css',
      rel: 'stylesheet',
      media: 'all'
    };

    /**
     * Init Link
     * @type {HTMLElement|{
     *    type: string,
     *    rel: string,
     *    media: string,
     *    href: string,
     *    id: string
     * }}
     */
    const link = document.createElement('link');

    link.type = opts.type || defaults.type;
    link.rel = opts.rel || defaults.rel;
    link.media = opts.media || defaults.media;
    link.href = opts.href;

    if ($('link[href="' + link.href + '"]').length) {

      this.view.scope.logger.warn('Link already exist');
      return link;
    }

    document.getElementsByTagName('head')[0].appendChild(link);

    return link;
  }

  /**
   * Destroy element
   * @property BaseElement
   * @returns {*}
   */
  destroy() {

    // Get scope
    const element = this;

    if (!element.view) {
      return false;
    }

    const scope = element.view.scope;

    if (element.$) {
      scope.logger.debug('Destroy element', element);
      element.$.off().remove();
    }

    // Get cache
    const cache = scope.controller.root().cache,
        css = cache.css || {};

    // Remove css
    for (const index in element) {
      if (element.hasOwnProperty(index) && index.match(/LinkCSS/)) {
        const item = element[index];
        const link = css[item.path] || [];
        if (link.length === 1) {
          scope.logger.debug('Destroy element CSS', item.link);
          item.link.parentNode.removeChild(item.link);
          delete css[item.path];
        }
        if (link.length > 1) {
          css[item.path] = this.utils._.reject(link, css => element.id === css.id);
        }
      }
    }

    // Remove cache
    delete cache[element.id];

    // Delete element
    _.each(element.view.elements, (val, key) => {
      if (val === element) {
        delete element.view.elements[key];
      }
    });
  }

  /**
   * Hide element
   * @property BaseElement
   * @returns {*}
   */
  hide() {
    this.view.scope.logger.debug('Hide element');
    return this.$.hide();
  }

  /**
   * Clear element internal HTML
   * @property BaseElement
   * @returns {*|Boolean}
   */
  empty() {
    this.view.scope.logger.debug('Clear inner html of the element');
    return this.$.empty();
  }

  /**
   * Fade in effect
   * @property BaseElement
   * @returns {*}
   */
  fadeIn() {
    return this.$.stop(true, true).fadeIn();
  }

  /**
   * Fade out effect
   * @property BaseElement
   * @returns {*}
   */
  fadeOut() {
    return this.$.stop(true, true).fadeOut();
  }

  /**
   * Show element
   * @property BaseElement
   * @returns {*}
   */
  show() {
    return this.$.show();
  }

  /**
   * Remove element inline style
   * @property BaseElement
   */
  removeStyle() {
    this.$.removeAttr('style');
  }

  /**
   * Get root container
   * @property BaseElement
   * @returns {*|HTMLElement}
   */
  getRootContainer() {
    return $(this.view.scope.controller.root().config.html.container);
  }

  /**
   * Set element opacity
   * @property BaseElement
   * @param {Number} opacity
   */
  setOpacity(opacity) {
    this.$.css({
      opacity: opacity
    });
  }

  /**
   * Get position
   * @property BaseElement
   * @returns {{top, left}}
   */
  getPosition() {
    return this.$.position();
  }

  /**
   * Get offset
   * @property BaseElement
   * @returns {{top, left}}
   */
  getOffset() {
    return this.$.offset();
  }

  /**
   * Get element width
   * @property BaseElement
   * @returns {*}
   */
  getWidth() {
    return this.$.outerWidth(true);
  }

  /**
   * Set element width
   * @property BaseElement
   * @param {String|Number} width
   * @returns {Number}
   */
  setWidth(width) {
    this.$.css({
      width: width
    });

    return this.getWidth();
  }

  /**
   * Get element height
   * @property BaseElement
   * @returns {*}
   */
  getHeight() {
    return this.$.outerHeight(true);
  }

  /**
   * Set element height
   * @property BaseElement
   * @param {String|Number} height
   * @returns {Number}
   */
  setHeight(height) {
    this.$.css({
      height: height
    });

    return this.getHeight();
  }

  /**
   * Get CSS attribute
   * @property BaseElement
   * @param {string} value
   * @returns {Number}
   */
  getCSS(value) {
    return this.base.lib.number.str2float(
        this.$.css(value)
    );
  }

  /**
   * Get z-index
   * @property BaseElement
   * @returns {Number}
   */
  getZIndex() {
    return this.getCSS('z-index') || 0;
  }

  /**
   * Get padding right
   * @property BaseElement
   * @returns {Number}
   */
  getPaddingRight() {
    return this.getCSS('paddingRight');
  }

  /**
   * Get padding left
   * @property BaseElement
   * @returns {Number}
   */
  getPaddingLeft() {
    return this.getCSS('paddingLeft');
  }

  /**
   * Get pudding top
   * @property BaseElement
   * @returns {Number}
   */
  getPaddingTop() {
    return this.getCSS('paddingTop');
  }

  /**
   * Get padding bottom
   * @property BaseElement
   * @returns {Number}
   */
  getPaddingBottom() {
    return this.getCSS('paddingBottom');
  }

  /**
   * Get margin right
   * @property BaseElement
   * @returns {Number}
   */
  getMarginRight() {
    return this.getCSS('marginRight');
  }

  /**
   * Get margin left
   * @property BaseElement
   * @returns {Number}
   */
  getMarginLeft() {
    return this.getCSS('marginLeft');
  }

  /**
   * Get margin top
   * @property BaseElement
   * @returns {Number}
   */
  getMarginTop() {
    return this.getCSS('marginTop');
  }

  /**
   * Get margin bottom
   * @property BaseElement
   * @returns {Number}
   */
  getMarginBottom() {
    return this.getCSS('marginBottom');
  }

  /**
   * Get left delta
   * @property BaseElement
   * @returns {Number}
   */
  getLeftDelta() {
    return this.getPaddingLeft() + this.getMarginLeft();
  }

  /**
   * Get top delta
   * @property BaseElement
   * @returns {Number}
   */
  getTopDelta() {
    return this.getPaddingTop() + this.getMarginTop();
  }

  /**
   * Get $items
   * @property BaseElement
   * @returns {*|jQuery|HTMLElement}
   */
  get$get$items() {

    /**
     * Define scope;
     */
    const scope = this.view.scope;

    /**
     * Get item
     * @type {*}
     */
    const item = scope.model.getCurrentItem();

    /**
     * Get item constructor name
     * @type {string}
     */
    const cname = item.name.toLowerCase();

    return $('.' + cname, this.$);
  }

  /**
   * Set html
   * @property BaseElement
   * @param html
   * @param [$container]
   * @returns {boolean}
   */
  setHtml(html, $container) {

    if (!(this.$ && html)) {
      return false;
    }

    $container ? $container.append(html) : this.addContent(html);
  }

  /**
   * Set text
   * @property BaseElement
   * @param {string} text
   * @param [$container]
   * @returns {boolean}
   */
  setText(text, $container) {

    if (!(this.$ && text)) {
      return false;
    }

    // Define text holder
    const $text = $('<span />').text(text);

    $container ? $container.html($text) : this.addContent($text);
  }

  /**
   * Set title
   * @property BaseElement
   * @param {string} title
   */
  setTitle(title) {

    if (!this.$) {
      return false;
    }

    this.$.attr({
      title: title
    });
  }

  /**
   * Unbind element
   * @property BaseElement
   * @returns {BaseElement}
   */
  unbindElement() {

    if (this.$) {
      this.$.find('*').off();
      this.$.off();
    }

    return this;
  }

  /**
   * Add scroll cover
   * @property BaseElement
   * @param $container
   */
  scrollCover($container) {

    if ($('.scroll-cover', $container).length === 0) {

      $('<div class="scroll-cover" />').appendTo($container).append(
          this.$,
          '<div class="clear" />'
      );
    }
  }

  /**
   * Adopt modal dialog position on content config
   * @property BaseElement
   */
  adoptModalDialogPosition() {

    const scope = this.view.scope,
        referrer = scope.referrer;

    /**
     * Get modal dialog
     * @type {ModalElement}
     */
    const $modal = referrer ?
        referrer.view.elements.$modal :
        scope.view.elements.$modal;

    if ($modal) {

      $modal.setPosition({
        $container: $modal.$container,
        $item: $modal.$,
        position: $modal.position
      });
    }
  }

  /**
   * Remove loading class after loading items
   * @property BaseElement
   */
  hideLoader() {

    /**
     * Get $root
     * @type {ApplicationElement}
     */
    const $root = this.view.controller.root().view.get$item();

    $root.$container.removeClass('loading');
  }

  /**
   * Add loading class before loading items
   * @property BaseElement
   */
  showLoader() {

    /**
     * Get $root
     * @type {ApplicationElement}
     */
    const $root = this.view.controller.root().view.get$item();

    $root.$container.addClass('loading');
  }

  /**
   * Render items list
   * @property BaseElement
   * @param {Array} items
   * @returns {string}
   */
  getItemsList(items) {

    return [
      '<ul class="remove">',
      $.map(items, (item, i) => [
        '<li rel="', item.model.getUUID(), '">',
        item.model.getItemTitle(),
        '</li>'
      ].join('')).join(''),
      '</ul>'
    ].join('');
  }

  /**
   * Get site description
   * @property BaseElement
   * @returns {string}
   */
  getSiteDescription() {
    return $('meta[name="description"]').attr('content');
  }

  /**
   * Set site description
   * @property BaseElement
   * @param {string} description
   */
  setSiteDescription(description) {
    $('meta[name="description"]').attr('content', description);
  }

  /**
   * Get site description
   * @property BaseElement
   * @returns {string}
   */
  getSiteKeywords() {
    return $('meta[name="keywords"]').attr('content');
  }

  /**
   * Set site description
   * @property BaseElement
   * @param {string} keywords
   */
  setSiteKeywords(keywords) {
    $('meta[name="keywords"]').attr('content', keywords);
  }

  /**
   * Get footer html
   * @property BaseElement
   * @returns {*|jQuery}
   */
  getFooter() {

    const counter = Object.keys(this.view.elements.items || {}).length.
            toString(),
        $template = '<p class="text-center"><span class="badge" title="{0}">{0}</span>{1}</p>';

    return $template.replace(/\{0}/g, counter).replace(
        /\{1}/g, this.i18n.t('panel.items')
    );
  }

  /**
   * Check if content has iframe
   * @property BaseElement
   * @returns {number}
   */
  hasIframe() {
    return $('iframe', this.$).length;
  }

  /**
   * Check if content has flash
   * @property BaseElement
   * @returns {number}
   */
  hasFlash() {
    return $('object', this.$).length ||
        $('embed', this.$).length;
  }

  /**
   * Define sort asc/desc
   * @property BaseElement
   * @param $element
   * @returns {boolean}
   */
  defineSorted($element) {
    const sortBy = $element.attr('sorted') === 'asc' ? 'desc' : 'asc';
    $element.attr('sorted', sortBy);
    return $element.attr('sorted') === 'asc';
  }

  /**
   * Define sort text @element
   * @property BaseElement
   * @param {Event} event
   */
  sortTextElements(event) {

    const $container = this.$container,
        $element = this.$element,
        on = this.which,
        selector = this.selector;

    /**
     * Get sorted value
     * @type {*|boolean}
     */
    const sorted = $element.defineSorted($(event.target));

    $(on, $container).sort((a, b) => {

      let t1, t2;
      if (selector) {
        t1 = $(selector, a).text();
        t2 = $(selector, b).text();
      } else {
        t1 = $(a).text();
        t2 = $(b).text();
      }
      if (t1 < t2) return sorted ? -1 : 1;
      if (t1 > t2) return sorted ? 1 : -1;
      return 0;

    }).appendTo($container);
  }

  /**
   * Locate element
   * @property BaseElement
   * @param {BaseElement} [$element]
   * @param {Event} event
   * @returns {boolean}
   */
  locate$locate$element(event, $element) {

    if (!$element) {
      $element = this;
    }

    /**
     * Hide border on locate element
     * @private
     */
    function _hideBorder() {
      $element.$.removeClass('select');
    }

    $element.$.parent().children().removeClass('select');
    $element.$.addClass('select');

    if (event.type === 'mouseleave' || event.type === 'click') {
      setTimeout(_hideBorder, 300);
    }
  }

  /**
   * isModal element
   * @property BaseElement
   * @returns {boolean}
   */
  isModal() {
    return this.name === 'ModalElement';
  }

  /**
   * Check if metamorphic element
   * @property BaseElement
   * @returns {boolean}
   */
  isMetamorphicElement() {
    return this.$.hasClass('metamorphic');
  }

  /**
   * Define add content if defined
   * @property BaseElement
   */
  addContent(embed) {

    if (!embed) {
      this.$.empty();
      return false;
    }

    this.$.append(embed);

    return this;
  }
};