// 'e' (or 'event') is the event object passed automatically
btn.addEventListener('click', (e) => {
  console.log(e.type);        // 'click'
  console.log(e.target);      // the element that was clicked
  console.log(e.target.id);   // its id attribute
});

// Keyboard events have e.key
document.addEventListener('keydown', (e) => {
  console.log(e.key);         // 'Enter', 'a', 'ArrowUp' ...
  if (e.key === 'Enter') sendMessage();
});