const http = require('http');
const hostname = '127.0.0.1';
const port = 8000

const server = http.createServer((req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('<h1>hello</h1>');
	console.log(req.url);
	// console.log("hello world")
	let path = './views/'	
	switch(req.url){
		case '/':
			path += 'landing.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-me':
			res.statusCode = 301;
			res.setHeader('Location', '/about'); //important
			res.end();
			break;

		default:
			path += '404.html';
			res.statusCode = 404;
	}


	fs.readFile(path, (err,data) => {
		if(err){
			console.log(err);
			res.end();
		}else{
			res.end(data);
		}
	})


});





server.listen(3000,() => 
	console.log("server ready")
	)

// console.log(global);

// global.setTimeout(() => {
// 	console.log("Here I am");
// 	clearInterval(id);
// },3000);


// let id = global.setInterval(() => {
// 	console.log("Here I am");
// },1000);

// console.log(__dirname);
// console.log(__filename);

const fs = require('fs');

//read a file 
// fs.readFile('./test/helloWorld.txt' ,(err,data) => {
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(data.toString())
// })


// create or read a file - 
// fs.writeFile('./test/helloWorld.txt','hello world',(err) => {
// 	if(err){
// 	console.log(err);
// 	}else{
// 		console.log("File created")
// 	}
// })


// // directories
// if(!fs.existsSync('./test')){
// 	fs.mkdir('./test', (err) => {
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 		console.log("directory created");
// 		}
// 	})
// }else{
// 	fs.rmdir('./test', (err) =>{
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("removed directory");
// 		}
// 	})
// }


// // delete a file 
// if(fs.existsSync('./test/helloWorld.txt')){
// 	fs.unlink('./test/helloWorld.txt', (err) => {
// 		if(err)
// 		console.log(err);
// 		else
// 		console.log("File deleted");
// 	})
// }


//create Stream - 

// readStream = fs.createReadStream('./test/helloWorld.txt');
// writeStream = fs.createWriteStream('./test/test1.txt');

// readStream.on('data', (chunk) => {
// 	console.log("New Chunk");
// 	console.log(chunk.toString());
// 	writeStream.write("New chunk");
// 	writeStream.write(chunk);
// })

// readStream.pipe(writeStream);
