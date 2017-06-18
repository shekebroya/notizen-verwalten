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
}

/***************************************************************************
*** FUNCTIONS ***/


function setData() {
    console.log("note.html");

    var numberListItems = 0;
    numberListItems += 1;
    
    var titleValue = document.getElementById("title").value;
    var descriptionValue = document.getElementById("description").value;
    var importanceValue = document.querySelector('.rating:checked').value;
    var finishValue = document.getElementById("date").value;
    var createdValue = new Date();

    console.log(createdValue);

    //setList
    var setList ={id: numberListItems, title: titleValue, description: descriptionValue, importance: importanceValue, finish: finishValue, created: createdValue};
    localStorage.setItem('listItem', JSON.stringify(setList));

    //getList
    var getList =JSON.parse(localStorage.getItem('listItem'));
    console.log(getList.title);

    // all local storage keys and values
    for (var i = 0; i < localStorage.length; ++i) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }

    // delete keys and values
    /*localStorage.clear();
    localStorage.removeItem('test');
    delete window.localStorage["test"];*/

    alert(setList)

};

function getList() {
    console.log("index.html");


}

/***************************************************************************
 *** CLASS ***/

