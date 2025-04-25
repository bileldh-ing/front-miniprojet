

//<!-- JavaScript -->
    // Language Switcher
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            // Here you would implement the actual language change
            console.log('Language changed to: ' + this.getAttribute('data-lang'));
        });
    });
    
    // Voice Search
    const voiceSearchButton = document.querySelector('.voice-search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (voiceSearchButton && searchInput) {
        voiceSearchButton.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.lang = 'fr-FR';
                
                voiceSearchButton.classList.add('listening');
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    searchInput.value = transcript;
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.onerror = function() {
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.onend = function() {
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.start();
            } else {
                alert('La reconnaissance vocale n\'est pas prise en charge par votre navigateur.');
            }
        });
    }
    
    // Search tags
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.search-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            searchInput.value = this.textContent;
        });
    });
    
    // Parallax Effect
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed') || 0.05);
            const offsetX = (x - 0.5) * speed * 100;
            const offsetY = (y - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
// Main title typing effect
const mainTitles = [
"Gérez vos projets de fin d'études avec excellence",
"Optimisez votre gestion académique", 
"Simplifiez le suivi des PFE"
];
let mainTitleIndex = 0;
let mainTitleCharIndex = 0;
let isMainDeleting = false;
const typingSpeed = 100;
const pauseBetween = 2000;

function typeMainTitle() {
const currentTitle = mainTitles[mainTitleIndex];
const mainTitleElement = document.getElementById('main-title');
const containerWidth = mainTitleElement.parentElement.offsetWidth;

// Calculate when to break to new line (at 50% of container width)
const maxCharsPerLine = Math.floor(containerWidth / (parseInt(getComputedStyle(mainTitleElement).fontSize) * 0.6));

if (isMainDeleting) {
mainTitleElement.textContent = currentTitle.substring(0, mainTitleCharIndex - 1);
mainTitleCharIndex--;
} else {
let displayText = currentTitle.substring(0, mainTitleCharIndex + 1);

// Insert line breaks when needed
if (mainTitleCharIndex > maxCharsPerLine) {
  const lastSpace = displayText.lastIndexOf(' ', maxCharsPerLine);
  if (lastSpace > 0) {
    displayText = displayText.substring(0, lastSpace) + '\n' + displayText.substring(lastSpace + 1);
  }
}

mainTitleElement.textContent = displayText;
mainTitleCharIndex++;
}

if (!isMainDeleting && mainTitleCharIndex === currentTitle.length) {
isMainDeleting = true;
setTimeout(typeMainTitle, pauseBetween);
} else if (isMainDeleting && mainTitleCharIndex === 0) {
isMainDeleting = false;
mainTitleIndex = (mainTitleIndex + 1) % mainTitles.length;
setTimeout(typeMainTitle, typingSpeed/2);
} else {
setTimeout(typeMainTitle, isMainDeleting ? typingSpeed/2 : typingSpeed);
}
}

// Initialize effects when DOM loads
document.addEventListener('DOMContentLoaded', () => {
// Make sure CSS is set up for wrapping
const style = document.createElement('style');
style.textContent = `
#main-title {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
`;
document.head.appendChild(style);

// Start typing effect
setTimeout(typeMainTitle, 1000);

// Make spline interactive
const splineIframe = document.querySelector('.spline-background');
splineIframe.style.pointerEvents = 'auto';

// Add click handler for réclamation button
document.querySelector('.btn-reclamation').addEventListener('click', function() {
console.log('Réclamation button clicked');
});

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
slidesPerView: 1,
spaceBetween: 30,
pagination: {
  el: ".swiper-pagination",
  clickable: true,
},
breakpoints: {
  768: {
    slidesPerView: 2,
  },
  992: {
    slidesPerView: 3,
  }
}
});
});







