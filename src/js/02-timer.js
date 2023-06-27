import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePickerEl = document.querySelector('#datetime-picker');
const btnTimeStart = document.querySelector('[data-start]');
btnTimeStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

datetimePickerEl.addEventListener('input', inputText);
function inputText() {
  console.log('message click');
}
console.log(datetimePickerEl);
