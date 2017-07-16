;(function($) {
    const client = window.services.restClient;

    $(function(){

        const notesContainer = $("#notesContainer");
        const notizenRenderer = Handlebars.compile($("#notes-template").html());

        Handlebars.registerHelper("switch", function(value, options) {
            this._switch_value_ = value;
            let html = options.fn(this);
            delete this._switch_value_;
            return html;
        });
        Handlebars.registerHelper("case", function(value, options) {
            if (value == this._switch_value_) {
                return options.fn(this);
            }
        });
        function renderNotes(key) {
            if(key === undefined){
                key = "";
            }
            if(key === "importance" ) {
                sortByImportance();
            }else  if(key === "finish" ) {
                sortByFinish();
            }else  if(key === "created" ) {
                sortByCreated();
            }else {
                client.getNotes().done(function(notizen){
                    notesContainer.html(notizenRenderer({notizen : notizen}));
                })
            }
        }
        $(notesContainer).on("click", "#finish", function() {
            let key = "finish";
            renderNotes(key);
        });
        $(notesContainer).on("click", "#created", function() {
            let key = "created";
            renderNotes(key);
        });
        $(notesContainer).on("click", "#importance", function() {
            let key = "importance";
            renderNotes(key);
        });
        $(notesContainer).on("click", "#finished", function() {
            client.sortNote().done(renderNotes);
        });
        $(notesContainer).on("click", ".js-finish", function(event) {
            client.updateNote($(event.currentTarget).data("id")).done(renderNotes);
        });
        $(notesContainer).on("mouseout", "select", function() {
            var selectedStyle = $("option").filter(':selected').text();
            console.log(selectedStyle);
            if(selectedStyle === "BlackWhite-Style"){
                $("body").addClass("bw-style");
            }else {
                $("body").removeClass("bw-style");
            }
        });
        function sortByFinish() {
            client.getNotes().done(function(notizen) {
                notizen.sort(function (a, b) {
                    if (a.note.finish > b.note.finish) {
                        return +1;
                    }
                    if (a.note.finish < b.note.finish) {
                        return -1;
                    }
                    return 0;
                });
                notesContainer.html(notizenRenderer({notizen : notizen}));
            });
        }
        function sortByImportance() {
            client.getNotes().done(function(notizen) {
                notizen.sort(function (a, b) {
                    if (a.note.importance > b.note.importance) {
                        return -1;
                    }
                    if (a.note.importance < b.note.importance) {
                        return +1;
                    }
                    return 0;
                });
                notesContainer.html(notizenRenderer({notizen : notizen}));
            });
        }
        function sortByCreated() {
            client.getNotes().done(function(notizen) {
                notizen.sort(function (a, b) {
                    if (a.createdValue > b.createdValue) {
                        return -1;
                    }
                    if (a.createdValue < b.createdValue) {
                        return +1;
                    }
                    return 0;
                });
                notesContainer.html(notizenRenderer({notizen : notizen}));
            });
        }
        function updateStatus() {
            renderNotes();
        }
        updateStatus();
    });
}(jQuery));