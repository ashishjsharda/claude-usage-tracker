// Background service worker for Claude Usage Tracker

// Initialize extension
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // First time installation
    await initializeStorage();
    
    // Open welcome page
    chrome.tabs.create({
      url: 'https://github.com/yourusername/claude-usage-tracker'
    });
    
    console.log('Claude Usage Tracker: Extension installed');
  } else if (details.reason === 'update') {
    console.log('Claude Usage Tracker: Extension updated');
  }
});

// Initialize storage with default values
async function initializeStorage() {
  const defaultData = {
    messagesToday: 0,
    messagesYesterday: 0,
    totalMessages: 0,
    totalChats: 0,
    streak: 0,
    weeklyActivity: {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0
    },
    modelUsage: {
      sonnet: 0,
      opus: 0
    },
    lastActive: Date.now(),
    lastDate: new Date().toDateString(),
    installDate: Date.now()
  };

  await chrome.storage.local.set(defaultData);
  console.log('Claude Usage Tracker: Storage initialized');
}

// Update badge with message count
async function updateBadge() {
  try {
    const data = await chrome.storage.local.get(['messagesToday']);
    const count = data.messagesToday || 0;
    
    if (count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#8B5CF6' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.messagesToday) {
    updateBadge();
  }
});

// Daily reset check (runs every hour)
setInterval(async () => {
  const data = await chrome.storage.local.get(['lastDate']);
  const today = new Date().toDateString();
  
  if (data.lastDate !== today) {
    // It's a new day, trigger content script updates
    const tabs = await chrome.tabs.query({ url: 'https://claude.ai/*' });
    
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { action: 'newDay' }).catch(() => {
        // Tab might not have content script loaded
      });
    }
  }
}, 3600000); // Check every hour

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateStats') {
    updateBadge();
    sendResponse({ success: true });
  }
  return true;
});

// Initialize badge on startup
updateBadge();

console.log('Claude Usage Tracker: Background service worker started');
