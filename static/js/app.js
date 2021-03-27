function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display", "none");
    $(".signOut").css("display", "block");

}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("you have been signed out!")
        $(".g-signin2").css("display", "block");
        $(".signOut").css("display", "none");
    })
}


