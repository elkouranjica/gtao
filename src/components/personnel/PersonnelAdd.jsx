import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Layout from "../Layout";
import {db} from '../firebase';
import {collection, addDoc} from "firebase/firestore";
import './PersonnelAdd.css'
import {getUser} from "../hooks/user.actions";


const PersonnelAdd = () => {
  const [data, setData] = useState({
    nom: '',
    prenom: '',
    sexe: '',
    matricule: '',
    date_naissance: '',
    contact: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const collectionRef = collection(db, 'employees');
  const navigate = useNavigate();
  const user = getUser();

  const handleInput = (event) => {
    if (event.target.value === '') {
      setIsValid(false)
    } else {
      let newInput = {[event.target.name]: event.target.value};
      setData({...data, ...newInput})
      verifierData();
    }
  }

  const verifierData = () => {
    const dataValide = data.nom !== '' && data.prenom !== '' && data.sexe !== '' && data.matricule !== ''
      && data.contact !== '' && data.date_naissance !== '';
    setIsValid(dataValide);
  }

  const handleSave = (event) => {
    event.preventDefault();

    setIsSaving(true);
    addDoc(collectionRef, {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      matricule: data.matricule,
      contact: data.contact,
      date_naissance: data.date_naissance,
      user: user.uid
    })
      .then(() => {
        navigate('/personnel/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <Layout>
      <div className="card p-3 col-md-6 offset-md-3 ">
        <form>
          <div className="row mb-3">
            <label htmlFor="inputText" className="col-sm-3 col-form-label">
              Nom
            </label>
            <div className="col-sm-9">
              <input name={"nom"} onChange={handleInput} type="text" className="form-control"/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputText" className="col-sm-3 col-form-label">
              Prénoms
            </label>
            <div className="col-sm-9">
              <input name={"prenom"} onChange={handleInput} type="text" className="form-control"/>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Sexe</label>
            <div className="col-sm-9">
              <select name={"sexe"} onChange={handleInput}
                      className="form-select"
                      aria-label="Default select example"
              >
                <option defaultValue={""}/>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputText" className="col-sm-3 col-form-label">
              Matricule
            </label>
            <div className="col-sm-9">
              <input name={"matricule"} onChange={handleInput} type="text" className="form-control"/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputNumber" className="col-sm-3 col-form-label">
              Contact
            </label>
            <div className="col-sm-9">
              <input name={"contact"} onChange={handleInput} type="text" className="form-control"/>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputDate" className="col-sm-3 col-form-label">
              Date de naissance
            </label>
            <div className="col-sm-9">
              <input name={"date_naissance"} onChange={handleInput} type="date" className="form-control"/>
            </div>
          </div>

          <div className="float-end">
            <button disabled={!isValid} className={isSaving ? 'btn btn-secondary disabled' : 'btn btn-primary'} onClick={handleSave} >
              {isSaving ? 'Enregistrement en cours...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PersonnelAdd;