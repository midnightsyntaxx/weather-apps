export default async function handler(req, res) {
  // Pakai cara ini biar lebih stabil di Vercel Node.js terbaru
  const { city } = req.query; 
  
  // Jika req.query kosong (kadang terjadi di beberapa versi Node), 
  // kita pakai cadangan URL parser modern
  const urlObj = new URL(req.url, `https://${req.headers.host}`);
  const cityFinal = city || urlObj.searchParams.get('city');

  const apiKey = process.env.OPENWEATHER_API_KEY;

  // Gunakan cityFinal supaya lebih aman
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFinal}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error: "Gagal mengambil data cuaca"});
  }
}