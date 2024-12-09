import axios from "axios";

export const UnCommentLike = async (token: string, postId: string, commentId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/unlike`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response.data;
}
