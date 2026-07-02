import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dynamic 3D Parallax Tilt Effect for React Dashboard Cards
try {
  const applyTiltEffect = (card) => {
    if (card._tilt_registered) return;
    card._tilt_registered = true;
    
    card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out';
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / xc; // -1 to 1
      const dy = (y - yc) / yc; // -1 to 1
      
      card.style.transform = `translateY(-6px) scale(1.01) rotateY(${dx * 2.0}deg) rotateX(${-dy * 2.0}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1) rotateY(0) rotateX(0)';
    });
  };

  const scanAndApply = () => {
    const targets = document.querySelectorAll('.glass-card, .glow-hover, div[class*="shadow-sm"], div[class*="shadow-md"]');
    targets.forEach(applyTiltEffect);
  };
  
  // Watch DOM additions dynamically to apply to new routes/views
  const observer = new MutationObserver(scanAndApply);
  observer.observe(document.body, { childList: true, subtree: true });
  
  setTimeout(scanAndApply, 100);
} catch (e) {
  console.warn("3D card tilt registration failed:", e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
