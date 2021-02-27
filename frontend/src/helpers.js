export function getFromLocalStorage(key) {
    var object = JSON.parse(window.localStorage.getItem(key));

    if (object !== null) {
        var dateString = object.timestamp;
        var now = new Date().getTime();

        if (dateString > now) {
            var token = object.value;
        }
        else {
            var token = '';
        }

        return token;
    }
    else {
        return '';
    }
}