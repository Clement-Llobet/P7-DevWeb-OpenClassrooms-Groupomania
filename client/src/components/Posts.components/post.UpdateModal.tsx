import { useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface PostDefaultValuesProps {
  defaultValueText?: string;
  defaultValueUrlImage?: string;
  postId?: number;
}

const UpdatePostModal: React.FC<PostDefaultValuesProps> = ({
  defaultValueText,
  defaultValueUrlImage,
  postId,
}) => {
  const [text, updateText] = useState(defaultValueText);
  const [urlImage, updateUrlImage] = useState(defaultValueUrlImage);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleUpdateSubmit = async (postId?: number) => {
    let updatedObject: PostsData = {
      id: postId,
      text: text,
      urlImage: urlImage,
    };

    await api.apiUpdatePost(updatedObject);

    setSuccessMessage(true);
  };

  return (
    <div>
      <h2>Modifier le post</h2>
      <form>
        <fieldset>
          <div>
            <label>Modifier le texte : </label>
            <input
              type="text"
              name="text"
              defaultValue={text}
              className="post-text__update"
              onBlur={(e) => updateText(e.target.value)}
            />
          </div>

          <div>
            <label>Modifier l'image : </label>
            <input
              type="file"
              className="post-image"
              multiple={false}
              accept=".jpeg, .jpg, .png, .webp"
              onChange={(e) => updateUrlImage(e.target.value)}
            />
          </div>
        </fieldset>
      </form>
      <button onClick={() => handleUpdateSubmit(postId)}>Valider</button>
      {successMessage && (
        <div>Vos modifications ont bien été prises en compte.</div>
      )}
    </div>
  );
};

export default UpdatePostModal;
