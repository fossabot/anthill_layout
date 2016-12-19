/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'controller/behavior/behavior.crud',
    'controller/behavior/behavior.window.resize'
], function defineBaseController(AntHill, BehaviorCrud, BehaviorWindowResize) {

    /**
     * Define Base Controller
     * @class BaseController
     * @extends AntHill
     * @extends BehaviorCrud
     * @extends BehaviorWindowResize
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

        /**
         * Define scope
         * @property BaseController
         */
        this.scope = undefined;

        /**
         * Define controller
         * @property BaseController
         */
        this.controller = undefined;
    };

    return BaseController.extend(
        'BaseController', {

            /**
             * Before init config
             * @memberOf BaseController
             */
            beforeInitConfig: function beforeInitConfig() {
                this.logger.debug('Before init config', arguments);
            },

            /**
             * After init config
             * @memberOf BaseController
             */
            afterInitConfig: function afterInitConfig() {
                this.logger.debug('After init config', arguments);
            },

            /**
             * Success Create Element
             * @memberOf BaseController
             * @param {BaseElement} $element
             */
            successCreateElement: function successCreateElement($element) {
                this.logger.debug('Success build element', $element);
            },

            /**
             * Success Build Element
             * @memberOf BaseController
             * @param {BaseElement} $element
             */
            successBuildElement: function successBuildElement($element) {
                this.logger.debug('Success build element', $element);
            },

            /**
             * Success Destroy Element
             * @memberOf BaseController
             * @param {BaseElement|{name}} $element
             */
            successDestroyElement: function successDestroyElement($element) {
                this.logger.debug(
                    this.i18n.t('element.overwritten').replace(/\{0}/, $element.name),
                    $element
                );
            },

            /**
             * Get cache
             * @memberOf BaseController
             * @param {string} [uuid]
             * @returns {*}
             */
            getCache: function getCache(uuid) {

                /**
                 * Get root
                 * @type {Application}
                 */
                var root = this.root();

                return uuid ? root.cache[uuid] : root.cache;
            },

            /**
             * Define environment getter
             * @memberOf BaseController
             * @returns {string|environment|*}
             */
            getEnvironment: function getEnvironment() {
                return this.root().config.environment;
            },

            /**
             * Get cache
             * @memberOf BaseController
             * @param {string} uuid
             * @param {*} value
             */
            updateCache: function updateCache(uuid, value) {
                this.root().cache[uuid] = value;
            },

            /**
             * Get cache css
             * @memberOf BaseController
             * @param {string} path
             * @param {*} element
             */
            updateCacheCss: function updateCacheCss(path, element) {

                // Get cache
                var cache = this.root().cache;

                cache.css = cache.css || {};
                cache.css[path] = element;
            },

            /**
             * Define routes setter
             * @memberOf BaseController
             */
            setRoutes: function setRoutes() {

                var routes = this.model.getConfig('routes') || {},
                    index;

                for (index in routes) {
                    if (routes.hasOwnProperty(index)) {
                        this.controller.setRoute(index, routes[index]);
                    }
                }
            },

            /**
             * Bind model observer
             * @memberOf BaseController
             */
            bindModelObserver: function bindModelObserver() {
                this.logger.debug('Bind model observer', arguments);
                if (this.model) {
                    this.model.bindModelObserver.apply(this, arguments);
                }
            },

            /**
             * After loading items
             * @memberOf BaseController
             */
            afterLoadingItems: function afterLoadingItems() {
                this.logger.debug(
                    'After loading items',
                    this.model.getItems()
                );
                this.controller.setAsLoading(false);
            },

            /**
             * Set core loading attribute
             * @memberOf BaseController
             * @param load
             */
            setAsLoading: function setAsLoading(load) {

                /**
                 * Get root
                 * @type {Application}
                 */
                var root = this.root();

                root.model.setConfig('loading', load);

                if (this.scope === root) {

                    root.observer.publish(
                        root.eventmanager.eventList.setAsLoaded
                    );
                }
            },

            /**
             * Set as loaded
             * @memberOf BaseController
             */
            setAsLoaded: function setAsLoaded() {

                this.logger.debug('Application was loaded');

                /**
                 * Get item constructor name
                 * @type {string}
                 */
                var namespace = this.model.getItemNameSpace();

                /**
                 * Get workspace
                 * @type {WorkspaceController}
                 */
                var wsc = this[namespace].controller;

                if (wsc) {
                    wsc.switchPageOnHashChange();
                }
            },

            /**
             * Check if core already loaded
             * @memberOf BaseController
             * @returns {boolean}
             */
            isLoading: function isLoading() {
                return this.root().model.getConfig('loading');
            },

            /**
             * Get Application mode
             * @memberOf BaseController
             * @returns {*|number}
             */
            getMode: function getMode() {
                return this.root().config.mode;
            },

            /**
             * Get parent node object
             * @memberOf BaseController
             * @returns {*}
             */
            getContainment: function getContainment() {
                return this.scope.containment;
            },

            /**
             * Get Application Root
             * @memberOf BaseController
             * @returns {*|string}
             */
            root: function root() {

                /**
                 * Define root instance
                 * @type {*}
                 */
                var root = this.scope;
                while (root.hasOwnProperty('containment')) {
                    root = root.containment;
                }

                return root;
            },

            /**
             * Get Application name
             * @memberOf BaseController
             * @returns {string}
             */
            getAppName: function getAppName() {

                return this.root().model.getConfig('appName');
            },

            /**
             * Get Workspace
             * @memberOf BaseController
             * @param {string} [uuid]
             * @returns {Workspace}
             */
            getWorkspace: function getWorkspace(uuid) {

                /**
                 * Get root
                 * @type {Application}
                 */
                var root = this.root();

                return this.base.isDefined(uuid) ?
                    root.model.getItemByUUID(uuid) :
                    root.model.getCurrentItem();
            },

            /**
             * Get Page
             * @memberOf BaseController
             * @param {string} [uuid]
             * @returns {Page}
             */
            getPage: function getPage(uuid) {

                /**
                 * Define workspace
                 * @type {Workspace}
                 */
                var workspace = this.getWorkspace();

                return this.base.isDefined(uuid) ?
                    workspace.model.getItemByUUID(uuid) :
                    workspace.model.getCurrentItem();
            },

            /**
             * Get Widget
             * @memberOf BaseController
             * @param {string} [uuid]
             * @returns {*|Widget}
             */
            getWidget: function getWidget(uuid) {

                /**
                 * Get page
                 * @type {Page}
                 */
                var page = this.getPage();

                return this.base.isDefined(uuid) ?
                    page.model.getItemByUUID(uuid) :
                    page.model.getCurrentItem();
            },

            /**
             * Get Config Logger
             * @memberOf BaseController
             * @param {String} log
             * @param {Object} hash
             */
            getConfigLog: function getConfigLog(log, hash) {
                this.logger.debug(log, hash);
            },

            /**
             * Get scope view
             * @memberOf BaseController
             * @returns {view}
             */
            getView: function getView() {
                return this.scope.view;
            },

            /**
             * Get scope model
             * @memberOf BaseController
             * @returns {model}
             */
            getModel: function getModel() {
                return this.scope.model;
            },

            /**
             * Success Created
             * @memberOf BaseController
             */
            successCreated: function successCreated() {

                this.logger.debug('Successfully created');

                this.observer.publish(
                    this.eventmanager.eventList.defineGenericGetter
                );
            },

            /**
             * Define instance getter
             * @memberOf BaseController
             */
            defineGenericGetter: function defineGenericGetter() {

                var containment = this.controller.getContainment(),
                    scope = this;

                if (!containment) {
                    if (scope !== scope.controller.root()) {
                        scope.logger.warn('Undefined containment');
                    }
                    return false;
                }

                /**
                 * Get constructor prototype
                 * @type {BaseController}
                 */
                var controller = containment.controller.constructor.prototype;

                var fnName = 'get' + this.name;

                if (_.isFunction(controller[fnName])) {

                    scope.logger.debug('Getter already implemented', fnName);

                } else if (scope.config.getter) {

                    /**
                     * Define generated getter
                     * @returns {*}
                     */
                    controller[fnName] = function genericGetter() {
                        return scope;
                    };

                } else {

                    scope.logger.debug('Config getter was missing', scope);
                }
            },

            /**
             * Success Rendered
             * @memberOf BaseController
             */
            successRendered: function successRendered() {
                this.logger.debug(
                    this.i18n.t('success.rendered').replace(/\{0}/, this.name),
                    this
                );
            },

            /**
             * Success Render Footer
             * @memberOf BaseController
             * @param {HeaderElement} $header
             * @param {boolean} render
             */
            successRenderHeader: function successRenderHeader($header, render) {
                this.logger.debug(
                    'Success Render Header', render, $header
                );
            },

            /**
             * Success Render Footer
             * @memberOf BaseController
             * @param {FooterElement} $footer
             * @param {boolean} render
             */
            successRenderFooter: function successRenderFooter($footer, render) {
                this.logger.debug(
                    'Success Render Footer', render, $footer
                );
            },

            /**
             * Set item as current in parent node
             * @memberOf BaseController
             */
            setAsCurrent: function setAsCurrent() {
                this.getContainment().controller.setCurrentItem(
                    this.scope
                );
            },

            /**
             * Set current item
             * @memberOf BaseController
             * @param {{}} item
             * @returns {*}
             */
            setCurrentItem: function setCurrentItem(item) {
                var scope = this.scope;
                scope[scope.model.getItemNameSpace()] = item;
                return this.model.getCurrentItem();
            },

            /**
             * Check condition
             * @memberOf BaseController
             * @param {{condition, msg, [type], [args]}} opts
             * @returns {boolean}
             */
            checkCondition: function checkCondition(opts) {

                /**
                 * Define logger
                 * @type {function}
                 */
                var logger = this.scope.logger[opts.type || 'debug'];

                if (opts.condition) {
                    opts.args ?
                        logger(opts.msg, opts.args) :
                        logger(opts.msg);
                    return true;
                }
                return false;
            },

            /**
             * Get Development Mode
             * @memberOf BaseController
             * @returns {Boolean}
             */
            isDevelopmentMode: function isDevelopmentMode() {
                return this.getMode() === 'development';
            },

            /**
             * Get Authorize Mode
             * @memberOf BaseController
             * @returns {Boolean}
             */
            isAuthorizeMode: function isAuthorizeMode() {
                return this.getMode() === 'authorize';
            },

            /**
             * Get Consumption Mode
             * @memberOf BaseController
             * @returns {boolean}
             */
            isConsumptionMode: function isConsumptionMode() {
                return this.getMode() === 'consumption';
            },

            /**
             * Get Custom Mode
             * @memberOf BaseController
             * @returns {boolean}
             */
            isCustomMode: function isCustomMode() {
                return this.getMode() === 'custom';
            },

            /**
             * Get Custom publisher
             * @memberOf BaseController
             * @returns {string|boolean}
             */
            getCustomPublisher: function getCustomPublisher(name) {

                // Get event
                var eventName = 'load' + name.capitalize(),
                    event = this.scope.eventmanager.eventList[eventName];

                if (!event) {
                    this.scope.logger.debug('Undefined custom event', name, eventName);
                    return false;
                }

                // Define custom event
                var publishCustomEvent = event ? [
                    'this.scope.logger.debug(\'Publish custom event\',"' + event + '");',
                    'this.scope.observer.publish("' + event + '");'
                ].join('') : '';

                this.scope.logger.debug('Found custom publisher', publishCustomEvent, event);

                return publishCustomEvent;
            },

            /**
             * Load config preferences
             * @memberOf WorkspaceController
             */
            loadPreferences: function loadPreferences() {

                // Get scope
                var scope = this;

                /**
                 * Get preferences
                 * @type {{}}
                 */
                var prefs = scope.model.getConfig('preferences');

                $.each(prefs, function each(index, value) {

                    /**
                     * Define method name
                     * @type {string}
                     */
                    var setter = 'set' + index.toCamel().capitalize();

                    if (typeof(scope.model[setter]) !== 'function') {

                        /**
                         * Define setter
                         * @type {Function}
                         */
                        var fn = scope.base.lib.function.create({
                            name: setter,
                            params: index,
                            body: 'this._setItemInfoPreferences("' + index + '", ' + index + ');' + scope.controller.getCustomPublisher(index),
                            scope: scope.model.constructor.prototype
                        });

                        scope.logger.debug('Define model setter', fn, index, setter);
                    }

                    scope.model[setter](value);
                });
            },

            /**
             * After update preferences
             * @memberOf BaseController
             */
            afterUpdatePreferences: function afterUpdatePreferences() {
                this.logger.debug('After update preferences', arguments);
            },

            /**
             * Transfer preferences to containment
             * @memberOf BaseController
             * @param index
             * @param value
             */
            transferPreferences: function transferPreferences(index, value) {

                var widgetContent = this.controller.isWidgetContent(),
                    skipTransfer = this.model.checkSkipPreferencesOn(index);

                if (widgetContent || skipTransfer) {
                    return false;
                }

                this.config.preferences[index] = value;
            },

            /**
             * Get preferences
             * @memberOf BaseController
             * @returns {{}}
             */
            getPreferences: function getPreferences() {
                return this.model.preferences;
            },

            /**
             * Get rules
             * @memberOf BaseController
             * @returns {{}}
             */
            getRules: function getRules() {
                return this.model.rules;
            },

            /**
             * Open url in new window or in dialog
             * @memberOf BaseController
             * @param {string} url
             * @param {boolean} selfWindow
             * @param {boolean} isDialog
             */
            openUrlOnEvent: function openUrlOnEvent(url, selfWindow, isDialog) {

                // Workaround to multiple clicks
                this.openUrlEventHandler += 1;

                if (this.openUrlEventHandler > 1) {

                    // Reset event handler
                    this.openUrlEventHandler = 0;
                    return false;
                }

                if (isDialog) {
                    // TODO
                    this.logger.debug('Open url in dialog', url);
                    return false;
                }

                this.logger.debug('Open url in new window', url);

                if (selfWindow) {

                    window.location.href = url;

                } else {

                    /**
                     * Define opened window instance
                     * @property AntHill
                     * @type {Window}
                     */
                    this.openedWindow = window.open(url);
                }
            },

            /**
             * Update site description
             * @memberOf BaseController
             */
            updateSiteDescription: function updateSiteDescription() {

                /**
                 * Get $item
                 * @type {BaseElement}
                 */
                var $item = this.controller.root().view.get$item();

                var siteDescription = this.model.getConfig('preferences')['siteDescription'] ||
                    $item.getSiteDescription();

                $item.setSiteDescription(siteDescription);
            },

            /**
             * Update site keywords
             * @memberOf BaseController
             */
            updateSiteKeywords: function updateSiteKeywords() {

                /**
                 * Get $item
                 * @type {BaseElement}
                 */
                var $item = this.controller.root().view.get$item();

                var siteKeywords = this.model.getConfig('preferences')['siteKeywords'] ||
                    $item.getSiteKeywords();

                $item.setSiteKeywords(siteKeywords);
            },

            /**
             * Extend Config
             * @memberOf BaseController
             * @param {{config, [dom]}} opts
             * @returns {*}
             */
            extendConfig: function extendConfig(opts) {
                var base = this.base,
                    scope = this.scope;

                opts.config = base.lib.hash.extendHash({
                    html: {
                        container: [
                            '#', scope.model.getUUID(),
                            '-', scope.model.getScopeName().toLowerCase()
                        ].join('')
                    },
                    containment: scope
                }, opts.config);

                scope.logger.debug('Configuration', opts.config);

                return opts;
            },

            /**
             * Check is root
             * @memberOf BaseController
             * @param [scope]
             * @returns {boolean}
             */
            isRoot: function isRoot(scope) {
                return (scope || this.scope) === this.root();
            },

            /**
             * Check is workspace
             * @memberOf BaseController
             * @returns {boolean}
             */
            isWorkspace: function isWorkspace() {
                return this.scope.model.getScopeName() === 'Workspace';
            },

            /**
             * Check is page
             * @memberOf BaseController
             * @returns {boolean}
             */
            isPage: function isPage() {
                return this.scope.model.getScopeName() === 'Page';
            },

            /**
             * Check is widget
             * @memberOf BaseController
             * @param {Widget} [item]
             * @returns {boolean}
             */
            isWidget: function isWidget(item) {
                var model = (item || this.scope).model;
                return model ? model.getScopeName() === 'Widget' : false;
            },

            /**
             * Check if item is a core component
             * @memberOf BaseController
             * @returns {*|boolean}
             */
            isCoreComponent: function isCoreComponent() {
                return this.isWidget() || this.isPage() || this.isWorkspace() || this.isRoot();
            },

            /**
             * Check is widget content
             * @memberOf BaseController
             * @returns {boolean}
             */
            isWidgetContent: function isWidgetContent() {

                // Get scope
                var scope = this.scope;

                /**
                 * Get widget
                 * @type {Widget}
                 */
                var widget = scope.controller.getContainment();

                if (widget) {
                    scope.logger.debug('Widget has content');
                    return widget.controller.isWidget();
                }

                scope.logger.info('Root is not widget content');
                return false;
            },

            /**
             * Store data after layout organize
             * @memberOf BaseController
             * @param [node]
             * @param [data]
             * @param {number} [counter]
             */
            store: function store(node, data, counter) {

                /**
                 * Get scope
                 * @type {{permission, logger}}
                 */
                var scope = this.scope;

                if (!scope.permission.getCapability(this.store.name)) {
                    scope.logger[this.isConsumptionMode() ? 'debug' : 'warn'](
                        'Unable to save layout',
                        arguments
                    );
                    return false;
                }

                /**
                 * Define root
                 * @type {Application}
                 */
                var root = this.root();

                /**
                 * Define node
                 * @type {*}
                 */
                node = this.base.define(
                    node,
                    root,
                    true
                );

                /**
                 * Define data
                 * @type {*}
                 */
                data = this.base.define(data, {
                    collector: {}
                }, true);

                /**
                 * Define item list
                 * @type {*}
                 */
                var items = node.model.getItems(),
                    index;

                /**
                 * Define item name space
                 * @type {string}
                 */
                var cname = node.model.getItemNameSpace();

                if (node[cname].model) {

                    /**
                     * Define data
                     * @type {*}
                     */
                    data.collector[cname] = data.collector[cname] || {};

                    $.extend(
                        true,
                        data.collector[cname],
                        node.controller.collectItemProperties(
                            !node[cname].model.getItems()
                        )
                    );
                }

                for (index in items) {

                    if (items.hasOwnProperty(index)) {

                        var item = items[index];

                        if (item.model && item.model.getItems()) {

                            this.store.bind(node.controller)(
                                item,
                                data,
                                Object.keys(items).length
                            );
                        }
                    }
                }

                if (!counter) {
                    root.model.setting.save(data);
                }
            },

            /**
             * Get subscribers list
             * @memberOf BaseController
             * @param {string} event
             * @return {Array}
             */
            getSubscribers: function getSubscribers(event) {

                /**
                 * Define rules
                 * @type {{}}
                 */
                var rules = this.model.rules || {};

                return rules.subscribers ?
                    rules.subscribers[event] : []
            },

            /**
             * Collect items data
             * @memberOf BaseController
             * @param {Boolean} collectDOM
             * @returns {{}}
             */
            collectItemProperties: function collectItemProperties(collectDOM) {

                var collector = {},
                    items = this.model.getItems();

                if (items) {

                    for (var index in items) {

                        if (items.hasOwnProperty(index)) {

                            var item = items[index],
                                uuid = item.model.getConfig('uuid');

                            collector[uuid] = {};

                            /**
                             * Define config
                             * @type {{}}
                             */
                            collector[uuid].config = this.base.lib.hash.extendHash(
                                item.model.getConfig(),
                                collector[uuid].config
                            );

                            /**
                             * Define containment
                             * @type {String}
                             */
                            collector[uuid].containment = item.containment.model.getConfig('uuid');

                            if (collectDOM) {

                                /**
                                 * Collect DOM
                                 * @type {{}}
                                 */
                                collector[uuid].dom = item.dom;
                            }
                        }
                    }
                }

                return collector;
            }
        },
        AntHill.prototype,
        BehaviorCrud.prototype,
        BehaviorWindowResize.prototype
    );
});