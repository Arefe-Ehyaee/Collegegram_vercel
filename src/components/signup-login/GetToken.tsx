import { useLocation } from 'react-router-dom';

export const GetTokenFromURL = (): string | null => {
  const query = new URLSearchParams(useLocation().search);
  return query.get('token');
};