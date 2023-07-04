import Notiflix from 'notiflix';
const refs = {
  body: document.querySelector('body'),
  form: document.querySelector('form.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};
refs.body.style.backgroundColor = '#dedeaf';

refs.form.addEventListener('click', onPromiseCreate);
const positions = {
  width: '360px',
  borderRadius: '24px',
  distance: '14px',
  cssAnimationStyle: 'fade',
  fontAwesomeIconStyle: 'shadow',
};

function onPromiseCreate(e) {
  e.preventDefault();

  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          positions
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          positions
        );
      });
    delay += step;
    setTimeout(() => {
      e.target.form.reset();
    }, delay - step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
