// ❌ Without delegation — a listener on EVERY button
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});
// Problem: new buttons added later won't have a listener!

// ✅ With delegation — ONE listener on the parent
const list = document.querySelector('#todo-list');
list.addEventListener('click', (e) => {
  // e.target is the element that was actually clicked
  if (e.target.matches('.delete-btn')) {
    e.target.parentElement.remove();
  }
});
// Works for existing AND future list items!