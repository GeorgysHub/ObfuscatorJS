const fs = require('fs');

function removeCommentsFromFile(filePath) {

  let content = fs.readFileSync(filePath, 'utf-8');   

  content = content.replace(/\/\/.*?(\r\n|\n|$)/g, '');   
  content = content.replace(/\/\*[\s\S]*?\*\//g, ''); 

  fs.writeFileSync(filePathOutput, content, 'utf-8'); 

}

const filePath = 'OutputCode.js';
const filePathOutput = 'OutputCode.js';

removeCommentsFromFile(filePath);