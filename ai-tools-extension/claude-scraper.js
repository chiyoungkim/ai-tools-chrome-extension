console.log("hello");

var div=document.createElement("div");
var button=document.createElement("button");
div.appendChild(button);
button.setAttribute("id","scrape-claude");
button.innerText="Download\nConversation";
div.style.position="fixed";
div.style.bottom="0px";
div.style.left="0px";
button.style.textAlign="center";
button.style.padding="10px";
button.style.borderRadius="12px";
button.style.backgroundColor="hsl(var(--bg-200) / var(--tw-bg-opacity))";
button.style.height="88px";
button.style.transitionDuration=".15s";
button.style.transitionTimingFunction="cubic-bezier(.4,0,.2,1)";

console.log("hello 2");

document.body.appendChild(div);

console.log("hello 3");

button.onmouseover = function() {
    button.style.backgroundColor="hsl(var(--bg-300) / var(--tw-bg-opacity))";
}

button.onmouseout = function() {
    button.style.backgroundColor="hsl(var(--bg-200) / var(--tw-bg-opacity))";
}

button.onclick = function() {

    const conv_hist = []
    const conversation = document.querySelectorAll(['.font-user-message','.font-claude-message']);
    
    for(var i = 0; i<conversation.length; i++){
        var message = conversation[i].innerText;
        if ((conversation[i].className).includes('font-user-message')) {
            conv_hist.push({'role':'user','content':message});
        }
        else {
            conv_hist.push({'role':'assistant','content':message});
        }
    }
    
    const jsonData = JSON.stringify(conv_hist);
    
    const chatTitle = document.querySelector("button[data-testid='chat-menu-trigger']").innerText;
    
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(jsonData, chatTitle+'.json', 'text/plain');

}

console.log("hello 4");