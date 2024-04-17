
import 'package:bd_chat/model/chatmodel.dart';
import 'package:bd_chat/views/Custom%20UI/button_card.dart';
import 'package:bd_chat/views/Custom%20UI/contact_card.dart';
import 'package:bd_chat/views/createGroup.dart';
import 'package:flutter/material.dart';

class Contact_page extends StatefulWidget {
  Contact_page({super.key});

  @override
  State<Contact_page> createState() => _Contact_pageState();
}

class _Contact_pageState extends State<Contact_page> {
  List<ChatModel> contacts = [
    ChatModel(
        name: 'Aminul Islam',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Hello! how are you',
        des: 'Flutter Developer', select: false),
    ChatModel(
        name: 'Hridoy Shill',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Hello!',
        des: 'Front-end Developer', select: false),
    ChatModel(
        name: 'Jerin Afroz',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Ajke ki class hobe',
        des: 'Photographer', select: false),
    ChatModel(
        name: 'Badhon Krishna',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Mobile koto porche',
        des: 'Marketer', select: false),
  ];

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
            leading: IconButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                icon: Icon(
                  Icons.arrow_back,
                  color: Colors.white,
                )),
            title: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Select Contacts",
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
                Text('75 contact',
                    style: TextStyle(fontSize: 12, color: Colors.white))
              ],
            ),
            actions: [
              IconButton(
                  onPressed: () {},
                  icon: Icon(
                    Icons.search,
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
        body: ListView.builder(
            itemCount: contacts.length + 2,
            itemBuilder: (context, index) {
              if (index == 0) {
                return InkWell(
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => CreateGroup_page()));
                    },
                    child: Button_card(icon: Icons.group, name: 'New Group'));
              } else if (index == 1) {
                return Button_card(icon: Icons.person_add, name: 'New Contact');
              }
              return Contact_card(
                chatModel: contacts[index - 2],
              );
            }));
  }
}
