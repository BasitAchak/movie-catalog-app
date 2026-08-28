import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    } catch (firebaseError) {
      if (
        firebaseError.code ===
        "auth/invalid-credential"
      ) {
        setError(
          "Incorrect email or password."
        );
      } else if (
        firebaseError.code ===
        "auth/too-many-requests"
      ) {
        setError(
          "Too many attempts. Please try again later."
        );
      } else if (
        firebaseError.code ===
        "auth/invalid-email"
      ) {
        setError(
          "Please enter a valid email address."
        );
      } else {
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
          WELCOME TO REELSPACE
        </span>

        <h1>
          Find your next
          <br />
          favorite story.
        </h1>

        <p className="login-description">
          Sign in to explore movies, discover
          series, and save the titles you want
          to remember.
        </p>

        <form onSubmit={handleLogin}>

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
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

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
              ? "Signing in..."
              : "Sign in"}
          </button>

        </form>

        <p className="login-note">
          Use the test account created in
          Firebase Authentication.
        </p>

      </section>

    </main>
  );
}

export default Login;