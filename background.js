chrome.runtime.onMessage.addListener(async (message) => {
  console.log(message)
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${message.selectedText}`;
  let fetchedData;
  try {
      const response = await fetch(url);
      fetchedData = await response.json();
      console.log(fetchedData);
  } catch (error) {
      console.error(error);
  }
  chrome.storage.sync.set({
    'selectedText': message.selectedText,
    'wordInfo': fetchedData
  });
});