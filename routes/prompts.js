const express = require('express');
const router = express.Router();

// Template-based prompt generators
const promptTemplates = {
  'kids-animation': {
    clip1: (subject, theme, tone) => 
      `Vibrant 3D animated cartoon ${subject} appears in a bright ${theme} with green rolling hills and fluffy clouds. Big expressive eyes, bouncing excitedly to an upbeat beat. Pixar-style, warm saturated colors, vertical 9:16 format, ${tone} energy.`,
    clip2: (subject, theme, tone) =>
      `Same cheerful cartoon ${subject} dancing and singing with exaggerated bouncy movements in the ${theme}, rainbow accents in the background, camera slowly zooms in. Soft rounded shapes, toddler-friendly, high energy, vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `Cartoon ${subject} does a big joyful spin and wave directly at camera, confetti or sparkles bursting around it, ending on a bright freeze-frame pose that can loop back to Clip 1 seamlessly. Vertical 9:16 format.`,
  },
  'educational': {
    clip1: (subject, theme, tone) =>
      `Clean, professional 2D animation of ${subject} on a ${theme} background. Bold, clear typography. Educational tone with modern flat design. Vertical 9:16 format. Starts with eye-catching intro.`,
    clip2: (subject, theme, tone) =>
      `${subject} explaining or demonstrating key concept in ${theme} setting. Animated diagrams and charts. Professional ${tone} energy. Multiple visual elements highlighting the topic. Vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `${subject} summarizing with a clear call-to-action. Bold concluding visual. ${theme} background. Loopable ending frame. Vertical 9:16 format.`,
  },
  'music-video': {
    clip1: (subject, theme, tone) =>
      `Dynamic music video scene with ${subject} center stage in a ${theme} setting. Energetic ${tone} visuals synced to beat. Vibrant colors, motion effects. Vertical 9:16 format. Hook moment for viewers.`,
    clip2: (subject, theme, tone) =>
      `${subject} performing with backing dancers or additional visual effects in ${theme}. Fast-paced cuts matching music tempo. ${tone} energy. Multiple camera angles. Vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `Climactic moment with ${subject} in spotlight. Confetti, lights, or effects burst. ${theme} glows dramatically. Freeze-frame that loops smoothly. Vertical 9:16 format.`,
  },
  'product-demo': {
    clip1: (subject, theme, tone) =>
      `Modern product showcase: ${subject} appears in a clean ${theme} environment. Sleek, professional design. Minimal ${tone} aesthetic. Product highlighted with soft lighting. Vertical 9:16 format.`,
    clip2: (subject, theme, tone) =>
      `${subject} demonstration of key features in ${theme}. Clear UI/UX focused visuals. Practical ${tone} showing benefits. Smooth transitions between features. Vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `${subject} final showcase with call-to-action in ${theme} setting. Professional closing. Trust-building visuals. Loopable ending. Vertical 9:16 format.`,
  },
  'comedy': {
    clip1: (subject, theme, tone) =>
      `Quirky setup: ${subject} in an unexpected ${theme}. Funny, exaggerated expressions. ${tone} humor style. Attention-grabbing intro. Vertical 9:16 format.`,
    clip2: (subject, theme, tone) =>
      `${subject} performing comedic action or dialogue in ${theme}. Exaggerated movements, funny timing. ${tone} comedy escalating. Physical or visual gags. Vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `Punchline moment: ${subject} delivers the comedy payoff in ${theme}. Big reaction or laugh. Freeze-frame that loops. Vertical 9:16 format.`,
  },
  'custom': {
    clip1: (subject, theme, tone) =>
      `Opening scene with ${subject} in a ${theme} setting. ${tone} energy and style. Engaging introduction. Vertical 9:16 format.`,
    clip2: (subject, theme, tone) =>
      `Development: ${subject} continues in ${theme}. Building energy and interest. ${tone} pacing. Vertical 9:16 format.`,
    clip3: (subject, theme, tone) =>
      `Conclusion: ${subject} delivers final moment in ${theme}. Strong ending frame. Loopable design. Vertical 9:16 format.`,
  },
};

// Generate Prompts Endpoint
router.post('/generate', (req, res) => {
  try {
    const { template, subject, theme, lyrics, style, tone } = req.body;

    // Validate input
    if (!template || !subject || !theme) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get template prompts
    const template_prompts = promptTemplates[template] || promptTemplates['custom'];

    // Generate 3 clips with consistent character description
    const characterDescription = `${subject} (style: ${style})`;

    const clip1 = template_prompts.clip1(characterDescription, theme, tone);
    const clip2 = template_prompts.clip2(characterDescription, theme, tone);
    const clip3 = template_prompts.clip3(characterDescription, theme, tone);

    // Return prompts
    res.json({
      prompts: {
        clip1,
        clip2,
        clip3,
      },
      metadata: {
        subject,
        theme,
        style,
        tone,
        template,
        lyrics,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating prompts:', error);
    res.status(500).json({ error: 'Failed to generate prompts', details: error.message });
  }
});

// Get Prompt Variations (for experimentation)
router.get('/variations/:template', (req, res) => {
  const { template } = req.params;

  if (!promptTemplates[template]) {
    return res.status(404).json({ error: 'Template not found' });
  }

  res.json({
    template,
    examples: promptTemplates[template],
  });
});

module.exports = router;
