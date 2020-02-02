//Create  connection
var socket = io.connect();

//Query DOM
var message = document.querySelector("#message");
var handle = document.querySelector("#handle");
var btn = document.querySelector("#send");
var output = document.querySelector("#output");
var feedback = document.querySelector("#feedback");
var clearButton = document.querySelector('#clear');
var count = 0;
var player = require('play-sound')(opts = {});

//Emit event
btn.addEventListener("click", function () {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
    message.value = "";
});

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        document.title = "Nikhil Gavali's Chat App";
        count = 0;
    }
})

clearButton.addEventListener("click", function () {
    output.innerHTML = "";
    feedback.innerHTML = "";
    message.value = "";
    document.title = "Nikhil Gavali's Chat App";
    count = 0;
})

message.addEventListener("keypress", function (e) {
    console.log("front end", handle.value);
    socket.emit("typing", handle.value);
    var key = e.which || e.keyCode;
    if (key === 13) {
        console.log("enter enter");
        socket.emit('chat', {
            handle: handle.value,
            message: message.value
        });
        message.value = "";
    }
});

//Listen event
socket.on("chat", function (data) {
    console.log("fronr end chat", data);
    if (document.hidden) {
        count++;
        var newTitle = '(' + count + ')';
        document.title = newTitle;
        playSound();
    } else {
        document.title = "Nikhil Gavali's Chat App";
        count = 0;
    }
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
    output.scrollIntoView(false);
    feedback.innerHTML = "";
});


function playSound() {
    player.play(__dirname + 'deduction.mp3', function (err) {
        if (err) throw err;
    });
}

socket.on("typing", function (data) {
    console.log("front end typing on", data);
    feedback.innerHTML = "<p> <em>" + data + " is typing a message... </em> </p>";
});