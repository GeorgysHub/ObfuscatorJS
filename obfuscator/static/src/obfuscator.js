function generateRandomName(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomName = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters.charAt(randomIndex);
    }

    return randomName;
}

// Ваши остальные функции оставьте без изменений
function addSemicolons(inputCode) {
    try {
        let content = inputCode;
        content = content.replace(/}\s*(?=\w)(?!(\s*else|\s*catch))/g, '}; ');
        return content;
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
        return inputCode;
    }
}

function removeCommentsFromString(inputCode) {
    let content = inputCode;
    content = content.replace(/\/\/.*?(\r\n|\n|$)/g, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    return content;
}

function removeSpacesBetweenLinesFromString(inputCode) {
    let content = inputCode;
    content = content.replace(/(?<!\w)\s+/g, '');
    return content;
}

function renameVariablesInString(inputCode) {
    try {
        let content = inputCode;
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

        console.log(variableMap);
        return content;
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
        return inputCode;
    }
}

function obfuscate(code) {
    try {
        code = renameVariablesInString(code);
        code = removeCommentsFromString(code);
        code = removeSpacesBetweenLinesFromString(code);
        code = addSemicolons(code);

        console.log('Обфусцированный код:', code);
        return code;
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
        return code;
    }
}
