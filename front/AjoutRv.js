document.getElementById("formRdv").addEventListener("submit", async function(event) {
    event.preventDefault();

    const idPatient = document.getElementById("idPatient").value;
    const idMedecin = document.getElementById("idMedecin").value;
    const date = document.getElementById("dateRdv").value;
    const heure = document.getElementById("heureRdv").value;

    const response = await fetch("http://localhost:3000/rv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idMedecin, idPatient, date, heure })
    });

    const data = await response.json();
    console.log("Rendez-vous pris:", data);
});