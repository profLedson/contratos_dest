import { 
    type RouteConfig, 
    index, 
    prefix, 
    route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("cadastro-dados", "routes/cadastro-gms/cadastro-dados.tsx"),
    route("cadastro-fornecedor", "routes/cadastro-gms/cadastro-fornecedor.tsx"),
    route("pesquisa-contrato", "routes/cadastro-gms/pesquisa-contrato.tsx"),

    ...prefix("contrato", [
        route("novo-cadastro", "routes/cadastro-gms/novo-cadastro.tsx"),
        route("finalizar-cadastro", "routes/cadastro-gms/finalizar-cadastro.tsx"),
    ]),

] satisfies RouteConfig;