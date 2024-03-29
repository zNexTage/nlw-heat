import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import styles from './style.module.scss';


const SendMessageForm = () => {
    const { user, signOut } = useContext(AuthContext);

    const [message, setMessage] = useState('');

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        await api.post('messages', { message });

        setMessage('');
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size={32} />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>
                    {user?.name}
                </strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size={16} />
                    {user?.login}
                </span>
            </header>
            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">
                    Mensagem
                </label>
                <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    placeholder="Qual a sua expectativa para o evento" />
                <button type='submit'>
                    Enviar mensagem
                </button>
            </form>
        </div>
    )
}

export default SendMessageForm;