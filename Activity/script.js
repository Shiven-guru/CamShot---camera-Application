let constraints = {
    video : true,
    audio : true
}
//let videoElem = document.querySelector("video");
//let audioElem = document.querySelector("audio");
let mediaRecorder; 
let buffer = [];

//local machine
navigator.mediaDevices
.getUserMedia(constraints)
.then(function(mediaStream){
    //videoElem.srcObject = mediaStream;
    //audioElem.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.addEventListener("dataavailable", function(e){
        buffer.push(e.data);
    })
    mediaRecorder.addEventListener("stop", function(){
        //mime type
        let blob = new Blob(buffer,{type:"video/mp4"});
        const url = window.URL.createObjectURL(blob);
        //download btn
        let a = document.createElement("a");
        //download
        a.download ="file.mp4";
        a.href = url;
        a.click();
    })
}
).catch(function(err){
    console.log(err);
})

let videoRecorder = document.querySelector("#record-video");
let recordState = false;
videoRecorder.addEventListener("click", function(){
    if(!mediaRecorder){
        alert("allow permissions first");
        return;
    }
    if(recordState == false){
        mediaRecorder.start();
        videoRecorder.innerHTML = "Recording ...";
        recordState= true;
    }else {
        mediaRecorder.stop();
        videoRecorder.innerHTML="Record ..";
        recordState = false;
    }
})