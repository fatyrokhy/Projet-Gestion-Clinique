//ppp
document.addEventListener("DOMContentLoaded", async function () {
    retour();
    try {
        const response = await fetch("http://localhost:3000/rv");
        const rendezvousList = await response.json();
        
        const tbody = document.getElementById("rendezvous-list");
        tbody.innerHTML = "";

        const promises = rendezvousList.map(async (rv) => {
            const patientPromise = fetch(`http://localhost:3000/patient/${rv.id_patient}`).then(res => res.json());
            const medecinPromise = fetch(`http://localhost:3000/medecin/${rv.id_medecin}`).then(res => res.json());

            const [patient, medecin] = await Promise.all([patientPromise, medecinPromise]);

            return `<tr class="hover:bg-indigo-100">
                <td class="px-6 py-3 text-sm font-medium text-gray-900" >${patient.nom} ${patient.prenom}</td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900">${medecin.nom} ${medecin.prenom}</td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900">${rv.date} à ${rv.heure}</td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900">${rv.statut}</td>
            </tr>`;
        });

        const rows = await Promise.all(promises);
        tbody.innerHTML = rows.join("");

    } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous:", error);
    }
});

const deconnect=document.querySelector("#logoutBtn");
deconnect.addEventListener('click',()=>{
    localStorage.removeItem("user");
    window.location.href = "index.html"; 
});
function retour() {
   const user=JSON.parse(localStorage.getItem('user')) ;
   if (!user) {
       window.location.href='index.html';
   }
}
