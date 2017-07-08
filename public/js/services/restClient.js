;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function createPizza(pizzeName, titleValue, descriptionValue, importanceValue, finishDateValue) {
        return ajaxUtil.ajax("POST", "/orders/", {
            name: pizzeName,
            title: titleValue,
            description: descriptionValue,
            importance: importanceValue,
            finish: finishDateValue
        });
    }


    function getOrders() {
        return ajaxUtil.ajax("GET", "/orders/", undefined );
    }

    function getOrder(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, undefined );
    }

    function deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, undefined );
    }

    services.restClient = {

        createPizza: createPizza,
        getOrders,
        getOrder,
        deleteOrder
    };
}(window.services = window.services || { }, jQuery));