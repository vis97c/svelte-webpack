

//create a new formdata object
export function createFormData(array) {
    var formDa = new FormData();
    for (var key in array) {
        formDa.append(key, array[key]);
    }
    return formDa;
}

//promise delay
export function delay(t, val) {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null, val), t);
    });
}
//promise timeout function .all + .race
export function raceAll(promises, timeoutTime, timeoutVal) {
    return Promise.all(promises.map(p => {
        return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])
    }));
}

// export default {createFormData, Promise.raceAll}