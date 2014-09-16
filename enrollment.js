var enrollmentBaseUrl = "https://sdb.admin.washington.edu/timeschd/uwnetid/tsstat.asp";

//enrollment summary page, add reg button in each row
if(document.URL.indexOf(enrollmentBaseUrl) == 0){
    $("p table tr").each(function(i, u){
        if(i > 0){
            var sln = $(u).find("td:first-child").text().replace(/\D/, "");
            var button = $("<button>Reg</button>");
            button.click(function(){
                chrome.runtime.sendMessage({toadd: sln});
            });
            $(button).prependTo(u);
        }
        else {
            $(u).prepend("<td></td>");
        }
    });
    $("body").css("opacity", "1"); //hide abrupt dom changes
}
