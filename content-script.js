
document.addEventListener("selectionchange", () => {
    if(document.getSelection().toString()){
        console.log("Selection  :", document.getSelection().toString())
        chrome.runtime.sendMessage(
            "kidphhglcgjlhiiecbdijpdkknpfknke",            
            {selectedText : document.getSelection().toString().split(" ")[0]},                
        )
    }
});