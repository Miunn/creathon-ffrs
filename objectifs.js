var addObjectif = document.getElementById("add-objectif");
var addObjectifDialog = document.getElementById("add-objectif-dialog");
var objectifs_container = document.getElementById("objectifs-perso");

function openObjectifDialog() {
    if (typeof addObjectifDialog.showModal !== "function") {
        return;
    }

    addObjectifDialog.showModal();
}


function createObjDOM(sport, distance) {
    let section = document.createElement("div");
    section.classList.add("progress-section");

    let title = document.createElement("h4");
    title.innerText = sport.charAt(0).toUpperCase() + sport.slice(1);

    let stats = document.createElement("div");
    stats.classList.add("stats");

    let objLabel = document.createElement("label");
    objLabel.innerText = `Objectif ${distance} km`;

    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    let progress = document.createElement("div");
    progress.classList.add("progress-value");

    progressBar.appendChild(progress);

    stats.appendChild(objLabel);
    stats.appendChild(progressBar);

    section.appendChild(title);
    section.appendChild(stats);

    return section;
}

function loadObjectifs() {
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split(';');
    let objectifs;
    cArr.forEach(val => {
        if (val.indexOf("objectif=") === 0) objectifs = val.substring("objectif=".length);
    })
    
    objectifs = objectifs.split("/");

    for (var obj of objectifs) {
        console.log(obj);
        let sport = obj.split(',')[0];
        let distance = obj.split(',')[1];

        objectifs_container.appendChild(createObjDOM(sport, distance));

    }
}

function registerObjectif(values) {
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split(';');
    let objectifs;
    cArr.forEach(val => {
        if (val.indexOf("objectif=") === 0) objectifs = val.substring("objectif=".length);
    })
    document.cookie = `objectif=${objectifs}/${values.get("sport")},${values.get("distance")};`;
}


loadObjectifs();

if (objectifs_container.childElementCount == 0) {
    let p = document.createElement("label");
    p.style.width = "100%";
    p.style.textAlign = "center";
    p.innerText = "Aucun objectif enregistré";
    objectifs_container.appendChild(p);
}

addObjectif.addEventListener("click", () => {
    openObjectifDialog();
});

addObjectifDialog.addEventListener("submit", (e) => {
    const data = new FormData(e.target);
    registerObjectif(data);
    document.location = "club.html"
});