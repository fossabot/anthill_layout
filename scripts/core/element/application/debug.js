/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineWorkspaceContainer(Base, BaseElement) {

    var Debugger = function Debugger(view, opts) {
        return this.config(view, opts).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Debugger.extend({
        config: function config(view, opts) {
            this.view = view;
            this.style = opts.style;
            this.events = opts.events;
            this.id = this.renderUUID(opts.id);
            this.$ = $('<div />').attr({
                id: opts.id
            }).addClass(this.style).
                append(
                    $('<div />')
                );

            this.bindEvents();

            return this;
        }

    }, Base, BaseElement.prototype);
});