# ✉️ Premium Digital Wedding Invitation — Shania & Fauzan

Aplikasi web **Undangan Pernikahan Digital (*Digital Wedding Invitation*)** yang dirancang khusus dengan estetika premium, mewah, modern, dan penuh interaktivitas. Undangan ini dibuat menggunakan perpaduan seni dekoratif floral klasik dengan fungsionalitas teknologi modern, memastikan setiap tamu undangan mendapatkan kesan pertama yang tak terlupakan.

---

## ✨ Fitur Utama & Keunggulan

Aplikasi ini memiliki fitur lengkap untuk memfasilitasi kebutuhan pernikahan digital modern:

1. **Desain Visual Premium & Ornamen Emas Estetik**
   * **Palet Warna Elegan**: Menggunakan tema royal klasik perpaduan *Deep Navy* (`#2E3551`), *Champagne Gold* (`#DBAD85`), dan sentuhan lembut *Amour* (`#F1E5E7`).
   * **Dekorasi Emas Mewah**: Dilengkapi ornamen floral sudut emas (*golden floral corner*) pada kartu dan pembatas section buket bunga emas (*floral bouquet divider*) untuk transisi yang anggun antar halaman.
   * **Tipografi Artistik**: Menggunakan font Google Fonts pilihan (*Cormorant Garamond* yang puitis, *Great Vibes* yang manis, dan *Montserrat* yang bersih).

2. **Personalized Guest Welcoming (Cover Dinamis)**
   * Menyambut tamu secara khusus berdasarkan nama yang tertera pada URL parameter (contoh: `https://domain-undangan.com?to=Nama+Tamu`).
   * Cover transisi elegan yang menyembunyikan konten utama sebelum tamu menekan tombol **"OPEN INVITATION"** untuk memicu musik latar.

3. **Sistem Database Tangguh (LocalStorage Fallback Mode)**
   * **Zero Crash**: Dilengkapi sistem pengaman pintar di `firebase.js`. Jika kredensial Firebase bernilai dummy/belum diset, aplikasi **otomatis beralih ke Mode Fallback Lokal (LocalStorage)**.
   * **Seed Data**: Dilengkapi data benih ucapan doa dan RSVP bawaan agar visual carousel ucapan dan diagram statistik terisi cantik secara instan saat pertama kali dibuka.
   * **Fungsi Penuh**: Tamu tetap dapat mengirim RSVP dan ucapan doa dengan lancar secara lokal.

4. **Profil Mempelai & Love Story Indah**
   * Pengenalan lengkap kedua mempelai beserta latar belakang keluarga, lengkap dengan potret tunggal premium mempelai wanita (**Shania**) dan mempelai pria (**Fauzan**).
   * Alur perjalanan kisah cinta (*Love Story*) yang dibalut dengan animasi transisi yang memukau.

5. **Detail Acara & Google Maps Terintegrasi**
   * Informasi lengkap mengenai Akad Nikah dan Resepsi (Waktu, Lokasi, dan Alamat).
   * Tombol navigasi langsung terintegrasi dengan Google Maps untuk mempermudah tamu menuju ke lokasi acara.

6. **Interactive Gallery & Lightbox Dinamis**
   * Galeri foto kolase dengan desain estetik dan responsif.
   * Mendukung fitur **Dynamic Lightbox Modal Overlay** yang secara otomatis membaca dan menampilkan foto resolusi tinggi yang diklik oleh tamu undangan secara proporsional.

7. **E-Gift & Angpao Digital**
   * Modal interaktif berisi informasi rekening BCA untuk pemberian kado/angpao secara digital.
   * Tombol salin nomor rekening instan (otomatis menyalin ke clipboard).
   * Tombol konfirmasi hadiah langsung terhubung ke WhatsApp mempelai.

8. **Buku Tamu & RSVP Real-Time**
   * Formulir konfirmasi kehadiran (Hadir, Tidak Hadir, Mungkin) beserta visualisasi statistik yang diperbarui secara langsung.
   * Karusel pesan ucapan (*Wedding Wishes*) otomatis yang bergerak lembut dan mendukung fitur geser (*swipe*) di HP.

