import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useUserActions} from "../hooks/user.actions";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth"
import {Navigate} from "react-router-dom";


const LoginForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const userActions = useUserActions();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInput = (event) => {
    let newInput = {[event.target.name]: event.target.value};
    setData({...data, ...newInput});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    userActions.login(data);
  }
  if (isLoggedIn)
    return <Navigate to={"/"}/>
  else
  return (
    <main>
      <div className="container">

        <section
          className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                    <img src="dgfs.png" width={250} alt=""/>
                </div>

                <div className="card mb-3">

                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Veuillez d'abord vous connecter !</h5>
                      <p className="text-center small">Entrez votre email suivi de votre mot de passe</p>
                    </div>

                    <form className="row g-3">

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text bg-info" id="inputGroupPrepend"><i className={"bi bi-envelope"}/></span>
                          <input onChange={(event) => handleInput(event)} type="text" name="email"
                                 className="form-control" id="yourUsername" required/>
                          <div className="invalid-feedback">Please enter your username.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Mot de passe</label>
                        <input onChange={(event) => handleInput(event)} type="password" name="password"
                               className="form-control" id="yourPassword" required/>
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <button className={isSaving ? 'btn btn-secondary w-100 disabled' : 'btn btn-primary w-100'}
                                onClick={handleSubmit}>
                          {isSaving ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                      </div>
                      {/*<div className="col-12">*/}
                      {/*  <p className="small mb-0">Pas de compte ?{" "}*/}
                      {/*    <Link to={"/register/"}>Créez-en un</Link>*/}
                      {/*  </p>*/}
                      {/*</div>*/}
                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

      </div>
    </main>
  )
}

export default LoginForm