import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import { PostUpdateComponent } from './postStyle/PostComponentsStyle';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IUpdatePostModal {
  defaultValueText?: string;
  postId?: number;
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  textSetter: React.Dispatch<React.SetStateAction<string>>;
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
              <textarea
                name="text"
                defaultValue={text}
                className="post-text__update"
                onBlur={(e: SyntheticEvent) =>
                  manageText(e.currentTarget as HTMLInputElement)
                }
              ></textarea>

              <input
                type="file"
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
