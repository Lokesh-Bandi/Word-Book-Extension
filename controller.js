const searchBtn = document.getElementById('submitBtn');
const linkButtons = Object.values(document.getElementsByClassName('link-div'));
const linksContainer = document.getElementsByClassName('other-links-div')[0];
const inputSearchEle =  document.getElementById("word-input");


const instantSearch = () => {
	let wordToBeSearch = inputSearchEle.value.split(' ')[0].toLowerCase();
	const resultDiv = document.getElementsByClassName('result')[0];
	resultDiv.innerHTML = '';
	const childElement = document.createElement('div');
	if(wordToBeSearch.length){
		try {
		  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToBeSearch}`;
			childElement.classList.add('text-info')
			childElement.appendChild(document.createTextNode("Fetching Data..."));
			fetch(url).then(res => res.json()).then(result => {
				updateResult(result)
			})
		}
		catch(err){
			console.log(err)
		}
	}
	else{
		childElement.classList.add('text-danger', 'warningDiv')
		childElement.appendChild(document.createTextNode("Please enter a word.....!!!!!"));
		resultDiv.appendChild(childElement)
	}
}


const DEFAULT_INPUT_RESULT = {
  'selectedText': '',
  'wordInfo': [],
}


const updateResult = async (fetchedData) => {
  const resultDiv = document.getElementsByClassName('result')[0];
	resultDiv.innerHTML = '';
	if(fetchedData.length){
		
		linksContainer.style.display = 'flex';

		fetchedData[0].meanings.forEach(eachMeaning => {
				eachMeaning.definitions.forEach((eachDefinition) => {
					const childElement = document.createElement('div');
					childElement.classList.add('contentBox')
					childElement.appendChild(document.createTextNode(eachDefinition.definition));
					resultDiv.appendChild(childElement)
			})
		})
	}
	else{
		if(fetchedData.message){
			const childElement = document.createElement('div');
			childElement.classList.add('info-text', 'warningDiv')
			childElement.appendChild(document.createTextNode(fetchedData.message));
			resultDiv.appendChild(childElement)
		}
	}
}

const updateRecentFiveWords = (recentFiveWords) => {
//
}

const clearScreen = () => {
	let removalTimeoutId;
	clearTimeout(removalTimeoutId);
	removalTimeoutId = setTimeout(() => {
		chrome.storage.sync.set(DEFAULT_INPUT_RESULT);
	}, 1000)
}

function extensionInIt(){
    chrome.storage?.sync.get(['selectedText'], function(data) {
      if(data.selectedText){
        inputSearchEle.value = data.selectedText;
      }
    });
    chrome.storage?.sync.get(['wordInfo'], function(data) {
      updateResult(data.wordInfo)
    });

		clearScreen()
}

const handleLinkClick = (linkName) => {
	let wordToBeSearch = inputSearchEle.value.split(' ')[0].toLowerCase();
	let navigationURL = `https://www.${linkName}.com/search?q=${wordToBeSearch}+meaning`;
	switch(linkName){
		case 'google': 
			navigationURL = `https://www.google.com/search?q=${wordToBeSearch}+meaning`
			break;
		case 'oxford': 
			navigationURL = `https://www.oxfordlearnersdictionaries.com/definition/english/${wordToBeSearch}`
			break;
		case 'cambridge': 
			navigationURL = `https://dictionary.cambridge.org/dictionary/english/${wordToBeSearch}`
			break;
	}
  chrome.tabs.create({ url: navigationURL });
}

  
document.addEventListener('DOMContentLoaded', extensionInIt);
searchBtn.addEventListener('click', instantSearch)
linkButtons.forEach((eachButton) => {
	const linkName = eachButton.getAttribute('data-name');
	eachButton.addEventListener('click', () => handleLinkClick(linkName));
})
