import { createCipheriv } from 'crypto'
import { sign } from 'jsonwebtoken'

import { UserService } from '../service/user'

export class MagicLinkGenerationService {

  private readonly userService: UserService

  private log: any

  constructor() {
    this.userService = new UserService()
  }


  async generateMagicLink(recipientEmail: any, link: any): Promise<any> {
    const result = await this.getAndPrepareTokenData(recipientEmail)
    const magicLinkToken = this.generateMagicLinkToken(link, result)
    return this.prepareFinalMagicLink(link, magicLinkToken)
  }

  private async getAndPrepareTokenData(recipientEmail: string): Promise<any> {
    const userDetails = await this.userService.getUserFromEmail(recipientEmail)
    if (!userDetails) {
      return false
    }
    return userDetails?.user_id
  }

  private generateMagicLinkToken(link: string, result: any): any {
    if (!result) {
      return false
    }
    const expiresIn = '1d' // configure this as per your requirement, defines magic link's jwt token's validity
    const secret = 'qwerty' //Your jwt token secret
    const dataStoredInToken = {
      scope: link,
      userID: result,
    }
    return this.cryptoToken(sign(dataStoredInToken, secret, { expiresIn }))
  }

  private cryptoToken(token: any) {
    const key = Buffer.from('123456', 'base64')
    const algorithm = 'aes-256-cbc'
    const initVector = Buffer.from(
      'abcdef',
      'base64'
    )
    const cipher = createCipheriv(algorithm, key, initVector)
    return cipher.update(token, 'utf8', 'hex') + cipher.final('hex')
  }

  private prepareFinalMagicLink(actualLink: string, magicLinkToken: any) {
    if (!magicLinkToken) {
      return actualLink
    }
    return actualLink + `?token=${magicLinkToken}`
  }
}
