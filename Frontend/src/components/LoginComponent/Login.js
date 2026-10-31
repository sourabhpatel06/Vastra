import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [output, setOutput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = () => {
    const userDetail = { email, password };

    axios.post("http://localhost:5050/api/auth/login", userDetail)
      .then((response) => {
        const user = response.data.user;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("_id", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role); 

        // Navigate based on role
        user.role === "admin" ? navigate("/admin") : navigate("/user");
      })
      .catch((err) => {
        setOutput("Login unsuccessful");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      <div className="container-fluid bg-light my-5 px-lg-0">
        <div className="container about px-lg-0">
          <div className="col-lg-12 about-text py-5">
            <div className="p-lg-5 pe-lg-0">
              <font style={{ color: "blue" }}>{output}</font>
              <h1>Login Here:</h1>
              <form>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <br />
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <br />
                <button type="button" className="btn btn-primary" onClick={HandleSubmit}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
