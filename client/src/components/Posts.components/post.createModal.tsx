import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PostsData } from '../../interfaces';
import { UserContextType } from '../../interfaces/types.userContext';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { currentToken } from '../../service/getCurrentToken';
import { PostCreateComponent } from './postStyle/PostComponentsStyle';

const api = new ApiService('http://localhost:8000/');

interface ICreatePostModal {
  postSetter: React.Dispatch<React.SetStateAction<PostsData[] | null>>;
  createPostSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostModal: React.FC<ICreatePostModal> = ({
  postSetter,
  createPostSetter,
}) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | File>();
  const [idUser, setIdUser] = useState<number | null>(null);

  const { user } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {
    idUser === null && setIdUser(user!.id!);
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

    createPostObject.append('text', text);
    createPostObject.append('picture', image!);

    if (idUser) {
      createPostObject.append('EmployeeId', idUser.toString());
    } else {
      return Error;
    }

    await api.apiCreatePost(currentToken(), createPostObject);
    const result: PostsData[] = await api.apiGetAllPosts(currentToken());
    postSetter(result);
    createPostSetter(false);
  };

  return (
    <PostCreateComponent>
      <div className="create-post-header">
        <h2>Votre nouveau post</h2>
        <button onClick={() => createPostSetter(false)}>Annuler</button>
      </div>

      <form>
        <fieldset>
          <input
            type="text"
            placeholder="Qu'allez-vous partager aujourd'hui ?"
            onBlur={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            multiple={false}
            accept=".jpeg, .jpg, .png, .webp"
            onChange={(e: SyntheticEvent) =>
              managePicture(e.currentTarget as HTMLInputElement)
            }
          />
        </fieldset>
      </form>
      <button
        className="validate-post-creation"
        onClick={(e) => handleCreateSubmit(e)}
      >
        Créer le post
      </button>
    </PostCreateComponent>
  );
};

export default CreatePostModal;
