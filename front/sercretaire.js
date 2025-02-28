// Fonction pour afficher une section et masquer les autres
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';  // Masquer toutes les sections
    });
    document.getElementById(sectionId).style.display = 'block';  // Afficher la section demandée
}

// Charger les données à l'ouverture de la page
document.addEventListener("DOMContentLoaded", function() {
    showSection('ajout_rv');  // Afficher une section par défaut
});
