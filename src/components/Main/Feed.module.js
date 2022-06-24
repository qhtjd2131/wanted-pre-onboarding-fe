import axios from 'axios';

/////////// functions ///////////

export const uploadComment = async (id, newComment, callbackfunc) => {
  try {
    const result = await axios.get(`http://localhost:8080/feeds/${id}`);
    const body = { ...result.data };
    body.comments.push(newComment);
    await axios.put(`http://localhost:8080/feeds/${id}`, body);
    callbackfunc();

    // 1 is success
    return 1;
  } catch (e) {
    alert('댓글 업로드 실패');
    console.log(e.message);

    // 0 is failed
    return 0;
  }
};
