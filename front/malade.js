// import {fetcher} from './rv-medecin.js';
document.addEventListener("DOMContentLoaded", async () => {
    const medecin = await fetcher("medecin");
    const user=JSON.parse(localStorage.getItem("user"))
    listePatient(user.login);  
});  

async function fetcher(cle) {
    try {
        const reponse = await fetch(`http://localhost:3000/${cle}`);
        const donne = await reponse.json();
        return donne; 
    } catch (error) {
        console.error("Erreur lors du fetch :", error); 
        return null; 
    }
 
}

async function listePatient(mail) {
    const rvPatient = document.getElementById("rv-list");
    rvPatient.innerHTML = "";
  
    const patient = await fetcher("patient");
  
    const medecin = await fetcher("medecin");
  
    const soufrant = patient.find((pa) => pa["login"] == mail);
    console.log(soufrant);
  
    const rv = await fetcher("rv");
  
    const rvMalade = rv.filter((rv) => rv["id_patient"] == soufrant["id"]);
    console.log(rvMalade);
  
    rvMalade.forEach((rdv) => {
      const docteur = medecin.filter((med) => med.id == rdv["id_medecin"]);
      docteur.forEach((malade) => {
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="px-8 py-1 ">${rdv.date}</td>
          <td class="px-8 py-1 ">${rdv.heure}</td>
          <td class="px-8 py-1 ">${malade.nom} ${malade.prenom}(${malade.specialite})</td>
          <td class="px-8 py-1 " id="statut">${rdv.statut}</td>
          `;
        rvPatient.appendChild(row);
        });
    });
  }
  