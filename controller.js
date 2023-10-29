
// const searchBtn = document.getElementsByClassName('submitBtn')[0];
// searchBtn.addEventListener('click', () => {
//     let searchContent = document.getElementById('searchWord').value;
//     // let newURL = `https://www.google.com/search?q=${searchContent}+meaning+in+english`;
//     // chrome.tabs.create({ url: newURL });

// })


const processData = async (fetchedData) => {
  const resultDiv = document.getElementsByClassName('result')[0];
  fetchedData[0].meanings.forEach(eachMeaning => {
      eachMeaning.definitions.forEach((eachDefinition) => {
        const childElement = document.createElement('div');
        childElement.classList.add('contentBox')
        childElement.appendChild(document.createTextNode(eachDefinition.definition));
        resultDiv.appendChild(childElement)
    })
  })

}
function updateText(){
    chrome.storage.sync.get(['selectedText'], function(data) {
      document.getElementById("searchWord").value = data.selectedText;
    });
    chrome.storage.sync.get(['wordInfo'], function(data) {
        processData(data.wordInfo)
    });
  }
  
document.addEventListener('DOMContentLoaded', updateText);
