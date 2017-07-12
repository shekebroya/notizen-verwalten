;(function($) {
    const client = window.services.restClient;

    $(function(){
        const btnNewNote = $("#createNote");
        const btnUpdateNote = $("#updateNote");
        const btnCancelNoteFields = $("#cancel");
        const rating = $(".importance");
        const inputTitle = $("#title");
        const inputDescription = $("#description");
        const checkImportance = $(".rating").prop('checked', true);
        const inputFinishDate = $("#date").toLocaleString('de-DE');

        const notesContainer = $("#notesContainer");

        const ordersRenderer = Handlebars.compile($("#notes-template").html());

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

        $(notesContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderNotes);
        });
        $(notesContainer).on("click", ".js-update", function(event){
            client.updateNote($(event.currentTarget).data("id")).done(renderNotes);
        });

        function updateStatus() {
            renderNotes();
        }
        updateStatus();
    });
}(jQuery));