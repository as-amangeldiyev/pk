/* ==========================================================================
   AMELIE'S INTERACTIVE WEBSITE - JAVASCRIPT ENGINE
   - Web Audio Sound Effects (Zero external audio files needed!)
   - Mini-Game 1: Volleyball Spike Arcade
   - Mini-Game 2: Ice-Cold Jägermeister Pour
   - Interactive KBTU Admissions Dossier Declassification
   - Scratch-off Mystery Card Canvas
   - Confetti Particle System
   - Photo & Video Modal Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initConfetti();
  initVolleyballGame();
  initJagerGame();
  initDossier();
  initScratchCard();
  initLightbox();
  initInstantUnlock();
});

/* ==========================================================================
   1. WEB AUDIO API SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let isMuted = false;

function initAudio() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      audioBtn.innerHTML = isMuted 
        ? '<span>🔇</span> Sound: OFF' 
        : '<span>🔊</span> Sound: ON';
      if (!isMuted && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Volleyball spike sound (percussive punch + air rush)
function playVolleyballSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {
    console.log(e);
  }
}

// Jäger glass clink / cheers sound
function playGlassClink() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1950, ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log(e);
  }
}

// Celebration / unlock fanfare sound
function playUnlockFanfare() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
    });
  } catch (e) {
    console.log(e);
  }
}

// Heavy official stamp sound
function playStampSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(90, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (e) {
    console.log(e);
  }
}

/* ==========================================================================
   2. CONFETTI PARTICLE SYSTEM
   ========================================================================== */
let confettiCanvas, confettiCtx;
let particles = [];
let confettiAnimationId = null;

function initConfetti() {
  confettiCanvas = document.getElementById('confetti-canvas');
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
  
  function resize() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
}

function triggerConfetti(count = 90) {
  if (!confettiCanvas) return;
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#ffffff', '#ffd700', '#e67e22', '#a7f3d0'];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth * (0.3 + Math.random() * 0.4),
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.9) * 16,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }
  
  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // gravity
    p.vx *= 0.98; // friction
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.009;
    
    if (p.opacity <= 0 || p.y > confettiCanvas.height) {
      particles.splice(i, 1);
      continue;
    }
    
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
  }
  
  if (particles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimationId = null;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* ==========================================================================
   3. MINI-GAME 1: VOLLEYBALL TIMING SPIKE
   ========================================================================== */
function initVolleyballGame() {
  const spikeBtn = document.getElementById('spike-btn');
  const scoreDisplay = document.getElementById('volleyball-score');
  const statusDisplay = document.getElementById('volleyball-status');
  const indicator = document.getElementById('timing-indicator');
  const ball = document.getElementById('court-ball');
  const player = document.getElementById('court-player');
  
  if (!spikeBtn || !indicator || !ball) return;
  
  let score = 0;
  let pos = 0;
  let speed = 1.3;
  let isAnimatingSpike = false;
  
  // Oscillate indicator back and forth across timing track
  function oscillate() {
    pos += speed;
    if (pos >= 96 || pos <= 0) {
      speed = -speed;
    }
    indicator.style.left = `${pos}%`;
    requestAnimationFrame(oscillate);
  }
  requestAnimationFrame(oscillate);
  
  function handleSpike() {
    if (isAnimatingSpike) return;
    isAnimatingSpike = true;
    
    // Player jumps
    player.style.transform = 'translateY(-30px) scale(1.08)';
    playVolleyballSound();
    
    // Sweetspot is between 65% and 90%
    const isHit = pos >= 62 && pos <= 92;
    
    if (isHit) {
      score++;
      scoreDisplay.textContent = score;
      statusDisplay.textContent = '🔥 GREAT SHOT! Point for Amelie!';
      statusDisplay.style.color = '#e11d48';
      
      // Ball zooms across the net
      ball.style.transition = 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      ball.style.transform = 'translate(190px, 90px) rotate(360deg) scale(1.2)';
      
      checkScoreMilestones(score);
    } else {
      statusDisplay.textContent = '💨 Blocked or Out! Try your timing again!';
      statusDisplay.style.color = '#7c6270';
      ball.style.transition = 'all 0.3s ease';
      ball.style.transform = 'translate(40px, -20px) scale(0.9)';
    }
    
    setTimeout(() => {
      player.style.transform = 'translateY(0px)';
      ball.style.transition = 'none';
      ball.style.transform = 'translate(0px, 0px)';
      isAnimatingSpike = false;
    }, 550);
  }
  
  spikeBtn.addEventListener('click', handleSpike);
  
  // Also support spacebar to spike if focused on court area
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      const courtRect = document.getElementById('volleyball-section')?.getBoundingClientRect();
      if (courtRect && courtRect.top < window.innerHeight && courtRect.bottom > 0) {
        e.preventDefault();
        handleSpike();
      }
    }
  });
}

