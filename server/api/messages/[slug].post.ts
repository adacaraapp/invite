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
    // Simpan kembali ke file
    const response = await $fetch('https://db.sekeco.work/api/database/rows/table/689/?user_field_names=true', {
      method: "POST",
      headers: {
        Authorization: "Token zvrWD5DD2LbRjddJADoiKN2aIWIJLG7u",
        "Content-Type": "application/json"
      },
      body: {
        name: body.name,
        message: body.message,
        confirmation: body.confirmation,
        tamu: body.confirmation === 'Hadir' ? body.tamu : 0,
      }
    })

    return {
      success: true,
      message: 'Ucapan berhasil dikirim!',
      data: response
    };
  } catch (err) {
    console.error('Gagal menulis file:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menyimpan pesan. Coba lagi nanti.',
    });
  }
});