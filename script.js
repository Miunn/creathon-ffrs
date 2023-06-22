// Prevent context menu opening when long tap on links
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

var video = document.getElementById("stream-video");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function scanQR() {
    ctx.clearRect(0,0,640,480);
    ctx.drawImage(video, 0, 0, 640, 480, 0, 0, canvas.width, canvas.height);
    const code = jsQR(ctx.getImageData(0, 0, 640, 480).data, 640, 480);

    console.log("code:", code);
}

document.getElementById("open-cam").addEventListener('click', async function init(e) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 640,
                height: 480,

            }
        })

        video.srcObject = stream;
        var myVar = setInterval(scanQR, 10);
        //The video stream is stopped by track.stop() after 3 second of playback.
    } catch (error) {
        console.log(error);
    }
});




