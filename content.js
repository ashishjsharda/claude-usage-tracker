// Content script for Claude.ai monitoring
console.log('Claude Usage Tracker: Content script loaded');

let messageCount = 0;
let lastMessageTime = Date.now();
let currentModel = 'sonnet'; // default

// Initialize tracking
(async function init() {
  await updateDailyStats();
  startMonitoring();
  detectModel();
})();

// Start monitoring the page
function startMonitoring() {
  // Monitor for new messages
  const observer = new MutationObserver(debounce(checkForNewMessages, 500));
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Monitor conversation changes
  watchForConversationChanges();
  
  // Track page visibility
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Check for new messages
function checkForNewMessages() {
  // Look for message containers (Claude.ai specific selectors)
  const messageElements = document.querySelectorAll('[data-testid*="message"], .font-claude-message, [class*="Message"]');
  
  if (messageElements.length > messageCount) {
    const newMessages = messageElements.length - messageCount;
    messageCount = messageElements.length;
    
    // Record the new messages
    recordMessages(newMessages);
  }
}

// Record messages to storage
async function recordMessages(count) {
  try {
    const data = await chrome.storage.local.get([
      'messagesToday',
      'messagesYesterday',
      'totalMessages',
      'totalChats',
      'weeklyActivity',
      'modelUsage',
      'lastActive',
      'lastDate'
    ]);

    const today = new Date().toDateString();
    const dayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });

    // Check if it's a new day
    if (data.lastDate !== today) {
      data.messagesYesterday = data.messagesToday || 0;
      data.messagesToday = 0;
      data.lastDate = today;
      
      // Update streak
      const lastActiveDate = new Date(data.lastActive || Date.now());
      const daysDiff = Math.floor((Date.now() - lastActiveDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        data.streak = (data.streak || 0) + 1;
      } else if (daysDiff > 1) {
        data.streak = 1;
      }
    }

    // Update counts
    data.messagesToday = (data.messagesToday || 0) + count;
    data.totalMessages = (data.totalMessages || 0) + count;
    data.lastActive = Date.now();

    // Update weekly activity
    const weeklyActivity = data.weeklyActivity || {};
    weeklyActivity[dayName] = (weeklyActivity[dayName] || 0) + count;
    data.weeklyActivity = weeklyActivity;

    // Update model usage
    const modelUsage = data.modelUsage || { sonnet: 0, opus: 0 };
    modelUsage[currentModel] = (modelUsage[currentModel] || 0) + count;
    data.modelUsage = modelUsage;

    // Save to storage
    await chrome.storage.local.set(data);
    
    console.log('Claude Usage Tracker: Recorded', count, 'messages');
  } catch (error) {
    console.error('Claude Usage Tracker: Error recording messages:', error);
  }
}

// Watch for new conversations
function watchForConversationChanges() {
  let currentUrl = window.location.href;
  
  setInterval(async () => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      
      // Check if it's a new chat
      if (currentUrl.includes('/chat/')) {
        await incrementChatCount();
        messageCount = 0; // Reset message count for new chat
        detectModel(); // Detect model for new chat
      }
    }
  }, 1000);
}

// Increment chat count
async function incrementChatCount() {
  try {
    const data = await chrome.storage.local.get(['totalChats']);
    const totalChats = (data.totalChats || 0) + 1;
    await chrome.storage.local.set({ totalChats });
    console.log('Claude Usage Tracker: New chat detected, total:', totalChats);
  } catch (error) {
    console.error('Claude Usage Tracker: Error incrementing chat count:', error);
  }
}

// Detect which model is being used
function detectModel() {
  // Try to find model indicator in the UI
  setTimeout(() => {
    const modelIndicators = document.querySelectorAll('[class*="model"], [data-model], .text-sm');
    
    for (const element of modelIndicators) {
      const text = element.textContent.toLowerCase();
      
      if (text.includes('opus')) {
        currentModel = 'opus';
        console.log('Claude Usage Tracker: Detected Opus model');
        break;
      } else if (text.includes('sonnet')) {
        currentModel = 'sonnet';
        console.log('Claude Usage Tracker: Detected Sonnet model');
        break;
      }
    }
  }, 1000);
}

// Update daily stats
async function updateDailyStats() {
  const data = await chrome.storage.local.get(['lastDate', 'messagesToday', 'messagesYesterday']);
  const today = new Date().toDateString();
  
  if (data.lastDate !== today) {
    await chrome.storage.local.set({
      lastDate: today,
      messagesYesterday: data.messagesToday || 0,
      messagesToday: 0
    });
  }
}

// Handle page visibility changes
function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    // Reset message count when page becomes visible
    messageCount = document.querySelectorAll('[data-testid*="message"], .font-claude-message').length;
    detectModel();
  }
}

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageInfo') {
    sendResponse({
      messageCount,
      currentModel,
      url: window.location.href
    });
  }
});

console.log('Claude Usage Tracker: Monitoring started');
