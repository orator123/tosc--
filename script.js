/*
  script.js — UI helpers for index.html
  - showSection(id): show page section
  - login(): demo login (client-side only)
  - calculateRemaining(): simple budget calc
  - theme switching: minimal, friendly, high-contrast (persisted)
*/
(function(){
  'use strict';

  const sections = Array.from(document.querySelectorAll('main section'));
  const navLinks = Array.from(document.querySelectorAll('header nav a'));

  function showSection(id){
    sections.forEach(s=>{
      s.id === id ? s.classList.add('visible') : s.classList.remove('visible');
    });
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('onclick')?.includes(id));
    });
  }

  window.showSection = showSection; // keep global for inline onclick in HTML

  function login(){
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMessage');
    if(!u || !p){
      msg.textContent = 'Please enter username and password.';
      msg.style.color = 'var(--danger)';
      return;
    }
    // demo-only: show success message
    msg.textContent = `Welcome, ${u}. (This is a demo login.)`;
    msg.style.color = 'var(--primary)';
    // optionally show calculator after login
    showSection('calculator');
  }

  window.login = login;

  function calculateRemaining(){
    const total = Number(document.getElementById('totalBudget').value);
    const used = Number(document.getElementById('usedBudget').value);
    const out = document.getElementById('result');
    if(isNaN(total) || isNaN(used)){
      out.textContent = 'Please enter valid numbers.';return;
    }
    const remaining = total - used;
    const pct = total>0 ? Math.max(0,Math.round((remaining/total)*100)) : 0;
    out.textContent = `Remaining: $${remaining.toFixed(2)} (${pct}% of total)`;
  }

  window.calculateRemaining = calculateRemaining;

  /* Theme handling: create a small UI in header */
  const themes = ['minimal','friendly','high-contrast'];
  function setTheme(name){
    document.body.classList.remove('theme-friendly','theme-high-contrast');
    if(name === 'friendly') document.body.classList.add('theme-friendly');
    if(name === 'high-contrast') document.body.classList.add('theme-high-contrast');
    localStorage.setItem('toc-theme', name);
    // update active state on buttons
    document.querySelectorAll('.theme-btn').forEach(btn=>{
      btn.setAttribute('aria-pressed', btn.dataset.theme === name ? 'true' : 'false');
    });
  }

  function restoreTheme(){
    const t = localStorage.getItem('toc-theme') || 'minimal';
    setTheme(t);
  }

  function createThemeSwitcher(){
    const sw = document.createElement('div');
    sw.className = 'theme-switcher';
    sw.setAttribute('role','toolbar');
    sw.setAttribute('aria-label','Theme switcher');

    themes.forEach(theme=>{
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'theme-btn';
      b.dataset.theme = theme;
      b.textContent = theme.replace('-',' ');
      b.addEventListener('click', ()=> setTheme(theme));
      sw.appendChild(b);
    });

    // append to header (right side)
    const header = document.querySelector('header');
    header.appendChild(sw);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // initialize: hide all sections then show the visible one
    sections.forEach(s=> s.classList.remove('visible'));
    const initial = document.querySelector('main section.visible') || sections[0];
    if(initial) initial.classList.add('visible');

    // wire up nav inline onclicks to update active state
    navLinks.forEach(a=> a.addEventListener('click', ()=>{
      // small timeout because showSection called inline
      setTimeout(()=>{
        navLinks.forEach(link=> link.classList.toggle('active', link === a));
      },10);
    }));

    createThemeSwitcher();
    restoreTheme();
  });
})();
