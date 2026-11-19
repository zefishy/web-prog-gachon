const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();   // ← stops the page reload!

  // Now validate and handle the form with JavaScript
  const email = document.querySelector('#email').value;
  if (!email.includes('@')) {
    showError('Please enter a valid email.');
  } else {
    loginUser(email);
  }
});