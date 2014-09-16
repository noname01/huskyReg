//todo: enroll-summary page auto reg
//todo: config page to choose quarter

var regUrl = "https://sdb.admin.washington.edu/students/uwnetid/register.asp#regform";
var timeSchBaseUrl = "http://www.washington.edu/students/timeschd/AUT2014/";

chrome.runtime.onMessage.addListener(function(data, sender) {
    chrome.tabs.query({url: regUrl}, function(resultTabs) {
        if(resultTabs.length  == 0){
            chrome.tabs.create({url: regUrl, active: true}, function (tab) {
                chrome.tabs.onUpdated.addListener(function(tabId, info) {
                    if (info.status == "complete" && tabId == tab.id) {
                        chrome.tabs.sendMessage(tab.id, {toadd: data.toadd});
                    }
                });
            })
        } else {
            chrome.tabs.sendMessage(resultTabs[0].id, {toadd: data.toadd});
            chrome.tabs.update(resultTabs[0].id, {active: true});
        }
    });
});

chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
        suggest([
            {content: "cse143", description: "[course][number] e.g. cse143"},
        ]);
    }
);

chrome.omnibox.onInputEntered.addListener(
    function(text) {
        var cmd = text.trim().toLowerCase();
        var abbr = cmd.replace(/^\s*([a-z]*)\s*(\d*).*$/, "$1");
        var num = cmd.replace(/^\s*([a-z]*)\s*(\d*).*$/, "$2");
        if(catalog[abbr] !== undefined) {
            window.open(timeSchBaseUrl + catalog[abbr] + (num == "" ? "" : "#" + abbr + num));
        }
        else alert("Error: unknown course abbreviation.")
    });

