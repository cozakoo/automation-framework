export class Env{
    public static readonly URL = process.env.URL ?? '';
    public static readonly USER = process.env.USER ?? '';
    public static readonly PASS = process.env.PASS ?? '';
}