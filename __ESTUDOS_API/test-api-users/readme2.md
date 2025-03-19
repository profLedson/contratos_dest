-- https://www.youtube.com/watch?v=mKa1MuB1HMk  (Bonieky)
-- https://www.youtube.com/watch?v=b4nxOv91vWI (Prisma Setup - Mongo)

## Technologies
- npm init -y
- npm i -D typescript ts-node nodemon* (--watch server.ts)
- npm i express dotenv i cors
- npm i -D @types/cors @types/express @types/node
- npm i -D prisma  (Instalação Prisma ORM [sql, postgres, mongodb etc])
- npm i  @prisma/client  ()
- npm i zod (validação de tipos)

### Prettier
- npm i -D eslint prettier eslint-config-prettier


## Commands
- npx tsc --init (inicia arquivo typescript -> tsconfig.json [outDir, target: es2023 ])
- npx prisma init
- npx prisma generate
- npx prisma db push (envia os dados sem deixar histórico)
- npx prisma migrate dev (envia os dados com deixar histórico)

- npx eslint --init


--------------------
* ARQUIVOS:
    nodemon.json
        {
            "watch": [ "src" ],
            "ext": "ts",
            "exec": "ts-node ./src/server.ts"
        }



    package.json
        {  
            scripts: {
                "dev": "nodemon",
                "build": "tsc",
                "start": "node build/server.js",

            }
        }


## Observations

- Porta 80 (http) e 443 (https)
- Interceptadores: PING <-> PONG
- Prisma exige [migrate] em sql, mas o mongoDB exige generate
