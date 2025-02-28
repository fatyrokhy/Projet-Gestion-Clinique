//ajoutmedcin
document.getElementById("medecinForm").addEventListener("submit", async function(event) {
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
});


// AjoutRV






// async function getMedecins() {
//     const response = await fetch("http://localhost:3001/medecin");
//     const data = await response.json();
//     console.log("Liste des médecins:", data);
// }





// document.getElementById("formPatient").addEventListener("submit", function(event) {
//     event.preventDefault(); // Empêche le rechargement de la page

//     ajouterPatient(); // Appelle la fonction pour ajouter un patient
// });

// Fonction pour ajouter un patient



    // Vérification des champs avant d'envoyer la requête
    // if (!nom || !prenom || !login || !password) {
    //     messageDiv.innerHTML = "<p style='color:red;'>Veuillez remplir tous les champs !</p>";
    //     return;
    // }

    // // Création de l'objet patient
    // const newPatient = {
    //     id: Date.now().toString(), // Générer un ID unique
    //     nom: nom,
    //     prenom: prenom,
    //     login: login,
    //     password: password
    // };
    // console.log(newPatient);

    // try {
    //     const response = await fetch("http://localhost:3001/patient", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newPatient)
    //     });

    //     if (!response.ok) {
    //         throw new Error("Erreur lors de l'ajout du patient !");
    //     }

    //     const data = await response.json();
    //     console.log("Patient ajouté :", data);

    //     // Affichage d'un message de confirmation
    //     messageDiv.innerHTML = "<p style='color:green;'>Patient ajouté avec succès !</p>";

    //     // Réinitialisation du formulaire
    //     document.getElementById("formPatient").reset();
    // } catch (error) {
    //     console.error("Erreur :", error.message);
    //     messageDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
    // }
    
