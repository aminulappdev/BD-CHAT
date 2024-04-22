const Group = require('../models/group.model');
const Chat = require('../models/chat.models');
const User = require('../models/user.models');
const Member = require('../models/member.model');
const GroupChat = require('../models/group.chatModel')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectID} = require('mongodb') 

const registerLoad = (req, res) => {
    try {
        res.render('newRegisterPage');
    } catch (error) {
        console.log(error.message)
    }
}

const register = async (req, res) => {
    try {
        const passHash = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'images/' + req.file.filename,
            password: passHash,
        })

        await newUser.save()
        res.render('newLoginPage', { message: '' })
    } catch (error) {
        console.log(error.message)
    }
}

const loginLoad = async (req, res) => {
    try {
        res.render('newLoginPage')
    } catch (error) {
        console.log(error.message)
    }
}

const login = async (req, res) => {
    try {
        
        // const email = req.body.email;
        // const password = req.body.password;
        console.log(req.body.email);
        console.log(req.body.password);

        const userData = await User.findOne({email:req.body.email})
        if (userData) {
             const passMatch = await bcrypt.compare(req.body.password, userData.password);
             if(passMatch)
             { 
        
                req.session.user = userData; // store user data into session
                res.cookie('user', JSON.stringify(userData));
                res.redirect('/dashboard');
             }
             else
             {
                console.log('Can not find pass')
                res.render('newLoginPage', {message:"Invalid email and password"});
             }
        } 
        else
        {
            console.log('Can not find mail')
            res.render('newLoginPage', {message:"Invalid email and password"});
        }
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message)
    }
}

const dashboard = async (req, res) => {
    try {
        
        const users = await User.find({_id : {$nin : [req.session.user._id]}}) // All info
        res.render('dashboard', { user:  req.session.user, users : users}) // My info 

    } catch (error) {
        console.log(error.message)
    }
}

