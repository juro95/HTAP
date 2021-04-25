// Client ID and API key from the Developer Console

var CLIENT_ID = '425223675927-dugksbk5qnqi680lf4gor9n6ec5hceth.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDVGW-RI-4Vu2-158KpDsVFpIsGR5o67UE';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly";

let comp_1 = {
    "Ada": "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com",
    "Echo": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Warp": "code.berlin_188f2u4uqje8uh9sh50ell5nlacva6gb6op34d9l6sq34chk6g@resource.calendar.google.com",
    "Zuse": "code.berlin_1888rqjtdkh70i80n4v45e7km81ua6gb68pjae1k74qjcdhk68@resource.calendar.google.com",
    "8-Bit": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Rock": "c_1886i0393ltc8gqgmach00hf1odhg@resource.calendar.google.com",
    "Paper": "code.berlin_3635313131353437333332@resource.calendar.google.com",
}





//Omar


var chosenHours = {"date":'',"startTime":'', "endTime":''}

window.onload = function() {
  loadDate()
};
/**
 * takes the id as a parameter input of the button clicked by the user
 * */
function handleUserChoice(event){
    const buttons = document.querySelectorAll('.btn');
    for (let button of buttons){
            if (button.getAttribute('id') == event) {
                let chosenOne = button;
                handleHighlight(chosenOne)
            }
        }
        if (chosenHours.startTime !== "" && chosenHours.endTime !== "") {
            highlightBetween();
        }
    handleDateChoice();
}

/**
 * handles the overall highlighting of buttons
 * with respect to the order of which button was clicked first
 * */
function handleHighlight(button){
    let count = 0;
    if(button.style.backgroundColor == "rgb(255, 255, 255)" &&
        button.style.borderTop == "4px solid rgb(76, 223, 76)" ){
        button.style.backgroundColor = "";
        button.style.borderTop = '';
        button.style.color = "";
        chosenHours.startTime = "";
        removeHighlights("top");
    }
    else if (button.style.backgroundColor == "rgb(255, 255, 255)" &&
        button.style.borderBottom == "4px solid rgb(76, 223, 76)" ){
        button.style.backgroundColor = "";
        button.style.borderBottom = "";
        button.style.color = "";
        chosenHours.endTime = "";
        removeHighlights("bot");
    }
    else if (chosenHours.startTime == ""){
        let checkG = checkOrderTop(button);
        if(checkG == true) {
            button.style.backgroundColor = "rgb(255, 255, 255)";
            button.style.borderTop = "4px solid rgb(76, 223, 76)";
            button.style.color = "#000";
            chosenHours.startTime = button.getAttribute('id') + ":00";
        }
    }
    else if(chosenHours.startTime !== "" && chosenHours.endTime == ""){
        let checkR = checkorderBot(button);
        if(checkR == true) {
            button.style.backgroundColor = "rgb(255, 255, 255)";
            button.style.borderBottom = "4px solid rgb(76, 223, 76)";
            button.style.color = "#000";
            chosenHours.endTime = button.getAttribute('id') + ":00";
        }
    }
}

/**
 * checks if the clicked button is the StartTime
 * */
function checkOrderTop(button){
    let valueToCheck = button.getAttribute('id') + ":00";
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
    let valueToCheck = button.getAttribute('id') + ":00";
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
    const but = document.querySelectorAll('.btn');
    if(condition == "top"){
        let temp2 = chosenHours.endTime.substring(0, chosenHours.endTime.length-3);
        for (chosen of but){
            if (chosen.getAttribute("id") == temp2){
                break;
            }
                chosen.style.backgroundColor = '';
                chosen.style.color = '';
        }
    }
    else if (condition == "bot"){
        let temp1 = chosenHours.startTime.substring(0, chosenHours.startTime.length-3);
        let temp1P= parseInt(temp1)+ 1;
        for (chosen of but){
            if (chosen.getAttribute("id") !== temp1){
                chosen.style.backgroundColor = '';
                chosen.style.color = '';
            }
        }
    }
}

/**
 * highlights buttons between start and end Times
 * */
function highlightBetween() {
    let temp1 = chosenHours.startTime.substring(0, chosenHours.startTime.length-3);
    let temp2 = chosenHours.endTime.substring(0, chosenHours.endTime.length-3);
    let temp1P= parseInt(temp1)+ 1;
    let check = temp1P/parseInt(temp2);

    if(check == 1){
        return -1;
    }
    else{
        const but = document.querySelectorAll('.btn');
        for (chosen of but){
            if(chosen.getAttribute("id") == temp1P &&
                chosen.getAttribute("id") == temp2){
                break;
            }
            else if(chosen.getAttribute("id") == temp1P){
                chosen.style.backgroundColor = 'rgb(255,255,255)';
                chosen.style.color = '#000';
                temp1P +=1;
            }
        }
    }
}

/**
 * function that formats the chosen Date
 * */
function handleDateChoice(){
    let date = document.querySelector("input").value;
    chosenHours.date = date;
    console.log(chosenHours);
}

document.querySelector("#FromDate").addEventListener("change", handleDateChoice);

function loadDate(){
    let Dat = document.querySelector("#FromDate");
    var date = new Date();
    var currentDate = date.toISOString().substring(0,10);
    Dat.value = currentDate;
}

//used for animating intro (will be implemented l8tr)



