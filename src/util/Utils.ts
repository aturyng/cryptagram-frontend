
export default class Utils {
    public static toUrlSafeBase64(input: string): string {
        return encodeURIComponent(btoa(input));
    }
}