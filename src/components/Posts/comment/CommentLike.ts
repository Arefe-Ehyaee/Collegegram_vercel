import axios from "axios";

export const CommentLike = async (token: string, postId: string, commentId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response.data;
}

