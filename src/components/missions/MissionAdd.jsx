import React, {useState} from "react";
import Layout from "../Layout";
import {useNavigate} from "react-router-dom";
import {getUser} from "../hooks/user.actions";
import {db} from '../firebase';
import {collection, addDoc} from "firebase/firestore";

const MissionAdd = () => {
  const [data, setData] = useState({
    matricule: '',
    depart: '',
    retour: '',
    motif: '',
    lieu: '',
    mode_transport: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const collectionRef = collection(db, 'missions');
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
    const dataValide = data.matricule !== '' && data.depart !== '' && data.retour !== '' && data.motif !== ''
      && data.lieu !== '' && data.mode_transport !== '';
    setIsValid(dataValide);
  }

  const handleSave = (event) => {
    event.preventDefault();

    setIsSaving(true);
    addDoc(collectionRef, {
      matricule: data.matricule,
      depart: data.depart,
      retour: data.retour,
      motif: data.motif,
      lieu: data.lieu,
      mode_transport: data.mode_transport,
      user: user.uid
    })
      .then(() => {
        navigate('/missions/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <>
      <Layout>
        <div className="card p-3 col-md-6 offset-md-3 ">
          <form>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-3 col-form-label">
                Matricule
              </label>
              <div className="col-sm-9">
                <input onChange={handleInput} type="text" className="form-control" name={"matricule"}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-3 col-form-label">
                Motif
              </label>
              <div className="col-sm-9">
                <input onChange={handleInput} type="text" className="form-control" name={"motif"}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputDate" className="col-sm-3 col-form-label">
                Date de départ
              </label>
              <div className="col-sm-9">
                <input onChange={handleInput} type="date" className="form-control" name={"depart"}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputDate" className="col-sm-3 col-form-label">
                Date de retour
              </label>
              <div className="col-sm-9">
                <input onChange={handleInput} type="date" className="form-control" name={"retour"}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-3 col-form-label">
                Lieu
              </label>
              <div className="col-sm-9">
                <input onChange={handleInput} type="text" className="form-control" name={"lieu"}/>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Mode de transport</label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name={"mode_transport"}
                  onChange={handleInput}
                >
                  <option defaultValue={""}/>
                  <option value="terrestre">Voie terrestre</option>
                  <option value="aérienne">Voie aérienne</option>
                </select>
              </div>
            </div>

            <div className="float-end">
              <button disabled={!isValid} className={isSaving ? 'btn btn-secondary disabled' : 'btn btn-primary'}
                      onClick={handleSave}>
                {isSaving ? 'Enregistrement en cours...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default MissionAdd;
