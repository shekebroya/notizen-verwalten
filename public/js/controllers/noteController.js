;(function($) {
    const client = window.services.restClient;

    $(function(){

        const btnNewNote = $("#createNote");
        const btnUpdateNote = $("#updateNote");
        const btnCancelNoteFields = $("#cancel");
        const inputTitle = $("#title");
        const inputDescription = $("#description");
        const checkImportance = $(".rating").prop('checked', true);
        const inputFinishDate = $("#date");

        const notesContainer = $("#noteContainer");

        const ordersRenderer = Handlebars.compile($("#note-template").html());

        btnNewNote.click(function (event) {
            client.createNote(
                inputTitle.val(),
                inputDescription.val(),
                checkImportance.val(),
                inputFinishDate.val()
            ).done(function (msg) {
                renderNotes();
            }).fail(function( msg ) {
                //nothing!
            });
            event.preventDefault();
        });
        btnUpdateNote.click(function (event) {
            client.updateNote(
                inputTitle.val(),
                inputDescription.val(),
                checkImportance.val(),
                inputFinishDate.val()
            );
            event.preventDefault();
        });
        btnCancelNoteFields.click(function () {
            alert("Cancel");
            inputTitle.val("");
            inputDescription.val("");
            checkImportance.val("");
            inputFinishDate.val("");
        });

        function renderNotes()
        {
            client.getNotes().done(function(orders){
                notesContainer.html(ordersRenderer({orders : orders}));
            })
        }

        function updateStatus() {
            renderNotes();
        }
        updateStatus();
    });
}(jQuery));