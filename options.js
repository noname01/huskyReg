// Saves options to chrome.storage
function save_options() {
    var quarter = document.getElementById('quarter').value;
    var year = document.getElementById('year').value;
    chrome.storage.sync.set({
        quarter: quarter,
        year: year
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores config stored in chrome.storage.
function restore_options() {
    // Use default value aut2014
    chrome.storage.sync.get({
        quarter: "AUT",
        year: 2014
    }, function(items) {
        document.getElementById('quarter').value = items.quarter;
        document.getElementById('year').value = items.year;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);