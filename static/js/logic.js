var chosenHours = {"date":'',"startTime":'', "endTime":''}

document.querySelector("#FromDate").addEventListener("change", handleDateChoice)

window.onload = function() {
  loadDate()
};

/**
 * takes the id as a parameter input of the button clicked by the user
 * */
function handleUserChoice(event){
    const buttons = document.querySelectorAll('.btn')
    for (let button of buttons){
            if (button.getAttribute('id') == event) {
                let chosenOne = button
                handleHighlight(chosenOne)
            }
        }
        if (chosenHours.startTime !== "" && chosenHours.endTime !== "") {
            highlightBetween()
        }
    handleDateChoice()
}

/**
 * handles the overall highlighting of buttons
 * with respect to the order of which button was clicked first
 * */
function handleHighlight(button){
    if(button.style.backgroundColor === "rgb(255, 255, 255)" &&
        button.style.borderTop === "4px solid rgb(76, 223, 76)"){
        removeTop(button)
        removeHighlights("top")
    }
    else if (button.style.backgroundColor === "rgb(255, 255, 255)" &&
        button.style.borderBottom === "4px solid rgb(76, 223, 76)"){
        removeBot(button)
        removeHighlights("bot")
    }
    else if (chosenHours.startTime === "" ){
        let checkG = checkOrderTop(button)
        if(checkG === true) {
            addHighLightTop(button)
        }
        else{
            alterSelectedHighlight(button)
        }
    }
    else if(chosenHours.startTime !== "" && chosenHours.endTime === ""){
        let checkR = checkorderBot(button)
        if(checkR === true) {
            addHighLightBot(button)
        }
        else{
        alterSelectedHighlight(button)
        }
    }
    else{
         alterSelectedHighlight(button)
    }
}

/**
 * Highlights End Time button in case of first time entry
 */
function addHighLightBot(button){
    button.style.backgroundColor = "rgb(255, 255, 255)"
    button.style.borderBottom = "4px solid rgb(76, 223, 76)"
    button.style.color = "#000"
    chosenHours.endTime = button.getAttribute('id') + ":00"
}

/**
 * Highlights Start Time button in case of first time entry
 */
function addHighLightTop(button){
    button.style.backgroundColor = "rgb(255, 255, 255)"
    button.style.borderTop = "4px solid rgb(76, 223, 76)"
    button.style.color = "#000"
    chosenHours.startTime = button.getAttribute('id') + ":00"
}

/**
 * Deletes endTime Highlight
 * */
function removeBot(button){
    button.style.backgroundColor = ""
    button.style.borderBottom = ""
    button.style.color = ""
    chosenHours.endTime = ""
}

/**
 * Deletes StartTime Highlight
 * */
function removeTop(button){
    button.style.backgroundColor = ""
    button.style.borderTop = ''
    button.style.color = ""
    chosenHours.startTime = ""
}

/**
 * removes current Start/end time Highlight
 * and updates with new Start/end time selection
 * */
function alterSelectedHighlight(button){
    if(button.style.backgroundColor === "rgb(255, 255, 255)") {
        shorten(button)
    }
    else {
        change(button)
    }
}

/**
 * shortens highlighted selection
 * */
function shorten(button){
    removeHighlights("bot")
    deletePrevButton("end")
    button.style.backgroundColor = "rgb(255, 255, 255)"
    button.style.borderBottom = "4px solid rgb(76, 223, 76)"
    button.style.color = "#000"
    chosenHours.endTime = button.getAttribute('id') + ":00"
}

/**
 * increases the size of the highlighted section
 * based on user input
 * */
function change(button){
    let valueToCheck = button.getAttribute('id') + ":00"
        if(valueToCheck > chosenHours.endTime && chosenHours.endTime !== ""){
            removeHighlights("bot")
            deletePrevButton("end")
            button.style.backgroundColor = "rgb(255, 255, 255)"
            button.style.borderBottom = "4px solid rgb(76, 223, 76)"
            button.style.color = "#000"
            chosenHours.endTime = button.getAttribute('id') + ":00"
        }
        else{
            removeHighlights("top")
            deletePrevButton("start")
            button.style.backgroundColor = "rgb(255, 255, 255)"
            button.style.borderTop = "4px solid rgb(76, 223, 76)"
            button.style.color = "#000"
            chosenHours.startTime = button.getAttribute('id') + ":00"
        }
}
/**
 * removes Old selected start/end time Highlights
 * */
function deletePrevButton(type) {
    let buttons = document.querySelectorAll('.btn')
    for (butt of buttons) {
        if(type == "start") {
            butt.style.borderTop = ""
        }
        else {
            butt.style.borderBottom = ""
        }
    }
}

/**
 * checks if the clicked button is the StartTime
 * */
function checkOrderTop(button){
    let valueToCheck = button.getAttribute('id') + ":00"
    if(chosenHours.endTime == ''){
        return true;
    }
    else if (valueToCheck > chosenHours.endTime)
    {
        return false; //create animation
    }
    else{
        return true; //create animation
    }
}

/**
 * checks if the clicked button is the endTime
 * */
function checkorderBot(button){
    let valueToCheck = button.getAttribute('id') + ":00"
    if (valueToCheck < chosenHours.startTime)
    {
        return false; //create animation
    }
    else{
        return true; //create animation
    }

}

/**
 * Removes highlights from all unselected buttons
 * between start and end times
 * */
function removeHighlights(condition){
    const but = document.querySelectorAll('.btn')
    if(condition == "top"){
        let temp2 = chosenHours.endTime.substring(0, chosenHours.endTime.length-3)
        for (chosen of but){
            if (chosen.getAttribute("id") == temp2){
                break;
            }
                chosen.style.backgroundColor = ''
                chosen.style.color = ''
        }
    }
    else if (condition == "bot"){
        let temp1 = chosenHours.startTime.substring(0, chosenHours.startTime.length-3)
        let temp1P= parseInt(temp1)+ 1
        for (chosen of but){
            if (chosen.getAttribute("id") !== temp1){
                chosen.style.backgroundColor = ''
                chosen.style.color = ''
            }
        }
    }
}

/**
 * highlights buttons between start and end Times
 * */
function highlightBetween() {
    let temp1 = chosenHours.startTime.substring(0, chosenHours.startTime.length-3)
    let temp2 = chosenHours.endTime.substring(0, chosenHours.endTime.length-3)
    let temp1P= parseInt(temp1)+ 1
    let check = temp1P/parseInt(temp2)

    if(check == 1){
        return -1;
    }
    else{
        const but = document.querySelectorAll('.btn')
        for (chosen of but){
            if(chosen.getAttribute("id") == temp1P &&
                chosen.getAttribute("id") == temp2){
                break;
            }
            else if(chosen.getAttribute("id") == temp1P){
                chosen.style.backgroundColor = 'rgb(255,255,255)'
                chosen.style.color = '#000'
                temp1P +=1
            }
        }
    }
}

/**
 * function that formats the chosen Date
 * */
function handleDateChoice(){
    let date = document.querySelector("input").value
    chosenHours.date = date
    console.log(chosenHours)
}

function loadDate(){
    let Dat = document.querySelector("#FromDate")
    var date = new Date();
    var currentDate = date.toISOString().substring(0,10);
    Dat.value = currentDate;
}

//used for animating intro (will be implemented l8tr)



