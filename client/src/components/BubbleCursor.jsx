'use client';
import React, { useEffect, useRef } from 'react';
class Particle {
  lifeSpan;
  initialLifeSpan;
  velocity;
  position;
  baseDimension;
  constructor(x, y) {
    this.initialLifeSpan = Math.floor(Math.random() * 60 + 60);
    this.lifeSpan = this.initialLifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
      y: -0.4 + Math.random() * -1,
    };
    this.position = { x, y };
    this.baseDimension = 20;
  }
  update(context) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    this.velocity.y -= Math.random() / 600;
    this.lifeSpan--;
    const scale =
      0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
    const opacity = this.lifeSpan / this.initialLifeSpan;
    context.fillStyle = `rgba(58, 146, 197, ${opacity})`;
    context.strokeStyle = `rgba(30, 100, 150, 1)`;
    context.lineWidth = 3;
    context.beginPath();
    context.arc(
      this.position.x - (this.baseDimension / 2) * scale,
      this.position.y - this.baseDimension / 2,
      this.baseDimension * scale,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.fill();
    context.closePath();
  }
}
const BubbleCursor = ({ wrapperElement }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  useEffect(() => {
    let canvas = null;
    let context = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const init = () => {
      canvas = canvasRef.current;
      if (!canvas) return;
      
      context = canvas.getContext('2d');
      if (!context) return;
      
      // Force the canvas to be visible and cover the screen
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      canvas.style.backgroundColor = 'transparent';

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Ensure canvas is in the body
      if (!canvas.parentElement) {
        document.body.appendChild(canvas);
      }

      console.log('Canvas initialized:', canvas.width, 'x', canvas.height);
      bindEvents();
      loop();
    };
    const bindEvents = () => {
      const element = wrapperElement || document.body;
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchstart', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize);
    };
    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvasRef.current) return;
      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY);
        }
      }
    };
    const onMouseMove = (e) => {
      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }
      // Only add a bubble 30% of the time
      if (Math.random() > 0.7) {
        addParticle(cursorRef.current.x, cursorRef.current.y);
      }
    };
    const addParticle = (x, y) => {
      console.log("Bubble created at:", x, y);
      particlesRef.current.push(new Particle(x, y));
    };
    const updateParticles = () => {
      if (!canvas || !context) return;
      if (particlesRef.current.length === 0) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }
      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    init();
    return () => {
      if (canvas) {
        canvas.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const element = wrapperElement || document.body;
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [wrapperElement]);
  return <canvas ref={canvasRef} />;
};
export default BubbleCursor;
