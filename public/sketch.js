let bernard;
let classifier;
let socket;
let className='';
function modelLoaded() {
  console.log('Model Loaded!');
	classifier.classify(gotResults);
}

function gotResults(err,results){
	if (err){
		console.error(error);
	}else{
		s
		className= results[0].label;
		classifier.classify(gotResults);
}
}


/*function imageReady(){
	image(bernard,0,0,width,height);
}*/

function setup() {
	createCanvas(600,420);
	bernard= createCapture(VIDEO);
	bernard.hide();
	socket = io.connect('http://localhost:8183/?clientId='+clientId,{"force new connection":true});
	classifier = ml5.imageClassifier('MobileNet',bernard, modelLoaded);
	//bernard= createCapture('images/st-bernard-dog-alps.jpg',imageReady);

  }

function draw(){
	image(bernard,0,0);
	fill(0);
	textSize(64);
	text(className,10,height-100);

}
