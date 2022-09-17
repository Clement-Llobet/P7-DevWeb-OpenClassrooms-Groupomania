import { SyntheticEvent, useEffect, useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface PostDefaultValuesProps {
  defaultValueText?: string;
  defaultValueImage?: File;
  postId?: number;
}

const UpdatePostModal: React.FC<PostDefaultValuesProps> = ({
  defaultValueText,
  defaultValueImage,
  postId,
}) => {
  const [text, setText] = useState<string>(defaultValueText!);
  const [image, setImage] = useState<string | File>(defaultValueImage!);
  const [successMessage, setSuccessMessage] = useState(false);

  let objectToUpdate = new FormData();

  const manageText = (e: HTMLInputElement) => {
    if (e.value.length <= 2) return;
    setText(e.value);
  };

  const manageUpdateUrlImage = (data: HTMLInputElement) => {
    const file: FileList | null = data.files;

    if (file === null) return;

    setImage(file[0]);
  };

  const handleUpdateSubmit = async (
    postToUpdate: FormData,
    postId?: number
  ) => {
    postToUpdate.append('id', postId!.toString());

    if (text?.length >= 2) {
      postToUpdate.append('text', text);
    }
    if (image !== undefined) {
      postToUpdate.append('picture', image);
    }

    console.log(Array.from(postToUpdate));

    await api.apiUpdatePost(currentToken(), postToUpdate);
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
              onBlur={(e: SyntheticEvent) =>
                manageText(e.currentTarget as HTMLInputElement)
              }
            />
          </div>

          <div>
            <label>Modifier l'image : </label>
            <input
              type="file"
              className="post-image"
              multiple={false}
              accept=".jpeg, .jpg, .png, .webp"
              onChange={(e: SyntheticEvent) =>
                manageUpdateUrlImage(e.currentTarget as HTMLInputElement)
              }
            />
          </div>
        </fieldset>
      </form>
      <button onClick={() => handleUpdateSubmit(objectToUpdate, postId)}>
        Valider
      </button>
      {successMessage && (
        <div>Vos modifications ont bien été prises en compte.</div>
      )}
    </div>
  );
};

export default UpdatePostModal;
