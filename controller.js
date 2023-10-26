document.addEventListener("selectionchange", () => {
    if(document.getSelection().toString()){
        document.getElementById('searchWord').value = document.getSelection().toString();
    }
});


const searchBtn = document.getElementsByClassName('submitBtn')[0];
searchBtn.addEventListener('click', () => {
    console.log(window.getSelection().toString(), chrome)
    let searchContent = document.getElementById('searchWord').value;
    let newURL = `https://www.google.com/search?q=${searchContent}+meaning+in+english`;
    chrome.tabs.create({ url: newURL });
})


function updateText(){
    chrome.storage.sync.get(['selectedText'], function(data) {
      document.getElementById("searchWord").value = data.selectedText;
  
    });
  }
  
  document.addEventListener('DOMContentLoaded', updateText);