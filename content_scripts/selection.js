document.addEventListener('mouseup', function() {
  chrome.storage.sync.set({ 'wiktionary_term': window.getSelection().toString() }); 
});
