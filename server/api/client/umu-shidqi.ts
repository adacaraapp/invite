export default defineEventHandler(async (event) => {
    return {
        theme: "ethnic",
        head: {
            title: "Pernikahan M. Shidqi Wafa & Neng Umu Kulsum",
            description:
                "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami.",
            cover: "/client/umu-shidqi/cover.jpg",
            logo: "/client/umu-shidqi/logo.png",
        },
        groom: {
            picture: null,
            short_name: "Shidqi",
            full_name: "M. Shidqi Wafa",
            father_name: "H. Badrudin Ilham",
        },
        bride: {
            picture: null,
            short_name: "Umu",
            full_name: "Neng Umu Kulsum",
            father_name: "Asep Patah Taufik",
        },
        recipient: {
            name: "Nama Tamu",
        },
        venue: {
            name: "PP. Al-I’tishom Choblong",
            address: "Kp. Pasir Angin, Tegallega, Warungkondang, Cianjur, Jawa Barat.",
            qr_location: '/client/umu-shidqi/location.png',
        },
        date: "2025-06-25",
        date_hijri: "28 Dzulhijjah 1446 H",
        day: "Rabu",
        events: [
            {
                name: "Akad Nikah",
                time: "07.30 - 08.30",
            },
            {
                name: "Resepsi",
                time: "09.00 - Selesai",
            },
        ],
        families: [
            "Keluarga Bpk. H. Badruddin Ilham & Ibu Hj. Iseu Aisyah",
            "Keluarga Bpk. Asep Patah Taufik & Ibu Siti Nuraidah",
        ],
    };
});
