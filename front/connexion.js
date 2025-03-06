document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    let valid = true;

    // Validation de l'email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.classList.remove("hidden");
        valid = false;
    } else {
        emailError.classList.add("hidden");
    }

    // Validation du mot de passe (minimum 4 caractères)
    if (password.length < 4) {
        passwordError.classList.remove("hidden");
        valid = false;
    } else {
        passwordError.classList.add("hidden");
    }

    if (!valid) return;

    try {
        let roles = ["medecin", "secretaire", "patient"]; // Liste des rôles à vérifier

        for (let role of roles) {
            let response = await fetch(`http://localhost:3000/${role}?email=${email}&password=${password}`);
            let users = await response.json();

            if (users.length > 0) {
                let user = users[0]; // Prend le premier utilisateur trouvé
                localStorage.setItem('user', JSON.stringify(user));

                // Redirections en fonction du rôle
                if (role === "medecin") {
                    window.location.href = "rv-medecin.html";
                } else if (role === "secretaire") {
                    window.location.href = "listeRvt.html";
                } else if (role === "patient") {
                    window.location.href = "dashboard_patient.html";
                }
                return; // Arrêter la boucle dès qu'un utilisateur est trouvé
            }
        }

        // Si aucun utilisateur trouvé, afficher un message d'erreur
        alert("Identifiants incorrects !");
        window.location.href = "./index.html";

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
});
