# 🚀 Claude Usage Tracker

A beautiful Chrome extension for real-time monitoring of your Claude AI usage with insights and analytics.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-orange.svg)

## ✨ Features

- **📊 Real-time Analytics** - Track your daily, weekly, and total Claude usage
- **🎨 Beautiful UI** - Modern glassmorphism design with smooth animations
- **📈 Activity Charts** - Visualize your usage patterns over time
- **🔥 Streak Tracking** - Stay consistent with daily streak counters
- **⚡ Model Detection** - Automatically detect and track Sonnet vs Opus usage
- **💾 Data Export** - Export your usage data as JSON
- **🌙 Dark Theme** - Eye-friendly design perfect for any time of day

## 📸 Screenshots

[Coming soon - Add screenshots of your extension]

## 🎯 What It Tracks

- **Messages Today** - Real-time count of messages sent
- **Total Chats** - Number of conversations started
- **Estimated Tokens** - Rough estimate of tokens used
- **Streak Days** - Consecutive days of Claude usage
- **Weekly Activity** - Visual breakdown of daily usage
- **Model Usage** - Percentage split between Sonnet and Opus

## 🚀 Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (link coming soon)
2. Click "Add to Chrome"
3. Start tracking your usage!

### Manual Installation (Developer Mode)

1. **Download the extension**
   ```bash
   git clone https://github.com/ashishjsharda/claude-usage-tracker.git
   cd claude-usage-tracker
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `claude-usage-tracker` folder

3. **Start using**
   - Visit [claude.ai](https://claude.ai)
   - Click the extension icon to view your stats
   - Stats update automatically as you use Claude!

For detailed installation instructions, see [QUICKSTART.md](QUICKSTART.md).

## 🎨 Design Philosophy

This extension follows modern UI/UX principles:
- **Glassmorphism** - Frosted glass effect for depth
- **Smooth Animations** - Delightful micro-interactions
- **Data Visualization** - Clear, actionable insights
- **Minimal Friction** - Set it and forget it tracking

## 🔧 Development

### Prerequisites
- Google Chrome (v88+)
- Basic knowledge of JavaScript, HTML, CSS

### Project Structure
```
claude-usage-tracker/
├── manifest.json       # Extension configuration
├── popup.html          # Main UI
├── popup.css           # Styles
├── popup.js            # UI logic
├── content.js          # Claude.ai monitoring
├── background.js       # Service worker
└── icons/              # Extension icons
```

### Building
No build step required! This extension uses vanilla JavaScript.

### Testing
1. Load the extension in developer mode
2. Visit claude.ai and send some messages
3. Click the extension icon to verify tracking
4. Check console for debug logs

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- [ ] Add more detailed analytics
- [ ] Support for Claude API usage tracking
- [ ] Dark/light theme toggle
- [ ] Export to CSV format
- [ ] Weekly email reports
- [ ] Comparison with other users (anonymous)

## 📝 Privacy

This extension:
- ✅ Stores all data locally in your browser
- ✅ Never sends data to external servers
- ✅ Only monitors claude.ai pages
- ✅ Open source - verify the code yourself

## 🐛 Known Issues

- Model detection may not work on all Claude.ai page variants
- First message in a conversation might not be counted
- Weekly chart resets to current week only

## 🗺️ Roadmap

- [ ] Chrome Web Store publication
- [ ] Firefox extension port
- [ ] Safari extension port
- [ ] Advanced analytics dashboard
- [ ] Team usage tracking
- [ ] API integration for accurate token counts

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Inspired by the Usage4Claude Mac app
- Built with ❤️ for the Claude community
- Icons from [Lucide Icons](https://lucide.dev)

## 📧 Contact

- Twitter: [@yourusername](https://twitter.com/yourusername)
- Email: your.email@example.com
- Issues: [GitHub Issues](https://github.com/ashishjsharda/claude-usage-tracker/issues)

## ⭐ Show Your Support

If you find this extension helpful, please:
- ⭐ Star this repository
- 🐦 Tweet about it
- 🔗 Share with friends
- 🐛 Report bugs
- 💡 Suggest features

---

**Made with 💜 by [Your Name]**

*Not affiliated with Anthropic PBC*
