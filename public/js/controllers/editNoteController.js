;(function($) {
    let client = window.services.restClient;
    $(function(){
        let output = $("#output");

        let orderContainer = $("#orderContainer");
        let orderRenderer = Handlebars.compile($("#order-template").html());

        let orderId = window.location.hash.substring(1);
        if(!(orderId)) {
            window.location.replace("./index.html");
            return;
        }
        Handlebars.registerHelper("switch", function(value, options) {
            this._switch_value_ = value;
            let html = options.fn(this);
            delete this._switch_value_;
            return html;
        });

        Handlebars.registerHelper("case", function(value, options) {
            if (value == this._switch_value_) {
                return options.fn(this);
            }
        });

        $(orderContainer).on("click", ".js-edit", function(event){
            let titleValue = $("#title").val();
            let descriptionValue = $("#description").val();
            let ratingValue = $('.rating:checked').val();
            let dateValue = $("#date").val();
            client.editNote($(event.currentTarget).data("id"), titleValue, descriptionValue, ratingValue, dateValue ).done(renderNote);
        });

        function renderNote() {
            client.getNote(orderId).done(function(order){
                orderContainer.html(orderRenderer(order));
            })
        }

        renderNote();
    });
}(jQuery));