const express = require('express');
const expressEdge = require('express-edge');
const expressSession = require('express-session');
const edge = require('edge.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')
const loginUserController = require('./controllers/loginUser')
const adminController = require('./controllers/admin')
const getUserController = require('./controllers/getUser')
const editPostController = require('./controllers/editPost')
const updatePostController = require('./controllers/updatePost')
const deletePostController = require('./controllers/deletePost')

mongoose.connect('mongodb://localhost:27017/DimasBlog', {useNewUrlParser: true})
.catch(err => console.error('YOUR BUNNY WROTE!', err));

const auth = require('./middleware/auth');
const storePost = require('./middleware/storePost');
const redirectAuth = require('./middleware/redirectAuth');
const isAdmin = require('./middleware/isAdmin');
const mongoStore = connectMongo(expressSession);
const app = new express();

app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(connectFlash());
app.use(express.static('public'));
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(expressEdge);
app.use('/posts/store', storePost);
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId);
    edge.global('isAdmin', req.session.isAdmin);
    next();
});

app.listen(9000, () => {
    console.log('IT\'S OVER NINE THOUSAND!')
});

app.get('/', homePageController);
app.get('/:page', homePageController);
app.get('/post/:id', getPostController);
app.get('/edit/:id', auth, editPostController);
app.get('/delete/:id', auth, deletePostController);
app.get('/posts/new', auth, createPostController);
app.get('/user/:id', getUserController);
app.get('/auth/register', redirectAuth, createUserController);
app.get('/auth/login', redirectAuth, loginController);
app.get('/auth/logout', logoutController);
app.get('/auth/admin', auth, isAdmin, adminController);

app.post('/posts/store', auth, storePost, storePostController);
app.post('/posts/update', auth, updatePostController);
app.post('/users/register', redirectAuth, storeUserController);
app.post('/users/login', redirectAuth, loginUserController);