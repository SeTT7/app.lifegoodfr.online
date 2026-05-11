// Single-open accordion: clicking a trigger toggles its panel and closes siblings.
(function() {
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('.acc-trigger, .summary-trigger');
    if (!trigger) return;
    var item = trigger.closest('.acc-item, .summary-block');
    if (!item) return;

    var wasOpen = item.classList.contains('open');

    // For .acc-item only: close siblings inside the same accordion
    if (item.classList.contains('acc-item')) {
      var accordion = item.parentElement;
      accordion.querySelectorAll('.acc-item.open').forEach(function(it) {
        it.classList.remove('open');
      });
    }

    if (!wasOpen) item.classList.add('open');
    else item.classList.remove('open');
  });
})();
