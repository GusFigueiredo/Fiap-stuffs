const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const alunosPath = path.join(__dirname, 'Alunos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ler os dados do JSON
let alunosData = fs.readFileSync(alunosPath, 'utf-8');
let alunos = JSON.parse(alunosData);

//Função Salvar dados
function salvarDados(alunoArg) {
    fs.writeFileSync(alunosPath, JSON.stringify(alunoArg, null, 2));
}

//Funcao procurar Aluno pelo nome
function buscarAlunoPeloNome(nome) {
    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);
    return alunos.find(aluno => aluno.nome.toLowerCase() === nome.toLowerCase());
}

//Funcao procurar Aluno pelo rm
function buscarAlunoPeloRM(RM) {
    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);
    return alunos.find(aluno => aluno.RM === RM);
}


//ROTAS 

//Rota principal com links
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rotaprincipal.html'));
});

//Rota JSON
app.get('/alunos', (req, res) => {
    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);
    res.json(alunos);
});


//Rota Adicionar Aluno
app.get('/adicionar-aluno', (req, res) => {
    res.sendFile(path.join(__dirname, 'adicionaraluno.html'));
});

app.post('/adicionar-aluno', (req, res) => {
    const novoAluno = req.body;

    if (alunos.find(aluno => aluno.nome.toLowerCase() === novoAluno.nome.toLowerCase())) {
        res.send('<h1> O nome do aluno ja existe.</h1>');

        return;
    }

    if (alunos.find(aluno => aluno.RM === novoAluno.RM)) {
        res.send('<h1> O rm escrito ja exite.</h1>');

        return;
    }

    alunos.push(novoAluno);

    salvarDados(alunos);

    res.send('<h1>Aluno Adicionada com sucesso!</h1>');
});

//Rota Excluir aluno
app.get('/excluir-aluno', (req, res) => {
    res.sendFile(path.join(__dirname, 'excluiraluno.html'));
});

app.post('/excluir-aluno', (req, res) => {
    const { nome } = req.body;

    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);

    const alunoIndex = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nome.toLowerCase());

    if (alunoIndex === -1) {
        res.send('<h1> Aluno nao encontrado.</h1>');
        return;
    }

    res.send(`
        <script>
        if (confirm('Tem certeza que deseja excluir o aluno ${nome}?')) {
            window.location.href = '/excluir-aluno-confirmado?nome=${nome}';
        } else {
            window.location.href = '/excluir-aluno';
        }
        </script>
    `);
});

app.get('/excluir-aluno-confirmado', (req, res) => {
    const nome = req.query.nome;

    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);

    const alunoIndex = alunos.findIndex(aluno => aluno.nome.toLowerCase() === nome.toLowerCase());

    alunos.splice(alunoIndex, 1);

    salvarDados(alunos);

    res.send('<h1>aluno excluido com sucesso!</h1>');
});


//Rota atualizar aluno

app.get('/atualizar-aluno', (req, res) => {
    res.sendFile(path.join(__dirname, 'atualizaraluno.html'));
});

app.post('/atualizar-aluno', (req, res) => {
    const { RM, novoNome, novoSexo } = req.body;

    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);

    const alunoIndex = alunos.findIndex(aluno => aluno.RM === RM);

    if (alunoIndex === -1) {
        res.send('<h1>RM nao encontrado.<h1>');
        return;
    }

    alunos[alunoIndex].nome = novoNome;
    alunos[alunoIndex].sexo = novoSexo;

    salvarDados(alunos);

    res.send('<h1> Dados do aluno atualizado com sucesso!</h1>');
});


//ROTAS BUSCA
//Rota buscar aluno pelo Nome
app.get('/buscar-aluno/:nome', (req, res) => {
    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);

    const nomeDoAlunoBuscado = req.params.nome;
    const alunoEncontrado = buscarAlunoPeloNome(nomeDoAlunoBuscado);

    if (alunoEncontrado) {
        res.send(`<h1>Aluno encontrado:</h1><pre>${JSON.stringify(alunoEncontrado, null, 2)}</pre>`);
    } else {
        res.send('<h1>Aluno não encontrado.</h1>');
    }
});

//Rota buscar aluno pelo RM
app.get('/buscar-rm/:rm', (req, res) => {
    let alunosData = fs.readFileSync(alunosPath, 'utf-8');
    let alunos = JSON.parse(alunosData);

    const rmDoAlunoBuscado = req.params.rm;
    const alunoEncontrado = buscarAlunoPeloRM(rmDoAlunoBuscado);

    if (alunoEncontrado) {
        res.send(`<h1>Aluno encontrado:</h1><pre>${JSON.stringify(alunoEncontrado, null, 2)}</pre>`);
    } else {
        res.send('<h1>Aluno não encontrado.</h1>');
    }
});





app.listen(port, () => {
    console.log(`Server inciado em http://localhost:${port}`);
});