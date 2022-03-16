import { Router, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import middleware from "../libs/jwt";

const router = Router();

import db from "../config/db";

interface user {
    id: number,
    name: string,
    email: string,
    username: string,
    password: string
}

router.post("/login", async (req: Request, res: Response) => {
    let username: string = req.body.username;
    let password: string = req.body.password;

    try {
        let resu = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        let user: user = resu.rows[0];

        if (user) {
            if (bcryptjs.compareSync(password, user.password)) {

                let payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                let token = <string>jwt.sign(payload, <string>process.env.SIGN, {
                    expiresIn: "2h"
                });

                return res.json({
                    token
                });
            }
        }

        res.json({
            error: "Invalid credentials"
        });

    } catch (e) {
        console.log(e);
    }
});

router.get("/token", middleware, (req: Request, res: Response) => {
    res.json({
        token: true,
        user: res.locals.JWT
    })
});

export default router;
