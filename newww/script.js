const body = document.body;
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const bookingForm = document.getElementById('bookingForm');
const toast = document.getElementById('toast');

const savedTheme = localStorage.getItem('velora-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const startTheme = savedTheme || (systemDark ? 'dark' : 'light');
body.dataset.theme = startTheme;

const sunIcon = `
	<path d="M12 3v2"/>
	<path d="M12 19v2"/>
	<path d="M4.22 4.22l1.42 1.42"/>
	<path d="M18.36 18.36l1.42 1.42"/>
	<path d="M3 12h2"/>
	<path d="M19 12h2"/>
	<path d="M4.22 19.78l1.42-1.42"/>
	<path d="M18.36 5.64l1.42-1.42"/>
	<circle cx="12" cy="12" r="4.25"/>
`;

const moonIcon = `
	<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>
`;

const syncThemeIcon = () => {
	themeIcon.innerHTML = body.dataset.theme === 'dark' ? moonIcon : sunIcon;
};

syncThemeIcon();

themeToggle.addEventListener('click', () => {
	body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
	localStorage.setItem('velora-theme', body.dataset.theme);
	syncThemeIcon();
});

menuToggle.addEventListener('click', () => {
	navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (event) => {
	if (event.target.matches('a')) {
		navLinks.classList.remove('open');
	}
});

const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in-view');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.14 });

revealTargets.forEach((target) => revealObserver.observe(target));

const particleLayer = document.querySelector('.particles');
for (let index = 0; index < 20; index += 1) {
	const particle = document.createElement('span');
	particle.className = 'particle';
	particle.style.left = `${Math.random() * 100}%`;
	particle.style.bottom = `${Math.random() * 110}%`;
	particle.style.animationDuration = `${10 + Math.random() * 16}s`;
	particle.style.animationDelay = `${Math.random() * 8}s`;
	particle.style.opacity = `${0.18 + Math.random() * 0.42}`;
	particleLayer.appendChild(particle);
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
const activeObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const id = entry.target.id;
			navAnchors.forEach((anchor) => anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`));
		}
	});
}, { threshold: 0.45, rootMargin: '-10% 0px -45% 0px' });

sections.forEach((section) => activeObserver.observe(section));

bookingForm.addEventListener('submit', (event) => {
	event.preventDefault();
	toast.classList.add('show');
	window.clearTimeout(window.toastTimer);
	window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
	bookingForm.reset();
});
