const { PrismaClient } = require('@prisma/client');
const jsonwebtoken = require("jsonwebtoken");
const Middlewares = require('../middlewares/auth');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'E-mail ou password incorretos!' });
        } else {
            const isValidPassword = await Middlewares.validatePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'E-mail ou password incorretos!' }).end();
            }
            const token = jsonwebtoken.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "60min" }
            );
            res.status(200).json({ token: token });
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const validaToken = (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).send({ message: "Acesso negado. Nenhum token recebido." }).end();
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ valid: false, payload: null }).end();
        }
        req.user = decoded;
        req.user.sub = decoded.id;
        delete req.user.id; 
        res.status(200).json({ valid: true, payload: req.user }).end();
    });
};

const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar user' });
    }
}

const create = async (req, res) => {
    try {
        req.body.password = await Middlewares.createHash(req.body.password);
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar user' });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar user' });
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar user' });
    }
}

module.exports = {
    login,
    validaToken,
    read,
    create,
    update,
    del
};