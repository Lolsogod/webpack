import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { login } from "../store/auth/authSlice";
import { useState } from "react";

const LoginPage = () => {
  //const {user} = useSelector((state: RootState) => state.auth
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
