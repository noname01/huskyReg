var timeSchBaseUrl = "http://www.washington.edu/students/timeschd/";
var slnBaseUrl = "https://sdb.admin.washington.edu/timeschd/uwnetid/sln.asp";

//time schedule page, add reg button in each row
if(document.URL.indexOf(timeSchBaseUrl) == 0){
    $("pre").each(function(i, u){
        if(i > 0){
            var row = $(u).parent().parent();
            var sln = $(u).find('a[href^="' + slnBaseUrl + '"]').text();
            var button = $("<button>Reg</button>");
            button.click(function(){
                chrome.runtime.sendMessage({toadd: sln});
            });
            $("<td style='vertical-align: top; padding: 10px 5px;'></td>").append(button).prependTo(row);
        }
        else $(u).css("margin-left", "60px");
    })
}
