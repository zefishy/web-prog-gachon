/* ---------- week6.js ----------
   Small helpers shared by the Week 6 API demo pages
   (week6/week6_1/api_*.html). Each page loads this before its own
   inline script and supplies its own panel element. */

// Build an element safely (API data goes in via textContent, never innerHTML).
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showLoading(panel) {
  panel.replaceChildren();
  const box = el('div', 'status');
  box.append(el('div', 'spinner'), el('div', '', 'Loading...'));
  panel.append(box);
}

function showError(panel, message) {
  panel.replaceChildren(el('div', 'status error', message));
}

// fetch + JSON with a proper HTTP status check
async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}
