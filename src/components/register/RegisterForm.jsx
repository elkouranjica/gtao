import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  let auth = getAuth();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleInput = (event) => {
    let newInput = {[event.target.name]: event.target.value};
    setData({...data, ...newInput});
  }

  const createUser = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setIsSaving(false);
        navigate('/login/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (verifierPassword(data)) {
      setIsSaving(true);
      createUser();
    }
  }

  const verifierPassword = (data) => {
    return data['password'] === data['password_confirm']
  }

  return (
    <main>
      <div className="container">

        <section
          className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt=""/>
                    <span className="d-none d-lg-block">DGFS</span>
                  </a>
                </div>

                <div className="card mb-3">

                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Créer un compte</h5>
                      <p className="text-center small">Entrez votre email</p>
                    </div>

                    <form className="row g-3">

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input onChange={(event) => handleInput(event)} type="email" name="email"
                                 className="form-control" id="yourUsername" required/>
                          <div className="invalid-feedback">Please enter your email.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Mot de passe</label>
                        <input onChange={(event) => handleInput(event)} type="password" name="password"
                               className="form-control" id="password" required/>
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Confirmer le mot de passe</label>
                        <input onChange={(event) => handleInput(event)} type="password" name="password_confirm"
                               className="form-control" id="confirmPassword" required/>
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <button className={isSaving ? 'btn btn-secondary w-100 disabled' : 'btn btn-primary w-100'}
                                onClick={handleSave}>
                          {isSaving ? 'Création en cours...' : 'Créer mon compte'}
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Vous avez déjà un compte !{" "}
                          <Link to={"/login/"}>Se connecter</Link></p>
                      </div>
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

export default RegisterForm