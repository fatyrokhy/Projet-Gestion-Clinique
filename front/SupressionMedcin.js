document.getElementById("deleteMedecinForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const medecinId = document.getElementById("medecinId").value.trim();
    const messageDiv = document.getElementById("message");

    // Vérification si l'ID est renseigné
    if (!medecinId) {
        messageDiv.innerHTML = "<p style='color:red;'>Veuillez entrer l'ID du médecin à supprimer !</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/medecin/${medecinId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Médecin introuvable !");
            } else {
                throw new Error("Erreur lors de la suppression du médecin !");
            }
        }

        const data = await response.json();
        console.log("Médecin supprimé:", data);

        // Affichage du message de succès
        messageDiv.innerHTML = "<p style='color:green;'>Médecin supprimé avec succès !</p>";

        // Réinitialisation du formulaire
        document.getElementById("deleteMedecinForm").reset();
    } catch (error) {
        console.error("Erreur:", error.message);
        messageDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
    }
});

