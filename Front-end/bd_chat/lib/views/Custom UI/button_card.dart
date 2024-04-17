import 'package:flutter/material.dart';


class Button_card extends StatelessWidget {
  Button_card({super.key, required this.name, required this.icon});
  String name;
  IconData icon;
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: const Color.fromARGB(255, 30, 168, 99),
        radius: 26,
        child: Icon(icon,color: Colors.white,),
      ),
      title: Text(name,style: const TextStyle(fontWeight: FontWeight.bold),),
    );
  }
}
