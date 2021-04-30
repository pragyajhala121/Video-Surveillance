video = "";
status ="";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
   image(video, 0, 0, 480, 380);
   if(status != ""){
       objectDetector.detect(video, gotResults);
       for(i = 0; i = objects.length; i++){
           document.getElementById("status").innerHTML = "Objects Detected";
           document.getElementById("number_of_object").innerHTML = "Number of objects are: " + objects.length;

           fill("#2200ff");
           percent = floor(objects[i].confidence*100);
           text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
           noFill();
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

       }
   } 
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}