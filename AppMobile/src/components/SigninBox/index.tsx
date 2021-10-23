import React from 'react';

import {
    View
} from 'react-native';

import { useAuth } from '../../hooks/auth';
import Button from '../Button'
import { COLORS } from '../../theme';

import styles from './styles';

const SigninBox = () => {
    const { signIn, isSigning } = useAuth();

    return (
        <View style={styles.container}>
            <Button
                onPress={signIn}
                title="Entrar com o github"
                color={COLORS.BLACK_PRIMARY}
                backgroundColor={COLORS.YELLOW}
                icon='github'
                isLoading={isSigning}
            />
        </View>
    );
}
export default SigninBox