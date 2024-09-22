const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const { getToken } = require('./token');
const { getUserData } = require('./api/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser
app.use(express.static('public')); // Serve static files from the public directory

app.post('/api/getUserData', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const token = await getToken(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Verkeerde gegevens/geen gebruiker gevonden' });
    }

    const userData = await getUserData(token, email);
    
    if (!userData) {
      return res.status(404).json({ error: 'Geen gegevens ontvangen' });
    }

    res.cookie('authToken', token, { httpOnly: false, secure: false, maxAge: 3600000 });
    res.cookie('email', email, { httpOnly: false, secure: false, maxAge: 3600000 });
    res.json(userData);
  } catch (error) {
    console.error('Error in getUserData POST:', error);
    res.status(500).json({ error: 'Geen verbinding met de server' });
  }
});

app.get('/api/getUserData', async (req, res) => {
  const token = req.cookies.authToken;
  const email = req.cookies.email;

  if (!token) {
    return res.status(401).json({ error: 'Niet ingelogd' });
  }

  try {
    const userData = await getUserData(token, email);
    
    if (!userData) {
      return res.status(404).json({ error: 'Geen gegevens ontvangen' });
    }
    
    res.json(userData);
  } catch (error) {
    console.error('Error in getUserData GET:', error);
    res.status(500).json({ error: 'Geen verbinding met de server' });
  }
});

app.post('/api/logout', (req, res) => {
  // Clear the cookies
  res.clearCookie('authToken'); // Clear the auth token cookie
  res.clearCookie('email'); // Clear the email cookie
  res.status(200).json({ message: 'Succesvol uitgelogd' }); // Send a success message
});

app.listen(PORT, () => {
  console.log(`Server is running op http://localhost:${PORT}`);
});