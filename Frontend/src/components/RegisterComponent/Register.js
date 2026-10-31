import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import axios from 'axios';

function Register() {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [output, setOutput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const HandleSubmit = () => {
    const userDetail = {
      name,
      email,
      password,
      mobile,
      address,
      city,
      gender
    };

    if (!name || !email || !password) {
      setOutput("Please fill required fields");
    } else if (password.length < 5 || password.length > 10) {
      setOutput("Password must be 5-10 characters");
    } else {
      axios.post("http://localhost:5050/api/auth/register", userDetail)
        .then(() => {
          setOutput("User registered successfully");

          // ✅ Clear form
          setName("");
          setEmail("");
          setPassword("");
          setMobile("");
          setAddress("");
          setCity("");
          setGender("");

          // ✅ Navigate to login page after short delay (optional)
          setTimeout(() => {
            navigate('/login');
          }, 1000); // 1 second delay for user feedback
        })
        .catch(() => {
          setOutput("User not registered");
        });
    }
  };

  return (
    
  <div className="register">
    <div className="register-container">
      <h2>Register</h2>
      <p style={{ color: "blue" }}>{output}</p>

      <div className="register-fields">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile" />
        <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option>Select City</option>
          <option>Indore</option>
          <option>Bhopal</option>
          <option>Dewas</option>
        </select>

        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={e => setGender(e.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={e => setGender(e.target.value)} />
            Female
          </label>
        </div>
      </div>

      <button onClick={HandleSubmit}>Register</button>
    </div>
  </div>
);
}

export default Register;
