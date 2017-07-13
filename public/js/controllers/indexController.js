;(function($) {
    const client = window.services.restClient;

    $(function(){

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

        function renderNotes()
        {
            client.getNotes().done(function(orders){
                notesContainer.html(ordersRenderer({orders : orders}));
            })
        }

        $(notesContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderNotes);
        });
        $(notesContainer).on("click", ".js-finish", function(event){
            client.updateNote($(event.currentTarget).data("id")).done(renderNotes);
        });


        function updateStatus() {
            renderNotes();
        }
        updateStatus();
    });
}(jQuery));