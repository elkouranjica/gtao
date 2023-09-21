import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from "simple-datatables";
import {Link} from "react-router-dom";
import {db} from '../firebase';
import {collection, onSnapshot} from "firebase/firestore";


const PersonnelList = () => {
    const tableRef = useRef(null);
    const collectionRef = collection(db, 'employees');
    useEffect(() => {
      onSnapshot(collectionRef, (data) => {
        const emp = data.docs.map((item) => {
          return {...item.data(), id: item.id}
        });
        if (tableRef.current) {
          // Créez le tableau de données une fois que le composant est monté
          new DataTable(tableRef.current, {
            // Configuration de SimpleDatatables (par exemple, trier par la première colonne)
            sortable: true,
            data: {
              headings: ["Matricule", "Nom", "Prénom(s)", "Contact"],
              data: emp.map((item) => [item.matricule, item.nom, item.prenom, item.contact])
            },
            // Activer la pagination
            pagination: true,
            perPage: 10,
          });
        }
      })
    }, []);

    return (
      <div className="card p-3">
        <div className="d-flex justify-content-between">
          <h1>Liste du personnel de la DGFS</h1>
          <div>
            <Link to={"/personnel/add/"} className="btn btn-success">Ajouter</Link>
          </div>
        </div>

        <div>
          <table className="table datatable" ref={tableRef}>
            <tbody>
            <tr className={"spinner-border text-primary"}>
              <td className="visually-hidden">Loading...</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
;

export default PersonnelList;