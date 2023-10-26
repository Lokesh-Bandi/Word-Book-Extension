chrome.runtime.onMessage.addListener((message) => {
  console.log(message)
  chrome.storage.sync.set({'selectedText': message.selectedText});
});