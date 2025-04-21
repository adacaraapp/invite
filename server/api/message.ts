// import fs from 'fs/promises';
// import path from 'path';

// async function updateJsonFile(filePath: string, data: object): Promise<void> {
//   try {
//     const fullPath = path.resolve(filePath);
//     const fileContents = await fs.readFile(fullPath, 'utf-8');
//     const jsonData = JSON.parse(fileContents);

//     const updatedData = [ ...jsonData, data ]; CEK LAGI
    
//     await fs.writeFile(fullPath, JSON.stringify(updatedData, null, 2), 'utf-8');
//   } catch (error) {
//     console.error('Error updating JSON file:', error);
//   }
// }

