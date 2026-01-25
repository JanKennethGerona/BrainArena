import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import bubbleVideo from '../assets/images/Icons/YTDown.com_YouTube_Spongebob-Bubble-Transition_Media_I50cWpN3G7Y_001_1080p.mp4';
import './BubbleTransition.css';

const BubbleTransition = () => {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const triggerBubbleTransition = useCallback((url) => {
    console.log('🫧 Bubble transition triggered to:', url);
    const overlay = overlayRef.current;
    const video = videoRef.current;
    
    if (!overlay || !video) {
      console.error('Overlay or video not found!');
      navigate(url);
      return;
    }

    // Show overlay and play video
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    
    // Reset and play video
    video.currentTime = 0;
    video.play().catch(err => {
      console.error('Video play failed:', err);
      navigate(url);
    });
    
    // Navigate halfway through the video while it keeps playing
    setTimeout(() => {
      console.log('Navigating to', url, 'while video continues...');
      navigate(url);
    }, 1500); // Navigate after 1.5 seconds (halfway)
    
    // Fade out and hide overlay when video ends
    const handleVideoEnd = () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
      }, 300);
    };
    
    video.onended = handleVideoEnd;
    
    // Fallback timeout
    setTimeout(handleVideoEnd, 3500);
  }, [navigate]);

  // Expose the trigger function globally
  React.useEffect(() => {
    window.triggerBubbleTransition = triggerBubbleTransition;
    return () => {
      delete window.triggerBubbleTransition;
    };
  }, [triggerBubbleTransition]);

  return (
    <div id="bubble-transition-overlay" ref={overlayRef}>
      <video 
        ref={videoRef}
        src={bubbleVideo}
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default BubbleTransition;
