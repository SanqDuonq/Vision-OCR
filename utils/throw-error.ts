import createErrors from 'http-errors';

export const throwError = (status: number, message: string) => {
    throw createErrors(status,message);
}   