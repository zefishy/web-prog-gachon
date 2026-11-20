const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();   

  
  const email = document.querySelector('#email').value;
  if (!email.includes('@')) {
    showError('Please enter a valid email.');
  } else {
    loginUser(email);
  }
});