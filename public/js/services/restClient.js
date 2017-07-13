;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function createNote(titleValue, descriptionValue, importanceValue, finishDateValue) {
        return ajaxUtil.ajax("POST", "/orders/", {
            title: titleValue,
            description: descriptionValue,
            importance: importanceValue,
            finish: finishDateValue
        });
    }

    function getNotes() {
        return ajaxUtil.ajax("GET", "/orders/", undefined );
    }
    function getNote(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, undefined );
    }
    function deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, undefined );
    }
    function updateNote(id) {
        return ajaxUtil.ajax("PUT", `/orders/${id}`, undefined );
    }
    function editNote(id) {
        return ajaxUtil.ajax("PUT", `/orders/${id}`, undefined );
    }

    services.restClient = {
        createNote,
        getNotes,
        getNote,
        deleteOrder,
        updateNote,
        editNote
    };
}(window.services = window.services || { }, jQuery));