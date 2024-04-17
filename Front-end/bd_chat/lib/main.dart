import 'package:bd_chat/views/Camera/camera_screen.dart';
import 'package:bd_chat/views/hompage.dart';
import 'package:camera/camera.dart';


import 'package:flutter/material.dart';

Future<void> main() async {
   WidgetsFlutterBinding.ensureInitialized();
    cameras = await availableCameras();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        appBarTheme: AppBarTheme(         
          elevation: 2.0,
          backgroundColor: const Color.fromARGB(255, 13, 125, 217),
        ),
        primaryColor: Color.fromARGB(255, 23, 140, 235),
        useMaterial3: true,
      ),
      home: const Homepage(),
    );
  }
}



