const btn = document.getElementById('rsvpBtn');
const msg = document.getElementById('successMsg');
const card = document.getElementById('card');

btn.addEventListener('click', () => {
    btn.textContent = "Sending...";
    btn.disabled = true; 
    btn.style.opacity = "0.7";

    setTimeout(() => {
        btn.style.display = 'none'; 
        msg.style.display = 'block'; 
    }, 1500); 
});