import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { EyeIcon, EyeOffIcon } from "../../components/icons";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import styles from "./Login.module.css";

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname ?? "/";
    return <Navigate to={redirectTo} replace />;
  }

  function validate() {
    const nextErrors = {};
    if (!identifier.trim()) nextErrors.identifier = "Enter your username.";
    if (!password.trim()) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const user = await login(identifier, password, rememberMe);
      showToast(`Welcome back, ${user.name}.`, "success");
      navigate(location.state?.from?.pathname ?? "/", { replace: true });
    } catch (error) {
      showToast(error.message ?? "Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    showToast("Password reset isn't available in this preview yet.", "info");
  }

  return (
    <div className={[styles.page, "page-transition"].join(" ")}>
      <aside className={styles.showcase}>
        <div className={styles.showcaseBrand}>Kasamento</div>
        <div className={styles.showcaseEyebrow}>Bridal &amp; Groom Rental &middot; Kerala</div>
        <h1 className={styles.showcaseTitle}>
          Your wedding look, <em>reserved</em> not owned.
        </h1>
        <p className={styles.showcaseSub}>
          Sign in to browse curated bridal and groom wear from Kerala's finest boutiques — try it on, wear it once,
          return it with ease.
        </p>
      </aside>

      <div className={styles.formSide}>
        <div className={styles.formCard}>
          <div className={styles.formEyebrow}>Welcome back</div>
          <h2 className={styles.formTitle}>Sign in</h2>
          <p className={styles.formHint}>Enter your details to manage your reservations and saved looks.</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              label="Username"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="Kasamento"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setErrors((current) => ({ ...current, identifier: undefined }));
              }}
              error={errors.identifier}
            />

            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
              error={errors.password}
              adornment={
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            <div className={styles.row}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className={styles.forgot} onClick={handleForgotPassword}>
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" fullWidth loading={submitting} className={styles.submit}>
              {submitting ? "Signing in" : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
