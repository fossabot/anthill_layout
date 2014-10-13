/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller',
    'plugins/preferences/widget.content.preferences.controller'
], function defineEventsController(PluginBase, WidgetContentController, WidgetContentPreferencesController) {

    /**
     * Define events controller
     * @class EventsController
     * @extends PluginController
     * @extends WidgetContentController
     * @extends WidgetContentPreferencesController
     * @constructor
     */
    var EventsController = function EventsController() {
    };

    return EventsController.extend('EventsController', {

        /**
         * Set embedded content
         * @member EventsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$events.renderEmbeddedContent();
        },
        
        getStoredData: function getStoredData() {
            return this.model.getPrefs('eventsJson');
        },

        /**
         * Add Events rule
         * @member EventsController
         * @param e
         */
        addEventsRule: function addEventsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        },

        /**
         * Get Event Data
         * @member EventsController
         * @param {number} timestamp
         * @param {EventsElement} $element
         */
        getEventData: function getEventData(timestamp, $element) {

            /**
             * Get events list
             * @type {Object}
             */
            var events = this.controller.getEventsList();

            if (events.hasOwnProperty(timestamp)) {

                // Update
                this.observer.publish(
                    this.eventmanager.eventList.setActiveEvent,
                    events[timestamp]
                );

                $element.renderFormData(
                    this.controller.getAciveEvent()
                );

            } else {

                // Create new
                $element.renderFormData({});
            }
        },

        /**
         * Get events list
         * @member EventsController
         * @returns {Object}
         */
        getEventsList: function getEventsList() {

            var events = '{}';

            try {

                events = JSON.parse(
                    this.model.getPrefs('eventsJson') || events
                );

            } catch (e) {

                this.scope.logger.warn('Unable to parse events list', e);
            }

            return events;
        },

        /**
         * Set active event
         * @member EventsController
         * @param event
         */
        setActiveEvent: function setActiveEvent(event) {
            this.activeEvent = event;
        },

        /**
         * Get active event
         * @member EventsController
         * @return {object}
         */
        getAciveEvent: function getActiveEvent() {
            return this.scope.activeEvent || {};
        },

        /**
         * Update events data JSON
         * @member EventsController
         * @param event
         */
        updateEventsData: function updateEventsData(event, timestamp) {

            /**
             * Get events list
             * @type {Object}
             */
            var events = this.controller.getEventsList(),
                createMsg = 'Create',
                updateMsg = 'Update';

            this.logger.debug([
                (events.hasOwnProperty(timestamp) ?
                    updateMsg : createMsg),
                'event'
            ].join(' '), event);

            events[timestamp] = event;

            var json = JSON.stringify(events);
            
            this.model.setEventsJson(
                json
            );
            
            this.observer.publish(
                this.eventmanager.eventList.transferContentPreferences,
                ['eventsJson', json]
            );
            
            this.controller.store();
            
        }

    }, PluginBase.prototype, WidgetContentController.prototype, WidgetContentPreferencesController.prototype);
});