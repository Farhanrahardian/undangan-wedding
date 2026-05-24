/**
 * CONFIGURATION DATA
 * Semua data undangan dikelola di sini untuk memudahkan kustomisasi.
 */

const CONFIG = {
    wedding: {
        title: "The Wedding of Shania & Fauzan",
        couple: "Shania & Fauzan",
        initials: "SF",
        date: "2026-07-18T07:30:00", // ISO format untuk countdown
        dateFull: "Sabtu, 18 Juli 2026",
        quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
        quoteSource: "Q.S. Ar-Rum: 21",
        calendarLink: "https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Shania+%26+Fauzan&dates=20260718T003000Z%2F20260718T060000Z&ctz=Asia/Jakarta",
        audio: "assets/audio/music.mp3"
    },
    bride: {
        fullName: "Shania Puspa Soebroto",
        shortName: "Shania",
        parents: "Bapak Hecky Soebroto & Ibu Ira Pranita",
        desc: "Putri Pertama",
        photo: "placeholder-bride" // Class name atau path
    },
    groom: {
        fullName: "Fauzan Akbar Afgani",
        shortName: "Fauzan",
        parents: "Bapak Mohamad Syah Afgani & Ibu Indriastuti",
        desc: "Putra Pertama",
        photo: "placeholder-groom"
    },
    event: {
        akad: {
            day: "Sabtu",
            date: "18 Juli 2026",
            time: "07.30 - 09.15 WIB",
            place: "D Hall, Kementerian Pertanian",
            address: "Jl. Harsono Rm Dalam No.3 Gedung D, RT.5/RW.7, Ragunan, Ps. Minggu, Jakarta Selatan 12550",
            maps: "https://maps.app.goo.gl/au3YhT4hRM9L6g349"
        },
        resepsi: {
            day: "Sabtu",
            date: "18 Juli 2026",
            time: "11.00 - 13.00 WIB",
            place: "D Hall, Kementerian Pertanian",
            address: "Jl. Harsono Rm Dalam No.3 Gedung D, RT.5/RW.7, Ragunan, Ps. Minggu, Jakarta Selatan 12550",
            maps: "https://maps.app.goo.gl/au3YhT4hRM9L6g349"
        }
    },
    story: {
        title: "Love Story",
        content: "Berawal sebagai rekan kerja, kami dipertemukan oleh seorang teman dalam sebuah kesempatan sederhana. Seiring berjalannya waktu, kami mulai sering menghabiskan waktu bersama dan saling mengenal lebih dekat. Dari situ, tumbuh rasa nyaman yang sederhana—hadir satu sama lain dan saling menguatkan dalam berbagai keadaan. Hingga akhirnya, kami menyadari adanya kecocokan yang terasa begitu alami. Atas izin Allah, dari pertemuan yang sederhana ini, kami menemukan satu sama lain. Dengan penuh keyakinan dan rasa syukur, kami memutuskan untuk melangkah bersama menuju ikatan pernikahan."
    },
    gift: {
        bankName: "BCA",
        accountNumber: "7305088951",
        accountHolder: "Shania P. Soebroto",
        address: "Fauzan & Shania, Jl. Tambak II Blok B No.12, 004/005 Pegangsaan, Menteng, Jakarta Pusat 10320",
        waConfirmation: "6281381463768"
    },
    firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    }
};
