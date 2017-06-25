window.onload = function() {

    // delete keys and values
    /*localStorage.clear();
    localStorage.removeItem('test');
    delete window.localStorage["test"];*/

    let buttonExist = document.getElementById("submit");
    let listExist = document.getElementsByClassName("list-item-wrap");

    if(buttonExist) {
        console.log("note.htlm");
        buttonExist.addEventListener("click", function() {
            setData();
        });
    }
    if(listExist.length > 0) {
        getList();
    }
};

/***************************************************************************
*** FUNCTIONS ***/


function setData() {
    console.log("note.html");

    let titleValue = document.getElementById("title").value;
    let descriptionValue = document.getElementById("description").value;
    let importanceValue = document.querySelector('.rating:checked').value;
    let finishDateValue = document.getElementById("date").value;
    let finished = false;
    let editing = false;
    let listItem = "";

    let saveValuesInLocalStorage = new itemClass(titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, listItem);


    //console.log(saveValuesInLocalStorage.setList);

}

function getList() {
    console.log("index.html");


    //getList
    for (let j = 0; j < localStorage.length; ++j) {
        let localStoradeList = JSON.parse(localStorage.getItem('listItem-'+j));
        console.log("localStoradeList: "+localStoradeList.title);
    }

    // all local storage keys and values
    for (let i = 0; i < localStorage.length; ++i) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }

    for(let k=0; k < localStorage.length; k++) {

        let key = localStorage.key(k);
        let value = localStorage[key];
        let noteList = document.getElementById("note-list");
        let titleValue = JSON.parse(localStorage.getItem('listItem-'+k)).title;
        let descriptionValue = JSON.parse(localStorage.getItem('listItem-'+k)).description;
        let importanceValue = JSON.parse(localStorage.getItem('listItem-'+k)).importance;

        let tagContent ="";
        console.log("key: "+key);
        console.log("value: "+value);
        console.log("importanceValue: " + importanceValue);

        tagContent += '<div id="' + key + '" class="list-item">';
        tagContent += '<div class="col-12 right"><div class="importance">';
        switch (importanceValue) {
            case "1":
                tagContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span class="active">☆</span>';
                break;
            case "2":
                tagContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span class="active">☆</span><span class="active">☆</span>';
                break;
            case "3":
                tagContent += '<span>☆</span><span>☆</span><span>☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span>';
                break;
            case "4":
                tagContent += '<span>☆</span><span>☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span>';
                break;
            case "5":
                tagContent += '<span>☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span>';
                break;
            case "6":
                tagContent += '<span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span><span class="active">☆</span>';
                break;
            default:
                tagContent += '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>';
                break;
        }
        tagContent += '</div>';
        tagContent += '<div class="table-row space-between"><div class="col-3 left">';
        tagContent += '<div>Nächten Mittwoch</div>';
        tagContent += '<div class="finished-checkbox"><input id="finish-'+key+'" type="checkbox" name="finish" value="finished"> <label for="finish-'+key+'">Finished</label></div>';
        tagContent += '</div>';
        tagContent += '<div class="col-5 middle">';
        tagContent += '<div class="title">'+titleValue+'</div>';
        tagContent += '<div class="description">'+descriptionValue+'</div>';
        tagContent += '</div>';
        tagContent += '<div class="col-2 right"><a class="button green edit-button" href="note.html">Edit</a></div>';
        tagContent += '</div>';
        tagContent += '</div>';

        noteList.innerHTML += tagContent;
    }

    let editButton = document.getElementsByClassName("edit-button");
    let editFunction = function() {

        let keyValue = this.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        let listName = JSON.parse(localStorage.getItem(keyValue));
        let titleValue = listName.title;
        let descriptionValue = listName.description;
        let importanceValue = listName.importance;
        let finishDateValue = listName.finishDate;
        let finished = listName.finished;
        let editing = true;
        let listItem = keyValue;

        let editValuesInLocalStorage = new itemClass(titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, listItem);
        
    };
    for (let m = 0; m < editButton.length; m++) {
        editButton[m].addEventListener('click', editFunction, false);
    }



}

/***************************************************************************
 *** CLASS ***/

function itemClass(titleValue, descriptionValue, importanceValue, finishDateValue, finished, editing, listItem) {

    this.titleValue = titleValue;
    this.descriptionValue = descriptionValue;
    this.importanceValue = importanceValue;
    this.finishDateValue = finishDateValue;
    this.numberListItems = localStorage.length;
    this.createdValue = new Date();
    this.finished = finished;
    this.editing = editing;

    if(listItem.length > 0) {
        this.listItem = listItem;
    }else {
        this.listItem = 'listItem-' + this.numberListItems;
    }

    //setList
    this.setList = {
        id: this.numberListItems,
        title: this.titleValue,
        description: this.descriptionValue,
        importance: this.importanceValue,
        finishDate: this.finishDateValue,
        created: this.createdValue,
        finished: this.finished,
        editing: this.editing
    };
    localStorage.setItem(this.listItem, JSON.stringify(this.setList));

}