;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function createNote(titleValue, descriptionValue, importanceValue, finishDateValue) {
        return ajaxUtil.ajax("POST", "/notizen/", {
            title: titleValue,
            description: descriptionValue,
            importance: importanceValue,
            finish: finishDateValue
        });
    }
    function getNotes() {
        return ajaxUtil.ajax("GET", "/notizen/", undefined );
    }
    function getNote(id) {
        return ajaxUtil.ajax("GET", `/notizen/${id}`, undefined );
    }
    function sortNote() {
        console.log("sortNote restClient.js");
        return ajaxUtil.ajax("GET", "/notizen/", undefined );
    }
    function updateNote(id) {
        return ajaxUtil.ajax("PUT", `/notizen/${id}`, undefined );
    }
    function editNote(id, titleValue, descriptionValue, ratingValue, dateValue) {
        return ajaxUtil.ajax("PUT", `/notizen/edit/${id}`, {
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