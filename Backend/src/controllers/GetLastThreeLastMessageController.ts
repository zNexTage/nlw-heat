import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';
import { GetLastThreeLastMessageService } from '../services/GetThreeLastMessagesService';

class GetLastThreeLastMessageController {
    async handle(request: Request, response: Response) {
        const service = new GetLastThreeLastMessageService();

        const result = await service.execute()

        return response.json(result);
    }
}

export { GetLastThreeLastMessageController };