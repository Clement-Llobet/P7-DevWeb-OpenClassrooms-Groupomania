import { useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const CreatePostModal = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const handleCreateSubmit = async (e: React.MouseEvent) => {
    let createPostObject = new FormData();
    createPostObject.append('text', text);
    createPostObject.append('urlImage', image);

    setToken(currentToken);

    if (token) {
      createPostObject.append('EmployeeId', token);
    } else {
      return Error;
    }

    // let createPostObject: PostsData = {
    //   text: text,
    //   urlImage: image,
    //   EmployeeId: currentToken(),
    // };

    console.log(Array.from(createPostObject));

    await api.apiCreatePost(currentToken(), createPostObject);
  };

  return (
    <div>
      <h2>Votre nouveau post</h2>

      <form>
        <label>Qu'allez-vous partager aujourd'hui ?</label>
        <input
          type="texte"
          placeholder="Qu'allez-vous partager ?"
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
      <button onClick={(e) => handleCreateSubmit(e)}>Créer le post</button>
    </div>
  );
};

export default CreatePostModal;
