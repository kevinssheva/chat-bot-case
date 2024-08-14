# Virtual Assistant Project

## Deskripsi Proyek

Proyek ini bertujuan untuk membangun antarmuka asisten virtual yang memungkinkan pengguna berinteraksi melalui pengaturan percakapan (chat). Antarmuka ini akan memungkinkan pengguna untuk mengajukan pertanyaan atau memberikan perintah kepada asisten virtual, menerima jawaban, dan menyimpan histori percakapan.

## Fitur Utama

- **Tampilan Chat**: 
  - Kotak masukan untuk pengguna dan area tampilan percakapan.
  - Setiap pesan memiliki pengirim (asisten atau pengguna).
  
- **Interaksi dengan Asisten Virtual**: 
  - Pengguna dapat mengajukan pertanyaan atau memberikan perintah.
  - Asisten memberikan balasan berdasarkan pertanyaan atau perintah tersebut menggunakan algoritma sederhana.

- **Persistensi Data**:
  - Menyimpan histori percakapan di backend.
  - Fungsionalitas untuk membuka kembali sesi percakapan sebelumnya.

- **Pemahaman Bahasa Alami**:
  - Integrasi dengan pustaka pemrosesan bahasa alami (NLP) yakni ChatGPT API Key.

- **Antarmuka Rekomendasi**:
  - Menampilkan pertanyaan yang direkomendasikan.
  - Pengguna dapat memilih pertanyaan yang direkomendasikan dengan mengkliknya.

- **Responsif dan Menarik**:
  - Antarmuka responsif dengan pengalaman pengguna yang baik.
  - Animasi atau efek visual untuk meningkatkan daya tarik antarmuka.

## Tech Stack

Proyek ini menggunakan teknologi berikut:

- **Frontend**:
  - **Next.js**: Framework React untuk aplikasi web yang mendukung rendering sisi server (SSR) dan pembuatan situs statis (SSG). Memudahkan pengembangan antarmuka pengguna yang cepat dan responsif.
  - **Tailwind CSS**: Framework CSS utility-first untuk styling yang efisien dan konsisten. Memungkinkan desain yang responsif dan menarik dengan cepat.

- **Backend**:
  - **Laravel**: Framework PHP yang menyediakan struktur dan fungsionalitas robust untuk aplikasi web. Memudahkan pengembangan backend dengan fitur-fitur seperti routing, middleware, dan ORM (Eloquent).

- **Database**:
  - **SQLite**: Sistem manajemen basis data relasional yang ringan dan sederhana. Digunakan untuk menyimpan data percakapan dan mendukung pengembangan yang cepat tanpa konfigurasi server database yang rumit.

## Instalasi dan Penggunaan

### Frontend

1. Clone repository:
   ```bash
   git clone https://github.com/kevinssheva/chat-bot-project-client.git
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd chat-bot-project-client
   ```

3. Instal dependensi:
   ```bash
   npm install
   ```

4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

### Backend

1. Clone repository:
   ```bash
   git clone https://github.com/kevinssheva/chat-bot-project-server.git
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd chat-bot-project-server
   ```

3. Instal dependensi (Laravel):
   ```bash
   composer install
   ```

4. Konfigurasi file `.env` sesuai kebutuhan.

5. Jalankan server:
   ```bash
   php artisan serve
   ```

## Dokumentasi

- **Screenshots**: Lihat folder `screenshots/` untuk tangkapan layar dari aplikasi.

- **Screen Recorder**: Lihat [video](https://youtu.be/AeZ9W2d31U4) untuk video demonstrasi.

---
