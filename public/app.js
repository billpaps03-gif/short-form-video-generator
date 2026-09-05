// DOM Elements
const videoForm = document.getElementById('videoForm');
const loadingDiv = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const projectsList = document.getElementById('projectsList');

// Form state
let currentProject = null;

// Event Listeners
videoForm.addEventListener('submit', handleFormSubmit);

// Form Submission
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    template: document.getElementById('template').value,
    subject: document.getElementById('subject').value,
    theme: document.getElementById('theme').value,
    lyrics: document.getElementById('lyrics').value,
    style: document.getElementById('style').value,
    tone: document.getElementById('tone').value,
  };

  // Hide previous results and show loading
  resultsSection.classList.add('hidden');
  loadingDiv.classList.remove('hidden');

  try {
    // Send to backend to generate prompts
    const response = await fetch('/api/prompts/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate prompts');
    }

    const promptData = await response.json();
    currentProject = promptData;

    // Store lyrics for later
    document.getElementById('lyricsCopy').value = formData.lyrics;

    // Display prompts and results
    displayResults(promptData);

    // Hide loading and show results
    loadingDiv.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    console.error('Error:', error);
    loadingDiv.classList.add('hidden');
    alert('Error generating video. Please check your API configuration and try again.');
  }
}

// Display Results
function displayResults(data) {
  const { clip1, clip2, clip3 } = data.prompts;

  // Update video elements (placeholders for now)
  document.getElementById('prompt1').textContent = clip1;
  document.getElementById('prompt2').textContent = clip2;
  document.getElementById('prompt3').textContent = clip3;

  // In a real implementation, these would be actual video URLs from Pika API
  // document.getElementById('clip1').src = clip1.videoUrl;
  // document.getElementById('clip2').src = clip2.videoUrl;
  // document.getElementById('clip3').src = clip3.videoUrl;
}

// Download Clip Function
function downloadClip(clipNumber) {
  alert(`Download functionality for Clip ${clipNumber} would connect to your video storage (S3, Firebase, etc.)`);
  // Implementation would handle actual file downloads
}

// Save Project
async function saveProject() {
  if (!currentProject) return;

  try {
    const response = await fetch('/api/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentProject),
    });

    if (response.ok) {
      alert('Project saved successfully!');
      loadProjects();
    }
  } catch (error) {
    console.error('Error saving project:', error);
  }
}

// Load Projects
async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();

    if (projects.length === 0) {
      projectsList.innerHTML =
        '<p class="empty-state">No projects yet. Create your first video above!</p>';
      return;
    }

    projectsList.innerHTML = projects
      .map(
        (project) =>
          `
      <div class="project-card" onclick="loadProject('${project.id}')">
        <h4>${project.metadata.subject}</h4>
        <p><strong>Theme:</strong> ${project.metadata.theme}</p>
        <p><strong>Template:</strong> ${project.metadata.template}</p>
        <p><strong>Created:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
    `
      )
      .join('');
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load Project
function loadProject(projectId) {
  alert(`Loading project ${projectId}. Full implementation would fetch and display the saved project.`);
}

// Generate New
function generateNew() {
  videoForm.reset();
  resultsSection.classList.add('hidden');
  document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
}

// Copy Lyrics to Clipboard
function copyLyrics() {
  const lyricsCopy = document.getElementById('lyricsCopy');
  lyricsCopy.select();
  document.execCommand('copy');
  alert('Lyrics copied to clipboard!');
}

// Load projects on page load
window.addEventListener('load', () => {
  loadProjects();
});
