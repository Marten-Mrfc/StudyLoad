// scripts/api.js
async function getToken(email, password) {
    const response = await fetch('/api/getUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        return null;
    }

    const data = await response.json();
    return data;
}

async function getUserData(token) {
    // This function may not be needed anymore since getUserData is handled in the serverless function.
    // You can remove this if you want to keep it simple.
}
