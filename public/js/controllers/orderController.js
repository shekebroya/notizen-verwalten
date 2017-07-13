;(function($) {
    let client = window.services.restClient;
    $(function(){
        var output = $("#output");

        var orderContainer = $("#orderContainer");
        var orderRenderer = Handlebars.compile($("#order-template").html());

        var orderId = window.location.hash.substring(1);
        if(!(orderId)) {
            window.location.replace("./index.html");
            return;
        }
        Handlebars.registerHelper("switch", function(value, options) {
            this._switch_value_ = value;
            var html = options.fn(this);
            delete this._switch_value_;
            return html;
        });

        Handlebars.registerHelper("case", function(value, options) {
            if (value == this._switch_value_) {
                return options.fn(this);
            }
        });

        $(orderContainer).on("click", ".js-edit", function(event){
            var titleValue = $("#title").val();
            var descriptionValue = $("#description").val();
            var ratingValue = $('.rating:checked').val();
            var dateValue = $("#date").val();
            client.updateNote($(event.currentTarget).data("id"), titleValue, descriptionValue, ratingValue, dateValue ).done(renderNote);
        });

        function renderNote() {
            client.getNote(orderId).done(function(order){
                orderContainer.html(orderRenderer(order));
            })
        }

        renderNote();
    });
}(jQuery));