function checkScoreMilestones(score) {
  if (score === 1) {
    unlockReward('reward-vb-1');
  } else if (score === 3) {
    unlockReward('reward-vb-2');
  } else if (score === 5) {
    unlockReward('reward-vb-3');
  }
}

/* ==========================================================================
   4. MINI-GAME 2: PERFECT ICE-COLD JÄGERMEISTER POUR
   ========================================================================== */
function initJagerGame() {
  const pourBtn = document.getElementById('pour-btn');
  const resetBtn = document.getElementById('jager-reset-btn');
  const liquid = document.getElementById('jager-liquid');
  const bottle = document.getElementById('jager-bottle');
  const statusDisplay = document.getElementById('jager-status');
  
  if (!pourBtn || !liquid || !bottle) return;
  
  let fillPercent = 0;
  let isPouring = false;
  let pourInterval = null;
  
  function startPour(e) {
    if (e) e.preventDefault();
    if (fillPercent >= 100) return;
    
    isPouring = true;
    bottle.classList.add('pouring');
    statusDisplay.textContent = 'Pouring ice-cold -18°C Jäger... Release in GREEN zone!';
    statusDisplay.style.color = '#e67e22';
    
    pourInterval = setInterval(() => {
      fillPercent += 1.4;
      liquid.style.height = `${Math.min(fillPercent, 100)}%`;
      
      if (fillPercent >= 100) {
        stopPour();
      }
    }, 28);
  }
  
  function stopPour() {
    if (!isPouring) return;
    isPouring = false;
    clearInterval(pourInterval);
    bottle.classList.remove('pouring');
    
    // Perfect Zone is between 74% and 90%
    if (fillPercent >= 74 && fillPercent <= 91) {
      statusDisplay.textContent = '🦌 PROST! PERFECT JÄGER SHOT! (-18°C Achieved!)';
      statusDisplay.style.color = '#22c55e';
      playGlassClink();
      triggerConfetti(100);
      unlockReward('reward-jg-1');
      unlockReward('reward-jg-2');
    } else if (fillPercent < 74) {
      statusDisplay.textContent = `Too weak (${Math.round(fillPercent)}%)! Amelie doesn't take half shots!`;
      statusDisplay.style.color = '#f43f5e';
    } else {
      statusDisplay.textContent = 'OVERFLOW! 💥 Jäger is too precious to spill! Try again!';
      statusDisplay.style.color = '#ef4444';
    }
  }
  
  function resetShot() {
    fillPercent = 0;
    liquid.style.height = '0%';
    bottle.classList.remove('pouring');
    statusDisplay.textContent = 'Hold button to pour the shot into the chilled glass!';
    statusDisplay.style.color = 'var(--pink-600)';
  }
  
  pourBtn.addEventListener('mousedown', startPour);
  pourBtn.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault();
    startPour(e);
  }, { passive: false });
  
  window.addEventListener('mouseup', stopPour);
  window.addEventListener('touchend', stopPour);
  window.addEventListener('touchcancel', stopPour);
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetShot);
  }
}

/* ==========================================================================
   5. REWARDS UNLOCK ENGINE
   ========================================================================== */
function unlockReward(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  
  if (card.classList.contains('locked')) {
    card.classList.remove('locked');
    card.classList.add('unlocked');
    
    const lockBadge = card.querySelector('.lock-badge');
    if (lockBadge) lockBadge.textContent = '🎉';
    
    const statusText = card.querySelector('.reward-status');
    if (statusText) statusText.textContent = 'UNLOCKED! ✨';
    
    playUnlockFanfare();
    triggerConfetti(60);
    
    // Also reveal corresponding target in photo or video wall if marked
    const targetElementId = card.getAttribute('data-unlock-target');
    if (targetElementId) {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        targetElement.classList.remove('hidden-secret');
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.style.animation = 'pulseBeat 1s 2';
      }
    }
  }
}

