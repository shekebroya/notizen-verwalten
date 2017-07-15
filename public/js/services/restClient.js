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
    function sortNote() {
        console.log("sortNote restClient.js");
        return ajaxUtil.ajax("GET", "/orders/sort/", undefined );
    }
    function updateNote(id) {
        return ajaxUtil.ajax("PUT", `/orders/${id}`, undefined );
    }
    function editNote(id, titleValue, descriptionValue, ratingValue, dateValue) {
        return ajaxUtil.ajax("PUT", `/orders/edit/${id}`, {
            title: titleValue,
            description: descriptionValue,
            importance: ratingValue,
            finish: dateValue
        });
    }

    services.restClient = {
        createNote,
        getNotes,
        getNote,
        sortNote,
        updateNote,
        editNote
    };
}(window.services = window.services || { }, jQuery));