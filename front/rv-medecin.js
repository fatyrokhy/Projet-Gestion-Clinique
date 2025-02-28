document.addEventListener("DOMContentLoaded", async () => {
  const medecin = await fetcher("medecin");
  const user=JSON.parse(localStorage.getItem("user"))
  listeRv(user.login);  

  const doctor = medecin.find((med) => med["login"] == user["login"]);

  const titre=document.getElementById("titre");
  titre.textContent="Bienvenue docteur"+"  "+majuscule(doctor.prenom)+" "+ majuscule (doctor.nom);

  

});

function majuscule(lettre) {
  return lettre.charAt(0).toUpperCase() + lettre.slice(1);
}

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

async function listeRv(mail) {
  const rvMedcin = document.getElementById("rv-medcin");
  rvMedcin.innerHTML = "";

  const patient = await fetcher("patient");

  const medecin = await fetcher("medecin");

  const doctor = medecin.find((med) => med["login"] == mail);
//   console.log(doctor);

  const rv = await fetcher("rv");

  const rvDocteur = rv.filter((rv) => rv["id-medecin"] == doctor["id"]);
  console.log(rvDocteur);

  rvDocteur.forEach((rdv) => {
    const malade = patient.filter((p) => p.id == rdv["id-patient"]);
    malade.forEach((malade) => {

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-2 py-1 text-center">${malade.nom} ${malade.prenom}</td>
        <td class="px-2 py-1 text-center">${malade.login}</td>
        <td class="px-2 py-1 text-center">${rdv.date}</td>
        <td class="px-2 py-1 text-center">${rdv.heure}</td>
        <td class="px-2 py-1 text-center" id="statut">${rdv.statut}</td>
        <td class="px-2 py-1 text-center flex justify-end gap-2">
            <button class=" px-2 bg-green-600 rounded-md text-white "id="valid" >Valider</button>
            <button  class=" px-2 bg-red-600 rounded-md text-white" id="refus" >Refuser</button>
        </td>`;
      rvMedcin.appendChild(row);
      const statut = row.querySelector("#statut");
      const valid = row.querySelector("#valid");
      const refus = row.querySelector("#refus");

      valid.addEventListener("click", () => {
        rdv.statut = "VALIDER";
        valider(statut, valid, refus);
        misAjour(rdv)
      });

      refus.addEventListener("click", () => {
        rdv.statut = "REFUSER";
        refuser(statut, refus, valid);
        misAjour(rdv)
      });
    });
  });
}

function valider(statut,valid,refus) {
  statut.classList.add("text-green-600");
  statut.classList.remove("text-red-600");
  valid.classList.add("hidden");
  refus.classList.remove("hidden");
}

function misAjour(rdv) {
  fetch(`http://localhost:3000/rv`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(rdv)
}).then(response => response.json())
  .then(data => console.log("Mise à jour réussie :", data))
  .catch(error => console.error("Erreur :", error));
}

function refuser(statut, refus, valid) {
  statut.classList.add("text-red-600");
  statut.classList.remove("text-green-600");
  refus.classList.add("hidden");
  valid.classList.remove("hidden");
}
