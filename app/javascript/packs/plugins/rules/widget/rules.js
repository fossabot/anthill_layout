/**
 * Created by teamco on 3/19/14.
 */

import {AntHill} from '../../../core/config/anthill';

/**
 * @class BaseRules
 * @extends {AntHill}
 * @type {BaseRules}
 */
export class BaseRules extends AntHill {

  /**
   * @constructor
   * @param {string} [name]
   * @param {BaseElement} element
   */
  constructor(name, element) {
    super(name || 'BaseRules', null, false);

    /**
     * Buttons collector
     * @property BaseRules
     * @type {{}}
     */
    this.$buttons = {};

    /**
     * Define default widget rules
     * @property BaseRules
     * @type {*}
     */
    this.defaultRules = {};

    /**
     * @type {BaseElement}
     * @property BaseRules
     */
    this.element = element;
  }

  /**
   * Get rules template
   * @memberOf BaseRules
   * @param {string} text
   * @private
   */
  getTemplate(text) {
    return $(`
      <div class="input-group">
        <span class="input-group-addon">${text}</span>
      </div>`);
  }

  /**
   * Transfer selected value
   * @memberOf BaseRules
   * @param {string} value
   * @private
   */
  _transferValue(value) {
    this.element.$buttons[this.button].$.attr({value: value});
  }

  /**
   * Get rules list
   * @memberOf BaseRules
   * @param {array} rules
   * @param {string} type
   * @returns {array|boolean}
   */
  getRulesList(rules, type) {

    /**
     * Define rules list
     * @type {Array}
     */
    let rulesList = [];

    for (let key in rules) {
      if (rules.hasOwnProperty(key)) {
        rulesList.push({
          type: 'text',
          value: rules[key]
        });
      }
    }

    if (!rulesList.length) {
      this.view.scope.logger.warn('No rules', type, rules);
      return false;
    }

    rulesList.sort((a, b) => a.value.localeCompare(b.value));

    rulesList.unshift({
      type: 'text',
      value: [`Select rule (${rulesList.length - 1})`].join('')
    });

    return rulesList;
  }

  /**
   * Open preferences
   * @memberOf BaseRules
   * @param opts
   */
  openRules(opts) {

    /**
     * Define buttons
     * @type {*}
     */
    const buttons = $.extend(true, {}, {
      locate: {
        text: 'Locate',
        type: 'default',
        events: {click: 'locateElementItem'}
      },
      approve: {
        text: 'OK',
        type: 'success',
        events: {click: 'approveUpdateRules'}
      },
      reject: {
        text: 'Cancel',
        type: 'default',
        events: {click: 'rejectModalEvent'}
      }
    }, opts.buttons || {});

    this.view.modalDialog({
      style: opts.style,
      type: opts.type || 'info',
      title: opts.title,
      text: opts.config.uuid,
      html: opts.$html,
      cover: true,
      buttons: buttons
    });
  }

  /**
   * @memberOf BaseRules
   * @param widgetRules
   */
  renderWidgetRules(widgetRules) {
    const text = 'Widget rules',
        rulesList = this.getRulesList(widgetRules, text);

    if (!rulesList) {
      return false;
    }

    /**
     * @constant $element
     * @type {jQuery}
     */
    const $element = this.$;

    $element.append(
        this.getTemplate(text).append(
            this.renderDropDown(rulesList, rulesList[0].value, text,
                'widgetRule', {
                  type: 'click.transferValue',
                  callback: this._transferValue.bind({
                    element: this,
                    button: 'addWidgetRule'
                  })
                }, true)));

    this.view.button({
          addWidgetRule: {
            text: 'Publish',
            type: 'warning',
            $container: $element.find('.input-group:last'),
            events: {click: 'addWidgetRule'}
          }
        },
        this.$buttons);
  }

