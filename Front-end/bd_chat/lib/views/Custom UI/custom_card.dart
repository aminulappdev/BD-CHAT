
import 'package:bd_chat/model/chatmodel.dart';
import 'package:bd_chat/views/individualPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class Custom_card extends StatelessWidget {
  final ChatModel chatModel;
  Custom_card({super.key, required this.chatModel});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => IndvidualPage(chatModel: chatModel,)));
      },
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.blue,
          radius: 26,
          child: SvgPicture.asset(chatModel.isGroup ? "assets/Icon/groups.svg" :  "assets/Icon/person.svg",
          height: 36,
          width: 36,
         ),
        ),
        title: Text(chatModel.name),
        subtitle: Row(
          children: [ 
            Icon(Icons.done_all),
            SizedBox(width: 5,),
            Text(chatModel.currentMessage)
          ],
        ),
        trailing: Text(chatModel.time),
      ),
    );
  }
}