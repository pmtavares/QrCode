## Install
* npx react-native init "ProjectName"
* npm i react-native-camera
* npm i react-native-qrcode-scanner
* npx react-native link react-native-camera (May not need)
* npm install --save react-native-permissions

Need to edit AndroidManifest.xml to add the following:
 
##### <uses-permission android:name="android.permission.CAMERA" />

##### <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

##### <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /> 

##### <uses-permission android:name="android.permission.VIBRATE"/>