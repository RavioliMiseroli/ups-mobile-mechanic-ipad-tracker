import 'package:background_location/background_location.dart';
import 'package:flutter/material.dart';

import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'datamanager.dart';

void main() async {

  int updateInterval = 60000; // 60000 milliseconds = 1 minute
  int lastUpdateTime = 0;

  DataManager.initialize();
  setAndroidNotificationIcon();

  await BackgroundLocation.startLocationService(distanceFilter: 0);
  BackgroundLocation.getLocationUpdates((location) {

    int now =  DateTime.now().millisecondsSinceEpoch;
    if (lastUpdateTime + updateInterval < now){
      lastUpdateTime = now;
      String lat = location.latitude.toString();
      String lon = location.longitude.toString();
      DataManager.writeToDatabase(lat, lon);
    }
  });

  runApp(BaseLayout());
}


class BaseLayout extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return MaterialApp (
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          appBar: AppBar(
            title: const Text('UPS Device Locator'),
            backgroundColor: Colors.amber,
            foregroundColor: Colors.black,
            centerTitle: true,
          ),
          body: MyImageContainer(),
        )
    );
  }
}

Future<void> setAndroidNotificationIcon()
async {
  await BackgroundLocation.setAndroidNotification(
    title: 'Background service is running',
    message: 'Background location in progress',
    icon: '@mipmap/ic_launcher',
  );
}

class MyImageContainer extends Container {

  @override
  Widget build(BuildContext context){
    return Container(
        child: Center(
            child: Text('')),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/ups_logo.png"),
            fit: BoxFit.scaleDown,
          ),
        )
    );
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          appBar: AppBar(
            title: const Text('Background Location Service'),
          ),
        )
    );
  }


  @override
  void dispose() {
    BackgroundLocation.stopLocationService();
    super.dispose();
  }
}