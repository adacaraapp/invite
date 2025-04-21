import { readFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;

  try {
    const filePath = join(process.cwd(), 'public/client', `${slug}.json`);
    const fileContent = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    return {
      messages: jsonData.messages || []
    };
  } catch (err) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Data not found',
    });
  }
});
