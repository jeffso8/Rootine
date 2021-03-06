import React, {useState, useEffect} from 'react';
import { SocialIcon } from 'react-social-icons';
import { getErrorMessage } from 'api';
import './main.css';


function MainPage() {
  const [isboxClicked, setboxClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const signUpClick = () => {setboxClicked(true)};
  const signInClick = () => {setboxClicked(false)}

  useEffect(() => {
    getErrorMessage().then((res) => {
      const error = res.message;
      console.log("error message", error);

      setErrorMessage(error);
    });
  }, errorMessage);

  return (
    <div className={`container ${isboxClicked ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
      <form action="/signup" method="post">
          <h1> Create Account </h1>
          <div className="social-container">
            <a href={`${process.env.REACT_APP_URL}/auth/facebook`} className="social">
              <SocialIcon network="facebook" style={{height:'50px', width:'50px'}} />
            </a>
            <a href={`${process.env.REACT_APP_URL}/auth/google`} className="social">
              <SocialIcon network="google" style={{height:'50px', width:'50px'}}/>
            </a>
          </div>
            <input className="box" type="text" name="first_name" id="first_name" placeholder="First name" required/>
            <input className="box" type="text" name="last_name" id="last_name" placeholder="Last name" required/>
            <input className="box" type="email" name="email" id="email" placeholder="E-Mail" required/>
            <input className="box" type="password" name="password" id="password" placeholder="Password" required/>
            <button type="submit" name="submitDetails" value="Submit">Sign Up </button>
            <span>{errorMessage}</span>
            </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="/login" method="post">
            <h1>Sign In</h1>
            <div className="social-container">
            <a href={`${process.env.REACT_APP_URL}/auth/facebook`} className="social">
              <SocialIcon network="facebook" style={{height:'50px', width:'50px'}} />
            </a>
            <a href={`${process.env.REACT_APP_URL}/auth/google`} className="social" role="button">
              <SocialIcon network="google" style={{height:'50px', width:'50px'}} />
            </a>
          </div>
            <span>or use your account details</span>
            <div>
              <input type="text" name="email" placeholder="E-Mail"/>
            </div>
            <div>
              <input type="password" name="password" placeholder="Password"/>
            </div>
            <div>
              <button type="submit" value="Log In">Sign In</button>
            </div>
        </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Rootine</h1>
              <h2>An app to help you build your atomic habits</h2>
              <p>Enter your details, and start your improvement journey</p>
              <button className="ghost" id="signIn" onClick={signInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back To Rootine!</h1>
              <p>To access your habits, please login with you personal info</p>
              <button className="ghost" id="signUp" onClick={signUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>


  );
}

export default MainPage;
