// DC Complex Hamirpur - iOS Navigation Engine & Smooth Transitions
// Provides 0-latency instant page switching, component persistence (header/tab-bar), and Apple-grade fluid animations.

const ROUTES = [
  {
    id: 'home',
    name: 'Home',
    tabIndex: 0,
    urls: ['/', '/index.html', 'index.html'],
    file: 'index.html',
    title: 'DC Complex Hamirpur | Furnished Rooms, Gym & Grocery'
  },
  {
    id: 'rooms',
    name: 'Rooms',
    tabIndex: 1,
    urls: ['/rooms', '/rooms.html', 'rooms.html'],
    file: 'rooms.html',
    title: 'Rooms for Rent in Hamirpur | 1BHK, 2BHK & Single Rooms | DC Complex'
  },
  {
    id: 'nearby',
    name: 'Nearby',
    tabIndex: 2,
    urls: ['/nearby', '/nearby.html', 'nearby.html'],
    file: 'nearby.html',
    title: 'Nearby Colleges, Bus Stand & Hospitals | DC Complex Hamirpur'
  },
  {
    id: 'gym',
    name: 'Amenities',
    tabIndex: 3,
    urls: ['/gym', '/gym.html', 'gym.html'],
    file: 'gym.html',
    title: 'Gym in Hamirpur HP | Royal Fitness Club (RFC) | DC Complex'
  },
  {
    id: 'grocery',
    name: 'Mart',
    tabIndex: 4,
    urls: ['/grocery', '/grocery.html', 'grocery.html'],
    file: 'grocery.html',
    title: 'Grocery Store in Hamirpur HP | Diwan General Store | DC Complex'
  }
];

// In-Memory Page Cache
const pageCache = new Map();
let currentRoute = null;
let isNavigating = false;

// Resolve any path/URL to its matching route object
export function resolveRoute(target) {
  if (!target) return null;
  let path = target.split('#')[0].split('?')[0].trim();
  try {
    const url = new URL(path, window.location.origin);
    path = url.pathname;
  } catch (_) {}

  const cleanPath = path.replace(/^\//, '');
  const fileName = cleanPath.split('/').pop() || 'index.html';

  for (const r of ROUTES) {
    if (r.urls.some(u => {
      const cleanU = u.replace(/^\//, '');
      return cleanU === cleanPath || cleanU === fileName || (u === '/' && cleanPath === '');
    })) {
      return r;
    }
  }
  return null;
}

// Get the current route based on browser address bar
export function getCurrentRoute() {
  const resolved = resolveRoute(window.location.pathname) || resolveRoute(window.location.href);
  return resolved || ROUTES[0];
}

// Extract modals from a document so they can be merged into active document
function extractModals(doc) {
  const modals = [];
  const modalEls = doc.querySelectorAll('.modal-backdrop');
  modalEls.forEach(m => {
    if (m.id) {
      modals.push({ id: m.id, html: m.outerHTML });
    }
  });
  return modals;
}

// Preload images found in element
function preloadImages(rootEl) {
  if (!rootEl) return;
  const imgs = rootEl.querySelectorAll('img');
  imgs.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('data:')) {
      const preload = new Image();
      preload.src = src;
    }
  });
}

// Fetch a single route and parse its content into cache
async function fetchRoute(route) {
  if (pageCache.has(route.file)) {
    return pageCache.get(route.file);
  }
  try {
    const res = await fetch(route.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const mainEl = doc.querySelector('main');
    const title = doc.querySelector('title')?.innerText || route.title;
    const modals = extractModals(doc);

    if (mainEl) preloadImages(mainEl);

    const data = {
      mainHtml: mainEl ? mainEl.innerHTML : '',
      mainClass: mainEl ? mainEl.className : '',
      title: title,
      modals: modals
    };
    pageCache.set(route.file, data);
    return data;
  } catch (err) {
    console.warn(`[iOS Router] Failed to prefetch ${route.file}:`, err);
    return null;
  }
}

// Prefetch all other routes on idle so transitions have 0 latency
async function prefetchAllRoutes() {
  // Wait until idle or short delay after initial load
  const runPrefetch = async () => {
    for (const r of ROUTES) {
      if (!pageCache.has(r.file)) {
        await fetchRoute(r);
      }
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => runPrefetch());
  } else {
    setTimeout(runPrefetch, 250);
  }
}

// Update the bottom tab bar active status and icon bounce
export function updateTabBar(activeRouteId) {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a');
  links.forEach(a => {
    const route = resolveRoute(a.getAttribute('href'));
    const isMatch = route && route.id === activeRouteId;
    const icon = a.querySelector('.material-symbols-outlined');

    if (isMatch) {
      a.className = 'flex flex-col items-center justify-center gap-0.5 text-primary font-bold ios-touch ios-tab-item active';
      if (icon) {
        icon.classList.remove('ios-tab-bounce');
        void icon.offsetWidth; // Trigger reflow for animation restart
        icon.classList.add('ios-tab-bounce');
      }
    } else {
      a.className = 'flex flex-col items-center justify-center gap-0.5 text-neutral-600 hover:text-neutral-900 transition-colors ios-touch ios-tab-item';
    }
  });
}

// Close all open modals cleanly
export function closeAllModals() {
  document.querySelectorAll('.modal-backdrop.open').forEach(m => {
    m.classList.remove('open');
  });
  document.body.style.overflow = '';
}

// Modal helper functions globally accessible
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

export function navigateToAppleMaps(e) {
  if (e) e.preventDefault();
  const isApple = /(Macintosh|MacIntel|iPad|iPhone|iPod)/i.test(navigator.userAgent) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isApple) {
    window.location.href = "maps://?daddr=31.683243,76.549011&q=DIWAN+GENERAL+STORE&dirflg=d";
  } else {
    window.open("https://maps.apple.com/?saddr=Current+Location&daddr=31.683243,76.549011&dirflg=d", "_blank");
  }
}

