import React, { useState } from 'react';

import {
    Alert,
    Keyboard,
    View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../../services/api';
import { COLORS } from '../../theme';
import Button from '../Button';
import { IMessage } from '../Message';

import styles from './styles';

const SendMessageForm = () => {
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    const handleMessageSubmit = async () => {
        const msgFormatted = message.trim();

        if (msgFormatted.length > 0) {
            setSendingMessage(true);

            try {
                const { data } = await api.post<IMessage>('/messages', { message: msgFormatted });

                setMessage('');
                Keyboard.dismiss();
                Alert.alert('Mensagem enviada com sucesso');
            }
            catch (err) {
                Alert.alert('Ops... Ocorreu um erro e não foi possível registrar a sua mensagem');
            }
            finally {
                setSendingMessage(false);
            }

        } else {
            Alert.alert('Escreve a mensagem para enviar');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardAppearance="dark"
                placeholder="Qual sua expectativa para o evento"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                onChangeText={setMessage}
                value={message}
                maxLength={140}
                editable={!sendingMessage}
            />
            <Button
                onPress={handleMessageSubmit}
                title='Enviar mensagem'
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessage}
            />
        </View>
    );
}
export default SendMessageForm