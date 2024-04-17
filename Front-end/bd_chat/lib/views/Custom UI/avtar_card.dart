


import 'package:bd_chat/model/chatmodel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class AvtarCard extends StatelessWidget {
  AvtarCard({super.key, required this.contact});
  ChatModel contact;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2,horizontal: 8),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Stack(
            children: [
              CircleAvatar(
                backgroundColor: Colors.blue,
                radius: 23,
                child: SvgPicture.asset(
                  "assets/Icon/person.svg",
                  height: 36,
                  width: 36,
                ),
              ),
              Positioned(
                  bottom: 0,
                  right: 0,
                  child: CircleAvatar(
                    radius: 11,
                    backgroundColor: Colors.grey,
                    child: Icon(
                      Icons.clear,
                      color: Colors.white,
                    ),
                  ))
            ],
          ),
          Text(contact.name)
        ],
      ),
    );
  }
}