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
var date = document.getElementById("date");
var startTime = document.getElementById("time-start");
var endTime = document.getElementById("time-end");
var inputs = document.querySelectorAll(".input");
var calendarID = "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com";

/**
 console.log("lalas");

 [...inputs].forEach(input => {
        input.addEventListener('change', function () {
                if (date.value !== "" && startTime.value !== "" && endTime.value !== ""
                ) {
                    //user input that goes into the freebusy query
                    let requestBody = {
                        timeMin: date.value + "T" + startTime.value + ":00.000Z",
                        timeMax: date.value + "T" + endTime.value + ":00.000Z",
                        items: [
                            {
                                id: "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com"
                            }
                        ],
                        timeZone: "GMT+01:00"
                    };

                    //make request to gcalendar if Ada is free. Giving back array on what times room is busy.
                    var freeRequest = gapi.client.calendar.freebusy.query(requestBody);

                    freeRequest.execute(function (resp) {
                        console.log(resp);
                    })

                } else {
                    console.log("change date pls")
                }
            }
        )
    }
 )
 */

/**
 console.log("works");

 [...inputs].forEach(input => {
    input.addEventListener('change', function () {
        if (endTime.value <= startTime.value) {
            console.log("yalla");
        } else {
            console.log("wat");
        }
    })
})
 */

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
            })
            console.log("event added!");
            //checking for room availability
            avalabilityCheck()


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
        listUpcomingEvents();
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

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'c_rllf9h069ucai78ldpvfcpbqrg@group.calendar.google.com',
        'timeMin': new Date().toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'

    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')\n' + 'Location: ' + event.location)
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}


//function checking for user input on change of date or time, then sending query to gcalendar

//checking for change of all values. Then console.log values on change and executing request if busy.
function avalabilityCheck() {
    [...inputs].forEach(input => {
            input.addEventListener('change', function () {
                    if (date.value !== "" && startTime.value !== "" && endTime.value !== ""
                    ) {
                        //user input that goes into the freebusy query
                        let requestBody = {
                            timeMin: date.value + "T" + startTime.value + ":00.000Z",
                            timeMax: date.value + "T" + endTime.value + ":00.000Z",
                            items: [
                                {
                                    id: "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com"
                                }
                            ],
                            timeZone: "GMT+01:00"
                        };

                        //make request to gcalendar if Ada is free. Giving back array on what times room is busy.
                        var freeRequest = gapi.client.calendar.freebusy.query(requestBody);

                        if (endTime.value <= startTime.value) {
                            alert("Please enter a valid date!");
                        } else {
                            freeRequest.execute(function (resp) {
                                var responseObject = JSON.stringify(resp);
                                console.log(responseObject);
                                if (responseObject.calendars[calendarID].busy.length < 1 )
                                {console.log("room is free");}

                            })
                        }

                    } else {
                        console.log("change date pls")
                    }
                }
            )
        }
    )
}

console.log("haöaöa");

