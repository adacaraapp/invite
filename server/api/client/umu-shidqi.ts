export default defineEventHandler(async (event) => {
    return {
        theme: "ethnic",
        code: "umu-shidqi",
        head: {
            title: "Pernikahan M. Shidqi Wafa & Neng Umu Kulsum",
            description:
                "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami.",
            cover: "/client/umu-shidqi/cover.png",
            logo: "/client/umu-shidqi/logo.png",
            favicon: "/client/umu-shidqi/favicon.png",
        },
        groom: {
            picture: null,
            short_name: "Shidqi",
            full_name: "M. Shidqi Wafa, M.Ag.",
            father_name: "H. Badrudin Ilham",
        },
        bride: {
            picture: null,
            short_name: "Umu",
            full_name: "Neng Umu Kulsum, S.M.",
            father_name: "Asep Patah Taufik",
        },
        recipient: {
            name: "Nama Tamu",
        },
        venue: {
            name: "PP. Al-I’tishom Choblong",
            address: "Kp. Pasir Angin, Tegallega, Warungkondang, Cianjur, Jawa Barat.",
            qr_location: '/client/umu-shidqi/location.png',
            google_maps: 'https://maps.app.goo.gl/PXgLUE71xL2fpdCF6'
        },
        date: "2025-06-25",
        date_long: "25 Juni 2025 M.",
        date_hijri: "28 Dzulhijjah 1446 H.",
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
        gift: {
            accounts: [
                {
                    bank_name: "Bank BRI",
                    bank_logo: "/logos/bri.svg",
                    account_name: "SHIDQI WAFA",
                    account_number: "407801026086536"
                },
                {
                    bank_name: "Bank BJB",
                    bank_logo: "/logos/bjb.png",
                    account_name: "NENG UMU KULSUM",
                    account_number: "0141697056100"
                }
            ]
        }
    };
});
