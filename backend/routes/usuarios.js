const express = require('express');
const router = express.Router();
const db = require('../config/db');

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
        res.status(500).send('Erro ao deletar');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Usuário não encontrado');
      } else {
        res.send('Usuário deletado com sucesso');
      }
    });
});
  
module.exports = router;