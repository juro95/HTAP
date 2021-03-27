let CLIENT_ID = '945713320218-l3hktm010jrfi3v5qg6lsbpern4bl1pu.apps.googleusercontent.com';
let APIKEY = "AIzaSyCEN2ID03Kt25fuYEV2QV7CiCxT-Dm3ZtA";
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

let signIn = document.querySelector('.signIn');
let signOut = document.querySelector('signOut');

gapi.load('auth2', function () {
    // Library loaded.
});
 
// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Initializes the API client library and sets up sign-in state listeners.
function initClient() {
    gapi.client.init({
        apiKey: APIKEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        signIn.onclick = handleAuthClick;
        signOut.onclick = handleSignoutClick;
    }, function (error) {
        console.error(error);
        // appendPre(JSON.stringify(error, null, 2));
    });
}

// Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
// --------------------- calling custom functions instead of listUpcomingEvents() --------------------- //
function updateSigninStatus(isSignedIn) {
    // formatEvents();
    if (isSignedIn) {
        signIn.style.display = 'none';
        signOut.style.display = 'block';
    } else {
        signIn.style.display = 'block';
        signOut.style.display = 'none';
    }
}

// Sign in the user upon button click.
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}





