const fetch = require('node-fetch');

async function getToken(email, password) {
  const url = 'https://api.wrts.nl/api/v3/auth/get_token';
  const payload = { email, password };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      return data.auth_token;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error bij het verkrijgen van de token:', error);
    
  }
}

module.exports = { getToken };