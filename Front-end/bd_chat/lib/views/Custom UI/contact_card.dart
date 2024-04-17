

import 'package:bd_chat/model/chatmodel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class Contact_card extends StatelessWidget {
  final ChatModel chatModel;
  Contact_card({super.key, required this.chatModel});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Container(
        height: 53,
        width: 50,
        child: Stack(
          children: [
            CircleAvatar(
              backgroundColor: Colors.blue,
              radius: 26,
              child: SvgPicture.asset(
                "assets/Icon/person.svg",
                height: 36,
                width: 36,
              ),
            ),
             
             
            chatModel.select? Positioned(
                bottom: 2,
                right: 5,
                child: CircleAvatar(
                  radius: 15,
                  backgroundColor: Colors.teal,
                  child: Icon(
                    Icons.check,
                    color: Colors.white,
                  ),
                )):Container()
          ],
        ),
      ),
      title: Text(chatModel.name),
      subtitle: Text(chatModel.des),
    );
  }
}
