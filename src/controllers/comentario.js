const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const comentarios = await prisma.comentario.findMany();
        res.json({ comentarios: comentarios });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar comentario' });
    }
}

const create = async (req, res) => {
    try {
        const comentario = await prisma.comentario.create({
            data: req.body
        });
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar comentario' });
    }
}

module.exports = {
    read,
    create
};