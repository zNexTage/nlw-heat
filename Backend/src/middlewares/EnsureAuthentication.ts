import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string
}

const ensureAuthentication = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: 'Token invalid'
        });
    }

    //Bearer asasas444444
    const [, token] = authToken.split(' ');

    try {
        const { sub } = <IPayload>verify(token, process.env.JWT_SECRET);

        request.user_id = sub;

        return next();
    }
    catch (err) {
        return response.status(401).json({
            error: "Token expired"
        });
    }
}

export default ensureAuthentication;