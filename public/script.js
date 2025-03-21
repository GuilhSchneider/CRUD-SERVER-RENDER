// Função para criar um usuário (POST)
// Função para criar um usuário (POST)
document.getElementById('userForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    // Verificação básica para campos vazios
    if (!name || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Enviar o novo usuário com nome e email para o JSON Server (sem o ID, pois será gerado automaticamente)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
      alert('Usuário criado com sucesso!');
      document.getElementById('userForm').reset(); // Limpar o formulário após sucesso
    })
    .catch(error => {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Verifique o console para mais detalhes.');
    });
  });
  
  // Função para exibir todos os usuários (GET)
  function getUsers() {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
  
        users.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`;
          usersList.appendChild(li);
        });
      })
      .catch(error => console.error('Erro ao obter usuários:', error));
  }
  
  // Função para atualizar um usuário (PUT)
  function updateUser(event) {
    event.preventDefault();
  
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    if (!id || !name || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    fetch(`http://localhost:3000/users/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Usuário não encontrado');
        }
        return response.json();
      })
      .then(user => {
        return fetch(`http://localhost:3000/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email })
        });
      })
      .then(response => response.json())
      .then(data => {
        alert('Usuário atualizado com sucesso!');
        document.getElementById('updateForm').reset();
      })
      .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
        alert(error.message);
      });
  }
  
  // Função para deletar um usuário (DELETE)
  function deleteUser(event) {
    event.preventDefault();
  
    const id = document.getElementById('id').value;
  
    if (!id) {
      alert('Por favor, forneça o ID do usuário a ser deletado.');
      return;
    }
  
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert('Usuário deletado com sucesso!');
          document.getElementById('deleteForm').reset();
        } else {
          throw new Error('Erro ao deletar o usuário');
        }
      })
      .catch(error => {
        console.error('Erro ao deletar usuário:', error);
        alert(error.message);
      });
  }
  
  // Adicionar o evento de submit para cada formulário
  document.getElementById('userForm')?.addEventListener('submit', createUser);
  document.getElementById('updateForm')?.addEventListener('submit', updateUser);
  document.getElementById('deleteForm')?.addEventListener('submit', deleteUser);
  
  // Carregar a lista de usuários quando a página de exibição for carregada
  if (document.getElementById('usersList')) {
    getUsers();
  }
  