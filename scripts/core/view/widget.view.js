/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/widget/header',
    'element/widget/footer',
    'element/widget/content',
    'element/widget/widget'
], function defineWidgetView(BaseView, Header, Footer, Content, Widget){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        widget: function widget() {
            this.elements.$widget = new Widget(this, {
                id: this.createId(),
                style: this.getContainerClassName(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$widget);
            this.content();
            this.footer(Footer, this.elements.$widget);
        },
        content: function content() {
            this.elements.$content = new Content(this, {
                style: 'content',
                $container: this.elements.$widget.$
            });
        },
        render: function render() {
            this.widget();
        }
    }, BaseView.prototype)

});