## Backend - Commands
- npm init -y
- npm install express googleapis prisma @prisma/client node-cron body-parser
- npm install typescript @types/node @types/express @types/node-cron --save-dev

- npx tsc --init (inicia arquivo typescript -> tsconfig.json [outDir, target: es2023 ])
- npx prisma init
- npx prisma init --datasource-provider (SQLite) // Pode ser qualquer base de dados
- npx prisma generate
- npx prisma db push (envia os dados sem deixar histórico)
- npx prisma db pull (pusha os dados da base)
- npx prisma migrate dev (envia os dados com deixar histórico)
- npx prisma migrate dev --name init (nome da migration )  // All data will be lost, if reseted  

- npm init -y
- npm i -D typescript ts-node nodemon* (--watch server.ts)
- npm i express dotenv i cors
- npm i -D @types/cors @types/express @types/node
- npm i -D prisma  (Instalação Prisma ORM [sql, postgres, mongodb etc])
- npm i  @prisma/client  ()
- npm i zod (validação de tipos)




### Annotations

- /my-project
  /backend
    /src
      /controllers
        sheetController.ts
      /services
        googleSheetsService.ts
        syncService.ts
      /models
        prismaClient.ts
      /utils
        cron.ts
      app.ts
      server.ts
    /node_modules
    package.json
    tsconfig.json

  - /frontend
    /src
      /components
        // Componentes React
      /pages
        // Páginas React
      /router
        router.tsx
      /services
        apiService.ts
      App.tsx
    /node_modules
    package.json
    tsconfig.json

### tsconfig.json
    {
        "compilerOptions": {
            "target": "ES6",
            "module": "CommonJS",
            "strict": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true,
            "outDir": "./dist",
            "rootDir": "./src"
        },
            "include": ["src/**/*.ts"],
            "exclude": ["node_modules"]
    } 

### settings.json

 "[prisma]": {
        "editor.formatOnSave": true
    } 



### vercel deploy
{
    "version": 2.0,
    "builds": [
        {
            "src": "./dist/server.js",
            "use": "@now/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/dist/server.js"
        }
    ]
}