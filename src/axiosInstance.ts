import axios from 'axios';

// Ambil URL dari variabel lingkungan
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  // Anda dapat menambahkan header atau konfigurasi lain di sini jika perlu
});

export default axiosInstance;
