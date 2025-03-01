document.addEventListener("DOMContentLoaded", async () => {
    const user=JSON.parse(localStorage.getItem("user"))
   medecin = await fetcher("medecin");
   listeMedcin(medecin); 
   
   const form=document.getElementById("medecinForm")
   form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = document.getElementById("nomMedecin").value;
    const prenom = document.getElementById("prenomMedecin").value;
    const specialite = document.getElementById("specialiteMedecin").value;
    const login = document.getElementById("loginMedecin").value;
    const password = document.getElementById("passwordMedecin").value;

    const response = await fetch("http://localhost:3000/medecin", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, specialite, login, password })
    });

    const data = await response.json();
    console.log("Médecin ajouté:", data);
    suppopup()
});

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
 
function popup() {
  const form_medecin=document.querySelector("#form_medecin");
  form_medecin.classList.remove("hidden");
  const contenu=document.querySelector("#contenu");
  contenu.classList.add("bg-black opacity-50");
}
function suppopup() {
  const form_medecin=document.querySelector("#form_medecin");
  form_medecin.classList.add("hidden");
  const contenu=document.querySelector("#contenu");
  contenu.classList.remove("bg-black opacity-50");
}

async function listeMedcin(medecin) {

  const listeMedcin = document.getElementById("liste-medecin");
  listeMedcin.innerHTML = "";

  medecin.forEach((med) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-2 py-1 text-center">${med.nom} </td>
        <td class="px-2 py-1 text-center">${med.prenom}</td>
        <td class="px-2 py-1 text-center">${med.specialite}</td>
        <td class="px-2 py-1 text-center">${med.login}</td>
        <td class="px-2 py-1 text-center flex justify-end gap-2">
            <button class=" px-2 bg-green-600 rounded-md text-white "id="valid" >bouton</button>
        </td>`;
      listeMedcin.appendChild(row);
  });
}
