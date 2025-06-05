const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => observer.observe(section));

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, message })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        form.reset();
      } else {
        alert(result.error || 'Erreur lors de l\'envoi.');
      }
    } catch (error) {
      alert('Erreur réseau ou serveur.');
      console.error(error);
    }
  });
});
