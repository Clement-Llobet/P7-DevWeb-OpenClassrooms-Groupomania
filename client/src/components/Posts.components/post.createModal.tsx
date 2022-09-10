import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PostsData } from '../../interfaces';
import { UserContextType } from '../../interfaces/types.userContext';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const CreatePostModal = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | File>();
  const [idUser, setIdUser] = useState<number>();

  const { user } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {}, [user]);

  console.log(user);

  let createPostObject = new FormData();

  const managePicture = (data: HTMLInputElement) => {
    const fileResult: FileList | null = data.files;

    if (fileResult === null || fileResult === undefined) {
      setImage('');
      return;
    }

    let file: File = fileResult[0];

    file.name.replace(/\s+/g, '_');
    setImage(file);
  };

  const handleCreateSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    createPostObject.append('text', `${text}`);
    createPostObject.append('urlImage', image!);

    setIdUser(user[0].id!);

    if (idUser) {
      createPostObject.append('EmployeeId', currentToken()!);
    } else {
      return Error;
    }

    const callApi = await api.apiCreatePost(currentToken(), createPostObject);
    console.log(callApi);
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
          onChange={(e: SyntheticEvent) =>
            managePicture(e.currentTarget as HTMLInputElement)
          }
        />
      </form>
      <button onClick={(e) => handleCreateSubmit(e)}>Créer le post</button>
    </div>
  );
};

export default CreatePostModal;
