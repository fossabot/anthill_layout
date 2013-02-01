/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function initCRUD(Base) {
    var CRUD = function CRUD() {

    };

    return CRUD.extend({
        createItem: function createItem(opts) {
            return this.updateCollector(
                this.item,
                opts,
                this.scope.items
            );
        },
        destroyItem: function destroyWorkspace(item) {
            var scope = this.scope,
                base = this.base,
                namespace = item.constructor.getConstructorName().toLowerCase();

            if (!base.isDefined(item)) {
                scope.logger.warn('Undefined Item', item);
                return false;
            }

            if (!base.isDefined(item.model)) {
                scope.logger.warn('Uninitialized Item', item);
                return false;
            }

            var items = scope.items,
                index = item.model.getUUID(),
                onDestroy = this.base.define(this.onDestroy, [], true),
                i = 0, l = onDestroy.length;

            for (i; i < l; i += 1) {
                item.observer.publish(
                    this.scope.eventmanager.eventList[onDestroy[i]]
                );
            }

            item.observer.publish(
                item.eventmanager.eventList.destroyItems
            );

            if (items.hasOwnProperty(index)) {
                delete items[index];
            }

            this.scope[namespace] = this.base.lib.hash.firstHashElement(items) || {};

            return items;

        },
        destroyItems: function destroyItems(force) {
            var index,
                items = this.scope.items;
            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    this.destroyItem(items[index])
                }
            }
            return items;
        }

    }, Base);

});