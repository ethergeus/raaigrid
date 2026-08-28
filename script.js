const switchPorts = document.querySelector('#switch-ports');
const driveArray = document.querySelector('#drive-array');

for (let index = 0; index < 24; index += 1) {
  const port = document.createElement('i');
  port.className = 'switch-port';
  switchPorts.appendChild(port);
}

for (let index = 0; index < 12; index += 1) {
  const drive = document.createElement('i');
  drive.className = 'drive-bay';
  driveArray.appendChild(drive);
}

const rackIndicators = [
  ...document.querySelectorAll('.switch-port'),
  ...document.querySelectorAll('.drive-bay'),
  ...document.querySelectorAll('.activity-lights i')
];

rackIndicators.forEach((indicator, index) => {
  if (index % 3 !== 1) indicator.classList.add('active');
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateRack() {
  rackIndicators.forEach((indicator) => {
    indicator.classList.toggle('active', Math.random() > .36);
  });
  document.querySelector('.server-display b').textContent = `${Math.floor(36 + Math.random() * 19)}%`;
}

if (!reduceMotion) {
  setInterval(updateRack, 760);
}

document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.service-card, .process-list li, .terminal-card, blockquote');
revealTargets.forEach((element) => element.classList.add('reveal'));

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('visible'));
}
