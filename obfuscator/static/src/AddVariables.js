const fs = require('fs');

function addVariablesToFile(inputFilePath, outputFilePath, variables) {
    try {

      let content = fs.readFileSync(inputFilePath, 'utf-8');   
  
      variables.forEach(({ name, value }) => {  
        const existingVariableRegex = new RegExp(`\\bconst\\s+${name}\\s*=\\s*[^;]+\\s*;`, 'g');
  
        if (existingVariableRegex.test(content)) { 
          const randomSuffix = Math.floor(Math.random() * 1000);
          value = `${value}_${randomSuffix}`;
          console.log(`К переменной ${name} добавлено случайное число: ${randomSuffix}`);
        }
  
        content = content.replace(existingVariableRegex, '');
  
        content += `\nconst ${name} = ${JSON.stringify(value)};`;
        console.log(`Переменная ${name} добавлена в файл.`);
      });
  
      fs.writeFileSync(outputFilePath, content, 'utf-8');
      console.log(`Файл ${outputFilePath} успешно обновлен.`);
    } catch (error) {
      console.error(`Ошибка: ${error.message}`);
    }
  }

  const variablesToAdd = [
    {name: 'count', value: 0},
    {name: 'path', value: 'file'},
    {name: 'total', value: 0}
  ];

  const filePath = 'SourceCode.js';
  const filePathOutput = 'OutputCode.js';

  addVariablesToFile(filePath,filePathOutput, variablesToAdd);