9. **Countdown Timer & Optimasi CPU**
   * Penghitung waktu mundur yang akurat menuju hari pernikahan.
   * Sistem otomatis mematikan interval waktu (`clearInterval`) begitu waktu pernikahan tercapai untuk menghemat daya baterai perangkat tamu.

10. **Background Music & Audio Control**
    * Lagu romantis yang otomatis berputar perlahan (*fade-in*) setelah undangan dibuka.
    * Tombol kontrol audio melayang (*floating play/pause toggle*) untuk kenyamanan tamu.

---

## 📂 Struktur Direktori Proyek

```bash
wedding/
│
├── assets/                 # Aset multimedia & gambar dekorasi
│   ├── audio/
│   │   └── Engagement_Party.mp3   # Lagu latar belakang (Background Music)
│   │
│   ├── pngtree-hand-drawn-flowers-and-leaves-golden-floral-corner-with-line-art-vector-png-image_7081313.png  # Ornamen Sudut Kartu
│   └── vecteezy_elegant-hand-drawn-floral-bouquet-with-gold-flowers-and-leaves_24952005.png                   # Pembatas Section Emas
│
├── config.js               # Pengaturan pusat data undangan & Firebase Kredensial
├── firebase.js             # Logika integrasi Firestore & LocalStorage Fallback
├── app.js                  # Logika interaksi klien, lightbox, countdown, dan GSAP
├── index.html              # Halaman utama undangan digital
├── style.css               # Desain tata letak, tema visual, & ornamen CSS
├── link-generator.html     # Alat bantu (tool) pengelola & pembuat link tamu massal
└── README.md               # Dokumentasi proyek (Dokumen ini)
```

---

## ⚙️ Panduan Konfigurasi Awal

Konten teks, detail acara, nomor rekening, alamat, hingga kredensial Firebase dikelola secara terpusat di file `config.js` demi memudahkan kustomisasi tanpa menyentuh file HTML/JS lainnya.

### 1. Kustomisasi Detail Acara
Buka file `config.js` dan sesuaikan nilainya:
```javascript
const CONFIG = {
    wedding: {
        title: "The Wedding of Shania & Fauzan",
        couple: "Shania & Fauzan",
        initials: "SF",
        date: "2026-05-24T07:30:00", // Tanggal acara (Format ISO) untuk Countdown
        dateFull: "Ahad, 24 Mei 2026",
        quote: "Dan di antara tanda-tanda (kebesaran)-Nya...",
        quoteSource: "Q.S. Ar-Rum: 21",
        calendarLink: "https://www.google.com/calendar/render?action=TEMPLATE...",
        audio: "assets/audio/Engagement_Party.mp3"
    },
    bride: {
        fullName: "Shania Puspa Soebroto",
        shortName: "Shania",
        parents: "Bapak Hecky Soebroto & Ibu Ira Pranita",
        desc: "Putri Pertama",
    },
    // ...
```

### 2. Setup Firebase (Opsional untuk Online Sync)
Jika ingin menggunakan database online Firestore untuk fitur RSVP & buku tamu:
1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Cloud Firestore** pada menu Build > Firestore Database.
3. Buat database dalam mode **Production** atau **Test** dan pilih lokasi server terdekat (misal: `asia-southeast2` untuk Jakarta).
4. Buat aplikasi web baru di Firebase console, salin objek `firebaseConfig` Anda, dan tempel di bagian bawah `config.js`:
```javascript
    firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    }
```
*Catatan: Jika dibiarkan menggunakan kredensial dummy bawaan, aplikasi akan otomatis menggunakan **LocalStorage Fallback Mode** yang sangat aman dan stabil.*

---

## ✉️ Panduan Lengkap Membuat & Menambahkan Daftar Tamu Undangan

Untuk mengirimkan undangan yang dipersonalisasi (ada nama tamu di halaman depan), Anda dapat menggunakan alat bantu bawaan **Link Generator** yang sangat mudah digunakan.

