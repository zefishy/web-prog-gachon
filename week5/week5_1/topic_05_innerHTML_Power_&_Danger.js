const box = document.querySelector('#box');

// ✅ OK — you control the content (no user input)
box.innerHTML = '<strong>Bold</strong> and <em>italic</em>';

// ❌ DANGER — never put user input directly into innerHTML!
const userInput = prompt('Type something:');
box.innerHTML = userInput;  // attacker types: <img src=x onerror="alert('hacked!')">

// ✅ Safe alternative for user input:
box.textContent = userInput;  // tags shown as text, not executed