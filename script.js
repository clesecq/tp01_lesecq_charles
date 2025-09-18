// DOM elements
const form = document.getElementById('registration-form');
const formContainer = document.getElementById('form-container');
const summaryContainer = document.getElementById('summary-container');

// Form fields
const fields = {
    login: document.getElementById('login'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirm-password'),
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    address: document.getElementById('address'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    birthdate: document.getElementById('birthdate')
};

// Error message elements
const errorElements = {
    login: document.getElementById('login-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirm-password-error'),
    firstname: document.getElementById('firstname-error'),
    lastname: document.getElementById('lastname-error'),
    address: document.getElementById('address-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    birthdate: document.getElementById('birthdate-error')
};

// Summary elements
const summaryElements = {
    login: document.getElementById('summary-login'),
    firstname: document.getElementById('summary-firstname'),
    lastname: document.getElementById('summary-lastname'),
    address: document.getElementById('summary-address'),
    email: document.getElementById('summary-email'),
    phone: document.getElementById('summary-phone'),
    birthdate: document.getElementById('summary-birthdate')
};

// Validation functions
function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        return `Le champ ${fieldName} est obligatoire.`;
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Veuillez entrer une adresse email valide.';
    }
    return '';
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\.\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return 'Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres).';
    }
    return '';
}

function validatePassword(password) {
    if (password.length < 6) {
        return 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    return '';
}

function validatePasswordConfirmation(password, confirmPassword) {
    if (password !== confirmPassword) {
        return 'Les mots de passe ne correspondent pas.';
    }
    return '';
}

function validateBirthdate(birthdate) {
    if (!birthdate) {
        return 'La date de naissance est obligatoire.';
    }
    
    const selectedDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    
    if (selectedDate > today) {
        return 'La date de naissance ne peut pas être dans le futur.';
    }
    
    if (age < 13) {
        return 'Vous devez avoir au moins 13 ans pour vous inscrire.';
    }
    
    if (age > 120) {
        return 'Veuillez entrer une date de naissance valide.';
    }
    
    return '';
}

// Clear error message and styling
function clearError(fieldName) {
    const errorElement = errorElements[fieldName];
    const fieldElement = fields[fieldName];
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    if (fieldElement) {
        fieldElement.parentElement.classList.remove('error');
    }
}

// Display error message and styling
function showError(fieldName, message) {
    const errorElement = errorElements[fieldName];
    const fieldElement = fields[fieldName];
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (fieldElement) {
        fieldElement.parentElement.classList.add('error');
    }
}

// Validate individual field
function validateField(fieldName) {
    const field = fields[fieldName];
    const value = field.value.trim();
    let errorMessage = '';
    
    clearError(fieldName);
    
    switch (fieldName) {
        case 'login':
            errorMessage = validateRequired(value, 'Login');
            if (!errorMessage && value.length < 3) {
                errorMessage = 'Le login doit contenir au moins 3 caractères.';
            }
            break;
            
        case 'password':
            errorMessage = validateRequired(value, 'Mot de passe');
            if (!errorMessage) {
                errorMessage = validatePassword(value);
            }
            break;
            
        case 'confirmPassword':
            errorMessage = validateRequired(value, 'Confirmation du mot de passe');
            if (!errorMessage) {
                errorMessage = validatePasswordConfirmation(fields.password.value, value);
            }
            break;
            
        case 'firstname':
            errorMessage = validateRequired(value, 'Prénom');
            break;
            
        case 'lastname':
            errorMessage = validateRequired(value, 'Nom');
            break;
            
        case 'address':
            errorMessage = validateRequired(value, 'Adresse');
            break;
            
        case 'email':
            errorMessage = validateRequired(value, 'Email');
            if (!errorMessage) {
                errorMessage = validateEmail(value);
            }
            break;
            
        case 'phone':
            errorMessage = validateRequired(value, 'Téléphone');
            if (!errorMessage) {
                errorMessage = validatePhone(value);
            }
            break;
            
        case 'birthdate':
            errorMessage = validateRequired(value, 'Date de naissance');
            if (!errorMessage) {
                errorMessage = validateBirthdate(value);
            }
            break;
    }
    
    if (errorMessage) {
        showError(fieldName, errorMessage);
        return false;
    }
    
    return true;
}

// Validate all fields
function validateForm() {
    let isValid = true;
    
    // Validate all fields
    Object.keys(fields).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show summary with form data
function showSummary() {
    // Fill summary with form data (excluding password)
    summaryElements.login.textContent = fields.login.value;
    summaryElements.firstname.textContent = fields.firstname.value;
    summaryElements.lastname.textContent = fields.lastname.value;
    summaryElements.address.textContent = fields.address.value;
    summaryElements.email.textContent = fields.email.value;
    summaryElements.phone.textContent = fields.phone.value;
    
    // Format birthdate
    const birthdate = new Date(fields.birthdate.value);
    summaryElements.birthdate.textContent = birthdate.toLocaleDateString('fr-FR');
    
    // Hide form and show summary
    formContainer.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
}

// Show form (hide summary)
function showForm() {
    formContainer.classList.remove('hidden');
    summaryContainer.classList.add('hidden');
}

// Real-time validation for password confirmation
fields.confirmPassword.addEventListener('input', function() {
    if (this.value && fields.password.value) {
        validateField('confirmPassword');
    }
});

// Real-time validation for password
fields.password.addEventListener('input', function() {
    if (fields.confirmPassword.value) {
        validateField('confirmPassword');
    }
});

// Real-time validation for email
fields.email.addEventListener('blur', function() {
    if (this.value) {
        validateField('email');
    }
});

// Real-time validation for phone
fields.phone.addEventListener('blur', function() {
    if (this.value) {
        validateField('phone');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
        // Show summary
        showSummary();
    } else {
        // Focus on first error field
        const firstErrorField = document.querySelector('.error input, .error textarea');
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
});

// Clear errors when user starts typing
Object.keys(fields).forEach(fieldName => {
    fields[fieldName].addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            clearError(fieldName);
        }
    });
});

// Make showForm function globally available for the back button
window.showForm = showForm;