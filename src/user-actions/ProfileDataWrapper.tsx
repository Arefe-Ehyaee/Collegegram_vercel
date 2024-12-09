import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserProfile, userProfileAtom } from "./atoms";
import { useRecoilState } from "recoil";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import defaultavatar from '../assets/icons/defaultavatar.svg';

const ProfileDataWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const navigate = useNavigate();

  const handleError = (error: any) => {
    
    if (error.response) {
  
      const statusCode = error.response.status;
  
      if (statusCode === 401) {
        localStorage.clear()
        navigate("/login"); 
        toast.error("نیاز به ورود مجدد دارید!");
      } else if (statusCode === 400) {
        toast.error("خطایی رخ داد!");
        navigate("/error"); 
      } else if (statusCode === 500) {
        toast.error("خطایی رخ داد!");
        navigate("/error"); 
      } else if (error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.response.statusText) {
        toast.error(`Error: ${error.response.statusText}`);
      } else {
        toast.error("Unexpected server error");
      }
    } else if (error.request) {
      toast.error("Network error");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchUserProfile = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const fetchWrapper = axios.create({
      baseURL: `${API_BASE_URL}/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchWrapper.get('/users/profile');
    return response.data;
  };
  const token = localStorage.getItem('token')
  const { data: profileData, error: profileError } = useQuery({
    queryKey: ['profileData'],
    queryFn: fetchUserProfile,
    retry: false,
    enabled:!!token
  });

  useEffect(() => {
    if(profileError) {
      handleError(profileError)
    }
  }, [profileError])

  useEffect(() => {
    if (profileData ) {
      const avatarURL = profileData.data.avatar ? `${profileData.data.avatar.url}` : defaultavatar;
      setUserProfile(prevProfile => ({
        ...prevProfile,
        username: profileData.data.username || "",
        avatar: avatarURL || prevProfile.avatar,
        firstName: profileData.data.firstName || "",
        lastName: profileData.data.lastName || "",
        bio: profileData.data.bio || "",
        email: profileData.data.email || prevProfile.email,
        id: profileData.data.id,
        postsCount: profileData.data.postsCount || prevProfile.postsCount,
        followersCount: profileData.data.followersCount || prevProfile.followersCount,
        followingsCount: profileData.data.followingsCount || prevProfile.followingsCount,
        isPrivate: profileData.data.isPrivate || prevProfile.isPrivate,
        token: token ?? prevProfile.token
      }));
    }
  }, [profileData]);

  return <div>{children}</div>;
};

export default ProfileDataWrapper;
