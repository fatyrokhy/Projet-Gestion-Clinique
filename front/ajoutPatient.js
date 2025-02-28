document.getElementById("formPatient").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = document.getElementById("nomPatient").value.trim();
    const prenom = document.getElementById("prenomPatient").value.trim();
    const login = document.getElementById("loginPatient").value.trim();
    const password = document.getElementById("passwordPatient").value.trim();
    // const messageDiv = document.getElementById("messagePatient");




    const response = await fetch("http://localhost:3000/patient", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom,  login, password })
    });

    const data = await response.json();
    console.log("Médecin ajouté:", data);
});