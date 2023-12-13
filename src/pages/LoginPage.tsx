import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { authenticate } from "../store/auth/authSlice";
import { useState } from "react";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "login":
        if (!/^[A-Z0-9]+$/.test(value))
          error = "Login can only contain uppercase letters and numbers";
        break;
      case "password":
        if (value.length < 8 || new Set(value).size !== value.length)
          error = "Password must be at least 8 characters long without repeating characters";
        break;
      default:
        break;
    }

    setForm({ ...form, [name]: value, });
    setErrors({ ...errors, [name]: error, });
  }
  const { login, password } = form;
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err !== "")) {
      alert("Fix all errors before submitting");
      return;
    }
    if (Object.values(form).some((val) => val === "")) {
      alert("Fill in all fields before submitting");
      return;
    }
    dispatch(authenticate(form))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={handleInputChange}
          name="login"
        />
        {errors.login && <div>{errors.login}</div>}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
          name="password"
        />
        {errors.password && <div>{errors.password}</div>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
