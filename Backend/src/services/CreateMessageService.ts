import { io } from '../app';
import prismaClient from '../prisma';

class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id
            },
            include: { //Faz um join
                user: true
            }
        });
        
        io.emit('new_message', message);

        return message;
    }
}

export { CreateMessageService };