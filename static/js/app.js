window.onload = (event) => {
    gapi.load('auth2', function () {
        gapi.auth2.init();
        console.log("im loaded")
    });
}


// Sign in the user upon button click.
function handleAuthClick(event) {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function () {
        alert("you have been signed in!")
        login.style.display = "none";
        logout.style.display = "block";
    })
}


function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    login.style.display = "none";
    logout.style.display = "block";
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("you have been signed out!")
        login.style.display = "block";
        logout.style.display = "none";
    })
}


