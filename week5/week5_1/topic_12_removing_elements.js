// Select and remove an element
const item = document.querySelector('.to-delete');
item.remove();    // gone!

// Remove when a delete button is clicked (inside list item)
const list = document.querySelector('#my-list');
list.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    e.target.closest('li').remove();  // remove the parent li
  }
});