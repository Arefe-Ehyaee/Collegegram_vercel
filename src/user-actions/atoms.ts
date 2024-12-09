import { atom } from 'recoil';
import defaultAvatar from '../assets/icons/defaultavatar.svg'

//auth atom:
interface AuthState {
    token: string | null;
}

const authAtom = atom<AuthState | null>({
    key: 'authAtom',
    default: null, 
});

export { authAtom };


//user atom:

export interface UserProfile {
    id: string;
    username: string;
    avatar: string;
    firstName: string;
    lastName:string;
    email?:string
    postsCount: number;
    followersCount: number;
    followingsCount: number;
    bio: string;
    isPrivate?:boolean;
    token:string 
}

export const defaultProfile: UserProfile = {
    id: 'defaultID',
    username: '',
    avatar: defaultAvatar, 
    firstName: '',
    lastName:'',
    postsCount: 0,
    followersCount: 0,
    followingsCount: 0,
    bio: 'برای شخصی سازی این متن با ویرایش پروفایل بایو خود را تغییر دهید',
    isPrivate:false,
    token: 'asdadasd'
};

export const userProfileAtom = atom<UserProfile>({
    key: 'userProfileAtom',
    default: defaultProfile,
});