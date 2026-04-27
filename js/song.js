// Track selector for /song: load Vturb player on click, "Now Listening" panel.
(function() {
  var tracks = document.querySelectorAll('.track-btn');
  var nowListening = document.getElementById('nowListening');
  var nowTitle = document.getElementById('nowTitle');
  var nowPlayer = document.getElementById('nowPlayer');
  var backBtn = document.getElementById('backTrack');
  if (!tracks.length || !nowListening) return;

  function loadPlayer(playerId, scriptSrc) {
    nowPlayer.innerHTML = '<vturb-smartplayer id="' + playerId + '" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>';
    if (!document.querySelector('script[data-player="' + playerId + '"]')) {
      var s = document.createElement('script');
      s.src = scriptSrc;
      s.async = true;
      s.setAttribute('data-player', playerId);
      document.head.appendChild(s);
    }
  }

  tracks.forEach(function(btn) {
    btn.addEventListener('click', function() {
      tracks.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      nowTitle.textContent = btn.dataset.title;
      loadPlayer(btn.dataset.playerId, btn.dataset.scriptSrc);

      nowListening.classList.add('active');
      setTimeout(function() {
        nowListening.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  });

  backBtn.addEventListener('click', function() {
    nowListening.classList.remove('active');
    tracks.forEach(function(b) { b.classList.remove('active'); });
    nowPlayer.innerHTML = '';
  });
})();
