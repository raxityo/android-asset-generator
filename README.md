# Android Asset Generator
A small script to generate scaled down assets for Android. It was written in early 2014 to speed up asset management for Android apps. With tools like Sketch, such utility might not be needed anymore.

### Install:
Get it from `npm`:
```
npm install -g android-asset-generator
```

### Usage:
```
android-asset-generator path/to/image.png

OPTIONS :
-s  Source format. Must be from [mdpi,hdpi,xhdpi,xxhdpi].
	Default : xxhdpi
-d  Destination formats separated by comma.
    Default : [mdpi,hdpi,xhdpi,xxhdpi] - [source]

-w  Destination width.
-h  Destination height.
-n  Destination name.
    Default: android specific name for source.
```

Follow me on twitter at: [@raxityo](https://twitter.com/raxityo).
