import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({
            errorCode: "token.invalid",
        });
    }


    // Bearear 7854sa5df4s2f1dsf23sdfsdfd
    // [0] Bearer
    // [1] 4584152121d1sd2sad1sa2d1sadsa

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "d8ae5776067290c4712fa454006c8ec6") as IPayload;
        request.user_id = sub;
        
        return next();
    }catch(err) {
        return response.status(401).json({errorCode: "token.expired"});
    }

}