
import 'package:bd_chat/views/chat_screen.dart';
import 'package:bd_chat/views/coming_soon.dart';
import 'package:flutter/material.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(_height/14),
          child: AppBar(      
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(
                bottom: Radius.circular(25),
              ),
            ),
            title: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 10),
              child: Text(
                "BD CHAT",
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold,fontSize: 25),
              ),
            ),
            actions: [
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
        bottomNavigationBar: Material(
          color: Color.fromARGB(255, 13, 125, 217),
          child: TabBar(
              unselectedLabelColor: Color.fromARGB(150, 240, 244, 246),
              labelColor: Colors.white,
              tabs: [
                Tab(
                  icon: Icon(Icons.message),
                  text: 'Chat',
                ),
                Tab(
                  icon: Icon(Icons.call),
                  text: 'Call',
                )
              ]),
        ),
        body: TabBarView(children: [
          ChatScreen(),
          Coming_soon(),
        ]),
      ),
    );
  }
}
