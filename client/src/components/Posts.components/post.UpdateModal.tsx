import React, { SyntheticEvent, useState } from 'react';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import { PostUpdateComponent } from './postStyle/PostComponentsStyle';

const api = new ApiService('http://localhost:8000/');

interface IUpdatePostModal {
  defaultValueText?: string;
  postId?: number;
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  textSetter: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  successMessage: boolean;
  successMessageSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostModal: React.FC<IUpdatePostModal> = ({
  defaultValueText,
  postId,
  modalSetter,
  text,
  textSetter,
  image,
  imageSetter,
  successMessage,
  successMessageSetter,
}) => {
  const [updateText, setUpdateText] = useState<string>('');
  const [updateImage, setUpdateImage] = useState<File | undefined | null>(null);

  let objectToUpdate = new FormData();

  const manageText = (e: HTMLInputElement) => {
    if (e.value.length <= 2) return;
    setUpdateText(e.value);
  };

  const manageUpdateImage = (data: HTMLInputElement) => {
    const file: FileList | null = data.files;
    if (file === null) return;
    setUpdateImage(file[0]);
  };

  const handleUpdateSubmit = async (
    postToUpdate: FormData,
    postId?: number
  ) => {
    postToUpdate.append('id', postId!.toString());

    if (updateText?.length >= 2 && updateText !== defaultValueText) {
      postToUpdate.append('text', updateText);
    }

    if (updateImage !== undefined && updateImage !== null) {
      postToUpdate.append('picture', updateImage);
    }

    await api.apiUpdatePost(currentToken(), postToUpdate);
    successMessageSetter(true);
  };

  const resetPostContent = async () => {
    const callApi = await api.apiGetPostById(
      currentToken(),
      postId?.toString()
    );
    textSetter(callApi.text);
    imageSetter(callApi.urlImage);
    console.log(typeof image);
  };

  return (
    <PostUpdateComponent>
      <h2>Modifier le post</h2>

      {successMessage ? (
        <div className="success-message">
          <p>Vos modifications ont bien été prises en compte.</p>
          <button
            onClick={() => {
              successMessageSetter(false);
              modalSetter(false);
              resetPostContent();
            }}
          >
            Fermer
          </button>
        </div>
      ) : (
        <>
          <form>
            <fieldset>
              <label htmlFor="modify-post-text">Texte : </label>
              <textarea
                name="text"
                id="modify-post-text"
                defaultValue={text}
                className="post-text__update"
                onBlur={(e: SyntheticEvent) =>
                  manageText(e.currentTarget as HTMLInputElement)
                }
              ></textarea>

              <label htmlFor="modify-post-image">Image : </label>
              <input
                type="file"
                id="modify-post-image"
                className="post-image"
                multiple={false}
                accept=".jpeg, .jpg, .png, .webp"
                onChange={(e: SyntheticEvent) =>
                  manageUpdateImage(e.currentTarget as HTMLInputElement)
                }
              />
            </fieldset>
          </form>
          <div className="button-validation">
            <button onClick={() => handleUpdateSubmit(objectToUpdate, postId)}>
              Valider
            </button>
          </div>
        </>
      )}
    </PostUpdateComponent>
  );
};

export default UpdatePostModal;
