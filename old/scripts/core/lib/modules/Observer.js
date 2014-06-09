/**
 * Created by Vladimir Tkach.
 * User: i061485
 * Date: 1/5/12
 * Time: 11:40 AM
 * Project: JetBrains RubyMine
 **/

define([
    'config/anthill'
], function defineObserver(AntHill) {

    /**
     * Define observer
     * @constructor
     * @extends AntHill
     * @class Observer
     */
    var Observer = function Observer() {

        /**
         * Define listeners
         * @member Observer
         * @type {{}}
         */
        this.listeners = {};
    };

    return Observer.extend('Observer', {

        /**
         * Get events list
         * @member Observer
         * @returns {*}
         */
        getEventList: function getEventList() {
            return this.scope.eventmanager.events;
        },
        /**
         * Get event UUID
         * @member Observer
         * @param {String} eventName
         * @returns {Array}
         */
        getEventUUID: function getEventUUID(eventName) {
            var index, uuid = [];
            for (index in this.listeners) {
                if (this.listeners.hasOwnProperty(index)) {
                    var events = this.listeners[index],
                        event, i = 0, l = events.length;

                    for (i; i < l; i += 1) {
                        event = events[i];
                        if (event.eventName === eventName) {
                            uuid.push(event.eventUUID);
                        }
                    }
                }
            }
            return uuid;
        },
        /**
         * Get event name
         * @member Observer
         * @param {String} eventUUID
         * @return {{}}
         */
        getEventName: function getEventName(eventUUID) {

            var events = this.getEventList();

            if (events.hasOwnProperty(eventUUID)) {
                return events[eventUUID];
            }

            this.scope.logger.warn('Undefined event UUID', eventUUID);
        },

        /**
         * Execute function after specific timeout
         * @member Observer
         * @param {Function} fnCallback
         * @param {Number} [msTimeout]
         * @param {*} [thisScope]
         * @param {Array} [args]
         * @return {*}
         */
        defer: function defer(msTimeout, fnCallback, thisScope, args) {
            msTimeout = this.base.define(msTimeout, 0.01);
            args = this.base.define(args, [], true);
            if (msTimeout === 0) {
                fnCallback.apply(thisScope, args);
                return 0;
            } else {
                var bound = function bound() {
                    return fnCallback.apply(thisScope || window, args);
                };
                return window.setTimeout(bound, msTimeout);
            }
        },

        /**
         * Add event
         * @member Observer
         * @param {String} eventName
         * @return {{}}
         */
        addEvent: function addEvent(eventName) {
            var listeners = this.listeners;
            listeners[eventName] = this.base.define(listeners[eventName], []);
            return listeners[eventName];
        },

        /**
         * Remove event
         * @member Observer
         * @param {String} eventName
         */
        removeEvent: function removeEvent(eventName) {
            delete this.listeners[eventName];
        },

        /**
         * On event
         * @member Observer
         * @param {{eventUUID, params, state, priority, eventName}} opts
         * @return {String}
         */
        onEvent: function onEvent(opts) {
            var base = this.base;
            opts = base.define(opts, {}, true);
            opts.eventUUID = base.lib.generator.UUID();
            opts.params = base.define(opts.params, {}, true);
            opts.state = {};
            // Default: normal,
            // high, low
            var priority = base.define(opts.priority, 'normal');
            this.listeners[opts.eventName].push(opts);
            return opts.eventUUID;
        },

        /**
         * Unregister event
         * @param {string} event
         * @param {string} uuid
         * @returns {string|boolean}
         */
        unRegister: function unRegister(event, uuid) {

            var scope = this.scope,
                listener = this.listeners[event];

            if (!listener) {

                /**
                 * Get content
                 * @type {*}
                 */
                var content = scope.controller.getContent();

                if (content) {

                    return content.observer.unRegister.
                        bind(content.observer)(event, uuid);

                } else {

                    scope.logger.warn(
                        'Undefined event',
                        this.listeners,
                        event,
                        uuid
                    );

                    return false;
                }
            }

            for (var i = 0, l = listener.length; i < l; i++) {

                if (listener[i].eventUUID === uuid) {

                    delete listener[i];
                    listener.splice(i, 1);

                    scope.logger.info(
                        'Successfully unregistered event',
                        [event, uuid]
                    );

                    return uuid;
                }
            }

            this.scope.logger.warn(
                'Unable to delete undefined event',
                [event, uuid]
            );

            return false;
        },

        /**
         * Un event
         * @member Observer
         * @param {String} eventName
         * @param {String} eventUUID
         * @return {Boolean}
         */
        unEvent: function unEvent(eventName, eventUUID) {

            eventUUID = this.unRegister(eventName, eventUUID);

            if (eventUUID) {
                delete this.scope.eventmanager.events[eventUUID];
                return true;
            }

            return false;
        },

        /**
         * Publish event
         * @member Observer
         * @param {string} eventName
         * @param {*} [args]
         */
        publish: function publish(eventName, args) {
            var base = this.base,
                scope = this.scope;

            if (!base.isDefined(eventName)) {
                scope.logger.warn('Event', eventName);
            }

            scope.logger.timer(eventName, true);
            args = base.define(args, []);

            if (!base.isArray(args)) {
                args = [args];
            }

            this.fireEvent(this.listeners[eventName], args);

            scope.logger.timer(eventName, false);
        },

        /**
         * Fire event
         * @member Observer
         * @param {Array} events
         * @param {Array} [args]
         * @return {Boolean}
         */
        fireEvent: function fireEvent(events, args) {

            events = this.base.define(events, [], true);

            var i = 0, l = events.length;
            for (i; i < l; i += 1) {
                if (this.base.isDefined(events[i])) {
                    if (false === this.executeEvent(this.scope, events[i], args)) {
                        return false;
                    }
                }
            }
        },

        /**
         * Execute event
         * @member Observer
         * @param {*} [scope]               Run callback in default scope
         * @param {{
         *      state: *,                   Private internal hash
         *      callback: Function,         Callback fn
         *      scope: *,                   Override default scope
         *      params: {
         *          single: boolean,        Single run auto unbind
         *          buffer: number,         Single run in timeout range in ms
         *          timeout: number,        Last call in timeout range in ms
         *          delay: number           Run after timeout in ms
         *      }
         * }} opts
         * @param {Array} [args]            Callback params
         * @return
         */
        executeEvent: function executeEvent(scope, opts, args) {

            var base = this.base;

            opts.state.lastCallAt = base.lib.datetime.timestamp();

            // Capture multiple event as single event within buffer time frame
            if (opts.params.buffer) {

                // If defined last call and time diff less than buffer ->
                // break event execution
                if (opts.state.lastExecutionAt
                    && ((opts.state.lastCallAt - opts.state.lastExecutionAt) <
                        opts.params.buffer)) {
                    return;
                }

            }

            // If args is not array -> force to array (else it will broke .apply())
            if (!base.isArray(args)) {
                args = [args];
            }

            // Override default scope
            if (base.isDefined(opts.scope)) {
                scope = opts.scope;
            }

            // Detach event automatically if have single option
            if (opts.params.single) {
                this.unEvent(opts.eventName, opts.eventUUID);
            }

            /**
             * Execute callback is a function which
             * will be executed on fnWrapper return.
             * Note: fnWrapper can override executeCallback function
             * to maintain event options like: delay, buffer, etc...
             * @returns {*}
             */
            var executeCallback = function executeCallback() {

                opts.state.lastExecutionAt = opts.state.lastCallAt;

                if (base.isFunction(opts.callback)) {

                    opts.callback.eventName = opts.eventName;
                    return opts.callback.apply(scope, args);

                } else {

                    scope.logger.warn('Undefined callback', opts);
                    return false;
                }
            };

            // Fire event only when timeout is over, each event fill reset timeout
            if (opts.params.timeout) {

                if (opts.state.inTimeout) {
                    return false;
                }

                var executeCallbackB4Timeout = executeCallback;

                executeCallback = function executeCallback() {
                    opts.state.inTimeout = true;

                    this.defer(opts.params.timeout, function deferCallback() {

                        var currentTime = this.base.lib.datetime.timestamp();
                        var triggerTime = opts.state.lastCallAt + opts.params.timeout;

                        /**
                         * If we are reached trigger time (when no new event was occurred
                         * within timeout) then we can continue to executing callback
                         * function.
                         * Else, rerunning this function with defer based on last call at
                         * time.
                         */
                        if (triggerTime > currentTime) {
                            this.defer(triggerTime - currentTime, executeCallback, this);
                            return;
                        }

                        executeCallbackB4Timeout.apply(this);
                        opts.state.inTimeout = false;

                    }, this);

                };

            }

            // Run in defer if have delay
            if (opts.params.delay) {

                var executeCallbackB4Defer = executeCallback;

                executeCallback = function executeCallback() {
                    this.defer(opts.params.delay, executeCallbackB4Defer, this);
                };
            }

            return executeCallback.apply(this);
        }

    }, AntHill.prototype);

});