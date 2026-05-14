// PDF Modal — opens a fullscreen modal with iframe of the given PDF.
// Buttons should have: class="pdf-btn" data-pdf="..." data-title="..."
(function() {
  // Build the modal once
  var modal = document.createElement('div');
  modal.className = 'pdf-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="pdf-modal-header">' +
      '<div class="pdf-modal-title" id="pdfModalTitle"></div>' +
      '<button type="button" class="pdf-modal-close" id="pdfModalClose" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="pdf-modal-body">' +
      '<iframe class="pdf-modal-iframe" id="pdfModalIframe" src="" allow="fullscreen"></iframe>' +
      '<div class="pdf-modal-fallback" id="pdfModalFallback">' +
        '<h3>Trouble loading?</h3>' +
        '<p>Some browsers (especially on iPhone) cannot display PDFs inline. Tap below to open the book in your device viewer.</p>' +
        '<a id="pdfModalOpenExt" href="" target="_blank" rel="noopener">Open PDF</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var iframe   = document.getElementById('pdfModalIframe');
  var titleEl  = document.getElementById('pdfModalTitle');
  var closeBtn = document.getElementById('pdfModalClose');
  var fallback = document.getElementById('pdfModalFallback');
  var openExt  = document.getElementById('pdfModalOpenExt');

  function openModal(pdfUrl, title) {
    titleEl.textContent = title || 'Read the book';
    iframe.src = pdfUrl;
    openExt.href = pdfUrl;
    fallback.classList.remove('show');
    modal.classList.add('active');
    document.body.classList.add('pdf-modal-open');
    // After a short delay, if iframe didn't render anything (iOS issue), show fallback
    setTimeout(function() {
      try {
        if (!iframe.contentDocument && !iframe.contentWindow) {
          fallback.classList.add('show');
        }
      } catch (e) { /* cross-origin can throw, ignore */ }
    }, 1500);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('pdf-modal-open');
    iframe.src = 'about:blank';
    fallback.classList.remove('show');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // iOS detection — on iOS, prefer opening in new tab instead of broken iframe
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent || '');
  }

  // Attach to any button with .pdf-btn[data-pdf]
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.pdf-btn[data-pdf]');
    if (!btn || btn.classList.contains('pdf-btn-download')) return;
    e.preventDefault();
    var pdf   = btn.getAttribute('data-pdf');
    var title = btn.getAttribute('data-title');
    if (isIOS()) {
      // On iOS, open directly in new tab — native viewer handles it
      window.open(pdf, '_blank');
    } else {
      openModal(pdf, title);
    }
  });
})();
