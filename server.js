//intailizing the packages
const express= require('express')
const hbs=require('hbs');
const fs=require('fs');
const socket=require('socket.io')
var app=express();


hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);


const port=process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', (socket) => {
  console.log("url"+socket.handshake.url);
  clientId=socket.handshake.query.clientId;
  console.log("connected clientId:"+clientId);
});

// Create gradient
/*var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);

*/



app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = now
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append file')
    }
  })
  next()
});
/*
app.use((req,res,next)=>{
  res.render('maintenance.hbs',{

  })
});*/

hbs.registerHelper('getcurrentyear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('BOLD',(text)=>{
  return text.toUpperCase()
});



app.get('/Home',(req,res)=>{
  //res.send('Hello Express');
  res.render('home.hbs',{
    pagetitle:'Home',
    pagecontent:'vishnupriya saree collection',

  })
});

app.get('/ProductIdentifier',(req,res)=>{
  res.render('ProductIdentifier.hbs',{
    pagetitle: 'Product video searcher',
    PageMessage: 'Point towards the item you want to buy'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pagetitle:'about page',
    welcomeMessage:'welcome to our website'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    response: 'The call failed.'
  })
});

server.listen(port,()=>{
  console.log("server is up on port"+port)
});
