export type Usuario = {
    nome: string
    email: string
    senha: string
    perfil?: Perfil
}

export type Perfil = {
    foto: string;
}
export type Categoria = {
    nome: string;
}
export type Transacao = {
    titulo: string
    descricao?: string
    valor: number
    tipo: string         
    userId: number
}