  /**
   * @memberOf BaseRules
   * Render subscribe rules
   * @param subscribe
   */
  renderSubscribeRules(subscribe) {
    subscribe = subscribe || {};

    /**
     * @constant view
     * @type {BaseView}
     */
    const view = this.view;

    /**
     * Get published rules
     * @type {{}}
     */
    const published = view.controller.getPublishedRules();

    let empty = false,
        render = false;

    if (!Object.keys(published).length) {
      view.scope.logger.debug('No published rules', published);
      return false;
    }

    /**
     * Set $ul
     * @type {*|jQuery}
     */
    const $ul = $('<ul />').addClass('subscribe-rules');

    /**
     * Define title
     * @type {string}
     */
    const title = 'Subscribe events';

    /**
     * @method _checkRule
     * @param rulesList
     * @param checkedRulesList
     * @param type
     * @param $inner
     * @private
     */
    function _checkRule(rulesList, checkedRulesList, type, $inner) {
      const rules = rulesList[type],
          checked = checkedRulesList[type] || [];

      for (let i = 0, l = rules.length; i < l; i++) {

        const $checkbox = this.renderCheckbox({
          name: [type, rules[i]].join(':'),
          text: rules[i],
          checked: $.inArray(rules[i], checked) !== -1,
          disabled: false,
          visible: true
        });

        $checkbox.find('.input-group-addon').append(type);
        $inner.append($('<li />').append($checkbox));
      }
    }

    /**
     * @method _checkPublished
     * @param published
     * @param index
     * @return {jQuery|HTMLElement}
     * @private
     */
    function _checkPublished(published, index) {
      const $inner = $('<ul />'),
          rulesList = published[index].rules || {},
          checkedRulesList = subscribe[index] || {};

      empty = !Object.keys(rulesList).length;

      for (let type in rulesList) {
        if (rulesList.hasOwnProperty(type)) {
          _checkRule.call(this, rulesList, checkedRulesList, type, $inner);
        }
      }

      return $inner;
    }

    for (let index in published) {
      if (published.hasOwnProperty(index)) {

        /**
         * @constant
         * @type {jQuery|HTMLElement}
         */
        const $inner = _checkPublished.call(this, published, index);

        if (!empty) {
          render = true;

          $('<li />').append(
              $('<fieldset />').append([
                $('<legend />').attr({'data-uuid': index}).html(`
                  <span class="glyphicon glyphicon-chevron-up"></span>
                  ${published[index].type}: ${index.replace(/-content/, '')}`).on(
                      'click.toggle', this.toggleFieldset.bind(this)),
                $inner
              ])
          ).appendTo($ul);
        }
      }
    }

    if (render) {
      this.$.find('div.content-rules').append(
          $('<fieldset />').append([
            $('<legend />').text(title).on('click.toggle', this.toggleFieldset.bind(this)).attr({title: title}),
            $ul
          ]));
    }
  }

  /**
   * @memberOf BaseRules
   * @param contentRules
   */
  renderContentRules(contentRules) {

    /**
     * @constant $element
     * @type {jQuery}
     */
    const $element = this.$;

    /**
     * @constant view
     * @type {BaseView}
     */
    const view = this.view;

    const cname = view.scope.name,
        text = [cname, 'rules'].join(' '),
        rulesList = this.getRulesList(contentRules, text);

    if (!rulesList) {
      return false;
    }

    $element.append(this.getTemplate(text).append(
        this.renderDropDown(rulesList, rulesList[0].value, text,
            `${cname}Rule`, {
              type: 'click.transferValue',
              callback: this._transferValue.bind({
                scope: this,
                button: 'addContentRule'
              })
            }, true)));

    this.view.button({
          addContentRule: {
            text: 'Publish',
            type: 'warning',
            $container: $element.find('.input-group:last'),
            events: {click: 'addContentRule'}
          }
        },
        this.$buttons
    );
  }

  /**
   * @memberOf BaseRules
   * @param data
   * @param widgetRules
   * @param contentRules
   */
  renderBaseRulesData(data, widgetRules, contentRules) {

    /**
     * Buttons collector
     * @property BaseRulesDataRenderer
     * @type {{}}
     */
    this.$buttons = this.$buttons || {};

    this.renderWidgetRules(widgetRules);
    this.renderContentRules(contentRules);
    this.$.append('<div class="content-rules" />');
    this.renderSubscribeRules(data.subscribe);
  }

  /**
   * Add new rule
   * @memberOf BaseRules
   * @param {string} rule
   * @param {string} type
   * @param $container
   * @returns {boolean}
   */
  addRule(rule, type, $container) {

    /**
     * Get $ul
     * @type {*|jQuery|HTMLElement|{length, append}}
     */
    let $ul = $('ul.publish-rules', $container);

    if (!$ul.length) {

      /**
       * Set $ul
       * @type {*|jQuery}
       */
      $ul = $('<ul />').addClass('publish-rules');

      /**
       * Define title
       * @type {string}
       */
      const title = 'Published events';

      $container.find('div.content-rules').append(
          $('<fieldset />').append([
            $('<legend />').text(title).on('click.toggle',
                this.toggleFieldset.bind(this)).attr({title: title}), $ul
          ]));
    }

    if (!rule) {
      this.view.scope.logger.warn('Select rule');
      return false;
    }

    /**
     * Set value
     * @type {string}
     */
    let value = [type.toLowerCase(), rule].join(':');

    if ($(`li[value="${value}"]`, $ul).length) {
      this.view.scope.logger.warn('Duplicate rule', value);
      return false;
    }

    const $input = `<input value="${rule}" disabled="disabled" type="text" class="form-control" placeholder="Rule">`;
    $ul.append($('<li />').attr({value: value}).append(this.getTemplate(type).append($input)));
  }
}
