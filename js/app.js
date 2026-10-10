import { COMPLEX_INFO, ROOMS_DATA } from './data.js';

// DOM Elements
const views = ['home', 'rooms', 'gym', 'grocery'];

// Switch Active View / Screen
export function switchView(viewName) {
  if (!views.includes(viewName)) viewName = 'home';

  // Toggle View Sections
  views.forEach(v => {
    const section = document.getElementById(`view-${v}`);
    if (section) {
      if (v === viewName) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    }

    // Desktop Nav Buttons
    const dBtn = document.getElementById(`desktop-nav-${v}`);
    if (dBtn) {
      if (v === viewName) {
        dBtn.className = 'desktop-nav-btn px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all text-primary bg-primary/10';
      } else {
        dBtn.className = 'desktop-nav-btn px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-all';
      }
    }

    // Mobile Nav Buttons
    const mBtn = document.getElementById(`mobile-nav-${v}`);
    if (mBtn) {
      if (v === viewName) {
        mBtn.className = 'mobile-nav-btn flex flex-col items-center justify-center gap-0.5 text-primary font-bold transition-all';
      } else {
        mBtn.className = 'mobile-nav-btn flex flex-col items-center justify-center gap-0.5 text-neutral-500 hover:text-neutral-900 transition-all';
      }
    }
  });

  // Update URL Hash without jump
  if (window.location.hash !== `#${viewName}`) {
    history.replaceState(null, '', `#${viewName}`);
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal System
export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Open Schedule Modal with specific room selection
export function openScheduleModal(roomId) {
  const select = document.getElementById('sched-room');
  if (select && roomId) {
    if (roomId === 'deluxe') select.value = 'Deluxe Room with Balcony (Rs. 8,500/mo)';
    if (roomId === 'standard') select.value = 'Standard Furnished Room (Rs. 6,500/mo)';
    if (roomId === 'studio') select.value = 'Studio Suite with Kitchenette (Rs. 11,000/mo)';
  }
  
  // Set default date to tomorrow
  const dateInput = document.getElementById('sched-date');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  openModal('modal-schedule');
}

export function openBookingModal(roomId) {
  openScheduleModal(roomId);
}

// Form Submission & WhatsApp Forwarding
export function handleScheduleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('sched-name')?.value || 'Guest';
  const phone = document.getElementById('sched-phone')?.value || '';
  const room = document.getElementById('sched-room')?.value || 'Furnished Room';
  const date = document.getElementById('sched-date')?.value || 'Soon';
  const time = document.getElementById('sched-time')?.value || 'Morning';
  const notes = document.getElementById('sched-notes')?.value || '';

  const message = `*Room Viewing Request - DC Complex Hamirpur*\n` +
    `- *Name:* ${name}\n` +
    `- *Phone:* ${phone}\n` +
    `- *Selected Room:* ${room}\n` +
    `- *Preferred Date:* ${date}\n` +
    `- *Time Slot:* ${time}\n` +
    (notes ? `- *Notes:* ${notes}\n` : '') +
    `\nPlease confirm the viewing slot!`;

  closeModal('modal-schedule');
  showToast('Opening WhatsApp with your booking details...');

  const waUrl = `https://wa.me/916230013209?text=${encodeURIComponent(message)}`;
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 400);
}

// Toast Feedback
export function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-20px]');
    }, 3500);
  }
}

// Desktop View Mode Switcher (Web vs Phone Simulator)
export function toggleDisplayMode(mode) {
  const container = document.getElementById('content-container');
  const webBtn = document.getElementById('view-mode-web');
  const mobileBtn = document.getElementById('view-mode-mobile');

  if (mode === 'mobile') {
    container.classList.remove('max-w-7xl');
    container.classList.add('max-w-md', 'border-x', 'border-neutral-200', 'shadow-2xl', 'bg-white', 'min-h-screen');
    if (webBtn && mobileBtn) {
      webBtn.className = 'px-2.5 py-1 rounded-full hover:text-neutral-900 transition-all';
      mobileBtn.className = 'px-2.5 py-1 rounded-full bg-white text-primary shadow-xs transition-all';
    }
    showToast('Switched to Phone Preview mode');
  } else {
    container.classList.add('max-w-7xl');
    container.classList.remove('max-w-md', 'border-x', 'border-neutral-200', 'shadow-2xl', 'bg-white', 'min-h-screen');
    if (webBtn && mobileBtn) {
      webBtn.className = 'px-2.5 py-1 rounded-full bg-white text-primary shadow-xs transition-all';
      mobileBtn.className = 'px-2.5 py-1 rounded-full hover:text-neutral-900 transition-all';
    }
    showToast('Switched to Responsive Web mode');
  }
}

// Expose functions globally for inline HTML event handlers
window.switchView = switchView;
window.openModal = openModal;
window.closeModal = closeModal;
window.openScheduleModal = openScheduleModal;
window.openBookingModal = openBookingModal;
window.handleScheduleSubmit = handleScheduleSubmit;
window.toggleDisplayMode = toggleDisplayMode;
window.showToast = showToast;

// Global Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Listen for backdrop dismissal
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  // Listen for Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (views.includes(hash)) {
    switchView(hash);
  } else {
    switchView('home');
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (views.includes(hash)) {
    switchView(hash);
  }
});
