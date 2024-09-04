const username = 'cassioestevao'; // Substitua pelo seu nome de usuário
const userUrl = `https://api.github.com/users/${username}`;
const reposUrl = `https://api.github.com/users/${username}/repos`;

fetch(userUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Dados do usuário:", data); // Verifique os dados retornados
        document.getElementById('profile-pic').src = data.avatar_url;
        document.getElementById('username').innerHTML = `<span>Usuário:</span> ${data.login}`;
        document.getElementById('name').innerHTML = `<span>Nome:</span> ${data.name}`;
        document.getElementById('bio').innerHTML = `<span>Bio:</span> ${data.bio}`;
        document.getElementById('public-repos').innerHTML = `<span>Repositórios Públicos:</span> ${data.public_repos}`;
        document.getElementById('followers').innerHTML = `<span>Seguidores:</span> ${data.followers}`;
        document.getElementById('following').innerHTML = `<span>Seguindo:</span> ${data.following}`;
    })
    .catch(error => console.error('Erro ao buscar dados do GitHub:', error));

fetch(reposUrl)
    .then(response => response.json())
    .then(repos => {
        console.log("Dados dos repositórios:", repos); // Verifique os dados retornados
        let languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        let languagesContainer = document.getElementById('languages');
        languagesContainer.innerHTML = '';

        for (const [language, count] of Object.entries(languages)) {
            let languageDiv = document.createElement('div');
            languageDiv.classList.add('language');
            languageDiv.textContent = `${language} (${count})`;
            languagesContainer.appendChild(languageDiv);
        }
    })
    .catch(error => console.error('Erro ao buscar linguagens:', error));