// Reclamation Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const complaintModal = document.getElementById('complaintModal');
    const btnReclamation = document.querySelector('.btn-reclamation');
    const complaintModalClose = document.getElementById('complaintModalClose');
    const complaintForm = document.getElementById('complaintForm');

    // Open modal when reclamation button is clicked
    btnReclamation.addEventListener('click', function(e) {
        e.preventDefault();
        complaintModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when X button is clicked
    complaintModalClose.addEventListener('click', function() {
        complaintModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the modal content
    complaintModal.addEventListener('click', function(e) {
        if (e.target === complaintModal) {
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('complaintName').value;
            const email = document.getElementById('complaintEmail').value;
            const type = document.getElementById('complaintType').value;
            const message = document.getElementById('complaintMessage').value;
            
            // Here you would typically send the data to a server
            console.log('Reclamation submitted:', { name, email, type, message });
            
            // Show success message (you can customize this)
            alert('Votre réclamation a été soumise avec succès!');
            
            // Close the modal
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset the form
            complaintForm.reset();
        });
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && complaintModal.style.display === 'flex') {
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
     // DOM Elements
  const tags = document.querySelectorAll('.tag');
  const cardsContainer = document.getElementById('cardsContainer');
  const placeholder = document.getElementById('placeholder');
  const resultCount = document.getElementById('resultCount');
  const voiceBtn = document.getElementById('voiceSearchBtn');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const yearFilter = document.getElementById('yearFilter');
  const teacherFilter = document.getElementById('teacherFilter');
  const cardTemplate = document.getElementById('pfeCardTemplate');
  
  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      filterProjects();
    };
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
      voiceBtn.classList.remove('active');
    };
    
    recognition.onend = function() {
      voiceBtn.classList.remove('active');
    };
  }
  
  // Domain icons and colors
  const domainIcons = {
    ai: '<i class="fas fa-robot"></i>',
    web: '<i class="fas fa-globe"></i>',
    mobile: '<i class="fas fa-mobile-alt"></i>',
    iot: '<i class="fas fa-network-wired"></i>',
    security: '<i class="fas fa-shield-alt"></i>',
    default: '<i class="fas fa-file-alt"></i>'
  };
  
  const domainColors = {
    ai: '#3b82f6',
    web: '#10b981',
    mobile: '#f59e0b',
    iot: '#8b5cf6',
    security: '#ef4444',
    default: '#9ca3af'
  };
  
  // Sample PFE data
  const pfeData = {
    all: [
      { id: 1, title: "Système de recommandation IA", student: "Ahmed Ben Salah", supervisor: "Dr. Kamel Hamrouni", year: "2023", domain: "ai", abstract: "Développement d'un système de recommandation intelligent pour les plateformes e-commerce." },
      { id: 2, title: "Application mobile de santé", student: "Sara Mejri", supervisor: "Dr. Nabil Tabbane", year: "2023", domain: "mobile", abstract: "Application iOS/Android pour le suivi des patients atteints de maladies chroniques." },
      { id: 3, title: "Plateforme e-learning", student: "Mohamed Ali", supervisor: "Dr. Sami Ben Amor", year: "2022", domain: "web", abstract: "Plateforme d'apprentissage en ligne avec intégration de réalité augmentée." },
      { id: 4, title: "Système domotique intelligent", student: "Karim Ben Mohamed", supervisor: "Dr. Ali Toumi", year: "2022", domain: "iot", abstract: "Contrôle centralisé des appareils domestiques via interface web." },
      { id: 5, title: "Détection d'intrusion", student: "Amira Chaabouni", supervisor: "Dr. Salem Hasnaoui", year: "2023", domain: "security", abstract: "Système de détection d'anomalies dans les réseaux informatiques." },
      { id: 6, title: "Analyse prédictive", student: "Houssem Ben Fraj", supervisor: "Dr. Ines Ben Jaafar", year: "2022", domain: "data", abstract: "Modélisation prédictive des performances des étudiants." },
      { id: 7, title: "Chatbot intelligent", student: "Fatma Karray", supervisor: "Dr. Leila Jemni", year: "2022", domain: "ai", abstract: "Implémentation d'un chatbot conversationnel utilisant le NLP." },
      { id: 8, title: "Marketplace universitaire", student: "Youssef Ben Ahmed", supervisor: "Dr. Houda Benbrahim", year: "2021", domain: "web", abstract: "Plateforme de vente de matériel pédagogique entre étudiants." }
    ],
    ai: [
      { id: 1, title: "Système de recommandation IA", student: "Ahmed Ben Salah", supervisor: "Dr. Kamel Hamrouni", year: "2023", domain: "ai", abstract: "Développement d'un système de recommandation intelligent pour les plateformes e-commerce." },
      { id: 7, title: "Chatbot intelligent", student: "Fatma Karray", supervisor: "Dr. Leila Jemni", year: "2022", domain: "ai", abstract: "Implémentation d'un chatbot conversationnel utilisant le NLP." }
    ],
    web: [
      { id: 3, title: "Plateforme e-learning", student: "Mohamed Ali", supervisor: "Dr. Sami Ben Amor", year: "2022", domain: "web", abstract: "Plateforme d'apprentissage en ligne avec intégration de réalité augmentée." },
      { id: 8, title: "Marketplace universitaire", student: "Youssef Ben Ahmed", supervisor: "Dr. Houda Benbrahim", year: "2021", domain: "web", abstract: "Plateforme de vente de matériel pédagogique entre étudiants." }
    ],
    mobile: [
      { id: 2, title: "Application mobile de santé", student: "Sara Mejri", supervisor: "Dr. Nabil Tabbane", year: "2023", domain: "mobile", abstract: "Application iOS/Android pour le suivi des patients atteints de maladies chroniques." }
    ],
    iot: [
      { id: 4, title: "Système domotique intelligent", student: "Karim Ben Mohamed", supervisor: "Dr. Ali Toumi", year: "2022", domain: "iot", abstract: "Contrôle centralisé des appareils domestiques via interface web." }
    ],
    security: [
      { id: 5, title: "Détection d'intrusion", student: "Amira Chaabouni", supervisor: "Dr. Salem Hasnaoui", year: "2023", domain: "security", abstract: "Système de détection d'anomalies dans les réseaux informatiques." }
    ]
  };
  
  // Current filter state
  let currentFilters = {
    category: 'all',
    year: 'all',
    teacher: 'all',
    searchQuery: ''
  };
  
  // Function to filter projects based on all criteria
  function filterProjects() {
    let filteredProjects = [...pfeData[currentFilters.category] || [...pfeData.all]];
    
    // Apply year filter
    if (currentFilters.year !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.year === currentFilters.year);
    }
    
    // Apply teacher filter
    if (currentFilters.teacher !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.supervisor === currentFilters.teacher);
    }
    
    // Apply search query
    if (currentFilters.searchQuery) {
      const query = currentFilters.searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.student.toLowerCase().includes(query) ||
        project.supervisor.toLowerCase().includes(query) ||
        project.abstract.toLowerCase().includes(query)
      );
    }
    
    renderCards(filteredProjects);
  }
  
  // Function to render PFE cards
  function renderCards(projects) {
    // Clear existing cards
    cardsContainer.innerHTML = '';
    
    if (projects.length === 0) {
      placeholder.style.display = 'flex';
      resultCount.textContent = '(0)';
      return;
    }
    
    // Hide placeholder and show cards
    placeholder.style.display = 'none';
    resultCount.textContent = `(${projects.length})`;
    
    // Create and append cards
    projects.forEach(project => {
      const card = cardTemplate.content.cloneNode(true);
      
      // Set card content
      const icon = card.querySelector('.card-icon');
      icon.innerHTML = domainIcons[project.domain] || domainIcons.default;
      icon.style.backgroundColor = domainColors[project.domain] || domainColors.default;
      
      card.querySelector('.card-title').textContent = project.title;
      card.querySelector('.card-domain').textContent = project.domain.toUpperCase();
      card.querySelector('.student').textContent = project.student;
      card.querySelector('.supervisor').textContent = project.supervisor;
      card.querySelector('.year').textContent = project.year;
      card.querySelector('.card-abstract').textContent = project.abstract;
      
      cardsContainer.appendChild(card);
    });
  }
  
  // Handle tag clicks
  tags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Update active state
      tags.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update filter and refresh
      currentFilters.category = this.dataset.category;
      filterProjects();
    });
  });
  
  // Handle search input
  searchBtn.addEventListener('click', function() {
    currentFilters.searchQuery = searchInput.value.trim();
    filterProjects();
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      currentFilters.searchQuery = searchInput.value.trim();
      filterProjects();
    }
  });
  
  // Handle voice search button
  voiceBtn.addEventListener('click', function() {
    if (!recognition) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur");
      return;
    }
    
    if (this.classList.contains('active')) {
      recognition.stop();
      this.classList.remove('active');
    } else {
      try {
        recognition.start();
        this.classList.add('active');
        searchInput.placeholder = "Écoute...";
      } catch (e) {
        console.error('Speech recognition error:', e);
        this.classList.remove('active');
        searchInput.placeholder = "Titre, étudiant, encadrant...";
      }
    }
  });
  
  // Handle year filter
  yearFilter.addEventListener('change', function() {
    currentFilters.year = this.value;
    filterProjects();
  });
  
  // Handle teacher filter
  teacherFilter.addEventListener('change', function() {
    currentFilters.teacher = this.value;
    filterProjects();
  });
  
  // Initialize with 'all' category
  filterProjects();
});



