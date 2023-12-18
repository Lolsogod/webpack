import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { authenticate } from "@/store/auth/authSlice";
import { useState } from "react";
import Button, { btnStyles } from "@/ui/Button";
import styles from "@/styles/form.module.scss"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.error("Fix all errors before submitting");
      return;
    }
    if (Object.values(form).some((val) => val === "")) {
      toast.error("Fill in all fields before submitting");
      return;
    }
    dispatch(authenticate(form))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Login</h1>
      <form onSubmit={handleAuth}>
        <input
          className={styles.formInput}
          type="text"
          placeholder="login"
          value={login}
          onChange={handleInputChange}
          name="login"
        />
        {errors.login && <div className={styles.formError}>{errors.login}</div>}
        <input
          className={styles.formInput}
          type="password"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
          name="password"
        />
        {errors.password && <div className={styles.formError}>{errors.password}</div>}
        <div className={styles.btnsContainer}>
          <Link className={btnStyles("ghost")} to="/register">Create account</Link>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
