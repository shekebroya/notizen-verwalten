;(function($) {
    const client = window.services.restClient;

    $(function(){
        const btnNewPizza = $("#createPizza");
        const inputPizza = $("#pizzaName");
        const inputTitle = $("#title");
        const inputDescription = $("#description");
        const checkImportance = $(".rating").prop('checked', true);
        const inputFinishDate = $("#date");

        const ordersContainer = $("#ordersContainer");

        const ordersRenderer = Handlebars.compile($("#orders-template").html());

        btnNewPizza.click(function (event) {
            client.createPizza(
                inputPizza.val(),
                inputTitle.val(),
                inputDescription.val(),
                checkImportance.val(),
                inputFinishDate.val()
            ).done(function (msg) {
                renderOrders();
            }).fail(function( msg ) {
                //nothing!
            });
            inputPizza.val("");
            inputTitle.val("");
            inputDescription.val("");
            checkImportance.val("");
            inputFinishDate.val("");

            event.preventDefault();
        });

        function renderOrders()
        {
            client.getOrders().done(function(orders){
                ordersContainer.html(ordersRenderer({orders : orders}));
            })
        }

        $(ordersContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderOrders);
        });

        function updateStatus() {
            renderOrders();
        }
        updateStatus();
    });
}(jQuery));