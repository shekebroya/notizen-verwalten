;(function(services) {
    function setItem(name, value) {
        alert(name);
        console.log(name);
        if (value) {
            console.log(value);
            localStorage.setItem(name, JSON.stringify(value));
        }
        else {
            localStorage.removeItem(name);
        }
    }

    function getItem(name) {
        return JSON.parse(localStorage.getItem(name) || null);
    }

    services.valueStorage = {getItem, setItem};
}(window.services = window.services || { }));