# SafeEdu - API

## Para testar
- 1 Instale as dependências:
```bash
npm install
```
- 2 Abra o XAMPP ou o MAMP e inicie o MySQL.
- 3 Crie o arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
DATABASE_URL="mysql://root@localhost:3306/safeeduapi?schema=public&timezone=UTC"
PORT=4000
JWT_SECRET="my_jwt_secret"
```
- 4 Crie a migração do banco de dados e execute o backend
```bash
npx prisma migrate dev --name init
npx nodemon
```
- 5 Acesse os links da documentação da API apresentados no console.
