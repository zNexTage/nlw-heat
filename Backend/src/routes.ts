import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastThreeLastMessageController } from "./controllers/GetLastThreeLastMessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import ensureAuthentication from "./middlewares/EnsureAuthentication";

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);
router.post('/messages', ensureAuthentication, new CreateMessageController().handle);
router.get('/messages/last3', new GetLastThreeLastMessageController().handle);
router.get('/profile', ensureAuthentication, new ProfileUserController().handle);

export { router };