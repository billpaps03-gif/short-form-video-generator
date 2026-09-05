const express = require('express');
const router = express.Router();

// In-memory storage (replace with Firebase/DB in production)
let projects = [];

// Get all projects
router.get('/', (req, res) => {
  res.json(projects);
});

// Save project
router.post('/save', (req, res) => {
  try {
    const project = {
      id: 'project_' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    projects.push(project);

    res.json({
      success: true,
      message: 'Project saved successfully',
      project,
    });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ error: 'Failed to save project', details: error.message });
  }
});

// Get project by ID
router.get('/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

// Update project
router.put('/:id', (req, res) => {
  try {
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: 'Project updated successfully',
      project: projects[projectIndex],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project', details: error.message });
  }
});

// Delete project
router.delete('/:id', (req, res) => {
  try {
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const deletedProject = projects.splice(projectIndex, 1);

    res.json({
      success: true,
      message: 'Project deleted successfully',
      project: deletedProject[0],
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
});

module.exports = router;
