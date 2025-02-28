document.addEventListener("DOMContentLoaded", async function () {
    let user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        alert("Utilisateur non connecté !");
        window.location.href = "connexion.html";
        return;
    }

    document.getElementById("patient-name").textContent = user.nom + " " + user.prenom;

    try {
        let response = await fetch(`http://localhost:3000/rv?id_patient=${user.id}`);
        
        let consultations = await response.json();

        let tableBody = document.getElementById("appointments-list");
        tableBody.innerHTML = ""; // Vider la liste des rendez-vous avant d'ajouter les nouvelles données

        if (consultations.length === 0) {
            tableBody.innerHTML = `<tr>
                <td colspan='4' class="text-center py-4 text-gray-500">Aucun rendez-vous trouvé.</td>
            </tr>`;
            return;
        }

        for (let consultation of consultations) {
            let medecinResponse = await fetch(`http://localhost:3000/medecin/${consultation.id_medecin}`);
            // console.log(medecinResponse);
            
            let medecin = await medecinResponse.json();
            let etatClasse = consultation.etat === "validé" 
                ? "bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold"
                : "bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold";

            let row = `<tr class="hover:bg-gray-100 transition duration-300">
                <td class="py-3 px-6 border-b">${consultation.date}</td>
                <td class="py-3 px-6 border-b">${consultation.heure}</td>
                <td class="py-3 px-6 border-b">${medecin.nom} ${medecin.prenom} <span class="text-sm text-gray-500">(${medecin.specialite})</span></td>
                <td class="py-3 px-6 border-b"><span class="${etatClasse}">${consultation.statut}</span></td>
            </tr>`;

            tableBody.innerHTML += row;
        }
    } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous :", error);
    }
});
