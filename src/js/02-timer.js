import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

let intervalId = null;
let selectedDate = null;
let currentDate = null;

const btnStartEl = document.querySelector('[data-start]');
const calendarWindowEl = document.getElementById('datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;

flatpickr(calendarWindowEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Greate! Click on start!');
      btnStartEl.disabled = false;

      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();

        timer.start();
      };

      btnStartEl.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  start() {
    calendarWindowEl.disabled = true;
    btnStartEl.disabled = true;

    intervalId = setInterval(() => {
      currentDate = Date.now();

      const restTime = selectedDate - currentDate;

      if (restTime <= 0) {
        timer.stop();
        Notiflix.Notify.success('Timer end!');
        return;
      }

      const convertTime = convertMs(restTime);

      updateTimerValue(convertTime);
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
    timer.intervalId = null;
    btnStartEl.disabled = true;
    calendarWindowEl.disabled = false;
  },
};

function updateTimerValue({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
timer.stop();
