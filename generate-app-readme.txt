
	* the builder only checks based on recently changed files (so if copy an old file and want it included 
	- update the mod date of application.js for example)

-------------------------------------------------------
Build the app using QooxDoo 2.0 mobile app (latest beta)
 - these files/folders are currently in "iartnorfolk-qooxdoo" - but the real name of that folder is "iArtNorfolk"

cd ~/qooxdoo-qooxdoo-4bec8fa/tool
./bin/create-application.py --type=mobile --name=iArtNorfolk --out=~/Desktop
cd ~/Desktop/iArtNorfolk
./generate.py source

./generate.py build

* all at once during deployment testing/etc
./generate.py source;./generate.py build-android;./generate.py build-ios

-------------------------------------------------------
* next - to Build the installable App (ex: .apk file for android)

1. Copy the resources, scripts and index.html files+folders into the phonegap folder

2. zip and upload to phonegap...

--------------------------------------------------------
* The server files are located on the iartnorfolk server