export function handleHeaderMapClick(event) {
  if (event) event.preventDefault();
  openModal('modal-directions');
}

// Synchronize modals into DOM
function syncModals(modals) {
  if (!modals || !modals.length) return;
  modals.forEach(({ id, html }) => {
    if (!document.getElementById(id)) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      if (wrapper.firstElementChild) {
        document.body.appendChild(wrapper.firstElementChild);
      }
    }
  });
}

// Apply page data into current document
function applyPageData(data, route) {
  const main = document.querySelector('main');
  if (main && data) {
    main.innerHTML = data.mainHtml;
    if (data.mainClass) {
      main.className = data.mainClass;
    }
  }

  if (data && data.title) {
    document.title = data.title;
  } else if (route.title) {
    document.title = route.title;
  }

  // Scroll to top instantly before rendering starts
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Merge any modals needed
  if (data && data.modals) {
    syncModals(data.modals);
  }
}

// Main Navigation Function (Apple Phone Speed & Transitions)
export async function navigateTo(target, options = {}) {
  if (isNavigating) return;
  const targetRoute = typeof target === 'string' ? resolveRoute(target) : target;
  if (!targetRoute) return;

  const fromRoute = currentRoute || getCurrentRoute();

  // If already on the same page
  if (fromRoute && fromRoute.id === targetRoute.id) {
    // Apple behavior: tap active tab -> smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nav = document.querySelector('nav');
    if (nav) {
      const activeLink = nav.querySelector(`a[href*="${targetRoute.file}"]`) || nav.querySelector('.active');
      const icon = activeLink?.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.classList.remove('ios-tab-bounce');
        void icon.offsetWidth;
        icon.classList.add('ios-tab-bounce');
      }
    }
    if (navigator.vibrate) navigator.vibrate(10);
    return;
  }

  isNavigating = true;

  // Determine animation direction
  let direction = options.direction;
  if (!direction) {
    if (options.isTab) {
      direction = targetRoute.tabIndex > fromRoute.tabIndex ? 'forward' : 'backward';
    } else {
      direction = targetRoute.tabIndex === 0 ? 'pop' : 'push';
    }
  }

  // Apple haptic pulse
  if (navigator.vibrate) navigator.vibrate(8);

  // Close modals
  closeAllModals();

  // Instant tab bar update (immediate visual feedback on finger press)
  updateTabBar(targetRoute.id);

  // Fetch / get data from memory cache
  let data = pageCache.get(targetRoute.file);
  if (!data) {
    data = await fetchRoute(targetRoute);
  }

  // If fetch failed completely, fallback to native navigation
  if (!data) {
    isNavigating = false;
    window.location.href = targetRoute.file;
    return;
  }

  // Modern View Transitions API with CSS GPU acceleration
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.setAttribute('data-transition-dir', direction);
    try {
      const transition = document.startViewTransition(() => {
        applyPageData(data, targetRoute);
      });
      await transition.finished;
    } catch (_) {
      applyPageData(data, targetRoute);
    } finally {
      document.documentElement.removeAttribute('data-transition-dir');
    }
  } else {
    // Hardware accelerated CSS fallback for other browsers
    const main = document.querySelector('main');
    if (main) {
      const exitClass = direction === 'forward' ? 'ios-exit-left' :
                        (direction === 'backward' ? 'ios-exit-right' :
                        (direction === 'push' ? 'ios-exit-push' : 'ios-exit-pop'));
      const enterClass = direction === 'forward' ? 'ios-enter-right' :
                         (direction === 'backward' ? 'ios-enter-left' :
                         (direction === 'push' ? 'ios-enter-push' : 'ios-enter-pop'));

      main.classList.add(exitClass);
      await new Promise(r => setTimeout(r, 140));
      applyPageData(data, targetRoute);
      main.classList.remove(exitClass);
      main.classList.add(enterClass);
      await new Promise(r => setTimeout(r, 180));
      main.classList.remove(enterClass);
    } else {
      applyPageData(data, targetRoute);
    }
  }

  // Update URL in browser history
  if (options.pushState !== false) {
    const newUrl = targetRoute.urls[0];
    window.history.pushState({ routeId: targetRoute.id, file: targetRoute.file }, '', newUrl);
  }

  currentRoute = targetRoute;
  isNavigating = false;
}

