import { Form } from "react-router-dom";

export function Login() {
    return (
        <div>
            <h2>Connexion</h2>
            <Form method="post" action="https://projects-manager.api.leopeyronnet.fr/api/auth/login">
                <div>
                    <label>
                        Nom d'utilisateur:
                        <input type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" required />
                    </label>
                </div>
                <button type="submit">Se connecter</button>
            </Form>
        </div>
    )
}

export default Login;