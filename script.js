// Prevent context menu opening when long tap on links
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};




document.getElementById("open-cam").addEventListener('click', async function init(e) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 720,
                height: 720,

            }
        })

        const videoTracks = stream.getVideoTracks();
        const track = videoTracks[0];
        alert(`Getting video from: ${track.label}`);
        document.querySelector('video').srcObject = stream;
        //The video stream is stopped by track.stop() after 3 second of playback.
    } catch (error) {
        console.log(error);
    }
})

var html5QrcodeScanner = new Html5QrcodeScanner(
	"cam", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);

    html5QrcodeScanner.clear();
}