// Native iOS Edge Swipe Back Gesture
function initEdgeSwipeGesture() {
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwipe = false;
  let mainEl = null;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    // Must start within 26px from left edge
    if (touch.clientX < 26) {
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isSwipe = true;
      mainEl = document.querySelector('main');
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isSwipe || !mainEl) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = Math.abs(touch.clientY - touchStartY);

    // Cancel if swiping vertically
    if (deltaY > deltaX) {
      isSwipe = false;
      mainEl.style.transform = '';
      return;
    }

    if (deltaX > 0) {
      mainEl.style.transform = `translate3d(${deltaX * 0.45}px, 0, 0)`;
      mainEl.style.transition = 'none';
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isSwipe || !mainEl) return;
    isSwipe = false;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;

    mainEl.style.transition = 'transform 0.22s cubic-bezier(0.32, 0.72, 0, 1)';
    if (deltaX > 85) {
      // Swiped past threshold -> Pop back
      mainEl.style.transform = 'translate3d(100%, 0, 0)';
      setTimeout(() => {
        mainEl.style.transform = '';
        mainEl.style.transition = '';
        window.history.back();
      }, 180);
    } else {
      // Spring bounce back
      mainEl.style.transform = 'translate3d(0, 0, 0)';
      setTimeout(() => {
        mainEl.style.transform = '';
        mainEl.style.transition = '';
      }, 220);
    }
  });
}

// Global click event interception
function initLinkInterceptor() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href], [data-ios-link]');
    if (!target) return;

    const href = target.getAttribute('data-ios-link') || target.getAttribute('href');
    if (!href) return;

    // Ignore external or non-HTTP protocols
    if (
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('maps:') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      target.getAttribute('target') === '_blank' ||
      target.hasAttribute('download')
    ) {
      return;
    }

    const matchedRoute = resolveRoute(href);
    if (matchedRoute) {
      e.preventDefault();
      e.stopPropagation();

      const isTab = Boolean(target.closest('nav'));
      navigateTo(matchedRoute, { isTab });
    }
  }, true);
}

// Modal backdrop & Escape key handlers
function initModalListeners() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// Browser Back / Forward handler
function initPopstateListener() {
  window.addEventListener('popstate', (e) => {
    const targetRoute = getCurrentRoute();
    if (targetRoute) {
      const fromRoute = currentRoute || ROUTES[0];
      const direction = targetRoute.tabIndex < fromRoute.tabIndex ? 'backward' : 'pop';
      navigateTo(targetRoute, { direction, pushState: false });
    }
  });
}

// Expose globals for inline event handlers in HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateToAppleMaps = navigateToAppleMaps;
window.handleHeaderMapClick = handleHeaderMapClick;
window.navigateTo = navigateTo;
window.resolveRoute = resolveRoute;

// Initialize Router
export function initRouter() {
  currentRoute = getCurrentRoute();

  // Cache current loaded page directly from live DOM
  const main = document.querySelector('main');
  if (main) {
    pageCache.set(currentRoute.file, {
      mainHtml: main.innerHTML,
      mainClass: main.className,
      title: document.title,
      modals: extractModals(document)
    });
    preloadImages(main);
  }

  // Update tab bar active indicator immediately
  updateTabBar(currentRoute.id);

  // Initialize listeners
  initLinkInterceptor();
  initModalListeners();
  initPopstateListener();
  initEdgeSwipeGesture();

  // Prefetch other routes in background
  if (window.location.protocol !== 'file:') {
    prefetchAllRoutes();
  }
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRouter);
} else {
  initRouter();
}
