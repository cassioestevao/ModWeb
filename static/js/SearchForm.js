document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('results');
    
    if (query) {
        // Fetch GitHub repositories
        fetch(`https://api.github.com/users/cassioestevao/repos`)
            .then(response => response.json())
            .then(repos => {
                // Filter repositories based on the query
                const filteredRepos = repos.filter(repo => repo.name.toLowerCase().includes(query.toLowerCase()));
                
                if (filteredRepos.length > 0) {
                    const resultsHtml = filteredRepos.map(repo => `
                        <div class="result-item">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            <p>${repo.description || 'Sem descrição'}</p>
                        </div>
                    `).join('');
                    
                    resultsContainer.innerHTML = resultsHtml;
                    resultsContainer.classList.remove('hidden');
                } else {
                    resultsContainer.innerHTML = '<p>Nenhum repositório encontrado.</p>';
                    resultsContainer.classList.remove('hidden');
                }
                
                document.body.classList.add('no-scroll'); // Adiciona uma classe para prevenir rolagem
            })
            .catch(error => {
                console.error('Erro ao buscar repositórios:', error);
                resultsContainer.innerHTML = '<p>Erro ao buscar repositórios. Tente novamente mais tarde.</p>';
                resultsContainer.classList.remove('hidden');
                document.body.classList.add('no-scroll'); // Adiciona uma classe para prevenir rolagem
            });
    } else {
        resultsContainer.innerHTML = ''; // Limpa o conteúdo dos resultados
        resultsContainer.classList.add('hidden');
        document.body.classList.remove('no-scroll'); // Remove a classe para permitir rolagem
    }
});

// Fecha os resultados se o clique for fora do container
document.addEventListener('click', function(event) {
    const resultsContainer = document.getElementById('results');
    const searchContainer = document.querySelector('.search-container');
    
    // Verifica se o clique foi fora do container de pesquisa e resultados
    if (!searchContainer.contains(event.target) && !resultsContainer.contains(event.target)) {
        resultsContainer.classList.add('hidden');
        document.body.classList.remove('no-scroll'); // Remove a classe para permitir rolagem
    }
});
