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
        Handlebars.registerHelper('eachSorted', function(context, options) {
            var ret = "";
            var fnCompare = function(a,b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b) - new Date(a);
            };
            Object.keys(context).sort(fnCompare).forEach(function(key) {
                ret = ret + options.fn({key: key, value: context[key]})
            });
            Object.keys(context).sort().forEach(function(key) {
                ret = ret + options.fn({key: key, value: context[key]})
            });
            return ret
        });

        function renderNotes()
        {
            client.getNotes().done(function(orders){
                notesContainer.html(ordersRenderer({orders : orders}));
            })
        }

        $(notesContainer).on("click", "#finished", function() {
            console.log("click");
            client.sortNote().done(renderNotes);
        });
        $(notesContainer).on("click", ".js-finish", function(event) {
            client.updateNote($(event.currentTarget).data("id")).done(renderNotes);
        });


        function updateStatus() {
            renderNotes();
        }
        updateStatus();
    });
}(jQuery));