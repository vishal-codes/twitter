import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                email,
                password,
                name,
                username,
            });
            toast.success('Account created successfully!');
            await signIn('credentials', {
                email,
                password,
            });
            registerModal.onClose();
        } catch (error) {
            toast.error('Something went wrong!');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, name, username]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
                type='password'
            />
        </div>
    );

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>
                Already have an account ? &nbsp;
                <span
                    onClick={onToggle}
                    className='text-white cursor-pointer hover:underline'
                >
                    Sign In
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            title='Create an account'
            actionLabel='Register'
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
