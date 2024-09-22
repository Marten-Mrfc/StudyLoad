const fetch = require('node-fetch');

async function getUserData(token, email) {
    const url = 'https://api.wrts.nl/api/v3/get_user_data';
    
    console.log('Gebruikersdata aan het ophalen met token en email:', token, email);
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://studygo.com',
          'Referer': 'https://studygo.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'X-Auth-Token': token,
          'X-Client-Type': 'web',
          'X-Device-Id': 'fdee95ec-3c45-47a4-a2f2-934e28496b6a',
          'X-Language-Code': 'nl',
          'X-Locale-Code': 'nl-NL',
          'X-Session-Id': '06685e9a-4f32-44be-b581-9eeb9c26a9f8'
        }
      });
  
      console.log('Volledige response van get_user_data API:', response);
  
      // Check of de status OK is
      if (response.ok) {
        const text = await response.text(); // Log de response als tekst
        console.log('Response tekst:', text);
  
        const data = JSON.parse(text); // Probeer handmatig te parsen
        console.log('Respons ontvangen van get_user_data API, aan het parsen naar JSON...');
        console.log(data); 
  
        if (data.email === email) {
          console.log('Succesvol gebruikersdata ontvangen');
          return data;
        } else {
          console.error('Fout ontvangen van get_user_data API:', data.error);
        }
      } else {
        console.error('Fout: Status niet OK:', response.status, response.statusText);
      }
    } catch (error) {
        console.error('Error:', error);
}}

module.exports = { getUserData };