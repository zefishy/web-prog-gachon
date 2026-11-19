const title = document.querySelector('#title');

// READ the current text
console.log(title.textContent);  // "Hello"

// WRITE new text
title.textContent = 'Welcome to Web Programming!';

// HTML tags are treated as plain text (safe!)
title.textContent = '<b>This will NOT be bold</b>';
// Page shows: <b>This will NOT be bold</b>