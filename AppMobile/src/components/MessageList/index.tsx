import React, { useState, useEffect } from 'react';

import {
    ScrollView,
    View
} from 'react-native';
import api from '../../services/api';
import Message, { IMessage } from '../Message';
import { io } from 'socket.io-client';

import styles from './styles';
import { MESSAGES_EXAMPLE } from '../../utils/messages';

const socket = io(String(api.defaults.baseURL));

const messagesQueue: Array<IMessage> = MESSAGES_EXAMPLE

socket.on('new_message', newMessage => {
    messagesQueue.push(newMessage);
});

const MessageList = () => {
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const fechtMessages = async () => {
            const messagesResponse = await api.get<IMessage[]>('/messages/last3');

            setCurrentMessages(messagesResponse.data)
        }

        fechtMessages()
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setCurrentMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ])

                messagesQueue.shift();
            }
        }, 3000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="never"
        >
            {currentMessages?.map(message => <Message {...message} key={message.id} />)}


        </ScrollView>
    );
}
export default MessageList