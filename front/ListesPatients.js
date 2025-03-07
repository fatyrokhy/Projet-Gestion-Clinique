async function listerPatients() {
    try {
        const response = await fetch("http://localhost:3000/patient", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des patients");
        }

        const patients = await response.json();
        const listePatientsDiv = document.getElementById("listePatients");
        listePatientsDiv.innerHTML = ""; // Vider la liste avant d'afficher

        patients.forEach(patient => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="py-4 px-6 border-b">${patient.nom}</td>
                <td class="py-4 px-6 border-b">${patient.prenom}</td>
                <td class="py-4 px-6 border-b">${patient.login}</td>
            `;
            listePatientsDiv.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur:", error);
    }
}

// Appeler la fonction lorsque la page charge
window.onload = listerPatients;



        document.getElementById("btnAjouter").addEventListener("click", function() {
            document.getElementById("modalAjouter").classList.remove("hidden");
        });

        document.getElementById("btnFermer").addEventListener("click", function() {
            document.getElementById("modalAjouter").classList.add("hidden");
        });

        document.getElementById("formAjouter").addEventListener("submit", async function(event) {
            event.preventDefault();
            const nom = document.getElementById("nom").value.trim();
            const prenom = document.getElementById("prenom").value.trim();
            const login = document.getElementById("login").value.trim();

            try {
                const response = await fetch("http://localhost:3000/patient", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nom, prenom, login })
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du patient");
                }

                document.getElementById("modalAjouter").classList.add("hidden");
                listerPatients(); // Rafraîchir la liste
            } catch (error) {
                console.error("Erreur:", error);
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
        retour();