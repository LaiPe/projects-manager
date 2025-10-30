import { Form } from "react-router-dom";

export function Login() {
    return (
        <div>
            <h2>Login</h2>
            <Form method="post" action="https://projects-manager.api.leopeyronnet.fr/api/auth/login">
                <div>
                    <label>
                        Username:
                        <input type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>
                </div>
                <button type="submit">Login</button>
            </Form>
        </div>
    )
}

export default Login;