import { getToday } from "../utils/getToday";

export const validatePassword = (password: string): boolean => {
    // CRITERIOS DA SENHA: Data - numeros inteiros
    const currentPassword = getToday().split('/').join(''); // 03/05/2025 -> 03052025
    return password === currentPassword; // retorna true ou false
}

export const createToken = () => {
    const currentPassword = getToday().split('/').join(''); // 03/05/2025 -> 03052025
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
}

export const validateToken = (token: string) => {
    const currentToken = createToken()
    return currentToken === token;
}