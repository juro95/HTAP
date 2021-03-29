let login = document.querySelector(".signIn");
let logout = document.querySelector(".signOut");

// Sign in the user upon button click.
function handleAuthClick(event) {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function () {
        alert("you have been signed in!")
    })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("you have been signed out!")
    })
}

function updateSigninStatus(isSignedIn) {
    // formatEvents();
    if (isSignedIn) {
        login.style.display = 'none';
        logout.style.display = 'block';
    } else {
        login.style.display = 'block';
        logout.style.display = 'none';
    }
}

window.onload = (event) => {
    gapi.load('auth2', function () {
        gapi.auth2.init().then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function (error) {
            console.error(error);
            // appendPre(JSON.stringify(error, null, 2));
        });
        console.log("im loaded")
    })
}





