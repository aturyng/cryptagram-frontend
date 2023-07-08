
export default class EncryptionService {

    public generateRandomPassword(length = 32){
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
      
        let password = '';
        const charsetLength = charset.length;
      
        try {
          const randomValues = new Uint32Array(length);
          crypto.getRandomValues(randomValues);
          for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % charsetLength;
            password += charset[randomIndex];
          }
        } catch (error) {
          console.error('Error generating random password:', error);
        }
        return password;
      }
      
}