var path = require('path'), fs=require('fs');

var extension = process.argv.slice(2,3);
var word = process.argv.slice(3,4);
var currentPath = process.cwd();
var flag = 0;
function fromDir(startPath,word,extension){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var extFile = path.extname(filename);
        var file = path.basename(filename,extFile);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,word,extension); //recurse
        }
        else if (filename.indexOf(extension)>=0) {
            var data = fs.readFileSync(filename , 'utf8');
            if(data.indexOf(word) > -1)
            {
                flag++;
                console.log('-- found: ',filename); 
            }
        };
    };
};

/*
try {  
   
    console.log(data);    
} catch(e) {
    console.log('Error:', e.stack);
} 
*/

if(word=="" && extension==""){
    console.log('USAGE: node search [EXT] [TEXT]');
}
else{
    fromDir(currentPath , word , '.' + extension);
    if(flag==0)
    {
         console.log('no file was found');
    }
}