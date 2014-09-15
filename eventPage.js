//todo: connect with api server
//todo: add btns to myPlan; omnibox goto/reg

var regUrl = "https://sdb.admin.washington.edu/students/uwnetid/register.asp";

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