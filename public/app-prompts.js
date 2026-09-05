// Prompt Generation & Display
let currentPrompts = null;
let currentLyrics = null;

// Handle Form Submission
async function handleFormSubmit(e) {
  e.preventDefault();

  if (!authToken) {
    alert('Please login to generate prompts');
    return;
  }

  const formData = {
    subject: document.getElementById('subject').value,
    style: document.getElementById('style').value,
    tone: document.getElementById('tone').value,
    customLyrics: document.getElementById('customLyrics').value || null,
  };

  document.getElementById('loading').classList.remove('hidden');

  try {
    const response = await fetch('/api/prompts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate prompts');
    }

    currentPrompts = data.prompts;
    currentLyrics = data.lyrics;

    displayPrompts(data);
    displayLyrics(data.lyrics);
    displayStitchingTips(data.stitchingTips);

    document.getElementById('loading').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    document.getElementById('loading').classList.add('hidden');
    alert('Error: ' + error.message);
  }
}

// Display Prompts
function displayPrompts(data) {
  document.getElementById('prompt1').textContent = data.prompts.clip1;
  document.getElementById('prompt2').textContent = data.prompts.clip2;
  document.getElementById('prompt3').textContent = data.prompts.clip3;
}

// Display Lyrics
function displayLyrics(lyrics) {
  // Handle both object and string formats
  if (typeof lyrics === 'object') {
    document.getElementById('lyrics1').textContent = lyrics.clip1 || '';
    document.getElementById('lyrics2').textContent = lyrics.clip2 || '';
    document.getElementById('lyrics3').textContent = lyrics.clip3 || '';
  } else {
    const parts = lyrics.split('|');
    document.getElementById('lyrics1').textContent = (parts[0] || 'Jump! Jump!').trim();
    document.getElementById('lyrics2').textContent = (parts[1] || 'Dance with me!').trim();
    document.getElementById('lyrics3').textContent = (parts[2] || 'Hooray!').trim();
  }
}

// Display Stitching Tips
function displayStitchingTips(tips) {
  const tipsList = document.querySelector('.stitching-guide ol') || 
                   document.createElement('ol');
  // Tips are already in HTML, but you can add them dynamically here if needed
}

// Copy to Clipboard
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }).catch(err => {
    alert('Failed to copy: ' + err.message);
  });
}

// Generate New
function generateNew() {
  document.getElementById('videoForm').reset();
  document.getElementById('results').classList.add('hidden');
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Save Project
async function saveProject() {
  if (!currentPrompts) return;

  const projectData = {
    prompts: currentPrompts,
    lyrics: currentLyrics,
    subject: document.getElementById('subject').value,
    style: document.getElementById('style').value,
    tone: document.getElementById('tone').value,
    createdAt: new Date(),
  };

  try {
    const response = await fetch('/api/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      alert('✓ Project saved successfully!');
    } else {
      alert('Failed to save project');
    }
  } catch (error) {
    alert('Error saving project: ' + error.message);
  }
}

// Attach form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('videoForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
