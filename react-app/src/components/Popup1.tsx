import React, { useState } from "react";
import './PopupStyles.css'
import '../routes/LoginRegisterStyles.css'
function Popup1(props: Readonly<{ 
    title: React.ReactNode;
    message: React.ReactNode;
    onClose: React.MouseEventHandler<HTMLButtonElement> | undefined; 
}>){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email, name: name, password: pass })
        };
        fetch('http://localhost:8000/auth/register', requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Registration failed'); // Throw an error to handle the unsuccessful response
            }
            return response;
          })
          .then(_ => {
              setIsRegisterSuccessful(true);
          })
          .catch(error => {
            console.log(error); // Handle the error appropriately (e.g., show an error message)
          });
    }
    const handleClosePopup = (event: React.MouseEvent<HTMLButtonElement>, register: boolean) => {
      event.preventDefault();
      if (props.onClose) {
        props.onClose(event);
      }
      if(register)
        window.location.reload(); // Refresh the page
    };

    if (isRegisterSuccessful) {
        return (
          <div className="popup">
            <div className="popup-content-alert">
              <p>Register successful!</p>
              <button className="popup-close-btn-alert" onClick={(event) => handleClosePopup(event, isRegisterSuccessful)}>Close</button>
            </div>
          </div>
        );
    }

    return(
        <div className="popup">
      <div className="popup-content">
      <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
       
    </div>
    <button className="popup-close-btn" onClick={(event) => handleClosePopup(event, isRegisterSuccessful)}>Close</button>
    </div>
    </div>

  );
}
export default Popup1