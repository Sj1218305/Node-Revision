const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogModel');

const app = express();

const dbURI = 'mongodb://localhost:27017/NodePractice' 
mongoose.connect(dbURI)
	.then((result) => {app.listen(3000, () => 
	console.log("server started ")
	)})
	.catch((err) => {console.log(err)}); 

app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.use((req,res, next) => {
	console.log("running middleware");
	next();
})

// app.get('/', (req,res) => {
// 	const blogs = [
// 		{title : 'My dream',  description: "I wanted to live a dream...."},
// 		{title : 'My favourite song',  description: "My favourite song is......"},
// 	]
// 	res.status(200).render('index', {title : "All Blogs", blogs: blogs});
// })

app.get('/add-blog', (req,res) => {
	const blog = new Blog({
		title : 'new blog',
		description: 'My first one'
	});
	blog.save()
		.then((data) => {
			res.status(201).send(data);
		})
		.catch((err) => {console.log(err)});
})


app.get('/blogs', (req,res) => {
	Blog.find().sort({createdAt : -1 })
		.then((data) => {
			res.render('index',{title : "All blogs", blogs: data})
		})
		.catch((err) => {
			console.log(err);
		})
})


app.get('/single-blog', (req,res) => {
	Blog.findById()
		.then((data) => {
			res.status(200).send(data)
		})
		.catch((err) => {
			console.log(err);
		})
})


app.post('/blogs',(req,res) => {
	const {title, description} = req.body;
	const blog = new Blog({
		title : title,
		description : description
	})
	blog.save()
		.then((result) => {
			res.status(201).redirect('/blogs');
		})
		.catch((err) => {
			console.log(err);
		})
})

app.get('/blogs/:id', (req,res) => {
	const id = req.params.id;
	Blog.findById(id)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	})
})


app.get('/about', (req,res) => {
	res.status(200).render('about',{title : "About "});
})


app.get('/about-me', (req,res) => {
	res.status(301).redirect('/about',);
})

app.get('/blogs/create', (req,res) => {
	res.status(200).render('new', {title : "create"})
});

//BOTH DO SAME THING	
app.get('*',(req,res) => {
	res.status(404).render('404');
});


// app.use((req,res) => {
// 	res.sendFile('./views/404.html', {root : __dirname});
// });



