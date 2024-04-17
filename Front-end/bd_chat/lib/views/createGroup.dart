
import 'package:bd_chat/model/chatmodel.dart';
import 'package:bd_chat/views/Custom%20UI/avtar_card.dart';
import 'package:bd_chat/views/Custom%20UI/contact_card.dart';
import 'package:flutter/material.dart';

class CreateGroup_page extends StatefulWidget {
  CreateGroup_page({super.key});

  @override
  State<CreateGroup_page> createState() => _CreateGroup_pageState();
}

class _CreateGroup_pageState extends State<CreateGroup_page> {
  List<ChatModel> contacts = [
    ChatModel(
        name: 'Aminul Islam',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Hello! how are you',
        des: 'Flutter Developer',
        select: false),
    ChatModel(
        name: 'Hridoy Shill',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Hello!',
        des: 'Front-end Developer',
        select: false),
    ChatModel(
        name: 'Jerin Afroz',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Ajke ki class hobe',
        des: 'Photographer',
        select: false),
    ChatModel(
        name: 'Badhon Krishna',
        icon: 'assets/Icon/person.svg',
        isGroup: false,
        time: '10:30 am',
        currentMessage: 'Mobile koto porche',
        des: 'Marketer',
        select: false),
  ];

  List<ChatModel> groups = [];
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
                  "New Group",
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
                Text('Add Perticipant',
                    style: TextStyle(fontSize: 12, color: Colors.white))
              ],
            ),
          ),
        ),
        body: Stack(
          children: [
            ListView.builder(
                itemCount: contacts.length + 1,
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return Container(
                      height: groups.length > 0 ? 90 : 10,
                    );
                  }
                  return InkWell(
                    onTap: () {
                      if (contacts[index -1].select == false) {
                        setState(() {
                          contacts[index-1].select = true;
                          print('True done');
                          groups.add(contacts[index-1]);
                        });
                      } else {
                        setState(() {
                          contacts[index-1].select = false;
                          print('false done');
                          groups.remove(contacts[index-1]);
                        });
                      }
                    },
                    child: Contact_card(
                      chatModel: contacts[index-1],
                    ),
                  );
                }),
            groups.length > 0? Column(
              children: [
                Container(
                  height: 75,
                  color: Colors.white,
                  child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: contacts.length,
                      itemBuilder: (contex, index) {
                        if (contacts[index].select == true) {
                          return InkWell(
                              onTap: () {
                                setState(() {
                                  contacts[index].select = false;
                                  print('false done');
                                  groups.remove(contacts[index]);
                                });
                              },
                              child: AvtarCard(
                                contact: contacts[index],
                              ));
                        } else {
                          return Container();
                        }
                      }),
                ),
                Divider(
                  thickness: 1,
                )
              ],
            ):Container(),
          ],
        ));
  }
}
