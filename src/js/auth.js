// Obsidian Side-Publish Auth Logic

const CREDENTIALS = {
    username: 'amedin',
    password: 'calmingsnakes'
};

const AUTH_KEY = 'obsidian_auth_token';

// On page load, check if already authenticated
document.addEventListener('DOMContentLoaded', () => {
    // If on dashboard and not auth'd, redirect to login
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        if (!isAuthenticated()) {
            window.location.href = '/';
        }
    }

    // If on login page and already auth'd, redirect to dashboard
    if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && isAuthenticated()) {
        window.location.href = '/dashboard.html';
    }

    // Attach login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

/**
 * Handle login form submission
 */
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('error');

    // Clear previous error
    errorEl.textContent = '';

    // Validate credentials
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        // Set auth token in sessionStorage
        const token = btoa(`${username}:${Date.now()}`); // Simple token
        sessionStorage.setItem(AUTH_KEY, token);

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 300);
    } else {
        // Show error
        errorEl.textContent = 'Usuario o contraseña inválida';
        document.getElementById('password').value = '';

        // Shake animation already in CSS
        errorEl.classList.add('shake');
        setTimeout(() => {
            errorEl.classList.remove('shake');
        }, 300);
    }
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return !!sessionStorage.getItem(AUTH_KEY);
}

/**
 * Logout user
 */
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = '/';
}

/**
 * Get current auth token
 */
function getAuthToken() {
    return sessionStorage.getItem(AUTH_KEY);
}
