const box = document.querySelector('#box');

box.innerHTML = '<strong>Bold</strong> and <em>italic</em>';

const userInput = prompt('Type something:');
box.innerHTML = userInput;  

box.textContent = userInput;  