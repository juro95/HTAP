// Client ID and API key from the Developer Console
var CLIENT_ID = '425223675927-dugksbk5qnqi680lf4gor9n6ec5hceth.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDVGW-RI-4Vu2-158KpDsVFpIsGR5o67UE';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

var chosenHours = {"date":'',"startTime":'', "endTime":''}
var date = chosenHours.date;
var startTime = chosenHours.startTime;
var endTime = chosenHours.endTime;
var inputs = document.querySelectorAll(".input, .btn");

window.onload = function() {
  loadDate()
};


[...inputs].forEach(input => {
    input.addEventListener('change', function () {
        console.log(startTime.value)
        console.log(endTime)
        console.log(chosenHours.date)
        console.log(chosenHours)
    })
})



let rooms = {
    "Ada": "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com",
    "D-2": "code.berlin_1883j5g4liq5ihuehfm64pgo3o66g@resource.calendar.google.com",
    "Bikini-Bottom": "c_1881ik7tlaikmg7ck5i77efpc20vi4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "8-Bit": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Echo": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Jungle": "code.berlin_188b81q8a620qia5jnkdohp7bu0ug6g96ss32d1i6cq3ae0@resource.calendar.google.com",
    "Lizard": "code.berlin_1885dv1guu8e4gsdmna2vusmqgqh2@resource.calendar.google.com",
    "Morty": "code.berlin_31333137303136343636@resource.calendar.google.com",
    "Mr.Krabs": "c_1888es6bfll5kjsuls02f06lf7vbs4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Paper": "code.berlin_3635313131353437333332@resource.calendar.google.com",
    "Patrick": "c_1880fd3bis93ehhvglb5b5kb9llle4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Peace": "code.berlin_1886llujif4fmjgpiogj4n145vi0a6gb74o30d9h6kpjee9k6c@resource.calendar.google.com",
    "Plankton": "c_1880o8abbdc0iho8k006b8p16m8p64gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "R2": "code.berlin_1885vk34enieoitrk3b4l5vottl5m@resource.calendar.google.com",
    "Rick": "code.berlin_3736373335323835363837@resource.calendar.google.com",
    "Scissors": "code.berlin_3934313230373536353639@resource.calendar.google.com",
    "Spock": "code.berlin_3337333133353032313436@resource.calendar.google.com",
    "Spongebob": "c_188c5qoo8kuh2jkdnfusmkfc4hcuc4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Squidward": "c_1883gns7qtrjsgvlj179giafkblua4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Void-Lab": "c_188d0sd2j8pnei5ai0f0ijl0p3bmg4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Warp": "code.berlin_188f2u4uqje8uh9sh50ell5nlacva6gb6op34d9l6sq34chk6g@resource.calendar.google.com",
    "Zuse": "code.berlin_1888rqjtdkh70i80n4v45e7km81ua6gb68pjae1k74qjcdhk68@resource.calendar.google.com",
    "Rock": "c_1886i0393ltc8gqgmach00hf1odhg@resource.calendar.google.com"
}

let comp_1 = {
    "Ada": "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com",
    "Echo": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Warp": "code.berlin_188f2u4uqje8uh9sh50ell5nlacva6gb6op34d9l6sq34chk6g@resource.calendar.google.com",
    "Zuse": "code.berlin_1888rqjtdkh70i80n4v45e7km81ua6gb68pjae1k74qjcdhk68@resource.calendar.google.com",
    "8-Bit": "code.berlin_188f0qjk7i3s8g6bj3dtntl59ppd46gb68r34c9l64p3achp60@resource.calendar.google.com",
    "Rock": "c_1886i0393ltc8gqgmach00hf1odhg@resource.calendar.google.com",
    "Paper": "code.berlin_3635313131353437333332@resource.calendar.google.com",
}

let comp_2 = {
    "Lizard": "code.berlin_1885dv1guu8e4gsdmna2vusmqgqh2@resource.calendar.google.com",
    "Lizard": "code.berlin_1885dv1guu8e4gsdmna2vusmqgqh2@resource.calendar.google.com",
    "Spock": "code.berlin_3337333133353032313436@resource.calendar.google.com"
}

let comp_3 = {
    "Jungle": "code.berlin_188b81q8a620qia5jnkdohp7bu0ug6g96ss32d1i6cq3ae0@resource.calendar.google.com",
    "Morty": "code.berlin_31333137303136343636@resource.calendar.google.com",
    "Rick": "code.berlin_3736373335323835363837@resource.calendar.google.com",
    "Peace": "code.berlin_1886llujif4fmjgpiogj4n145vi0a6gb74o30d9h6kpjee9k6c@resource.calendar.google.com",
    "Roomy": "code.berlin_3135303639333334323335@resource.calendar.google.com"
}

let comp_4 = {
    "Void-Lab": "c_188d0sd2j8pnei5ai0f0ijl0p3bmg4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "R2": "code.berlin_1885vk34enieoitrk3b4l5vottl5m@resource.calendar.google.com",
    "D-2": "code.berlin_1883j5g4liq5ihuehfm64pgo3o66g@resource.calendar.google.com",
}

