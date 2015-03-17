document.addEventListener('DOMContentLoaded', function() {
  var links = document.getElementsByTagName('a');
  var linksArray = Array.prototype.slice.call(links);
  var currentLanguage = document.getElementById('currlang');


  linksArray.forEach(function(link) {
    link.addEventListener('click', function(event) {
      chrome.storage.sync.set({ 'wiktionary_lang': event.target.id });
    }, false);
  });


  function displayLanguage(languageCode) {
    var languageElement = document.getElementById(languageCode);
    currentLanguage.innerHTML = languageElement.innerHTML;
  }


  chrome.storage.sync.get('wiktionary_lang', function(items) {
    if (items.wiktionary_lang)
      displayLanguage(items.wiktionary_lang);
    else
      chrome.storage.sync.set({ 'wiktionary_lang': 'en' });  // default
  });


  chrome.storage.onChanged.addListener(function(changes) {
    if (changes.wiktionary_lang)
      displayLanguage(changes.wiktionary_lang.newValue);
  });
});


