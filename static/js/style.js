let room = document.querySelectorAll(".room");

room.forEach(item => {
    item.addEventListener('mouseover', event => {
        event.target.style.fill = "blue";
        event.target.style.opacity = "0.3";
        event.target.style.pointerEvents = "all";
        event.target.style.cursor = "pointer";
    })
})


room.forEach(item => {
    item.addEventListener('mouseout', event => {
        event.target.style.fill = "white"
    })
})


