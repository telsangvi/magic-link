import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'

export class MagicLinkValidationService {
    private log: any

    private token: any

    private decodedJWT: any

    constructor(token: any) {
        this.token = token
    }

    /**
     * checks if the obtained encrypted magic link token is valid or not
     * returns boolean value -> true or false
     */
    public validateMagicLinkToken(): boolean {
        let isValid = false
        const magicLinkToken = this.decryptToken(this.token)

        if (!magicLinkToken) {
            return isValid
        }

        jwt.verify(
            magicLinkToken,
            'qwerty', //Your jwt token secret
            async (err, payload) => {
                if (err) {
                    console.error('error ocurred while magic link jwt verify', payload)
                } else {
                    console.info(
                        'Execution of validateMagicLinkToken ended with successfull magic link jwt token verification'
                    )
                    this.decodedJWT = jwt.decode(magicLinkToken)
                    isValid = true
                }
            }
        )
        return isValid
    }

    /**
     *
     * @returns decoded JWT token
     */
    public getDecodedJWT() {
        return this.decodedJWT
    }

    /**
     *
     * @param token encrypted magic link JWT token
     * @returns decrypted token or false
     */
    private decryptToken(token: any) {
        try {
            const key = Buffer.from('123456', 'base64')
            const algorithm = 'aes-256-cbc'
            const initVector = Buffer.from(
                'abcdef',
                'base64'
            )
            const decipher = crypto.createDecipheriv(algorithm, key, initVector)
            const decripted =
                decipher.update(token, 'hex', 'utf8') + decipher.final('utf8')
            return decripted
        } catch (error) {
            console.error('Error while token decryption', error)
            return false
        }
    }
}
