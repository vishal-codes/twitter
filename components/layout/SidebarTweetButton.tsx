import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();

    const handleClick = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        router.push('/');
    }, [loginModal, router, currentUser]);

    return (
        <div onClick={handleClick}>
            <div
                className='
                    mt-6
                    lg:hidden 
                    h-14 
                    w-14 
                    p-4 
                    flex 
                    items-center 
                    justify-center 
                    bg-sky-500 
                    hover:bg-opacity-80 
                    transition
                    cursor-pointer
                    rounded-full
                '
            >
                <FaFeather size={24} color='white' />
            </div>
            <div
                className='
                    mt-6
                    hidden
                    lg:block
                    px-4
                    py-2
                    bg-sky-500
                    rounded-full
                    hover:bg-opacity-90
                    transition
                    cursor-pointer
                '
            >
                <p
                    className='
                    hidden
                    lg:block
                    text-center
                    text-white
                    font-semibold
                    text-[20px]
                '
                >
                    Tweet
                </p>
            </div>
        </div>
    );
};

export default SidebarTweetButton;
