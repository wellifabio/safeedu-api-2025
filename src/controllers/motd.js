const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const motds = await prisma.motd.findMany();
        //Escolher um aleatório
        const randomIndex = Math.floor(Math.random() * motds.length);
        res.json(motds[randomIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar motd' });
    }
}
module.exports = {
    read
};