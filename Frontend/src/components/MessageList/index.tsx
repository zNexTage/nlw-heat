import styles from './style.module.scss';
import logoImg from '../../assets/logo.svg';
import io from 'socket.io-client';

import api from '../../services/api';
import { useEffect, useState } from 'react';

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
};

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', ((message: Message) => {
    messagesQueue.push(message)
}))

const MessageList = () => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState =>
                    [
                        messagesQueue[0],
                        prevState[0],
                        prevState[1]
                    ].filter(Boolean));

                messagesQueue.shift();
            }
        }, 3000);
    }, [])

    useEffect(() => {
        //Chamada para a api
        api.get<Message[]>('messages/last3')
            .then(response => {
                setMessages(response.data);
            })
            .catch(err => {
                alert('Ops... Ocorreu um erro');
            })
    }, []);

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="Logo do evento DoWhile 2021" />


            <ul className={styles.messageList}>
                {messages.map(message => (
                    <li className={styles.message} key={message.id}>
                        <p className={styles.messageContent}>
                            {message.text}
                        </p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>
                                {message.user.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MessageList;