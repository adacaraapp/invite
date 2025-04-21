import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  const body = await readBody(event);

  // Validasi input dasar
  if (!slug || !body?.name || !body?.message || !body?.confirmation) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Harap lengkapi semua data (name, message, confirmation)',
    });
  }

  // Validasi jika hadir, jumlah tamu harus ada dan >= 1
  if (body.confirmation === 'Hadir' && (!body.tamu || body.tamu < 1)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Jumlah tamu wajib diisi jika memilih hadir',
    });
  }

  try {
    const filePath = join(process.cwd(), 'public/client', `${slug}.json`);
    const fileContent = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    const newMessage = {
      name: body.name,
      message: body.message,
      confirmation: body.confirmation,
      tamu: body.confirmation === 'Hadir' ? body.tamu : 0,
      created_at: new Date().toISOString(),
    };

    // Tambahkan ke messages
    jsonData.messages = jsonData.messages || [];
    jsonData.messages.push(newMessage);

    // Simpan kembali ke file
    await writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    return {
      success: true,
      message: 'Ucapan berhasil dikirim!',
      data: newMessage
    };
  } catch (err) {
    console.error('Gagal menulis file:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menyimpan pesan. Coba lagi nanti.',
    });
  }
});