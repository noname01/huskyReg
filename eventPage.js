//todo: connect with api server
//todo: add btns to myPlan; omnibox goto/reg
//todo: help page & config page

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
            {content: "reg", description: "command: reg [course][number][section] - comming soon"},
            {content: "goto", description: "command: goto [course][number]"}
        ]);
    }
);

chrome.omnibox.onInputEntered.addListener(
    function(text) {
        var cmd = text.trim().toLowerCase();
        if(cmd.indexOf("reg") == 0) {
            alert("coming soon")
        }
        else if (cmd.indexOf("goto") == 0) {
            var abbr = cmd.replace(/^goto\s*([a-z]+)\s*(\d+)\s*$/, "$1");
            var num = cmd.replace(/^goto\s*([a-z]+)\s*(\d+)\s*$/, "$2");
            if(catalog[abbr] !== undefined) {
                window.open(timeSchBaseUrl + catalog[abbr].page + "#" + abbr + num)
            }
            else alert("Error: unknown course abbreviation.")
        }
    });

