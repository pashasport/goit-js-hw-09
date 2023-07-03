
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body')

let timerId = null;

btnStartEl.addEventListener('click', btnStartClick);
btnStopEl.addEventListener('click', btnStopClick);
btnStopEl.disabled = true;

function btnStartClick() {
    timerId = setInterval(getChangedColor, 1000);
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
}

function btnStopClick() { 
    clearInterval(timerId);
    btnStopEl.disabled = true;
    btnStartEl.disabled = false; 
};

function getChangedColor() {
    bodyEl.style.backgroundColor =
        getRandomHexColor();
};

console.log(btnStartEl);
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}