const saveChat = async (req,res) => {
    try {
        
        var chat = new Chat({
        sender_id : req.body.sender_id,
        receiver_id : req.body.receiver_id,
        message : req.body.message
       
       });

       var newChat = await chat.save();

    //    var cChat = await Chat.findOne({_id:newChat._id}).populate('sender_id');

       res.status(200).send({success:true,msg:'Chat inserted!', data:newChat});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const deleteChat = async (req,res)=>{
    try {
        console.log(req.body.id);
        await Chat.deleteOne({ _id:req.body.id});
        res.status(200).send({success:true})
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const loadGroup = async (req,res)=>{
    try {

        const groups = await Group.find({creator_id:req.session.user._id});
        res.render('group',{groups:groups});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const createGroup = async (req,res)=>{
    try {
       const group = new Group({
           creator_id: req.session.user._id,
           name: req.body.name,
           image: 'images/' + req.file.filename,
           limit:req.body.limit
        })
        
        await group.save();

        const groups = await Group.find({creator_id:req.session.user._id});

        res.render('group',{message: req.body.name + ' group created successfully!', groups:groups});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

const getMember = async (req,res)=>{
    try {     
            var users = await User.aggregate([
                { 
                $lookup:{
                    from:"members",
                    localField:"_id",
                    foreignField: "user_id",                   
                    pipeline:[
                        {
                            $match :{
                                $expr:{
                                   $and:[
                                    { $eq:["$group_id", new mongoose.Types.ObjectId( req.body.group_id)]}
                                   ]
                                }
                            }
                        }
                    ],
                    as:"member"

                }

                },
                {
                $match:{
                    "_id" : {$nin : [ new mongoose.Types.ObjectId(req.session.user._id)]}

                    }
                }
        ]);
        res.status(200).send({success:true,data:users})
       

    } catch (error) {
        res.status(400).send({success:false,msg:"Message here :"+error.message})
    }
}

const addMember = async (req,res)=>{
    try {

        if(!req.body.members){
            res.status(200).send({success:false,msg:'Please select any one member'});
        }
        else if(req.body.members.length > parseInt(req.body.limit))
        {
            res.status(200).send({success:false,msg:'You can select more than '+req.body.limit+'members'});
        }
        else
        {
            await Member.deleteMany({ group_id:req.body.group_id,})

            var data = [];

            const members = req.body.members;

            for(let i = 0; i<members.length; i++)
            {
                data.push(
                    {
                        group_id:req.body.group_id,
                        user_id:members[i]
                    }
                )
            }
            
            await Member.insertMany(data)

            res.status(200).send({success:false,msg:'Members added Successfully'});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}


const updateChatGroup = async (req,res) =>{
   try {
       
       if(parseInt(req.body.limit) < parseInt(req.body.last_limit))
       {
        await Member.deleteMany({group_id:req.body.id});
       }

       var updateObj;
       if(req.file != undefined)
       {
          updateObj = {
            name : req.body.name,
            image : 'images/'+req.file.filename,
            limit : req.body.limit
          }
       }
       else
       {
        updateObj = {
            name : req.body.name,
            limit : req.body.limit
          }
       }
       
       await Group.findByIdAndUpdate({_id:req.body.id},{
          $set:updateObj
       })
       res.status(200).send({success:true,msg:'Chat Group update Successfully'});
   } catch (error) {
       res.status(400).send({success:false,msg:error.message})
   }
}

const deleteChatGroup = async (req,res) =>{
    try {
        
        await Group.deleteOne({_id:req.body.id});
        await Member.deleteOne({group_id:req.body.id});

        res.status(200).send({success:true,msg:'Chat Group Delete Successfully'});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
 }

const shareGroup = async (req,res)=>{
    try {
        
        var groupData = await Group.findOne({_id:req.params.id});

        if(!groupData){
            res.render('error',{message:'404 not found!'});
        }
        else if(req.session.user == undefined)
        {
            res.render('error',{message:'You need to login to access the Share URL!'});
        }
        else
        {

            // var totalMembers = await Member.find({ group_id:req.params.id}).count();
            var totalMembers = await Member.countDocuments({ group_id: req.params.id });
            console.log(req.params.id);           
            console.log(totalMembers);
            var available = groupData.limit - totalMembers;

            var isOwner = groupData.creator_id == req.session.user._id ? true: false;
            var isJoin = await Member.countDocuments({ group_id: req.params.id, user_id: req.session.user._id });

            res.render('shareLink',{group:groupData, available:available, totalMembers:totalMembers, isOwner:isOwner, isJoin:isJoin })
        }




    } catch (error) {
        console.log(error.message)
    }
}

const joinGroup = async (req,res)=>{
    try {
        const member = await new Member({
            group_id:req.body.group_id,
            user_id:req.session.user._id
        })

        await member.save();
        res.send({success:true,msg:'Congratulation, you have joined the group Successfully!'})
    } catch (error) {
        res.send({success:false,msg:error.message})
    }
}


const groupChats = async (req,res)=>{
    try {
        
       const myGroups = await Group.find({creator_id:req.session.user._id});
       const joinedGroups = await Member.find({user_id:req.session.user._id}).populate('group_id');
     
       res.render('chat-group',{ myGroups:myGroups, joinedGroups:joinedGroups});
       
    } catch (error) {
        console.log(error.message);
    }
}

const saveGroupChat = async (req,res) => {
    try {
        
       var chat = new GroupChat({
           
           sender_id: req.body.sender_id,
           group_id: req.body.group_id,
           message : req.body.message
       })
       
       var newChat = await chat.save();

       var cChat = await GroupChat.findOne({_id:newChat._id}).populate('sender_id');

       res.status(200).send({success:true,msg:'Chat inserted!', chat: cChat});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}


const loadGroupChats = async (req,res) => {
    try {
    
       const groupChats = await GroupChat.find({group_id:req.body.group_id}).populate('sender_id');
        
       res.send({success:true, chats:groupChats});

    } catch (error) {
        res.send({success:false,msg:error.message})
    }
}

const deleteGroupChat = async (req,res) => {
    try {
    
       await GroupChat.deleteOne({_id: req.body.id});       
       res.send({success:true, msg:'Chat Deleted'});

    } catch (error) {
        res.send({success:false,msg:error.message})
    }
}


module.exports = { registerLoad, register, loginLoad, login, logout, dashboard, saveChat,deleteChat,loadGroup,createGroup,getMember,addMember,updateChatGroup,deleteChatGroup,shareGroup,joinGroup,groupChats,saveGroupChat,loadGroupChats,deleteGroupChat}