function initInstantUnlock() {
  const unlockAllBtn = document.getElementById('unlock-all-btn');
  if (unlockAllBtn) {
    unlockAllBtn.addEventListener('click', () => {
      ['reward-vb-1', 'reward-vb-2', 'reward-vb-3', 'reward-jg-1', 'reward-jg-2'].forEach(id => {
        unlockReward(id);
      });
      unlockAllBtn.textContent = 'ALL REWARDS UNLOCKED! 💖';
      unlockAllBtn.style.background = '#86efac';
      unlockAllBtn.style.color = '#15803d';
    });
  }
}

/* ==========================================================================
   6. KBTU ADMISSIONS DOSSIER (SUBTLE INSIDE JOKE)
   ========================================================================== */
function initDossier() {
  const declassifyBtn = document.getElementById('declassify-btn');
  const dossierHiddenInfo = document.getElementById('dossier-secret-details');
  const stamp = document.getElementById('dossier-stamp-badge');
  
  if (declassifyBtn && dossierHiddenInfo) {
    declassifyBtn.addEventListener('click', () => {
      playStampSound();
      dossierHiddenInfo.style.display = 'block';
      if (stamp) {
        stamp.textContent = 'DECLASSIFIED';
        stamp.style.background = '#22c55e';
      }
      declassifyBtn.textContent = 'DOSSIER ARCHIVE ACCESSED ✅';
      declassifyBtn.classList.remove('btn-primary');
      declassifyBtn.classList.add('btn-secondary');
      triggerConfetti(40);
    });
  }
}

/* ==========================================================================
   7. SCRATCH-OFF MYSTERY CARD
   ========================================================================== */
function initScratchCard() {
  const canvas = document.getElementById('scratch-card-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let scratched = false;
  
  function setup() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw silver/pink glitter cover
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#fda4af');
    grad.addColorStop(0.5, '#f43f5e');
    grad.addColorStop(1, '#ff758c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text on cover
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Here for Amelie’s Secret Note ✨', canvas.width / 2, canvas.height / 2);
  }
  
  setup();
  
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }
  
  function scratch(e) {
    if (!isDrawing || scratched) return;
    const pos = getPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
    ctx.fill();
    
    checkScratched();
  }
  
  function checkScratched() {
    if (scratched) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparentPixels++;
    }
    
    const percent = transparentPixels / (data.length / 16);
    if (percent > 0.35) {
      scratched = true;
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 600);
      triggerConfetti(80);
      playUnlockFanfare();
    }
  }
  
  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', scratch);
  
  canvas.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault();
    isDrawing = true;
    scratch(e);
  }, { passive: false });
  
  window.addEventListener('touchend', () => { isDrawing = false; });
  window.addEventListener('touchcancel', () => { isDrawing = false; });
  
  canvas.addEventListener('touchmove', (e) => {
    if (e.cancelable) e.preventDefault();
    scratch(e);
  }, { passive: false });
}

