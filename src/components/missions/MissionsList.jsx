import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {DataTable} from "simple-datatables";
import {db} from '../firebase';
import {collection, onSnapshot} from "firebase/firestore";

const MissionsList = () => {
  const tableRef = useRef(null);
  const collectionRef = collection(db, 'missions');
  useEffect(() => {
    onSnapshot(collectionRef, (data) => {
      const missions = data.docs.map((item) => {
        return {...item.data(), id: item.id}
      });
      if (tableRef.current) {
        // Créez le tableau de données une fois que le composant est monté
        new DataTable(tableRef.current, {
          // Configuration de SimpleDatatables (par exemple, trier par la première colonne)
          sortable: true,
          data: {
            headings: ["Matricule", "Date de départ", "Date de retour", "Motif", "Lieu", "Mode de transport"],
            data: missions.map((item) => [item.matricule, item.depart, item.retour, item.motif, item.lieu,
              item.mode_transport])
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
        <h1>Liste des missions</h1>
        <div>
          <Link to={"/mission-add/"} className="btn btn-success">Mission</Link>
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
  );
};

export default MissionsList;
