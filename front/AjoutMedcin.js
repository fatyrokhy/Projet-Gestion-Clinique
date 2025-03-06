document.getElementById("medecinForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = document.getElementById("nomMedecin").value.trim();
    const prenom = document.getElementById("prenomMedecin").value.trim();
    const specialite = document.getElementById("specialiteMedecin").value.trim();
    const login = document.getElementById("loginMedecin").value.trim();
    const password = document.getElementById("passwordMedecin").value.trim();
    const messageDiv = document.getElementById("message");

    // Vérification des champs obligatoires
    if (!validateFields(nom, prenom, specialite, login, password, messageDiv)) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/medecin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, prenom, specialite, login, password })
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du médecin !");
        }

        const data = await response.json();
        console.log("Médecin ajouté:", data);

        // Affichage d'un message de succès
        messageDiv.innerHTML = "<p style='color:green;'>Médecin ajouté avec succès !</p>";

        // Réinitialisation du formulaire
        document.getElementById("medecinForm").reset();
    } catch (error) {
        console.error("Erreur:", error.message);
        messageDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
    }
});

// Fonction de validation des champs
function validateFields(nom, prenom, specialite, login, password, messageDiv) {
    if (!nom || !prenom || !specialite || !login || !password) {
        messageDiv.innerHTML = "<p style='color:red;'>Veuillez remplir tous les champs obligatoires !</p>";
        return false;
    }

    // Vérification du format du login (ex: email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login)) {
        messageDiv.innerHTML = "<p style='color:red;'>Veuillez entrer un email valide !</p>";
        return false;
    }

    // Vérification du mot de passe (au moins 6 caractères)
    if (password.length < 6) {
        messageDiv.innerHTML = "<p style='color:red;'>Le mot de passe doit contenir au moins 6 caractères !</p>";
        return false;
    }

    return true;
}
