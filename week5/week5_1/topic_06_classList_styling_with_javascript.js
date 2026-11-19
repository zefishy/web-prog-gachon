const box = document.querySelector('.card');

box.classList.add('highlighted');        // adds class
box.classList.remove('highlighted');     // removes class
box.classList.toggle('dark');            // adds if absent, removes if present
box.classList.contains('active');       // returns true/false

// CSS controls what the class LOOKS like:
/*
.highlighted { background: yellow; font-weight: bold; }
.dark         { background: #1a2340; color: #fff; }
*/