var regUrl = "https://sdb.admin.washington.edu/students/uwnetid/register.asp";

chrome.runtime.onMessage.addListener(function(data, sender) {
    chrome.tabs.query({url: regUrl}, function(resultTabs) {
        if(resultTabs.length  == 0){
            chrome.tabs.create({url: regUrl, active: true}, function (tab) {
                chrome.tabs.sendMessage(tab.id, {toadd: data.toadd});
            })
        } else {
            chrome.tabs.sendMessage(resultTabs[0].id, {toadd: data.toadd});
        }
    });
});