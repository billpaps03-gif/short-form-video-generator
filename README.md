# 🎬 Short-Form Video Generator

Generate AI-powered 3-clip short-form videos (TikTok/YouTube Shorts style) with consistent character design and automatically optimized prompts.

## Features

✨ **Smart Prompt Generation**
- Generates 3 optimized video clips with consistent character descriptions
- Multiple templates: Kids Animation, Educational, Music Video, Product Demo, Comedy, Custom
- Maintains visual consistency across all 3 clips

🎨 **Customization**
- Choose from multiple art styles (Pixar 3D, Cartoon 2D, Realistic, Claymation, Watercolor)
- Set tone/energy level (Playful, Calm, Energetic, Serious)
- Custom character and theme input

📱 **Vertical Format Optimized**
- All prompts optimized for 9:16 vertical video format
- Perfect for TikTok, Instagram Reels, YouTube Shorts

💾 **Project Management**
- Save and manage your video projects
- Track project history
- Reuse successful templates

🔗 **Easy Stitching**
- Step-by-step guide for stitching clips in CapCut or Pika Editor
- Copy lyrics/captions to clipboard
- Trim recommendations for snappy cuts

## How It Works

1. **Fill Out Form** - Enter character name, theme, lyrics, and style preferences
2. **Generate Prompts** - System creates 3 optimized prompts with consistent character design
3. **Get Video Clips** - Copy prompts to Pika, Runway, or your favorite AI video generator
4. **Stitch Together** - Use CapCut or Pika's editor to combine clips
5. **Add Captions** - Use the built-in caption text (provided by the app)
6. **Upload** - Share to your favorite platform!

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- Pika API key (get one at [pika.art](https://pika.art))

### Installation

1. Clone the repository
```bash
git clone https://github.com/billpaps03-gif/short-form-video-generator.git
cd short-form-video-generator
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file from the template
```bash
cp .env.example .env
```

4. Add your Pika API key to `.env`
```
PIKA_API_KEY=your_api_key_here
```

### Running Locally

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The app will be available at `http://localhost:5000`

## Project Structure

```
short-form-video-generator/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML
│   ├── app.js             # Frontend JavaScript
│   └── styles.css         # Styling
├── routes/                # API endpoints
│   ├── prompts.js         # Prompt generation
│   ├── videos.js          # Video generation (Pika API)
│   └── projects.js        # Project management
├── server.js              # Express server
├── package.json           # Dependencies
└── .env.example           # Environment template
```

## API Endpoints

### Prompts
- `POST /api/prompts/generate` - Generate 3-clip prompts
- `GET /api/prompts/variations/:template` - Get template variations

### Videos
- `POST /api/videos/generate` - Start video generation job
- `GET /api/videos/status/:jobId` - Check generation status

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects/save` - Save a project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Templates

### Kids Animation
Perfect for toddler-friendly content with bouncy characters and bright colors.

### Educational Explainer
Clean, professional animations with diagrams and clear explanations.

### Music Video
Dynamic, energetic visuals synced to music beats.

### Product Demo
Sleek, professional showcase of products/features.

### Comedy/Sketch
Quirky, exaggerated movements and funny timing.

### Custom
Build your own template with custom descriptions.

## Deployment

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Deploy Backend to Render/Railway

1. Connect GitHub repo
2. Set environment variables
3. Deploy!

## Configuration

### Environment Variables

```env
# Pika API
PIKA_API_KEY=your_key_here
PIKA_API_URL=https://api.pika.art/v1

# Firebase (optional)
FIREBASE_PROJECT_ID=your_project

# Server
PORT=5000
NODE_ENV=development
```

## Workflow Tips

### For Best Results:

1. **Keep Character Descriptions Consistent** - Use the same phrasing across all 3 prompts
2. **Trim Clip Endings** - Remove last 0.5 seconds of each clip for snappy transitions
3. **Add Text Overlays Last** - Don't rely on AI to generate text; add captions manually in CapCut
4. **Test on Mobile** - Preview videos in vertical format before uploading
5. **Loop Smoothly** - Ensure Clip 3 ending transitions well back to Clip 1

### Pika Tips:

- Vertical format (9:16) is optimized for shorts
- Keep prompts detailed but not too long
- Use quality keywords: "Pixar-style", "high-quality", "vibrant"
- Test free tier before committing to paid generation

### CapCut Workflow:

1. Import clips in order (1 → 2 → 3)
2. Adjust clip duration to match intended timing
3. Add 0.5-second overlap for smooth transitions
4. Add bouncing text effect for lyrics
5. Export in 1080x1920 (9:16) vertical format

## Cost Estimation

- **Hosting**: Free (Vercel + Render free tiers)
- **Pika API**: ~$0.50-$2 per video (free tier available for testing)
- **Database**: Free (Firebase free tier or in-memory for small projects)

## Roadmap

- [ ] Direct Pika API integration
- [ ] Runway ML support
- [ ] Automatic clip stitching
- [ ] Firebase project persistence
- [ ] Batch generation
- [ ] Music/audio integration
- [ ] Advanced editing features
- [ ] Mobile app

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include screenshots/error messages if applicable

## Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Video generation via [Pika](https://pika.art)
- UI inspired by modern design practices
- Community feedback and suggestions

---

**Happy video making! 🎉**

Need help? Check out the [Pika documentation](https://docs.pika.art) or open an issue on GitHub.
