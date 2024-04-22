const userController = require('../controllers/users.controllers');
const auth = require('../middlewares/auth');
const express = require('express');
const route = express();
const path = require('path');

// 6. Create session 
const session = require('express-session')
const {SESSION_SECRET} = process.env
route.use(session({secret:SESSION_SECRET }))

// 7. Create cookie
const cookieParser = require('cookie-parser');
route.use(cookieParser());

// 1. Set body parser for encoding data
const bodyParser = require('body-parser');
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))

// 2. Set view engine
route.set('view engine', 'ejs')
route.set('views', './views');

// 3. Set static files
route.use(express.static('public'));


// 4. Set multer for save & storage images
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, path.join(__dirname,'../public/images'));
    },
    filename: function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null, name)
    }
})
const upload = multer({storage:storage});


// 5. Route 
route.get('/register',auth.isLogout, userController.registerLoad);
route.post('/register', upload.single('imageurl'), userController.register); // image from front-end

route.get('/',auth.isLogout,userController.loginLoad);
route.post('/',userController.login);
route.get('/logout',auth.isLogin,userController.logout);

route.get('/dashboard',auth.isLogin,userController.dashboard);
route.post('/save-chat', userController.saveChat);

route.post('/delete-chat', userController.deleteChat);

route.get('/groups',auth.isLogin, userController.loadGroup)
route.post('/groups',upload.single('image'), userController.createGroup)

route.post('/get-members',auth.isLogin, userController.getMember);
route.post('/add-members',auth.isLogin, userController.addMember)

route.post('/update-chat-group',auth.isLogin, upload.single('image'), userController.updateChatGroup);
route.post('/delete-chat-group',auth.isLogin, userController.deleteChatGroup);

route.get('/share-group/:id', userController.shareGroup);
route.post('/join-group', userController.joinGroup);

route.get('/group-chat', auth.isLogin, userController.groupChats);

route.post('/group-chat-save', userController.saveGroupChat);

route.post('/load-group-chat', userController.loadGroupChats);
route.post('/delete-group-chat', userController.deleteGroupChat);



route.get('*', function(req,res){
   res.redirect('/');
});

module.exports = route;
