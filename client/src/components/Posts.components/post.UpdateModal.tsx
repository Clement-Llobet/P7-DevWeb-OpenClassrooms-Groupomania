import { SyntheticEvent, useEffect, useState } from 'react';
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
  const [urlImage, setUrlImage] = useState(defaultValueUrlImage);
  const [successMessage, setSuccessMessage] = useState(false);

  const manageUpdateUrlImage = (data: HTMLInputElement) => {
    const file: FileList | null = data.files;

    if (file === null) {
      setUrlImage('');
      return;
    }

    console.log(file);

    setUrlImage(URL.createObjectURL(file[0]));
    console.log(urlImage);
  };

  let objectToUpdate: PostsData = {
    id: postId,
    text: text,
    urlImage: urlImage,
  };

  useEffect(() => {
    objectToUpdate.id = postId;
    objectToUpdate.text = text;
    objectToUpdate.urlImage = urlImage;
  });

  const handleUpdateSubmit = async (
    objectToUpdate: PostsData,
    postId?: number
  ) => {
    await api.apiUpdatePost(objectToUpdate);

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
              onChange={(e: SyntheticEvent) =>
                manageUpdateUrlImage(e.currentTarget as HTMLInputElement)
              }
            />
            <img src={urlImage} alt="" />
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
