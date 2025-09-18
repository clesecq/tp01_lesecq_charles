document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');
    const recap = document.getElementById('recap');

    function validateEmail(email) {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        const login = form.login.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const nom = form.nom.value.trim();
        const prenom = form.prenom.value.trim();
        const adresse = form.adresse.value.trim();
        const email = form.email.value.trim();
        const telephone = form.telephone.value.trim();
        const dateNaissance = form.dateNaissance.value;

        // Vérification des champs requis
        if (!login || !password || !confirmPassword || !nom || !prenom || !adresse || !email || !telephone || !dateNaissance) {
            errorMessage.textContent = 'Veuillez remplir tous les champs.';
            errorMessage.style.display = 'block';
            return;
        }

        // Vérification de l'email
        if (!validateEmail(email)) {
            errorMessage.textContent = 'Veuillez saisir une adresse email valide.';
            errorMessage.style.display = 'block';
            return;
        }

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Les mots de passe ne correspondent pas.';
            errorMessage.style.display = 'block';
            return;
        }

        // Si tout est correct, afficher la page récapitulative
        form.style.display = 'none';
        recap.style.display = 'block';
        recap.innerHTML = `
            <h2>Récapitulatif de l'inscription</h2>
            <ul>
                <li><strong>Login :</strong> ${login}</li>
                <li><strong>Nom :</strong> ${nom}</li>
                <li><strong>Prénom :</strong> ${prenom}</li>
                <li><strong>Adresse :</strong> ${adresse}</li>
                <li><strong>Email :</strong> ${email}</li>
                <li><strong>Téléphone :</strong> ${telephone}</li>
                <li><strong>Date de naissance :</strong> ${dateNaissance}</li>
            </ul>
        `;
    });
});
