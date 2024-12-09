import axios from "axios";

export const PostAComment = async (token: string, postId: string | null, description: string, parentId?: string| null) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const data: any = {
      description: description,
    };
  
    if (parentId) {
      data.parentId = parentId;
    }

    if (!parentId) {
        data.parentId = null
    }
  
    const response = await axios.post(
      `${API_BASE_URL}/posts/${postId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };