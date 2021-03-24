let inputDate;

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const dlNameEl = document.getElementById('dlName')

const formEl = document.getElementById('form1');
const dateInputEl = document.getElementById('input-date');
const nameInputEl = document.getElementById('input-name')


document.addEventListener('siteReload', getDate);
formEl.addEventListener('submit', onSubmit);

function getDate(e) {
    let storageDate;
    let storageName;

    if(localStorage.getItem('date') === null) {
        storageDate = '1 1 2022';
    } else {
        storageDate = JSON.parse(localStorage.getItem('date'));
    }

    if(localStorage.getItem('name') === null) {
        storageName = 'New Year 2022';
    } else {
        storageName = JSON.parse(localStorage.getItem('name'));
    }

    //console.log(storageDate);
    inputDate = storageDate;
    dlNameEl.textContent = storageName;
}

function StorageSaveDate() {
    let storageDate;
    let storageName;

    if(localStorage.getItem('date') === null) {
        storageDate = '';
    } else {
        storageDate = JSON.parse(localStorage.getItem('date'));
    }

    if(localStorage.getItem('name') === null) {
        storageName = 'New Year 2022';
    } else {
        storageName = JSON.parse(localStorage.getItem('name'));
    }

    storageDate = dateInputEl.value;
    storageName = nameInputEl.value;
    localStorage.setItem('date' ,JSON.stringify(storageDate));
    localStorage.setItem('name', JSON.stringify(storageName));
}

function onSubmit(e) {
    e.preventDefault();

    dlNameEl.textContent = nameInputEl.value;
    inputDate = dateInputEl.value;
    StorageSaveDate();
}

function countdown() {
    const targetDate = new Date(inputDate);
    const currentDate = new Date();

    const timer = (targetDate - currentDate) > 0 ? (targetDate - currentDate): 0;

    const seconds = Math.floor((timer) / 1000);

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    daysEl.textContent = days;
    hoursEl.textContent = dateFormat(hours %24);
    minutesEl.textContent = dateFormat(minutes %60);
    secondsEl.textContent = dateFormat(seconds %60);
}

function dateFormat(num) {
    return num < 10 ? (`0${num}`): (`${num}`);
}

getDate();

countdown();

setInterval(countdown, 100);