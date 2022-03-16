import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = Router();

interface payload {
    id: number,
    name: string,
    email: string,
    iat: number,
    exp: number
}

router.use((req: Request, res: Response, next: NextFunction) => {
    let token = <string>req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            error: "Access denied"
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        let resu = <payload>jwt.verify(token, <string>process.env.SIGN);
        res.locals.JWT = resu;
        next();

    } catch (e) {
        return res.status(400).json({
            error: "Invalid token"
        });
    }
});

export default router;
