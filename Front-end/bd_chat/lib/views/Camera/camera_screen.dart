import 'package:bd_chat/views/Camera/camera_viewpage.dart';
import 'package:camera/camera.dart';


import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

List<CameraDescription> cameras = [];

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  late CameraController _cameraController;
  late Future<void> cameraValues;

  

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    _cameraController = CameraController(cameras[0], ResolutionPreset.high);
    cameraValues = _cameraController.initialize();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    _cameraController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width;
    double _height = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Stack(
        children: [
          FutureBuilder(
              future: cameraValues,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.done) {
                  return CameraPreview(_cameraController);
                } else {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                }
              }),
              Positioned(
                bottom: 0.0,
                child: Container(
                  padding: EdgeInsets.only(top: 5,bottom: 5),
                  width: _width,
                  color: Colors.black,
                  child: Column(children: [
                    Row(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        IconButton(onPressed: (){}, icon: Icon(Icons.flash_off,color: Colors.white,size: 28,)),
                        InkWell(                         
                          onTap: (){
                             takePhoto(context);
                          },
                          child: Icon(Icons.panorama_fish_eye,color: Colors.white,size: 70,),),
                         IconButton(onPressed: (){}, icon: Icon(Icons.flip_camera_ios,color: Colors.white,size: 28,)),
                      ],
                    ),
                    SizedBox(height: 5,),
                    Text('Hold for video tab fot photo',style: TextStyle(
                      color: Colors.white
                    ),textAlign: TextAlign.center,)
                  ]),
                ),
              )
        ],
      ),
    );
  }

  void takePhoto(BuildContext context) async {
    final path = join((await getTemporaryDirectory()).path, ".png");
    
    print(path + 'hi');
    await _cameraController.takePicture();
    Navigator.push(context, MaterialPageRoute(builder: (builder) => CameraViewPage(path: path,), ));
  } 
}
