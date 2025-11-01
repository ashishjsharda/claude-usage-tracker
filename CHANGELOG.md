# Changelog

All notable changes to Claude Usage Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-31

### 🎉 Initial Release

#### Added
- Real-time message tracking on claude.ai
- Daily message counter with yesterday comparison
- Total chat session tracking
- Streak tracking for consecutive days of use
- Weekly activity chart with interactive bars
- Model usage tracking (Sonnet vs Opus detection)
- Estimated token counter
- Beautiful glassmorphism UI with gradient background
- Smooth animations and transitions
- Data export functionality (JSON format)
- Reset statistics option
- Privacy-first approach (all data stored locally)
- Chrome extension badge showing daily message count
- Responsive 380px popup design
- Dark theme optimized for readability

#### Technical
- Manifest V3 implementation
- MutationObserver for efficient DOM monitoring
- LocalStorage for data persistence
- Debounced event handlers for performance
- Service worker for background tasks
- Content script injection on claude.ai

#### Documentation
- Comprehensive README with installation instructions
- Detailed LAUNCH.md with marketing strategy
- CONTRIBUTING.md for open source contributors
- MIT License
- Icon generation script

### Known Issues
- Model detection may not work on all Claude.ai page variants
- First message in a new conversation might occasionally be missed
- Weekly chart limited to current week only

## [Unreleased]

### Planned Features
- Firefox extension port
- Safari extension port
- Month view for activity chart
- CSV export format
- API integration for accurate token counting
- Cost tracking (for API users)
- Team/workspace usage tracking
- Dark/light theme toggle
- Customizable popup size
- Weekly/monthly email reports
- Comparison with anonymous aggregate data
- Browser notification for milestones

### Under Consideration
- Integration with time tracking tools
- Productivity insights and recommendations
- Goal setting and achievement tracking
- Export to Google Sheets/Excel
- Keyboard shortcuts
- Multiple user profiles

---

## Release Naming Convention

- **Major (X.0.0)**: Breaking changes, major redesigns
- **Minor (1.X.0)**: New features, non-breaking changes
- **Patch (1.0.X)**: Bug fixes, minor improvements

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on suggesting features or reporting bugs.
