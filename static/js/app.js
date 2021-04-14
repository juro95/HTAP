// Client ID and API key from the Developer Console

var CLIENT_ID = '945713320218-l3hktm010jrfi3v5qg6lsbpern4bl1pu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCEN2ID03Kt25fuYEV2QV7CiCxT-Dm3ZtA';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var date = document.getElementById("date");
var time = document.getElementById("time");

date.addEventListener("change", function () {
    console.log(date.value)
    ;
})


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
                'resource': event
            });
            request.execute(function (event) {
                appendPre('Event created: ' + event.htmlLink);
                alert("event created!")
            })
            console.log("event added!");


            var freeRequest = gapi.client.calendar.freebusy.query({
                items: [
                    {id: "code.berlin_188ff8i403g5ajughddn43j69rl166gb6oo38e9g74s3gchp60@resource.calendar.google.com"}
                ],
                "timeMin": "2021-03-03T10:00:00Z",
                "timeMax": "2021-03-03T21:00:00Z",
                "timeZone": "GMT+01:00",
            });

            freeRequest.execute(function (resp) {
                console.log(resp);
            })

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






