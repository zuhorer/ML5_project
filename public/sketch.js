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
	bernard= createCapture(VIDEO);
	bernard.hide();


	classifier = ml5.imageClassifier('MobileNet',bernard, modelLoaded);
	//bernard= createCapture('images/st-bernard-dog-alps.jpg',imageReady);

  }

function draw(){
	image(bernard,0,0);
	fill(0);
	textSize(64);
	text(className,10,height-100);

}
