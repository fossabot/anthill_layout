/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
    'plugins/rules/rules',
    'element/button.element'
], function defineBaseWidgetRules(BaseRules, ButtonElement) {

    /**
     * Define rules
     * @class BaseWidgetRules
     * @extends Renderer
     * @extends BaseRules
     * @extends PluginElement
     * @constructor
     */
    var BaseWidgetRules = function BaseWidgetRules() {

        /**
         * Buttons collector
         * @property BaseWidgetRules
         * @type {{}}
         */
        this.$buttons = {};
    };

    return BaseWidgetRules.extend('BaseWidgetRules', {

        /**
         * Define default widget rules
         * @memberOf BaseWidgetRules
         * @type {*}
         */
        defaultRules: {},

        /**
         * Get rules template
         * @memberOf BaseWidgetRules
         * @param {string} text
         * @private
         */
        getTemplate: function getTemplate(text) {
            return $([
                '<div class="input-group">',
                '<span class="input-group-addon">', text, '</span>',
                '</div>'
            ].join(''));
        },

        /**
         * Transfer selected value
         * @memberOf BaseWidgetRules
         * @param {string} value
         * @private
         */
        _transferValue: function _transferValue(value) {
            this.scope.$buttons[this.button].$.attr({
                value: value
            })
        },

        /**
         * Render widget rules
         * @memberOf BaseWidgetRules
         * @param widgetRules
         */
        renderWidgetRules: function renderWidgetRules(widgetRules) {

            /**
             * Define rules list
             * @type {Array}
             */
            var rulesList = [];

            for (var key in widgetRules) {

                if (widgetRules.hasOwnProperty(key)) {

                    rulesList.push({
                        type: 'text',
                        value: widgetRules[key]
                    });
                }
            }

            if (rulesList.length === 0) {
                this.view.scope.logger.warn('Widget has no rules', widgetRules);
                return false;
            }

            rulesList.sort(
                function sortByValue(a, b) {
                    return a.value.localeCompare(b.value);
                }
            );

            var text = 'Widget rules';

            this.$.append(
                this.getTemplate(text).append(
                    this.renderCombobox(
                        rulesList,
                        rulesList[0].value,
                        text,
                        'widgetRule', {
                            type: 'click.transferValue',
                            callback: this._transferValue.bind({
                                scope: this,
                                button: 'addWidgetRule'
                            })
                        },
                        true
                    )
                )
            );

            this.view.button(
                ButtonElement, {
                    addWidgetRule: {
                        text: 'Publish',
                        type: 'warning',
                        $container: this.$.find('.input-group:last'),
                        events: {
                            click: 'addWidgetRule'
                        }
                    }
                },
                this.$buttons
            );
        },

        /**
         * Render content rules
         * @memberOf BaseWidgetRules
         * @param contentRules
         */
        renderContentRules: function renderContentRules(contentRules) {

            /**
             * Define rules list
             * @type {Array}
             */
            var rulesList = [];

            for (var key in contentRules) {

                if (contentRules.hasOwnProperty(key)) {

                    rulesList.push({
                        type: 'text',
                        value: contentRules[key]
                    });
                }
            }

            if (rulesList.length === 0) {
                this.view.scope.logger.warn('Content has no rules', contentRules);
                return false;
            }

            rulesList.sort(
                function sortByValue(a, b) {
                    return a.value.localeCompare(b.value);
                }
            );

            var cname = this.view.scope.name,
                text = [cname, 'rules'].join(' ');

            this.$.append(
                this.getTemplate(text).append(
                    this.renderCombobox(
                        rulesList,
                        rulesList[0].value,
                        text,
                        [cname, 'Rule'].join(''), {
                            type: 'click.transferValue',
                            callback: this._transferValue.bind({
                                scope: this,
                                button: 'addContentRule'
                            })
                        },
                        true
                    )
                )
            );

            this.view.button(
                ButtonElement, {
                    addContentRule: {
                        text: 'Publish',
                        type: 'warning',
                        $container: this.$.find('.input-group:last'),
                        events: {
                            click: [
                                'add',
                                this.view.scope.name,
                                'Rule'
                            ].join('')
                        }
                    }
                },
                this.$buttons
            );
        },

        /**
         * Render subscribe rules
         * @memberOf BaseWidgetRules
         * @param subscribe
         */
        renderSubscribeRules: function renderSubscribeRules(subscribe) {

            subscribe = this.base.define(subscribe, {}, true);

            /**
             * Get published rules
             * @type {{}}
             */
            var published = this.view.controller.getPublishedRules();

            var empty = false,
                render = false;

            if (this.base.lib.hash.hashLength(published) === 0) {
                this.view.scope.logger.debug('No published rules', published);
                return false;
            }

            /**
             * Set $ul
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').addClass('subscribe-rules');

            /**
             * Define title
             * @type {string}
             */
            var title = 'Subscribe events';

            for (var index in published) {

                if (published.hasOwnProperty(index)) {

                    var $inner = $('<ul />'),
                        rulesList = this.base.define(
                            published[index].rules, {}, true
                        ),
                        checkedRulesList = this.base.define(
                            subscribe[index], {}, true
                        );

                    empty = !this.base.lib.hash.hashLength(rulesList);

                    for (var type in rulesList) {

                        if (rulesList.hasOwnProperty(type)) {

                            var rules = rulesList[type],
                                checked = checkedRulesList[type] || [];

                            for (var i = 0, l = rules.length; i < l; i++) {

                                var $checkbox = this.renderCheckbox({
                                    name: [type, rules[i]].join(':'),
                                    text: rules[i],
                                    checked: $.inArray(rules[i], checked) !== -1,
                                    disabled: false,
                                    visible: true
                                });

                                $checkbox.find('.input-group-addon').append(type);

                                $inner.append(
                                    $('<li />').append($checkbox)
                                );
                            }
                        }
                    }

                    if (!empty) {

                        render = true;

                        $('<li />').append(
                            $('<fieldset />').append([
                                $('<legend />').attr({'data-uuid': index}).html([
                                    '<span class="glyphicon glyphicon-chevron-up"></span>',
                                    published[index].type, ': ',
                                    index.replace(/-content/, '')
                                ].join('')).on('click.toggle', this.toggleFieldset.bind(this)),
                                $inner
                            ])
                        ).appendTo($ul);
                    }
                }
            }

            if (render) {

                this.$.find('div.content-rules').append(
                    $('<fieldset />').append([
                        $('<legend />').text(title).on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: title
                        }),
                        $ul
                    ])
                );
            }
        },

        /**
         * Render data
         * @memberOf BaseWidgetRules
         * @param data
         * @param widgetRules
         * @param contentRules
         */
        renderBaseRulesData: function renderBaseRulesData(data, widgetRules, contentRules) {

            /**
             * Buttons collector
             * @memberOf BaseWidgetRules
             * @type {{}}
             */
            this.$buttons = this.base.define(this.$buttons, {}, true);

            this.renderWidgetRules(widgetRules);
            this.renderContentRules(contentRules);

            this.$.append('<div class="content-rules" />');

            this.renderSubscribeRules(data.subscribe);
        },

        /**
         * Add new rule
         * @memberOf BaseWidgetRules
         * @param {string} rule
         * @param {string} type
         * @param $container
         * @returns {boolean}
         */
        addRule: function addRule(rule, type, $container) {

            /**
             * Get $ul
             * @type {*|jQuery|HTMLElement}
             */
            var $ul = $('ul.publish-rules', $container);

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
                var title = 'Published events';

                $container.find('div.content-rules').append(
                    $('<fieldset />').append([
                        $('<legend />').text(title).on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: title
                        }),
                        $ul
                    ])
                );
            }

            if (!this.base.isDefined(rule)) {
                this.view.scope.logger.warn('Select rule');
                return false;
            }

            /**
             * Set value
             * @type {string}
             */
            var value = [type.toLowerCase(), rule].join(':');

            if ($('li[value="' + value + '"]', $ul).length > 0) {
                this.view.scope.logger.warn('Duplicate rule', value);
                return false;
            }

            $ul.append(
                $('<li />').attr({
                    value: value
                }).append(
                    this.getTemplate(type).append(
                        '<input value="' + rule + '" disabled="disabled" type="text" class="form-control" placeholder="Rule">'
                    )
                )
            );
        }

    }, BaseRules.prototype);
});