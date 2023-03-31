import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';


const updateStorage = throttle((email, message) => {
  const feedbackState = {
    email,
    message,
  };
  localStorage.setItem(storageKey, JSON.stringify(feedbackState));
}, 500);


emailInput.addEventListener('input', (event) => {
  const email = event.target.value;
  const message = messageInput.value;
  updateStorage(email, message);
});

messageInput.addEventListener('input', (event) => {
  const email = emailInput.value;
  const message = event.target.value;
  updateStorage(email, message);
});


const feedbackState = JSON.parse(localStorage.getItem(storageKey));
if (feedbackState) {
  const { email, message } = feedbackState;
  emailInput.value = email;
  messageInput.value = message;
}


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const message = messageInput.value;
  console.log({ email, message });
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
});
