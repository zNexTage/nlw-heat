import React from 'react';
import { MotiView } from 'moti';
import {
    View, Text
} from 'react-native';
import UserPhoto from '../UserPhoto';

import styles from './styles';

export interface IMessage {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Message = ({ text, user }: IMessage) => {
    return (
        <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700 }}
            style={styles.container}>
            <Text style={styles.message}>
                {text}
            </Text>
            <View style={styles.footer}>
                <UserPhoto
                    sizes="SMALL"
                    imageUri={user.avatar_url}
                />
                <Text style={styles.userName}>
                    {user.name}
                </Text>
            </View>
        </MotiView>
    );
}
export default Message