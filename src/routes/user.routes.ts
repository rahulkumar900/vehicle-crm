
import express, { Request, Response } from 'express'
const router = express.Router()
import { allUser, createUser,updateUser,userById } from '../controller/user.controller';
import { string } from 'zod';

router.route("/user").get(allUser).post(createUser);

router.route("/user/:userId").get(userById).put(updateUser);
// const paramNames: string[] = ['userId', 'vehicleId', 'customerId'];

// paramNames.forEach(paramName => {
//     router.param(paramName, (req: Request, res: Response, next, paramValue: string, paramName: string) => {
//         // Custom logic for handling the parameter
//         console.log(`${paramName}:`, paramValue);

//         // Storing all parameters and their values in req if not undefined
//         if (paramValue !== undefined) {
//             // Use bracket notation to set property dynamically
//             (req as any)[paramName] = paramValue;
//         }

//         // You can modify the request object or perform other operations here
//         // Call next() to move to the next middleware or route handler
//         next();
//     });
// });

export default router;