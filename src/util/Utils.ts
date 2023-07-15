
export default class Utils {
    public static readonly URL_PARAM_PASSWORD = 'pw';

    public static toUrlSafeBase64(input: string): string {
        return encodeURIComponent(btoa(input));
    }
}