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
}

const UpdatePostModal: React.FC<IUpdatePostModal> = ({
  defaultValueText,
  postId,
  modalSetter,
}) => {
  const [text, setText] = useState<string>(defaultValueText!);
  const [image, setImage] = useState<string | File>();
  const [successMessage, setSuccessMessage] = useState(false);

  let objectToUpdate = new FormData();

  const manageText = (e: HTMLInputElement) => {
    if (e.value.length <= 2) return;
    setText(e.value);
  };

  const manageUpdateImage = (data: HTMLInputElement) => {
    const file: FileList | null = data.files;
    if (file === null) return;
    setImage(file[0]);
  };

  const handleUpdateSubmit = async (
    postToUpdate: FormData,
    postId?: number
  ) => {
    postToUpdate.append('id', postId!.toString());

    console.log(text, ' ====== ', defaultValueText);

    if (text?.length >= 2 && text !== defaultValueText) {
      postToUpdate.append('text', text);
    }

    if (image !== undefined) {
      postToUpdate.append('picture', image);
    }

    await api.apiUpdatePost(currentToken(), postToUpdate);
    setSuccessMessage(true);
  };

  return (
    <PostUpdateComponent>
      <h2>Modifier le post</h2>
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

      {successMessage && (
        <div className="success-message">
          <p>Vos modifications ont bien été prises en compte.</p>
          <button
            onClick={() => {
              setSuccessMessage(false);
              modalSetter(false);
            }}
          >
            Fermer
          </button>
        </div>
      )}
    </PostUpdateComponent>
  );
};

export default UpdatePostModal;