let comp_5 = {
    "Mr. Krabs": "c_1888es6bfll5kjsuls02f06lf7vbs4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Plankton": "c_1880o8abbdc0iho8k006b8p16m8p64gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Spongebob": "c_188c5qoo8kuh2jkdnfusmkfc4hcuc4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Squidward": "c_1883gns7qtrjsgvlj179giafkblua4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
    "Patrick": "c_1880fd3bis93ehhvglb5b5kb9llle4gbcdnm8p9ec9in4r39do@resource.calendar.google.com",
}



/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
            var request = gapi.client.calendar.events.insert({

                'calendarId': 'primary',
                'resource': event,
            });
            request.execute(function (event) {
                appendPre('Event created: ' + event.htmlLink);
                alert("event created!")
                window.addEventListener("click",function (){alert("event")})
            })
            console.log("event added!");
            //checking for room availability
            avalabilityCheck()
        window.addEventListener("click",function (){alert("yalla")})


        }, function (error) {
            appendPre(JSON.stringify(error, null, 2));
        }
    )
    ;
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}



//function checking for user input on change of date or time, then sending query to gcalendar
//checking for change of all values. Then console.log values on change and executing request if busy.
function avalabilityCheck() {
    [...inputs].forEach(input => {
            input.addEventListener('change', function () {
                    if (date.value !== "" && startTime.value !== "" && endTime.value !== ""
                    ) {let isBusy = true;

                    console.log(isBusy);
                    if (isBusy === false) {
                        console.log("working?");
                    }
                    else{console.log("not working");}


                    //looping through all rooms in compartment
                        for (let key in comp_1) {
                            if (comp_1.hasOwnProperty(key)) {
                                let calendarID = comp_1[key];
                                let roomName = key;
                                //console.log(value);
                                //user input that goes into the freebusy query
                                let requestBody = {
                                    timeMin: date.value + "T" + startTime.value + ":00.000Z",
                                    timeMax: date.value + "T" + endTime.value + ":00.000Z",
                                    items: [
                                        {
                                            id: calendarID
                                        }
                                    ],
                                    timeZone: "GMT+01:00"
                                };


                                //make request to gcalendar if rooms are free. Giving back array on what times room is busy.
                                var freeRequest = gapi.client.calendar.freebusy.query(requestBody);

                                //executing request.
                                freeRequest.execute(function (resp) {
                                    var responseObject = JSON.stringify(resp);
                                    console.log(responseObject);

                                    if (resp.calendars[calendarID].busy.length < 1) {
                                        console.log(`${roomName} is free`);
                                    }
                                    //if room is busy set isBusy to false, then if isBusy=false make compartment green
                                    else {isBusy = !isBusy;
                                    console.log("room is Busy");
                                    }
                                    console.log(isBusy)

                                    /**
                                     else if (resp.calendars[calendarID].busy.length === 1) {
                                    console.log(resp.calendars[calendarID].busy[0].start);
                                    console.log(resp.calendars[calendarID].busy[0].end);
                                } else if (resp.calendars[calendarID].busy.length === 2) {
                                    console.log(resp.calendars[calendarID].busy[0].start);
                                    console.log(resp.calendars[calendarID].busy[0].end);
                                    console.log(resp.calendars[calendarID].busy[1].start);
                                    console.log(resp.calendars[calendarID].busy[1].end);
                                } else if (resp.calendars[calendarID].busy.length === 3) {
                                    console.log(resp.calendars[calendarID].busy[0].start);
                                    console.log(resp.calendars[calendarID].busy[0].end);
                                    console.log(resp.calendars[calendarID].busy[1].start);
                                    console.log(resp.calendars[calendarID].busy[1].end);
                                    console.log(resp.calendars[calendarID].busy[2].start);
                                    console.log(resp.calendars[calendarID].busy[2].end);
                                } else if (resp.calendars[calendarID].busy.length === 4) {
                                    console.log(resp.calendars[calendarID].busy[0].start);
                                    console.log(resp.calendars[calendarID].busy[0].end);
                                    console.log(resp.calendars[calendarID].busy[1].start);
                                    console.log(resp.calendars[calendarID].busy[1].end);
                                    console.log(resp.calendars[calendarID].busy[2].start);
                                    console.log(resp.calendars[calendarID].busy[2].end);
                                    console.log(resp.calendars[calendarID].busy[3].start);
                                    console.log(resp.calendars[calendarID].busy[3].end);

                                }*/
                                })

                          }
                        }
                    } else {
                        console.log("change date pls");
                    }
                }
            )
        }
    )
}


//Omar

/**
 * function that formats the chosen Date
 * */
function handleDateChoice(){
    let date = document.querySelector("input").value
    chosenHours.date = date
    console.log(chosenHours)
}

document.querySelector("#FromDate").addEventListener("change", handleDateChoice)

function loadDate(){
    let Dat = document.querySelector("#FromDate")
    var date = new Date();
    var currentDate = date.toISOString().substring(0,10);
    Dat.value = currentDate;
}
