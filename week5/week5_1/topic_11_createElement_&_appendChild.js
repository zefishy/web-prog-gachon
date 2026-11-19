// Step 1: Create
const li = document.createElement('li');

// Step 2: Configure
li.textContent = 'New item!';
li.classList.add('list-item');

// Step 3: Append to the DOM
const ul = document.querySelector('#my-list');
ul.appendChild(li);     // adds at the END

// Alternative: prepend (adds at the START)
ul.prepend(li);

// insertAdjacentHTML — faster for HTML strings
ul.insertAdjacentHTML('beforeend', '<li>Another item</li>');