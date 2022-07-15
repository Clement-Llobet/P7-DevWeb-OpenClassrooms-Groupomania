const Register: React.FC = () => {
  return (
    <section>
      <h1>Inscrivez-vous</h1>
      <form>
        <fieldset>
          <legend>Inscription</legend>
          <label>Nom</label>
          <input type="text" name="name" id="registration_name" required />

          <label>Prénom</label>
          <input
            type="text"
            name="surname"
            id="registration_surname"
            required
          />

          <label>Email</label>
          <input type="email" id="registration_email" required />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            id="registration_password"
            required
          />

          <label>Statut</label>
          <select name="status" id="registration_status" required>
            <option value="executive">Cadre</option>
            <option value="non-executive">Non-cadre</option>
          </select>

          <label>Avatar</label>
          <input type="text" id="registration_avatar" />
        </fieldset>
      </form>
      <button>Valider</button>
    </section>
  );
};

export default Register;
