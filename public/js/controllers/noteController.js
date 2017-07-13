;(function($) {
    const client = window.services.restClient;

    $(function(){

        var notesContainer = $("#newNoteContainer");
        var ordersRenderer = Handlebars.compile($("#newNote-template").html());
        client.getNotes().done(function(orders){
            notesContainer.html(ordersRenderer({orders : orders}));
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