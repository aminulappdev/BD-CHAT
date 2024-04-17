
import 'package:bd_chat/model/chatmodel.dart';
import 'package:bd_chat/views/Custom%20UI/custom_card.dart';
import 'package:bd_chat/views/contact_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  @override
  
  List <ChatModel> chat = [
    ChatModel(name: 'Aminul Islam', icon: 'assets/Icon/person.svg', isGroup: false, time: '10:30 am', currentMessage: 'Hello! how are you', des: '', select: false),
    ChatModel(name: 'Hridoy Shill', icon: 'assets/Icon/person.svg', isGroup: false, time: '10:30 am', currentMessage: 'Hello!', des: '', select: false),
    ChatModel(name: 'Jerin Afroz', icon: 'assets/Icon/person.svg', isGroup: false, time: '10:30 am', currentMessage: 'Ajke ki class hobe', des: '', select: false),
    ChatModel(name: 'Badhon Krishna', icon: 'assets/Icon/person.svg', isGroup: false, time: '10:30 am', currentMessage: 'Mobile koto porche', des: '', select: false),
    ChatModel(name: 'Student group', icon: 'assets/Icon/person.svg', isGroup: true, time: '10:30 am', currentMessage: 'Routine ki change hoiche', des: '', select: false),
  ];

  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Container(  
        height: _height,
        width: _width,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15,vertical: 0),
              child: TextField(
                decoration: InputDecoration(
                  suffixIcon: Icon(Icons.search),
                  hintText: 'Search',              
                 
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 0,horizontal: 15),
              child: Container(
                // color: const Color.fromARGB(255, 224, 158, 158),
                height: _height/10,
                width: _width,
                child: ListView.builder(     
                  scrollDirection: Axis.horizontal,    
                  itemCount: chat.length,
                  itemBuilder: (BuildContext context, index) {
                   return Padding(
                     padding: const EdgeInsets.all(6),
                     child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CircleAvatar(
                          backgroundColor: Colors.blue,
                          radius: 26,),
                        Text('Aminul')
                      ],
                     ),
                   );
                }),
              ),
            ),
            SizedBox(height: _height/80,),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 0,horizontal: 15),
              child: Text('Recent',style: TextStyle(fontSize: 23,fontWeight: FontWeight.normal),),
            ),
            Container(            
              height: _height/1.60,
              width: _width,
              child: ListView.builder(
                itemCount: chat.length,
                itemBuilder: (BuildContext context, index) {
                return Custom_card(chatModel: chat[index]);
              }),
            )        
          ],
        ),
      ), 
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.chat,color: Colors.white,),
        backgroundColor: Color.fromARGB(255, 13, 125, 217),
        onPressed: (){
           Navigator.of(context).push(MaterialPageRoute(builder: (context) => Contact_page()));
        }),     
    );
  }
}
