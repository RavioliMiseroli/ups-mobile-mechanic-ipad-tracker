import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/cupertino.dart';
import 'firebase_options.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'dart:io';

class DataManager {

  // prevent instantion as object
  const DataManager._();

  static initialize() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }

  static deleteOldEntries() async {
    Data data = await getDeviceInfo();
    int timeNow =  DateTime.now().millisecondsSinceEpoch;

    final DatabaseReference ref = FirebaseDatabase.instance
        .ref("data/${data.deviceID}/locations");

    DataSnapshot locations = await ref.get();

    Map<String, dynamic> deleteMap = {};
    List locationList = locations.children.toList();
    int oneDay = 86400000;

    for (int i = 0; i < locationList.length; i++)
    {
      int timestamp = int.parse(locationList[i].key);
      if (timeNow - timestamp > oneDay){ // if timestamp older than 24 hours
        deleteMap[timestamp.toString()] = null;
      }
    }

    ref.update(deleteMap);

  }

  static Future<Data> getDeviceInfo() async {
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    Data data = Data();

    if (Platform.isIOS) {
      var iosDeviceInfo = await deviceInfo.iosInfo;

      data.deviceName = iosDeviceInfo.name ?? "";
      data.deviceID = iosDeviceInfo.identifierForVendor ?? "";
    } else if (Platform.isAndroid) {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      data.deviceName = androidDeviceInfo.device ?? "";
      data.deviceID = androidDeviceInfo.id ?? "";
    }

    return data;
  }


  static writeToDatabase(lat,lon) async {
    deleteOldEntries();

    DatabaseReference ref = FirebaseDatabase.instance.ref("data");
    Data data = await getDeviceInfo();

    data.timestamp =  DateTime.now().millisecondsSinceEpoch.toString();
    data.lat = lat;
    data.lon = lon;

    // dont update database if deviceID issue
    if (data.deviceID == "") return;

    // update device info
    ref.child("${data.deviceID}").update({
      "deviceName": data.deviceName,
      "deviceStatus": "active",
      "deviceOwner": "Temp"
    });

    // update locations node
    ref = ref.child("${data.deviceID}/locations");
    ref.update({
      data.timestamp: {
        "lat": data.lat,
        "lon": data.lon
      }
    });
  }
}

class Data {

  late String _deviceID;
  late String _deviceName;
  late String _deviceStatus;
  late String _deviceOwner;
  late String lat;
  late String lon;
  late String timestamp;


  void set deviceID(String l) {
    _deviceID = _replaceInvalidChars(l);
  }
  String get deviceID {
    return _deviceID;
  }

  void set deviceName(String l) {
    _deviceName = _replaceInvalidChars(l);
  }
  String get deviceName {
    return _deviceName;
  }

  void set deviceStatus(String l) {
    _deviceStatus = _replaceInvalidChars(l);
  }
  String get deviceStatus {
    return _deviceStatus;
  }

  void set deviceOwner(String l) {
    _deviceOwner = _replaceInvalidChars(l);
  }
  String get deviceOwner {
    return _deviceOwner;
  }

  static String _replaceInvalidChars(String str){

    str = str.replaceAll('.', '_');
    str = str.replaceAll('\$', '_');
    str = str.replaceAll('#', '_');
    str = str.replaceAll('[', '_');
    str = str.replaceAll(']', '_');
    str = str.replaceAll('/', '_');

    return str;
  }
}