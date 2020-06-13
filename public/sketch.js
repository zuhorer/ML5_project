var capture;
let switchFlag = false;
let switchBtn;

var options = {
     video: {

         facingMode: {
          exact: "user"
        }
     }
   };


let bernard;
let classifier;
let className='';
function modelLoaded() {
  console.log('Model Loaded!');
	classifier.classify(gotResults);
}

function gotResults(err,results){
	if (err){
		console.error(err);
	}else{

		className= results[0].label;
		classifier.classify(gotResults);
    console.log(className)
}
}


/*function imageReady(){
	image(bernard,0,0,width,height);
}*/

function setup() {
	createCanvas(600,420);
  bernard= createCapture(options);

  switchBtn = createButton('Switch Camera');
  switchBtn.position(19, 19);
  switchBtn.mousePressed(switchCamera);








	bernard.hide();


	classifier = ml5.imageClassifier('MobileNet',bernard, modelLoaded);
	//bernard= createCapture('images/st-bernard-dog-alps.jpg',imageReady);

  }
  function switchCamera()
  {
    switchFlag = !switchFlag;
    stopCapture();
    if(switchFlag==true)
    {
     capture.remove();
     options = {
       video: {
           facingMode: {
            exact: "environment"
          }
       }
     };

    }
    else
    {
     capture.remove();
     options = {
       video: {
           facingMode: {
            exact: "user"
          }
       }
     };
    }
    capture = createCapture(options);
  }

  function stopCapture() {
    let stream = capture.elt.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });

    capture.elt.srcObject = null;
  }



function draw(){
  translate(width,0); // move to far corner
  scale(1.0,1.0);    // flip x-axis backwards
  image(bernard, 0, 0, width, height); //video on canvas, position, dimensions
	fill(0);
	textSize(64);
	text(className,10,height-100);

}
