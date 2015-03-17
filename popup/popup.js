function removeOldContent() {
  var previousIframe = document.getElementById('wiktionary_frame')
    , previousError  = document.getElementById('wiktionary_error');

  var removeElement = function(element) {
    if (element)
      element.parentElement.removeChild(element);
  }

  removeElement(previousIframe);
  removeElement(previousError);
}


function displayResult(title) {
  removeOldContent();
  var body = document.getElementsByTagName('body')[0];
  var iframe = document.createElement('iframe');

  chrome.storage.sync.get('wiktionary_lang', function(items) {
    if (!items.wiktionary_lang) return;
    var src = 'https://' + items.wiktionary_lang + 
              '.wiktionary.org/w/index.php?title=' + title + 
              '&printable=yes';
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('src', src);
    iframe.setAttribute('id', 'wiktionary_frame');
    body.appendChild(iframe);
  });
}


function displayError(message) {
  var body = document.getElementsByTagName('body')[0];
  var span = document.createElement('span');
  span.setAttribute('id', 'wiktionary_error');
  span.innerHTML = 'Error: ' + message;
  body.appendChild(span);
}


function addSearchListeners() {
  var search = document.getElementById('search');
  search.addEventListener('keyup', function(event) {
    if (event.keyCode === 13)
      chrome.storage.sync.set({ 'wiktionary_term': event.target.value }); 
  });

  var submitSearch = document.getElementById('submitSearch');
  submitSearch.addEventListener('click', function() {
    if (search.value)
      chrome.storage.sync.set({ 'wiktionary_term': search.value }); 
  });
}


document.addEventListener("DOMContentLoaded", function() {
  addSearchListeners();

  chrome.storage.sync.get('wiktionary_term', function(items) {
    if (items.wiktionary_term)
      displayResult(items.wiktionary_term);
    else
      displayError('You must select a word first.');
  });
});


chrome.storage.onChanged.addListener(function(changes) {
  if (changes.wiktionary_term)
    displayResult(changes.wiktionary_term.newValue);
});
