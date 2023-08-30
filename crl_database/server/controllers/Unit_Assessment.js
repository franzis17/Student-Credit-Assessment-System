document.getElementById("search-button").addEventListener("click", function() {
    var searchInput = document.querySelector(".search-input");
    var searchedUnitInfo = document.getElementById("searched-unit-info");
    searchedUnitInfo.textContent = "Searched Curtin Unit: " + searchInput.value;
});

document.getElementById("add-note-button").addEventListener("click", function() {
    var noteText = document.querySelector(".notes-section textarea").value;
    
    if (noteText.trim() !== "") {
        var newNote = document.createElement("p");
        newNote.textContent = noteText;

        var noteLog = document.querySelector(".note-log");
        noteLog.appendChild(newNote);

        document.querySelector(".notes-section textarea").value = "";
    }
});

document.querySelector(".approve-button").addEventListener("click", function() {
    var logContainer = document.querySelector(".change-log .log-container");
    var newLog = document.createElement("p");
    newLog.innerHTML = '<span class="status-symbol approval">✓</span> ' + document.getElementById("searched-unit-info").textContent + ' Approved.';
    logContainer.appendChild(newLog);
});

document.querySelector(".deny-button").addEventListener("click", function() {
    var logContainer = document.querySelector(".change-log .log-container");
    var newLog = document.createElement("p");
    newLog.innerHTML = '<span class="status-symbol deny">✗</span> ' + document.getElementById("searched-unit-info").textContent + ' Denied.';
    logContainer.appendChild(newLog);
});
