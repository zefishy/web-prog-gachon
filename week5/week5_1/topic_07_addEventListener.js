const btn = document.querySelector('#my-btn');

btn.addEventListener('click', function() {
  console.log('Button was clicked!');
});

btn.addEventListener('click', () => {
  console.log('Also clicked!');
});

const inp = document.querySelector('input');
inp.addEventListener('input', () => {
  console.log('Input value: ', inp.value);
});