let login = document.querySelector(".g-signin2");
let logout = document.querySelector(".signOut");


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


