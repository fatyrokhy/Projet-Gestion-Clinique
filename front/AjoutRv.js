// Fonction pour ouvrir et fermer les modals
function openModal(formId) {
    document.getElementById(formId).classList.remove('hidden');
}

function closeModal(formId) {
    document.getElementById(formId).classList.add('hidden');
}

// Charger les patients et médecins dans les selects
function chargerPatientsEtMedecins() {
    const patientSelect = document.getElementById('patient_rv');
    const medecinSelect = document.getElementById('medecin_rv');

    // Vide les anciennes options avant de remplir
    patientSelect.innerHTML = '<option value="">Sélectionner un patient</option>';
    medecinSelect.innerHTML = '<option value="">Sélectionner un médecin</option>';

    // Charger les patients
    fetch('http://localhost:3000/patient')
        .then(response => response.json())
        .then(data => {
            data.forEach(patient => {
                let option = document.createElement('option');
                option.value = patient.id;
                option.textContent = `${patient.nom} ${patient.prenom}`;
                patientSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur chargement patients:', error));

    // Charger les médecins
    fetch('http://localhost:3000/medecin')
        .then(response => response.json())
        .then(data => {
            data.forEach(medecin => {
                let option = document.createElement('option');
                option.value = medecin.id;
                option.textContent = `${medecin.nom} ${medecin.prenom} - ${medecin.specialite}`;
                medecinSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur chargement médecins:', error));
}

// Fonction pour ajouter un rendez-vous
function ajouterRendezvous(event) {
    event.preventDefault();

    // Récupérer les valeurs des champs
    const patientId = document.getElementById('patient_rv').value;
    const medecinId = document.getElementById('medecin_rv').value;
    const date = document.getElementById('date_rv').value;
    const heure = document.getElementById('heure_rv').value;

    // Réinitialiser les messages d'erreur
    document.getElementById('patient_error').classList.add('hidden');
    document.getElementById('medecin_error').classList.add('hidden');
    document.getElementById('date_error').classList.add('hidden');
    document.getElementById('heure_error').classList.add('hidden');

    let isValid = true;

    // Validation des champs
    if (!patientId) {
        document.getElementById('patient_error').classList.remove('hidden');
        isValid = false;
    }

    if (!medecinId) {
        document.getElementById('medecin_error').classList.remove('hidden');
        isValid = false;
    }

    if (!date) {
        document.getElementById('date_error').classList.remove('hidden');
        isValid = false;
    }
    if (!heure) {
        document.getElementById('heure_error').classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) {
        return; // Si un champ est invalide, arrêter l'exécution
    }

    // Préparer les données pour l'envoi
    const consultations = {
        id_patient: patientId,
        id_medecin: medecinId,
        date: date,
        heure: heure,
        statut: "en_cours"
    };

 
    // Envoyer la requête POST pour ajouter le rendez-vous
    fetch('http://localhost:3000/rv', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultations)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Rendez-vous ajouté:', data);

        // Réinitialisation du formulaire
        document.getElementById('patient_rv').value = '';
        document.getElementById('medecin_rv').value = '';
        document.getElementById('date_rv').value = '';

        // Fermer le modal après soumission
        closeModal('modal-rendezvous');
        
        // Afficher un message de succès
        alert('Rendez-vous ajouté avec succès !');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("Une erreur s'est produite lors de l'ajout du rendez-vous.");
    })
    .finally(() => {
        // Cacher le message de chargement
        document.getElementById('loading-message').classList.add('hidden');
    });
}

// Charger les données au chargement de la page
document.addEventListener('DOMContentLoaded', chargerPatientsEtMedecins);
