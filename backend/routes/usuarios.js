const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const segredoJWT = 'jwtonline'; // adicione isso se ainda não tiver
const autenticarToken = require('../middleware/auth');


router.use(autenticarToken);

router.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).send('Login e senha são obrigatórios');
  }

  const sql = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  db.query(sql, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.status(500).send('Erro no servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('Login ou senha inválidos');
    }

    const usuario = results[0];

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, login: usuario.login },
      segredoJWT,
      { expiresIn: '1d' }
    );

   res.json({
  token,
  id: usuario.id,         // <-- ADICIONA ISSO
  nome: usuario.nome,
  login: usuario.login
    });
  }); // <-- ESTA CHAVE ESTAVA FALTANDO!
});




// Exemplo: obter todos os usuários
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).send('Erro no servidor');
    } else {
      res.json(results);
    }
  });
});

// POST - criar novo usuário
router.post('/usuarios/cadastro', (req, res) => {
    const { nome, login, senha, email } = req.body;
    const sql = 'INSERT INTO usuarios (nome, login, senha, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, login, senha, email], (err, result) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        res.status(500).send('Erro ao inserir usuário');
      } else {
        res.status(201).json({ id: result.insertId });
      }
    });
});
  
// PUT - atualizar senha via JSON
router.put('/usuarios/novasenha', (req, res) => {
    const { id, senha } = req.body;
  
    if (!id || !senha) {
      return res.status(400).send('ID e nova senha são obrigatórios');
    }
  
    const sql = 'UPDATE usuarios SET senha = ? WHERE id = ?';
    db.query(sql, [senha, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar senha:', err);
        res.status(500).send('Erro ao atualizar senha');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Usuário não encontrado');
      } else {
        res.send('Senha atualizada com sucesso');
      }
    });
});
  
// DELETE - deletar usuário via JSON
router.delete('/usuarios/deletar', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('ID é obrigatório para deletar');
  }

  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).send('Erro ao deletar');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.send('Usuário deletado com sucesso');
  });
}); 

module.exports = router;
