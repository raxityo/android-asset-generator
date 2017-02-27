#!/usr/bin/env node

var fs = require('fs-extra')
  , gm = require('gm');
 
var argv = require('minimist')(process.argv.slice(2));

if(argv._.length==0){
	return console.log("USAGE : \n node script.js [OPTIONS] path/to/image.jpg \n\nOPTIONS :\n\n" +
		"* -s\t: Source format. Must be from [mdpi,hdpi,xhdpi,xxhdpi].\n\t  Default : xxhdpi\n\n" + 
		"* -d\t: Destination formats separated by comma.\n\t  Default : [mdpi,hdpi,xhdpi,xxhdpi] - [source]\n\n" + 
		"* -w\t: Destination width.\n\n" + 
		"* -h\t: Destination height.\n\n" + 
		"* -n\t: Destination name.\n\t  Default: android specific name for source."
		)
}

var sourceFile = argv._[0];
var sourceWidth;
var sourceHeight;
var aspectRatio;

androidRename(sourceFile,function(){
	gm(sourceFile).size(function(err,size){
		if(err){
			console.log("Error obtaining size.\n" + err);
			return;
		}
		sourceWidth  = size.width;
		sourceHeight = size.height;

		console.log("SOURCE : \n" +
			"NAME   : " + sourceFile + "\n" +
			"WIDTH  : " + sourceWidth + "\n" +
			"HEIGHT : " + sourceHeight + "\n\n");
		
		resizeToXhdpi();
		resizeToHdpi();
		resizeToMdpi();
	});
});

// xhdpi = 2*mdpi = 2*(xxhdpi/3)
function resizeToXhdpi(){
	gm(sourceFile)
	.resize(2*sourceWidth/3,2*sourceHeight/3)
	.write("../xhdpi/"+sourceFile,function(err){
		if(err)
			return console.log(err);
		console.log("XHDPI : \n" +
			"NAME   : " + "../xhdpi/" + sourceFile + "\n" +
			"WIDTH  : " + (2*sourceWidth/3)  + "\n" +
			"HEIGHT : " + (2*sourceHeight/3) + "\n\n");
	});
}

// xhdpi = 3*mdpi/2 = xxhdpi/2
function resizeToHdpi(){
	gm(sourceFile)
	.resize(sourceWidth/2,sourceHeight/2)
	.write("../hdpi/"+sourceFile,function(err){
		if(err)
			return console.log(err);
		console.log("HDPI : \n" +
			"NAME   : " + "../hdpi/" + sourceFile + "\n" +
			"WIDTH  : " + (sourceWidth/2)  + "\n" +
			"HEIGHT : " + (sourceHeight/2) + "\n\n");
	});
}

function resizeToMdpi(){
	gm(sourceFile)
	.resize(sourceWidth/3,sourceHeight/3)
	.write("../mdpi/"+sourceFile,function(err){
		if(err)
			return console.log(err);
		console.log("MDPI : \n" +
			"NAME   : " + "../mdpi/" + sourceFile + "\n" +
			"WIDTH  : " + (sourceWidth/3)  + "\n" +
			"HEIGHT : " + (sourceHeight/3) + "\n\n");
	});
}

function androidRename(filename,callback){
	sourceFile = filename.split(".")[0].toLowerCase()
					.replace(/[^a-z_1-9]/g,"_")
					.replace(/_+/g,"_")
					.replace(/^[^a-z]/g,"")
					.replace(/[^a-z1-9]$/g,"")
					.replace(/^\d+$/,"invalid_file") + "."+filename.split(".")[1];
	fs.rename(filename, sourceFile, callback);
}