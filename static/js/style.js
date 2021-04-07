let room = document.querySelectorAll(".room");

room.forEach(item => {
    item.addEventListener('mouseover', event => {
        event.target.style.fill = "blue";
        event.target.style.opacity = "0.3";
        event.target.style.pointerEvents = "all";
        event.target.style.cursor = "pointer";
        event.target.style.strokeOpacity = "1";
    })
})


room.forEach(item => {
    item.addEventListener('mouseout', event => {
        event.target.style.fill = "white";
        event.target.style.stroke = "black";
        event.target.style.strokeOpacity = "1";
        event.target.style.fillOpacity = "0.5";
    })
})


