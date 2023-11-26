# sudoku-app
Sudoku app

-Open project in Android Studio

App name is io.ionic.starter if you want to check the data in the internal storage under data/data/shared_prefs/CapacitorStorage.xml

For the project I used these:

Device: Pixel 7 Pro API 33 Tiramisu

Android version: Android 13 (12 funket også på min OnePlus Nord)

Java sdk: 17! (Jeg har testet java 16 og 21, de funka desverre ikke.)

File->Project Structure->JDK->Android API 33 ->Apply

Commands to build and run project:

npm install
ionic build
ionic cap add android

Remember to set ANDROID_HOME to path!
ionic cap build android

Depending on your settings, the program should launch Android application for example in new window.

You can also use: ionic cap open android or open android folder in Android Studio manually.

Then run app in Android Studio with Pixel Pro 7 API 33 device.

I recommend running the application on a physical device for better performance. 

Just select your physical device instead of Pixel 7 Pro from the list when using ionic cap build android.

OR ionic serve -> webapp in your web browser
