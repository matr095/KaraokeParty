//var peer = new Peer({key: 'c334hl30p2vuz0k9'});

var randomnumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
var peer = new Peer(randomnumber, {host: 'matr.fr', port: 9000, path: '', config: {'iceServers': [
    {url:'stun:stun.xten.com'},
    {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
    },
    {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
    },
    {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
    }
]}});

//getUserMediaf = navigator.getUserMedia || navigator.webkitGetUserMedia || MediaDevices.getUserMedia;

peer.on('open', function(id) {
    var dis = document.querySelector("#mynumber")
    dis.innerHTML = id;
    console.log('My peer ID is: ' + id);
    console.log(typeof(id))
});

window.onload = function() {
    var btn = document.querySelector("#appeller")
    btn.addEventListener("click", function() {
        var input = prompt("ID à appeller")
        var dest = input
        console.log(typeof(input))
        startpeer(dest)
    })
}


function startpeer(dest) {
    var conn = peer.connect(dest);

    peer.on('connection', function(conn) { 
        console.log("receives")
        conn.on('data', function(data) {
            console.log('3')
            console.log('Received: ' +  data);
        });
    });

    peer.on('call', function(call) {
            navigator.getUserMedia({video: true, audio: true}, function(stream) {
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', function(remoteStream) {
                        var destvideo = document.querySelector("#video1")
                        console.log('called')
                        destvideo.src = window.URL.createObjectURL(remoteStream)
                        destvideo.play()
                        destvideo.volume = 0
                });
        }, function(err) {
            console.log('Failed to get local stream' ,err);
        });
    });

    conn.on('open', function() {
        console.log('2')
    });

    window.onkeydown = function (e) {
        if(e.keyCode == 13) {
            conn.send("data")
            navigator.getUserMedia({video: true, audio: true}, function(stream) {
                var call = peer.call(dest, stream);
                console.log('calling')
                var destvideo = document.querySelector("#video2")
                destvideo.src = window.URL.createObjectURL(stream)
                destvideo.play()
                destvideo.volume = 0
            }, function(err) {
                console.log('Failed to get local stream' ,err);
            });
        }
    }


}

