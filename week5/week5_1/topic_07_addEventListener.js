const btn = document.querySelector('#my-btn');

// Syntax: element.addEventListener(eventName, callback)
btn.addEventListener('click', function() {
  console.log('Button was clicked!');
});

// Arrow function — shorter syntax, same effect
btn.addEventListener('click', () => {
  console.log('Also clicked!');
});

// 'input' event — fires every time the value changes
const inp = document.querySelector('input');
inp.addEventListener('input', () => {
  console.log('Input value: ', inp.value);
});