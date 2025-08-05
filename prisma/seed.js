const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

//Importando os dados de arquivo csv para variáveis
const users = require("./seed/users.json");
const motds = require("./seed/motds.json");
const escolas = require("./seed/escolas.json");
const comentarios = require("./seed/comentarios.json");
const imagens = require("./seed/imagens.json");


async function main() {
    for (const motd of motds) {
        await prisma.motd.create({
            data: motd
        });
    }
    for (const escola of escolas) {
        await prisma.escola.create({
            data: escola
        });
    }
    for (const comentario of comentarios) {
        await prisma.comentario.create({
            data: comentario
        });
    }
    for (const user of users) {
        await prisma.user.create({
            data: user
        });
    }
    for (const imagem of imagens) {
        //Converte o campo imagem de base64 para Prisma Bytes
        let imagemData = { ...imagem };
        if (imagem.imagem && typeof imagem.imagem === 'string') {
            // Remove prefixo se existir
            const base64 = imagem.imagem.split(',').pop();
            imagemData.imagem = Buffer.from(base64, 'base64');
        }
        await prisma.imagem.create({
            data: imagemData
        });
    }
}

//Executando a função main
main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Seed complete');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });