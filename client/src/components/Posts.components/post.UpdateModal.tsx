import { useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const UpdatePostModal = () => {
  const [text, updateText] = useState('');
  const [image, updateImage] = useState('');

  const handleUpdateSubmit = async () => {
    let updatedObject: PostsData = {
      id: 2, // post.id
      text: text,
      urlImage: image,
      EmployeeId: 2, // post.employeeId
    };

    await api.apiUpdatePost(updatedObject);
  };

  return (
    <div>
      <h2>Modifier le post</h2>
      <form>
        <fieldset>
          <input
            type="text"
            name="text"
            className="post-text__update"
            onBlur={(e) => updateText(e.target.value)}
          />
          <input
            type="file"
            className="post-image"
            multiple={false}
            accept=".jpeg, .jpg, .png, .webp"
            onChange={(e) => updateImage(e.target.value)}
          />
        </fieldset>
      </form>
      <button onClick={handleUpdateSubmit}>Valider</button>
    </div>
  );
};

export default UpdatePostModal;
