var button=document.createElement("button");
button.setAttribute("id","scrape-gpt");
button.innerText="Download Conversation";
button.style.transitionDuration=".15s";
button.style.transitionTimingFunction="cubic-bezier(.4,0,.2,1)";
button.style.borderColor="#9b9b9b";
button.style.backgroundColor="hsla(0,0%,100%,.1)";
button.style.color="#9b9b9b";
button.style.borderWidth="thin";
button.style.padding="0px 20px";
button.style.width="100%";

document.querySelector("nav[aria-label='Chat history']").appendChild(button);

button.onmouseover = function() {
    button.style.backgroundColor="#9b9b9b";
    button.style.color="var(--main-surface-primary)";
}

button.onmouseout = function() {
    button.style.backgroundColor="hsla(0,0%,100%,.1)";
    button.style.color="#9b9b9b";
}

button.onclick = function() {

    const conv_hist = []
    const chatBody = document.querySelector("div[role='presentation']");
    const conversation = chatBody.querySelectorAll(['div.text-token-text-primary']);
    
    for(var i = 0; i<conversation.length; i++){
        var body = conversation[i].getElementsByClassName("relative flex w-full flex-col")[0];
        try{
            if (body.children[0].innerText=="You") {
                conv_hist.push({'role':'user','content':body.children[1].innerText});
            }
            else {
                conv_hist.push({'role':'assistant','content':body.children[1].innerText});
            }
        }
        catch{
            console.log("Extension currently does not support attachments.");
        }
    }
    
    const jsonData = JSON.stringify(conv_hist);
    
    const chatTitle = document.querySelector("div.group.bg-token-sidebar-surface-tertiary").innerText;
    
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(jsonData, chatTitle+'.json', 'text/plain');

}