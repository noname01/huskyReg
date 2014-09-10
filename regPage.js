$("body").css("opacity", "1");
chrome.runtime.onMessage.addListener(function(data) {
    if(data.toadd !== undefined){
        $('input[name^="sln"]').filter(function(){
            return $(this).val() === ""
        }).first().val(data.toadd);
    }
});