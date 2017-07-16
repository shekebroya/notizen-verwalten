;(function($) {
    const client = window.services.restClient;

    $(function(){

        let notesContainer = $("#newNoteContainer");
        let notizenRenderer = Handlebars.compile($("#newNote-template").html());
        client.getNotes().done(function(notizen){
            notesContainer.html(notizenRenderer({notizen : notizen}));
        });

        $("#newNoteContainer").on("click", "#createNote", function () {
            client.createNote(
                $("#title").val(),
                $("#description").val(),
                $('.rating:checked').val(),
                $("#date").val()
            );
        });
        $("#newNoteContainer").on("click", "#cancel", function () {
            $("#title").val("");
            $("#description").val("");
            $('.rating').prop('checked', false);
            $("#date").val("");
        });

    });
}(jQuery));