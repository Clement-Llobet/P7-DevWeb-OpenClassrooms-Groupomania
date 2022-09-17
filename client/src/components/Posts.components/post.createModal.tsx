import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PostsData } from '../../interfaces';
import { UserContextType } from '../../interfaces/types.userContext';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface ICreatePostModal {
  postSetter: any;
}

const CreatePostModal: React.FC<ICreatePostModal> = ({ postSetter }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | File>();
  const [idUser, setIdUser] = useState<number | null>(null);

  const { user } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {
    idUser === null && setIdUser(user[0].id!);
  }, [user, idUser]);

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
    createPostObject.append('picture', image!);

    if (idUser) {
      createPostObject.append('EmployeeId', currentToken()!);
    } else {
      return Error;
    }

    await api.apiCreatePost(currentToken(), createPostObject);
    const result: PostsData[] = await api.apiGetAllPosts(currentToken());
    postSetter(result);
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
