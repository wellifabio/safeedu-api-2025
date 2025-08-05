const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const escolas = await prisma.escola.findMany();
        res.json(escolas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar escola' });
    }
}

module.exports = {
    read
};