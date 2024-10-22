const firebaseConfig = {
    apiKey: "AIzaSyAKEpWqigO2HGyh5mAA0Ap2V8ZhPGxWTjA",
    authDomain: "bd3-app-libri-pedro.firebaseapp.com",
    projectId: "bd3-app-libri-pedro",
    storageBucket: "bd3-app-libri-pedro.appspot.com",
    messagingSenderId: "439162143148",
    appId: "1:439162143148:web:04157d7c04c740d4d63a09",
    measurementId: "G-BTR03TT9MK"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const listStudent = document.querySelector('#student-list');

function renderList(doc) {
    let li = document.createElement('li');
    let nome = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let telefone_aluno = document.createElement('span');
    let telefone_responsavel = document.createElement('span');
    let email = document.createElement('span');
    let data_nascimento = document.createElement('span');
    let excluir = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    nome.textContent = doc.nome;
    cpf.textContent = doc.cpf;
    rg.textContent = doc.rg;
    telefone_aluno.textContent = doc.telefone_aluno;
    telefone_responsavel.textContent = doc.telefone_responsavel;
    email.textContent = doc.email;
    data_nascimento.textContent = doc.data_nascimento;

    li.appendChild(nome);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefone_aluno);
    li.appendChild(telefone_responsavel);
    li.appendChild(email);
    li.appendChild(data_nascimento);
    li.appendChild(excluir);
    
    listStudent.appendChild(li);
}

db.collection('alunos-collection')
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderList(doc.data());
        });
    });

const form = document.querySelector('#add-student-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    db.collection('alunos-collection').add({
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value,
        email: form.email.value,
        data_nascimento: form.data_nascimento.value
    }).then(() => {
        form.reset();
        window.location.reload();
    });
});