### Langkah-Langkah Mengelola & Mengirim Link Tamu:

1. **Jalankan Aplikasi**
   Jalankan undangan Anda secara lokal (misal dengan ekstensi VS Code *Live Server* di `http://127.0.0.1:5500`) atau unggah file proyek ini ke penyedia hosting Anda (misal: GitHub Pages, Vercel, Netlify, atau cPanel hosting pribadi).

2. **Buka Link Generator**
   Akses halaman pembuat link di web browser Anda dengan membuka file `link-generator.html` (contoh: `http://127.0.0.1:5500/link-generator.html` atau `https://domain-undangan-anda.com/link-generator.html`).

3. **Konfigurasi URL Website Undangan**
   * Di dalam kartu **URL Website Undangan**, isi kolom teks dengan domain tempat undangan Anda di-host (contoh: `https://shaniafauzan-wedding.com`).
   * Klik tombol **Simpan**. Ini menjadi basis utama pembuatan URL unik tamu Anda.

4. **Menambahkan Daftar Nama Tamu**
   Ada dua metode yang dapat Anda gunakan:
   
   * **Metode A: Menambahkan Tamu Satu per Satu (Manual)**
     1. Tulis nama tamu pada kolom **Tambah Tamu Manual** (contoh: `Budi Santoso`).
     2. Tekan **Enter** pada keyboard atau klik tombol **Tambah**.
     3. Nama tamu akan langsung ditambahkan ke daftar di bagian bawah secara otomatis lengkap dengan link khususnya.
     
   * **Metode B: Import Massal Banyak Tamu Sekaligus (Dari Excel / Google Sheets)**
     1. Buka file daftar tamu Anda di Microsoft Excel atau Google Sheets.
     2. Blok satu kolom yang berisi seluruh nama tamu Anda, lalu tekan **Ctrl + C** (Salin).
     3. Kembali ke browser halaman *Link Generator*, klik dan paste (**Ctrl + V**) langsung di kolom **Import Nama Massal**.
     4. Klik tombol **Import Semua**. Sistem akan menyaring baris kosong dan mendeteksi nama ganda secara otomatis!

5. **Mendapatkan & Membagikan Link ke Tamu**
   Daftar tamu yang telah terdaftar akan muncul di bagian bawah. Anda bisa membagikannya dengan cara:
   * **Tombol Copy**: Klik tombol emas **Copy** di samping nama tamu untuk menyalin link unik tamu tersebut ke clipboard Anda.
   * **Tombol WA (Buka WhatsApp)**: Klik tombol **WA** untuk langsung membuka WhatsApp Web atau aplikasi WhatsApp dengan draf pesan manis undangan resmi terformat indah untuk nama tersebut.
   * **Format WA Massal**: Klik tombol **💬 Format WA** di bagian atas untuk menyalin pesan template undangan massal yang siap Anda bagikan ke grup atau disebarkan.
   * **Export CSV**: Klik tombol **📥 Export CSV** untuk mengunduh daftar nama tamu beserta link unik mereka dalam format file Excel/CSV untuk disimpan atau diserahkan ke vendor sebar undangan.

---

## 🚀 Cara Menjalankan Secara Lokal

Karena proyek ini menggunakan ES6 Javascript Modules (`import`/`export`), browser membatasi pembukaan langsung file `index.html` lewat protokol `file://` (keamanan CORS). Anda wajib menjalankannya menggunakan server lokal.

### Cara termudah:
* **VS Code Live Server**: Pasang ekstensi **Live Server**, klik kanan pada `index.html` dan pilih **Open with Live Server**.
* **Python**: Jalankan perintah berikut di folder proyek Anda:
  ```bash
  python -m http.server 8000
  ```
  Lalu buka `http://localhost:8000` di web browser Anda.
* **NodeJS (live-server)**:
  ```bash
  npx live-server .
  ```

---

Semoga aplikasi ini dapat turut menyempurnakan hari bahagia Anda! Selamat atas pernikahannya! 🎉💍
