const fs = require('fs');

function generateRandomName(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomName = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomName += characters.charAt(randomIndex);
  }
  return randomName;
}

function renameVariablesInFile(filePath) {
  try {
 
    let content = fs.readFileSync(filePath, 'utf-8');
    const variableMap = {};
    const variableRegex = /\b(?:const|let|var)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+)\s*;/g;
    let match;

    while ((match = variableRegex.exec(content)) !== null) {
      const originalName = match[1];

      if (!variableMap.hasOwnProperty(originalName)) {
        const newName = generateRandomName(8);
        variableMap[originalName] = newName;

        content = content.replace(new RegExp(`\\b${originalName}\\b`, 'g'), newName);
      }
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(variableMap);
    
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
  }
}
const filePath = 'OutputCode.js';
renameVariablesInFile(filePath);