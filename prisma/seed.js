const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

//Importando os dados de arquivo csv para variáveis
const users = require("./seed/users.json");
const motds = require("./seed/motds.json");
const escolas = require("./seed/escolas.json");
const comentarios = require("./seed/comentarios.json");


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