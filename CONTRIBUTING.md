# Contributing to Claude Usage Tracker

First off, thank you for considering contributing to Claude Usage Tracker! 🎉

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your Chrome version and OS**

### Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested feature**
- **Explain why this feature would be useful**
- **List any similar features in other extensions**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our code style
3. **Test thoroughly** - the extension should work correctly
4. **Update documentation** if needed
5. **Write a clear commit message**
6. **Submit a pull request**

## 💻 Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/claude-usage-tracker.git
   cd claude-usage-tracker
   ```

2. Load the extension in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project folder

3. Make changes and test:
   - Edit the code
   - Click the refresh icon in `chrome://extensions/`
   - Test on claude.ai

## 📝 Code Style

- Use **2 spaces** for indentation
- Use **meaningful variable names**
- Add **comments for complex logic**
- Follow **existing code patterns**
- Keep functions **small and focused**

### JavaScript
```javascript
// Good
async function loadStats() {
  const data = await chrome.storage.local.get(['messagesToday']);
  updateDisplay(data);
}

// Avoid
async function doStuff() {
  let d = await chrome.storage.local.get(['messagesToday']); updateDisplay(d);
}
```

### CSS
```css
/* Good */
.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
}

/* Avoid */
.card{background:rgba(255,255,255,.1);border-radius:16px;padding:16px;}
```

## 🧪 Testing Checklist

Before submitting a PR, ensure:

- [ ] Extension loads without errors
- [ ] All features work on claude.ai
- [ ] UI displays correctly at 380px width
- [ ] No console errors
- [ ] Data persists after browser restart
- [ ] Tested on both Sonnet and Opus conversations
- [ ] Popup responds smoothly to interactions

## 📋 Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and PRs when relevant

Examples:
```
feat: Add weekly activity export to CSV
fix: Correct message counting in new chat sessions
docs: Update installation instructions
style: Improve glassmorphism effect on stat cards
refactor: Simplify model detection logic
test: Add unit tests for storage utilities
```

## 🎨 UI/UX Guidelines

- Maintain the **glassmorphism aesthetic**
- Keep animations **smooth and subtle** (300ms default)
- Ensure **accessibility** (readable contrast, keyboard navigation)
- Follow **responsive design** principles
- Test with **different data states** (zero messages, high numbers, etc.)

## 🐛 Finding Issues to Work On

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - We'd love your help
- `bug` - Something isn't working
- `enhancement` - New features or improvements

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

## 🤔 Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out on Twitter [@yourusername]
- Email: your.email@example.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🙏

Every contribution, no matter how small, is valued and appreciated.
