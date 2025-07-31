// Script to inject into pages to fix polling issues
(function() {
  // Check if we're on a demo page trying to poll the Next.js server
  if (window.location.pathname.includes('guides') || window.location.href.includes('demo')) {
    console.log('Fixing guides polling issue...');
    
    // Override any check functions
    if (window.check) {
      console.log('Found check function, disabling it');
      window.check = function() {
        console.log('Polling disabled');
      };
    }
    
    // Clear any existing intervals/timeouts that might be polling
    for (let i = 1; i < 1000; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
    
    // Override fetch to prevent 404s
    const originalFetch = window.fetch;
    window.fetch = function(url, ...args) {
      if (typeof url === 'string' && url.includes('/guides') && url.includes('3000')) {
        console.log('Intercepted guides fetch, returning mock response');
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ guides: [] }),
          text: () => Promise.resolve(''),
        });
      }
      return originalFetch.apply(this, [url, ...args]);
    };
    
    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      if (url.includes('/guides') && url.includes('3000')) {
        console.log('Intercepted XMLHttpRequest to guides, blocking');
        this.send = function() {
          this.readyState = 4;
          this.status = 200;
          this.responseText = '';
          if (this.onreadystatechange) {
            this.onreadystatechange();
          }
        };
      }
      return originalOpen.apply(this, [method, url, ...args]);
    };
    
    console.log('Guides polling fix applied');
  }
})();