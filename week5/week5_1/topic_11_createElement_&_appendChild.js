
const li = document.createElement('li');

li.textContent = 'New item!';
li.classList.add('list-item');

const ul = document.querySelector('#my-list');
ul.appendChild(li);     

ul.prepend(li);

ul.insertAdjacentHTML('beforeend', '<li>Another item</li>');