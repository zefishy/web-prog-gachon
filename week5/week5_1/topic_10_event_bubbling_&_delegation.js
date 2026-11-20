
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

const list = document.querySelector('#todo-list');
list.addEventListener('click', (e) => {
  
  if (e.target.matches('.delete-btn')) {
    e.target.parentElement.remove();
  }
});
