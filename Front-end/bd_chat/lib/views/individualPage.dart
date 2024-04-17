
import 'package:bd_chat/model/chatmodel.dart';
import 'package:bd_chat/views/Camera/camera_page.dart';
import 'package:bd_chat/views/Custom%20UI/ownMessageCard.dart';
import 'package:bd_chat/views/Custom%20UI/replyMessage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class IndvidualPage extends StatefulWidget {
  IndvidualPage({super.key, required this.chatModel});
  final ChatModel chatModel;
  @override
  State<IndvidualPage> createState() => _IndvidualPageState();
}

class _IndvidualPageState extends State<IndvidualPage> {
  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: PreferredSize( 
        preferredSize: Size.fromHeight(_height / 14),
        child: AppBar(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(25),
            ),
          ),
          leadingWidth: _width / 4.3,
          leading: Row(
            children: [
              IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: Icon(
                    Icons.arrow_back,
                    color: Colors.white,
                  )),
              CircleAvatar(
                backgroundColor: Colors.blue,
                radius: 20,
                child: SvgPicture.asset(
                  widget.chatModel.isGroup
                      ? "assets/Icon/groups.svg"
                      : "assets/Icon/person.svg",
                  height: 30,
                  width: 30,
                ),
              ),
            ],
          ),
          title: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.chatModel.name,
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
              Text('Last seen 11:00 am ago',
                  style: TextStyle(fontSize: 12, color: Colors.white))
            ],
          ),
          actions: [
            IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.videocam_rounded,
                  color: Colors.white,
                )),
            IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.call,
                  color: Colors.white,
                )),
            PopupMenuButton<String>(
                onSelected: (value) {
                  print(value);
                },
                iconColor: Colors.white,
                itemBuilder: ((BuildContext context) {
                  return [
                    PopupMenuItem(
                      child: Text('Peoples'),
                      value: 'Peoples',
                    ),
                    PopupMenuItem(
                      child: Text('New Group'),
                      value: 'New Group',
                    ),
                    PopupMenuItem(
                      child: Text('Settings'),
                      value: 'Settings',
                    ),
                  ];
                }))
          ],
        ),
      ),
      body: Container(
        color: Color.fromARGB(210, 214, 218, 221),
        height: _height,
        width: _width,
        child: Stack(
          children: [
            Container(
              height: _height - 150,
              child: ListView(
                shrinkWrap: true,
                children: [ 
                  OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                   OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                   OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                  OwnMessageCard(),
                  ReplyCard(),
                ],
              )),

            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 13, 125, 217),
                          borderRadius: BorderRadius.circular(10)),
                      height: 48,
                      width: 48,
                      child: IconButton(
                          onPressed: () {},
                          icon: Icon(
                            Icons.mic,
                            color: Colors.white,
                          )),
                    ),
                    Container(
                      width: _width / 1.25,
                      child: Card(
                        child: TextField(
                          textAlignVertical: TextAlignVertical.center,
                          keyboardType: TextInputType.multiline,
                          decoration: InputDecoration(
                              hintText: 'Type a message',
                              contentPadding: EdgeInsets.all(5),
                              border: InputBorder.none,
                              prefixIcon: IconButton(
                                  onPressed: () {},
                                  icon: Icon(Icons.emoji_emotions)),
                              suffixIcon: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  IconButton(
                                    onPressed: () {},
                                     icon: Icon(Icons.attach_file),
                                  ),
                                  IconButton(
                                      onPressed: () {
                                        Navigator.of(context).push(MaterialPageRoute(builder: (context) => CameraPage()));
                                      },
                                      icon: Icon(Icons.camera_alt))
                                ],
                              )),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
