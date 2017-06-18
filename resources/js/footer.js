window.onload = function() {

    var buttonExist = document.getElementById("submit");
    var listExist = document.getElementsByClassName("list-item-wrap");


    if(buttonExist) {
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

    var titleValue = document.getElementById("title").value;
    var descriptionValue = document.getElementById("description").value;
    var importanceValue = document.querySelector('.rating:checked').value;
    var finishDateValue = document.getElementById("date").value;

    var saveValuesInLocalStorage = new itemClass(titleValue, descriptionValue, importanceValue, finishDateValue);

    console.log(saveValuesInLocalStorage.setList);



    // delete keys and values
    /*localStorage.clear();
    localStorage.removeItem('test');
    delete window.localStorage["test"];*/



};

function getList() {
    console.log("index.html");


    //getList
    for (var j = 0; j < localStorage.length; ++j) {
        var getList = JSON.parse(localStorage.getItem('listItem-'+j));
        console.log("getList: "+getList.title);
    }

    // all local storage keys and values
    for (var i = 0; i < localStorage.length; ++i) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }

    for(var k=0; k < localStorage.length; k++) {
        var key = localStorage.key(k);
        var value = localStorage[key];
        var tesct = 3;
        console.log("key: "+key);
        console.log("value: "+value);
    }

}

/***************************************************************************
 *** CLASS ***/

function itemClass(titleValue, descriptionValue, importanceValue, finishDateValue) {

    this.titleValue = titleValue;
    this.descriptionValue = descriptionValue;
    this.importanceValue = importanceValue;
    this.finishDateValue = finishDateValue;
    this.numberListItems = localStorage.length;
    this.listItem = 'listItem-' + this.numberListItems;
    this.createdValue = new Date();

    //setList
    this.setList ={id: this.numberListItems, title: this.titleValue, description: this.descriptionValue, importance: this.importanceValue, finishDate: this.finishDateValue, created: this.createdValue, finished: false};
    localStorage.setItem(this.listItem, JSON.stringify(this.setList));

}