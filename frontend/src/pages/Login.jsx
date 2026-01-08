import API from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Incorrect credentials");
    }
  };

  const googleSuccess = async (credentialResponse) => {
    const res = await API.post("/auth/google", {
      token: credentialResponse.credential
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>Login</button>
          <div style={{ marginTop: "14px", textAlign: "center" }}>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const res = await API.post("/auth/google", {
                    token: credentialResponse.credential
          });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
    }}
    onError={() => {
      console.log("Google Login Failed");
    }}
  />
</div>

        <p className="auth-link">
          New user?{" "}
          <span onClick={() => navigate("/register")}>
            Click here
          </span>
        </p>
      </div>
    </div>
  );
}
