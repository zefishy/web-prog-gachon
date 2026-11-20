
const item = document.querySelector('.to-delete');
item.remove();    

const list = document.querySelector('#my-list');
list.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    e.target.closest('li').remove();  
  }
});