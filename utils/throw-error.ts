import createErrors from 'http-errors';

export const throwError = (status: number, message: string) => {
    return createErrors(status,message);
}   