import EncryptionService from "./EncryptionService"
import {describe, expect, it} from  "vitest"

describe("Encryption", () => {
    it("Should generate password", () => {
        const encryptionService = new EncryptionService();
        const password = encryptionService.generateRandomPassword();
        expect(password).toBeDefined();
    })
})
