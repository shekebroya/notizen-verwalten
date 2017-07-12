;(function($) {
    let client = window.services.restClient;
    $(function(){
        var output = $("#output");

        var orderContainer = $("#orderContainer");
        let orderRenderer = Handlebars.compile($("#order-template").html());

        let orderId = window.location.hash.substring(1);
        if(!(orderId)) {

            window.location.replace("./index.html");
            return;
        }

        function renderNote() {
            client.getNote(orderId).done(function(order){
                orderContainer.html(orderRenderer(order));
            })
        }

        $(orderContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderNote);
        });
        $(orderContainer).on("click", ".js-update", function(event){
            client.updateNote($(event.currentTarget).data("id")).done(renderNote);
        });

        renderNote();
    });
}(jQuery));