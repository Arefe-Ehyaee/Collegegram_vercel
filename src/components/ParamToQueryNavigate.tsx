import React, { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom';

interface Props {
    paramKey: string;
    baseUrl: string;
}

export const ParamToQueryNavigate: FC<Props> = ({baseUrl, paramKey}) => {
    const params = useParams();
    
  return (
    <Navigate to={`${baseUrl}?${paramKey}=${params[paramKey]}`} />
  )
}