/* ==========================================================================
   8. PHOTO & VIDEO MODAL / LIGHTBOX
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('media-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const mediaHolder = document.getElementById('modal-media-holder');
  const captionHolder = document.getElementById('modal-caption-text');
  
  if (!modal || !closeBtn || !mediaHolder) return;
  
  // Click on any photo card to expand
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.square-frame img');
      const title = card.querySelector('.photo-caption h5')?.textContent || 'Photo';
      const desc = card.querySelector('.photo-caption p')?.textContent || '';
      
      mediaHolder.innerHTML = '';
      if (img && img.getAttribute('src')) {
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = title;
        mediaHolder.appendChild(modalImg);
      } else {
        // Aesthetic placeholder inside modal if image file not loaded yet
        mediaHolder.innerHTML = `
          <div style="padding: 40px; text-align: center; color: #f43f5e;">
            <div style="font-size: 3rem; margin-bottom: 10px;">📸</div>
            <h3>${title}</h3>
            <p style="color: #7c6270; margin-top: 6px;">Add your photo to this slot to view it in full resolution!</p>
          </div>
        `;
      }
      
      captionHolder.innerHTML = `<strong>${title}</strong><br><span style="color: #7c6270; font-weight: normal; font-size: 0.85rem;">${desc}</span>`;
      modal.classList.add('active');
    });
  });
  
  // Click on phone screens to expand video
  document.querySelectorAll('.phone-screen').forEach(screen => {
    screen.addEventListener('click', () => {
      const video = screen.querySelector('video');
      const phoneMockup = screen.closest('.phone-mockup');
      const title = phoneMockup?.querySelector('.phone-title')?.textContent || 'Video';
      const desc = phoneMockup?.querySelector('.phone-desc')?.textContent || '';
      
      mediaHolder.innerHTML = '';
      if (video && video.getAttribute('src')) {
        const modalVideo = document.createElement('video');
        modalVideo.src = video.src;
        modalVideo.controls = true;
        modalVideo.autoplay = true;
        modalVideo.style.maxHeight = '75vh';
        mediaHolder.appendChild(modalVideo);
      } else {
        mediaHolder.innerHTML = `
          <div style="padding: 40px; text-align: center; color: #f43f5e;">
            <div style="font-size: 3rem; margin-bottom: 10px;">📱</div>
            <h3>${title}</h3>
            <p style="color: #7c6270; margin-top: 6px;">Vertical (9:16) phone video slot.<br>Drop your video file into <code>assets/videos/</code> to preview here!</p>
          </div>
        `;
      }
      
      captionHolder.innerHTML = `<strong>${title}</strong><br><span style="color: #7c6270; font-weight: normal; font-size: 0.85rem;">${desc}</span>`;
      modal.classList.add('active');
    });
  });
  
  function closeModal() {
    modal.classList.remove('active');
    mediaHolder.innerHTML = ''; // stops any playing video
  }
  
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Global helper for soundboard buttons
window.playSampleSound = function(type) {
  if (type === 'spike') playVolleyballSound();
  if (type === 'cheers') { playGlassClink(); triggerConfetti(40); }
  if (type === 'stamp') playStampSound();
  if (type === 'fanfare') { playUnlockFanfare(); triggerConfetti(70); }
};

/* ==========================================================================
   9. SMART MEDIA AUTO-DETECTOR
   Automatically checks if the user dropped real photo and video files
   so they don't even have to write code to see them!
   ========================================================================== */
function initMediaAutoDetector() {
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  
  // Check photo slots 1 to 6
  for (let i = 1; i <= 6; i++) {
    const imgEl = document.getElementById(`photo-img-${i}`);
    if (!imgEl) continue;
    
    exts.forEach(ext => {
      const path = `assets/photos/photo${i}.${ext}`;
      const probe = new Image();
      probe.src = path;
      probe.onload = () => {
        imgEl.src = path;
      };
    });
  }

  // Check videos 1 to 3
  for (let i = 1; i <= 3; i++) {
    const vidEl = document.getElementById(`phone-video-${i}`);
    if (!vidEl) continue;
    
    const path = `assets/videos/video${i}.mp4`;
    fetch(path, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          vidEl.src = path;
        }
      })
      .catch(() => {});
  }
}

// Run detector on start
document.addEventListener('DOMContentLoaded', initMediaAutoDetector);

/* ==========================================================================
   10. TOP 10 REASONS - INTERACTIVE LOVE COUNTER & FLOATING HEARTS
   ========================================================================== */
function initLoveReasons() {
  let totalLove = 100;
  const totalDisplay = document.getElementById('total-love-count');
  const megaLoveBtn = document.getElementById('mega-love-btn');

  document.querySelectorAll('.reason-love-btn').forEach(btn => {
    let count = parseInt(btn.getAttribute('data-count') || '10', 10);
    btn.addEventListener('click', (e) => {
      count++;
      totalLove++;
      btn.setAttribute('data-count', count);
      btn.classList.add('loved');
      btn.innerHTML = `💖 <span>${count}</span>`;
      if (totalDisplay) totalDisplay.textContent = totalLove;
      
      const clientX = e.clientX || window.innerWidth / 2;
      const clientY = e.clientY || window.innerHeight / 2;
      spawnFloatingHeart(clientX, clientY);
      playGlassClink();
    });
  });

  if (megaLoveBtn) {
    megaLoveBtn.addEventListener('click', () => {
      totalLove += 10;
      if (totalDisplay) totalDisplay.textContent = totalLove;
      triggerConfetti(60);
      playUnlockFanfare();
      for (let i = 0; i < 7; i++) {
        setTimeout(() => {
          spawnFloatingHeart(
            window.innerWidth * (0.25 + Math.random() * 0.5),
            window.innerHeight * (0.4 + Math.random() * 0.3)
          );
        }, i * 110);
      }
    });
  }
}

function spawnFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  const emojis = ['💖', '💕', '✨', '🌸', '💝', '🥰'];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = `${x - 15}px`;
  heart.style.top = `${y - 20}px`;
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 1200);
}

document.addEventListener('DOMContentLoaded', initLoveReasons);
