// api/getUserData.js
export default async (req, res) => {
    const { email, password } = req.body;

    const tokenResponse = await fetch('https://api.wrts.nl/api/v3/auth/get_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!tokenResponse.ok) {
        return res.status(tokenResponse.status).json({ error: 'Failed to get token' });
    }

    const { auth_token } = await tokenResponse.json();

    const userResponse = await fetch('https://api.wrts.nl/api/v3/get_user_data', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!userResponse.ok) {
        return res.status(userResponse.status).json({ error: 'Failed to get user data' });
    }

    const userData = await userResponse.json();
    res.status(200).json(userData);
};
