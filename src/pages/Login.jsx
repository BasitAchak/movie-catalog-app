import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const switchMode = () => {
    setMode(isLogin ? "register" : "login");
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
      }
    } catch (firebaseError) {
      switch (firebaseError.code) {
        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;

        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists. Try signing in."
          );
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your connection."
          );
          break;

        default:
          setError(
            "Something went wrong. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="login-logo">
          ▶
        </div>

        <span className="eyebrow">
          {isLogin
            ? "WELCOME BACK"
            : "JOIN REELSPACE"}
        </span>

        <h1>
          {isLogin ? (
            <>
              Find your next
              <br />
              favorite story.
            </>
          ) : (
            <>
              Create your
              <br />
              cinema account.
            </>
          )}
        </h1>

        <p className="login-description">
          {isLogin
            ? "Sign in to explore movies, discover series, and save the titles you want to remember."
            : "Create an account to explore movies, discover series, and build your personal collection."}
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete={
              isLogin
                ? "current-password"
                : "new-password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {!isLogin && (
            <>
              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
              />
            </>
          )}

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Signing in..."
                : "Creating account..."
              : isLogin
              ? "Sign in"
              : "Create account"}
          </button>

        </form>

        <div className="auth-switch">

          <span>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={switchMode}
          >
            {isLogin
              ? "Create account"
              : "Sign in"}
          </button>

        </div>

        <p className="login-note">
          Your account is securely managed by
          Firebase Authentication.
        </p>

      </section>
    </main>
  );
}

export default Login;