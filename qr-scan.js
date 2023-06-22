var scannerDialog = document.getElementById("scanner-dialog");
var scanSuccessDialog = document.getElementById("scan-success-dialog");

var video = document.getElementById("stream-video");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scanIntervalHandler;
var stream;


function scanQR() {
    ctx.clearRect(0,0,640,480);
    ctx.drawImage(video, 0, 0, 640, 480, 0, 0, canvas.width, canvas.height);
    const code = jsQR(ctx.getImageData(0, 0, 640, 480).data, 640, 480);

    console.log("code:", code);

    if (code != null) {
        stopScan(scanIntervalHandler);

        scannerDialog.close();

        if (typeof scannerDialog.showModal !== "function") {
            console.log("Incompatible");
            return;
        }

        scanSuccessDialog.showModal();
    }
}

async function openQRDialog() {
    if (typeof scannerDialog.showModal !== "function") {
        console.log("Incompatible");
        return;
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 640,
                height: 480,
                facingMode: {
                    exact: 'environment'
                }
            }
        });

        video.srcObject = stream;
        scanIntervalHandler = setInterval(scanQR, 10);

        scannerDialog.showModal();
        //The video stream is stopped by track.stop() after 3 second of playback.
    } catch (error) {
        console.log(error);
    }
}

async function stopScan() {
    try {
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
        clearInterval(scanIntervalHandler);
        console.log("Stopped scan");
    } catch (error) {
        console.log("Error while closing stream:", error);
    }
}

document.getElementById("scan-qr-btn").addEventListener('click', async function init(e) {
    openQRDialog();
});

scannerDialog.addEventListener("close", stopScan);


