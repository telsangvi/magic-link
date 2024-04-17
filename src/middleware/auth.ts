import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'
import {MagicLinkValidationService} from '../magicLink/Validate'
import {AuthService} from "../service/auth";

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.cookies['your-actual-auth-cookie-name']
    const magicLinkToken = req.query['your-magic-link-token']

    /* delete the magic link token or else any schema validation will fail if exists*/
    delete req.query['token']
    let decodedJWT: any

    if (!authHeader) {
        await handleMagicLinkTokenTransaction(req, res, magicLinkToken)
        /* recursively call the AuthMiddleware to verify generated token and set properties in headers */
        await AuthMiddleware(req, res, next)
    } else {
        verify(authHeader, '567890', async (err: any, payload: any) => {
            if (!err) {
                req.headers['x-vi-userid'] = payload['user_id']
                next()
            } else {
                /* recursively call the AuthMiddleware to verify generated token and set properties in headers */
                if (magicLinkToken) {
                    await handleMagicLinkTokenTransaction(req, res, magicLinkToken)
                    await AuthMiddleware(req, res, next)
                } else {

                    return res.status(401).send('Unauthorized token')
                }
            }
        })

    }
}

const handleMagicLinkTokenTransaction = async (
    req: any,
    res: any,
    magicLinkToken: any
) => {
    if (!magicLinkToken) {
        return res.status(401).send('Unauthorized token')
    }
    const validateMagicLinkTokenService = new MagicLinkValidationService(
        magicLinkToken
    )
    const magicLinkvalidationResult =
        validateMagicLinkTokenService.validateMagicLinkToken()
    if (magicLinkvalidationResult) {
        const decodedJWT = validateMagicLinkTokenService.getDecodedJWT()
        const result = AuthService.generateJWTToken(decodedJWT['userID'])
        res.cookie('your-actual-auth-cookie-name', result, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        req.cookies['x-vi-authorization'] = result
    } else {
        return res.status(401).send('Unauthorized token')
    }
}
