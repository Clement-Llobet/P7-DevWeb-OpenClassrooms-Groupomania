const Login = () => {
    return (
        <section>
            <h2>Connexion ou inscription à Groupomania</h2>
            <form method="post" action="">
                <fieldset>
                    <legend>Inscription</legend>

                    <label>Nom</label>
                    <input type="text" name="name" id="registration_name" required />

                    <label>Prénom</label>
                    <input type="text" name="surname" id="registration_surname" required />

                    <label>Email</label>
                    <input type="email" id="registration_email" required />

                    <label>Mot de passe</label>
                    <input type="password" name="password" id="registration_password" required/>

                    <label>Profession</label>
                    <select name="profession" id="registration_profession" required>
                        <option value="executive">Cadre</option>
                        <option value="non-executive">Non-cadre</option>
                    </select>

                    <label>Avatar</label>
                    <input type="text" id="registration_avatar"/>
                </fieldset>
                <fieldset>
                    <legend>Connexion</legend>

                    <label>Email</label>
                    <input type="email" id="employee_email" required />

                    <label>Mot de passe</label>
                    <input type="password" name="password" id="employee_password" required/>
                </fieldset>
            </form>
        </section>
    )
}

export default Login;