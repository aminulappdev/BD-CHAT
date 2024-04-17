import 'dart:io';

import 'package:flutter/material.dart';

class CameraViewPage extends StatelessWidget {
  CameraViewPage({super.key, required this.path});
  String path;
  @override
  Widget build(BuildContext context) {
     double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        actions: [
          IconButton(onPressed: (){}, icon: Icon(Icons.crop_rotate,size: 27,color: Colors.white,)),
          IconButton(onPressed: (){}, icon: Icon(Icons.emoji_emotions_outlined,size: 27,color: Colors.white)),
          IconButton(onPressed: (){}, icon: Icon(Icons.title,size: 27,color: Colors.white)),
          IconButton(onPressed: (){}, icon: Icon(Icons.edit,size: 27,color: Colors.white)),
        ],
      ),
      body: Container(
        height: _height,
        width: _width,
        child: Stack(
          children: [ 
            Container(
              height: _height-150,
              width: _width,
              child: Image.file(File(path)),
            )
          ],
        ),
      ),
    );
  }
}