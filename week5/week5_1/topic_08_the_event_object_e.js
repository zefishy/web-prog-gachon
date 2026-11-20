
btn.addEventListener('click', (e) => {
  console.log(e.type);        
  console.log(e.target);      
  console.log(e.target.id);   
});

document.addEventListener('keydown', (e) => {
  console.log(e.key);         
  if (e.key === 'Enter') sendMessage();
});