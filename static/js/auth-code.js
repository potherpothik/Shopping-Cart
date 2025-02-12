document.addEventListener('DOMContentLoaded', () => {

    // Check for saved user
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
        updateUIForLoggedInUser(savedUser);
    }

    // Email validation
    document.getElementById('modalRegEmail').addEventListener('input', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validationDiv = document.getElementById('modalEmailValidation');
        
        if (!emailRegex.test(email)) {
            validationDiv.textContent = 'Please enter a valid email';
            validationDiv.className = 'form-text text-danger small';
        } else {
            validationDiv.textContent = '';
        }
    });

    // Password confirmation
    document.getElementById('modalConfirmPassword').addEventListener('input', function() {
        const password = document.getElementById('modalRegPassword').value;
        const confirmPassword = this.value;
        const matchDiv = document.getElementById('modalPasswordMatch');
        
        if (password === confirmPassword) {
            matchDiv.textContent = 'Passwords match';
            matchDiv.className = 'form-text text-success small';
        } else {
            matchDiv.textContent = 'Passwords do not match';
            matchDiv.className = 'form-text text-danger small';
        }
    });

    // Handle Registration Form Submit
    document.getElementById('modalRegistrationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('modalRegPassword').value;
        const confirmPassword = document.getElementById('modalConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            fullName: document.getElementById('modalFullName').value,
            email: document.getElementById('modalRegEmail').value,
            password: password
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === userData.email)) {
            alert('Email already registered!');
            return;
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Show toast notification
        const toast = new bootstrap.Toast(document.getElementById('registrationToast'));
        toast.show();

        // Reset form and close registration modal
        e.target.reset();
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();

        // Open login modal after delay
        setTimeout(() => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }, 3000);
    });

    // Handle Login Form Submit
    document.getElementById('modalLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('modalLoginEmail').value;
        const loginPassword = document.getElementById('modalLoginPassword').value;
        const rememberMe = document.getElementById('modalRememberMe').checked;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => 
            user.email === loginEmail && 
            user.password === loginPassword
        );

        if (user) {
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            
            // Reset form and close modal
            e.target.reset();
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
            
            // Update UI for logged in state
            updateUIForLoggedInUser(user);
        } else {
            alert('Invalid email or password!');
        }
    });

    // Updated modal switching
    document.querySelector('[data-bs-target="#registerModal"]').addEventListener('click', function(e) {
        const loginModal = document.getElementById('loginModal');
        bootstrap.Modal.getInstance(loginModal)?.hide();
    });

    document.querySelector('[data-bs-target="#loginModal"]').addEventListener('click', function(e) {
        const registerModal = document.getElementById('registerModal');
        bootstrap.Modal.getInstance(registerModal)?.hide();
    });

    document.querySelector('[data-bs-target="#loginModal"]').addEventListener('click', function(e) {
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (registerModal) {
            registerModal.hide();
        }
    });
});

function updateUIForLoggedInUser(user) {
    // Get navbar list items
    const loginNavItem = document.querySelector('[data-bs-target="#loginModal"]').parentElement;
    const registerNavItem = document.querySelector('[data-bs-target="#registerModal"]').parentElement;
    
    // Create logout link with the same styling as login/register links
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.className = 'nav-link active';
    logoutLink.textContent = 'Logout';
    logoutLink.onclick = logout;
    
    // Replace login link with logout link
    loginNavItem.innerHTML = '';
    loginNavItem.appendChild(logoutLink);
    
    // Hide register link
    registerNavItem.style.display = 'none';
}

function logout() {
    localStorage.removeItem('currentUser');
    // Force reload to reset all states
    window.location.href = 'index.html';
}