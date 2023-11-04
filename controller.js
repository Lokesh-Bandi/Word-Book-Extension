const searchBtn = document.getElementById('submitBtn');

const instantSearch = () => {
	let wordToBeSearch = document.getElementById('word-input').value.split(' ')[0];
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
searchBtn.addEventListener('click', instantSearch)


const DEFAULT_INPUT_RESULT = {
  'selectedText': '',
  'wordInfo': [],
}


const updateResult = async (fetchedData) => {
  const resultDiv = document.getElementsByClassName('result')[0];
	resultDiv.innerHTML = '';
	if(fetchedData[0]){
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

function updateText(){
    chrome.storage?.sync.get(['selectedText'], function(data) {
      if(data.selectedText){
        document.getElementById("word-input").value = data.selectedText;
      }
    });
    chrome.storage?.sync.get(['wordInfo'], function(data) {
      updateResult(data.wordInfo)
    });
		clearScreen()
  }
  
document.addEventListener('DOMContentLoaded', updateText);
