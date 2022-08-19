import { useState } from 'react';
import { ApiService } from '../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const CreatePostModal = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const handleCreateSubmit = async () => {
    let updatedObject = {
      text: text,
      urlImage: image,
    };

    await api.apiCreatePost(updatedObject);
  };

  return (
    <div>
      <h2>Votre nouveau post</h2>

      <form>
        <label>Qu'allez-vous partager aujourd'hui ?</label>
        <input
          type="texte"
          placeholder="Votre titre"
          className="post-text__create"
          onBlur={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          className="post-image"
          multiple={false}
          accept=".jpeg, .jpg, .png, .webp"
          onChange={(e) => setImage(e.target.value)}
        />
      </form>
      <button onClick={handleCreateSubmit}>Créer le post</button>
    </div>
  );
};

export default CreatePostModal;
