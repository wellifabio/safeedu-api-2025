const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const imagens = await prisma.imagem.findMany();
        // Varre o array de imagens e converte o campo imagem de Bytes para Base64 antes de mostrar
        const imagensConvertidas = imagens.map(img => {
            let imagemBase64 = null;
            if (img.imagem) {
                const base64 = Buffer.from(img.imagem).toString('base64');
                // Tenta detectar o tipo, padrão para png
                const mimetype = img.mimetype || 'image/png';
                imagemBase64 = `data:${mimetype};base64,${base64}`;
            }
            return { ...img, imagem: imagemBase64 };
        });
        res.json({ imagens: imagensConvertidas });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
}

const create = async (req, res) => {
    const fs = require('fs').promises;
    try {
        // Recebe uma imagem por FormData, converter para base64 e enviar ao bd
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' });
        }

        // Lê o arquivo salvo em disco pelo multer
        const imagemBuffer = await fs.readFile(req.file.path);

        // Prisma aceita Buffer diretamente para campos Bytes
        const novaImagem = await prisma.imagem.create({
            data: { imagem: imagemBuffer },
        });

        res.status(201).json({
            "success": true,
            "id_imagem": novaImagem.id
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar imagem', erro: error });
    }
}

module.exports = {
    read,
    create
};