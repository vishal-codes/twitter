import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    auth,
    alert,
}) => {
    const { data: currentUser } = useCurrentUser();
    const loginModal = useLoginModal();
    const router = useRouter();

    const hadleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (auth && !currentUser) {
            loginModal.onOpen();
        } else if (href) {
            router.push(href);
        }
    }, [onClick, router, href, auth, currentUser, loginModal]);

    return (
        <div onClick={hadleClick} className='flex flex-row items-center'>
            <div
                className='
                    relative
                    rounded-full
                    h-14
                    w-14
                    p-4
                    flex
                    items-center
                    justify-center
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                    lg:hidden
                '
            >
                <Icon size={28} color='white' />
                {alert && (
                    <BsDot
                        size={70}
                        className='text-sky-500 absolute -top-4 left-0'
                    />
                )}
            </div>
            <div
                className='
                    hidden
                    relative
                    lg:flex
                    items-center
                    gap-4
                    p-4
                    rounded-full
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                '
            >
                <Icon size={24} color='white' />
                <p className='hidden lg:block text-white text-xl'>{label}</p>
                {alert && (
                    <BsDot
                        size={70}
                        className='text-sky-500 absolute -top-4 left-0'
                    />
                )}
            </div>
        </div>
    );
};

export default SidebarItem;
