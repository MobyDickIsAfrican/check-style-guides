#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');

const STYLE_GUIDE = {
    equivalenceRegex: [/\w+\s=\w+;/g, /\w+=\s\w+;/],
};
const currentDirectory = process.cwd();

fs.readdir(currentDirectory, (err, files) => {
    if(err){
        console.log(`${err}`);
    };
    files.forEach((file) => {
        //check if pathname is a directory
        if(fs.lstatSync(file).isDirectory()){
            return;
        };
        let count = 0;
        const readStream = fs.createReadStream(file);
        const LineInterface = readline.createInterface(
            {
                input: readStream,
            }
        );
        LineInterface.on("line", (line) =>{
            count+=1
            STYLE_GUIDE.equivalenceRegex.forEach((regX) =>{
                if(regX.test(line)){
                    console.log(`You have to have a space between assignment operator style violation was found at line: ${count}`)
                    return
                }
            });
        });
    })
});