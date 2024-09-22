// scripts/main.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = await getToken(email, password);
    if (userData) {
        document.getElementById('loginTitle').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('result').innerHTML = createUserInfoHTML(userData);
    }
});

function createUserInfoHTML(data) {
    return `
        <div>
            <h2 class="font-semibold text-lg">Gebruikersinformatie</h2>
            <div class="mb-1"><span class="text-blue-500">Email:</span> <span class="text-gray-700">${data.email}</span></div>
            <div class="mb-1"><span class="text-blue-500">Naam:</span> <span class="text-gray-700">${data.full_name}</span></div>
            <div class="mb-1"><span class="text-blue-500">Rol:</span> <span class="text-gray-700">${data.role_name}</span></div>
        </div>
    `;
}



function createCollapsibleHTML(data) {
    let html = '';
    const sections = { "Boeken": [] };

    if (Array.isArray(data.books)) {
        sections["Boeken"].push(`<h2 class="font-semibold text-lg mb-2">Boeken</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">`);
        data.books.forEach(book => {
            sections["Boeken"].push(`
                <div class="bg-gray-50 border rounded p-4 mb-2 shadow hover:shadow-lg transition">
                    <img src="${book.subject.icon_url}" alt="${book.subject_name}" class="w-12 h-12 mb-2">
                    <h3 class="font-semibold text-lg">${book.name}</h3>
                    <p class="text-sm text-gray-600">Onderwerp: ${book.subject_name}</p>
                    <p class="text-sm text-gray-600">Editie: ${book.edition_display}</p>
                    <p class="text-sm text-gray-600">Niveau: ${book.book_grade_display}</p>
                </div>
            `);
        });
        sections["Boeken"].push(`</div>`);
    }

    for (const section in sections) {
        if (sections[section].length > 0) {
            html += `<div class="my-4 p-4 bg-gray-100 rounded-lg shadow"><h2 class="font-semibold text-lg mb-2">${section}</h2><div>${sections[section].join('')}</div></div>`;
        }
    }

    return html;
}

