// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  setupEventListeners();
  startRealtimeUpdates();
});

// Load and display stats
async function loadStats() {
  try {
    const data = await chrome.storage.local.get([
      'messagesToday',
      'totalChats',
      'totalMessages',
      'streak',
      'weeklyActivity',
      'modelUsage',
      'lastActive'
    ]);

    // Update stats
    document.getElementById('messagesToday').textContent = data.messagesToday || 0;
    document.getElementById('totalChats').textContent = data.totalChats || 0;
    document.getElementById('streak').textContent = data.streak || 0;
    
    // Calculate estimated tokens (rough estimate: ~4 chars per token)
    const estimatedTokens = Math.floor((data.totalMessages || 0) * 100);
    document.getElementById('totalTokens').textContent = formatNumber(estimatedTokens);

    // Update weekly activity chart
    updateActivityChart(data.weeklyActivity || {});

    // Update model usage
    updateModelUsage(data.modelUsage || {});

    // Calculate and show trend
    updateTrend(data);
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Update activity chart
function updateActivityChart(weeklyData) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartBars = document.querySelector('.chart-bars');
  const maxValue = Math.max(...Object.values(weeklyData), 1);

  chartBars.innerHTML = days.map((day, index) => {
    const value = weeklyData[day] || 0;
    const height = (value / maxValue) * 100;
    return `
      <div class="chart-bar" style="height: ${height}%" title="${day}: ${value} messages">
        <span class="bar-label">${day}</span>
      </div>
    `;
  }).join('');
}

// Update model usage
function updateModelUsage(modelData) {
  const total = (modelData.sonnet || 0) + (modelData.opus || 0) || 1;
  const sonnetPercentage = Math.round((modelData.sonnet || 0) / total * 100);
  const opusPercentage = Math.round((modelData.opus || 0) / total * 100);

  document.getElementById('sonnetPercentage').textContent = `${sonnetPercentage}%`;
  document.getElementById('opusPercentage').textContent = `${opusPercentage}%`;
  document.getElementById('sonnetProgress').style.width = `${sonnetPercentage}%`;
  document.getElementById('opusProgress').style.width = `${opusPercentage}%`;
}

// Update trend indicator
function updateTrend(data) {
  const today = data.messagesToday || 0;
  const yesterday = data.messagesYesterday || 1;
  const change = Math.round(((today - yesterday) / yesterday) * 100);
  
  const trendElement = document.getElementById('messageTrend');
  const isPositive = change >= 0;
  
  trendElement.className = `stat-trend ${isPositive ? 'positive' : 'negative'}`;
  trendElement.querySelector('span').textContent = `${isPositive ? '+' : ''}${change}%`;
}

// Format large numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Setup event listeners
function setupEventListeners() {
  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    // Open settings page or modal
    console.log('Settings clicked');
  });

  // Time filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const period = e.target.dataset.period;
      // Load data for selected period
      console.log('Filter changed to:', period);
    });
  });

  // Export button
  document.getElementById('exportBtn').addEventListener('click', async () => {
    const data = await chrome.storage.local.get(null);
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `claude-usage-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    // Show success feedback
    showToast('Data exported successfully!');
  });

  // Reset button
  document.getElementById('resetBtn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      await chrome.storage.local.clear();
      await loadStats();
      showToast('Statistics reset successfully!');
    }
  });
}

// Start realtime updates
function startRealtimeUpdates() {
  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
      loadStats();
    }
  });

  // Refresh every 30 seconds
  setInterval(loadStats, 30000);
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(16, 185, 129, 0.9);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 1000;
    animation: slideUp 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
`;
document.head.appendChild(style);
