import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { authenticate, register } from "../store/auth/authSlice";
import Button, { btnStyles } from "../ui/Button";
import styles from "../styles/form.module.scss"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    login: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    login: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value))
          error = "Invalid email address";
        break;
      case "login":
        if (!/^[A-Z0-9]+$/.test(value))
          error = "Login can only contain uppercase letters and numbers";
        break;
      case "password":
        if (value.length < 8 || new Set(value).size !== value.length)
          error = "Password must be at least 8 characters long without repeating characters";
        break;
      case "repeatPassword":
        if (value !== form.password)
          error = "Passwords do not match";
        break;
      default:
        break;
    }

    setForm({...form,[name]: value,});
    setErrors({ ...errors,[name]: error,});
  };

  const { email, login, password, repeatPassword } = form;


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err !== "")) {
      toast.error("Fix all errors before submitting");
      return;
    }
    if (Object.values(form).some((val) => val === "")) {
      toast.error("Fill in all fields before submitting");
      return;
    }
    dispatch(register({ email, login, password }))
      .then(() => {
        dispatch(authenticate({ login, password }));
      }).catch((err) => toast.error(err.message));
  };

  return (
    
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Registration</h1>
      <form onSubmit={handleRegister}>
        <input
          className={styles.formInput}
          type="text"
          placeholder="email"
          value={email}
          onChange={handleInputChange}
          name="email"
        />
        
        {errors.email && <div className={styles.formError}>{errors.email}</div>}
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
        <input
          className={styles.formInput}
          type="password"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={handleInputChange}
          name="repeatPassword"
        />
        {errors.repeatPassword && <div className={styles.formError}>{errors.repeatPassword}</div>}
        <div className={styles.btnsContainer}>
          <Link className={btnStyles("ghost")} to="/login">I already have account</Link>
          <Button>Register</Button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;