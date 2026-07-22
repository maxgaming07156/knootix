/* ==========================================================================
   LENIS SMOOTH SCROLLING MINIFIED CORE
   ========================================================================== */
function t(t,e,i){return Math.max(t,Math.min(e,i))}var e=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let i=!1;if(this.duration&&this.easing){this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}else this.lerp?(this.value=function(t,e,i,s){return function(t,e,i){return(1-i)*t+i*e}(t,e,1-Math.exp(-i*s))}(this.value,this.to,60*this.lerp,e),Math.round(this.value)===this.to&&(this.value=this.to,i=!0)):(this.value=this.to,i=!0);i&&this.stop(),this.onUpdate?.(this.value,i)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:o,onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=r}};var i=class{constructor(t,e,{autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(...s){let o=this;clearTimeout(i),i=setTimeout((()=>{i=void 0,t.apply(o,s)}),e)}}(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},s=class{events={};emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t]?.(...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}},o=100/6,n={passive:!1},r=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,n),this.element.addEventListener("touchstart",this.onTouchStart,n),this.element.addEventListener("touchmove",this.onTouchMove,n),this.element.addEventListener("touchend",this.onTouchEnd,n)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new s;on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,n),this.element.removeEventListener("touchstart",this.onTouchStart,n),this.element.removeEventListener("touchmove",this.onTouchMove,n),this.element.removeEventListener("touchend",this.onTouchEnd,n)}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.options.touchMultiplier,o=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=1===s?o:2===s?this.window.width:1,i*=1===s?o:2===s?this.window.height:1,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},l=t=>Math.min(1,1.001-Math.pow(2,-10*t)),Lenis=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new e;emitter=new s;dimensions;virtualScroll;constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:s=t,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:h=.075,touchInertiaMultiplier:a=35,duration:c,easing:p,lerp:d=.1,infinite:u=!1,orientation:m="vertical",gestureOrientation:v="vertical",touchMultiplier:g=1,wheelMultiplier:w=1,autoResize:S=!0,prevent:f,virtualScroll:y,overscroll:E=!0,autoRaf:T=!1,anchors:z=!1,autoToggle:b=!1,allowNestedScroll:_=!1,__experimental__naiveDimensions:L=!1}={}){window.lenisVersion="1.3.4",t&&t!==document.documentElement||(t=window),"number"==typeof c&&"function"!=typeof p?p=l:"function"==typeof p&&"number"!=typeof c&&(c=1),this.options={wrapper:t,content:e,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:h,touchInertiaMultiplier:a,duration:c,easing:p,lerp:d,infinite:u,gestureOrientation:v,orientation:m,touchMultiplier:g,wheelMultiplier:w,autoResize:S,prevent:f,virtualScroll:y,overscroll:E,autoRaf:T,anchors:z,autoToggle:b,allowNestedScroll:_,__experimental__naiveDimensions:L},this.dimensions=new i(t,e,{autoResize:S}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new r(s,{touchMultiplier:g,wheelMultiplier:w}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}onScrollEnd=t=>{t instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||t.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};onTransitionEnd=t=>{if(t.propertyName.includes("overflow")){const t=this.isHorizontal?"overflow-x":"overflow-y",e=getComputedStyle(this.rootElement)[t];["hidden","clip"].includes(e)?this.stop():this.start()}};setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}onClick=t=>{const e=t.composedPath().find((t=>t instanceof HTMLAnchorElement&&(t.getAttribute("href")?.startsWith("#")||t.getAttribute("href")?.startsWith("/#")||t.getAttribute("href")?.startsWith("./#"))));if(e){const t=e.getAttribute("href");if(t){const e="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0;let i=`#${t.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(t)&&(i=0),this.scrollTo(i,e)}}};onPointerDown=t=>{1===t.button&&this.reset()};onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;const{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey)return;if(s.lenisStopPropagation)return;const o=s.type.includes("touch"),n=s.type.includes("wheel");this.isTouching="touchstart"===s.type||"touchmove"===s.type;const r=0===e&&0===i;if(this.options.syncTouch&&o&&"touchstart"===s.type&&r&&!this.isStopped&&!this.isLocked)return void this.reset();const l="vertical"===this.options.gestureOrientation&&0===i||"horizontal"===this.options.gestureOrientation&&0===e;if(r||l)return;let h=s.composedPath();h=h.slice(0,h.indexOf(this.rootElement));const a=this.options.prevent;if(h.find((t=>t instanceof HTMLElement&&("function"==typeof a&&a?.(t)||t.hasAttribute?.("data-lenis-prevent")||o&&t.hasAttribute?.("data-lenis-prevent-touch")||n&&t.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.checkNestedScroll(t,{deltaX:e,deltaY:i})))))return;if(this.isStopped||this.isLocked)return void s.preventDefault();if(!(this.options.syncTouch&&o||this.options.smoothWheel&&n))return this.isScrolling="native",this.animate.stop(),void(s.lenisStopPropagation=!0);let c=i;"both"===this.options.gestureOrientation?c=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===this.options.gestureOrientation&&(c=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&i>0||this.animatedScroll===this.limit&&i<0))&&(s.lenisStopPropagation=!0),s.preventDefault();const p=o&&this.options.syncTouch,d=o&&"touchend"===s.type&&Math.abs(c)>5;d&&(c=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+c,{programmatic:!1,...p?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(!1===this.isScrolling||"native"===this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout((()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()}),400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=t=>{const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:h=this.options.lerp,onStart:a,onComplete:c,force:p=!1,programmatic:d=!0,userData:u}={}){if(!this.isStopped&&!this.isLocked||p){if("string"==typeof e&&["top","left","start"].includes(e))e=0;else if("string"==typeof e&&["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):e instanceof HTMLElement&&e?.nodeType&&(t=e),t){if(this.options.wrapper!==window){const t=this.rootElement.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite){if(d){this.targetScroll=this.animatedScroll=this.scroll;const t=e-this.animatedScroll;t>this.limit/2?e-=this.limit:t<-this.limit/2&&(e+=this.limit)}}else e=t(0,e,this.limit);if(e===this.targetScroll)return a?.(this),void c?.(this);if(this.userData=u??{},s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},void requestAnimationFrame((()=>{this.dispatchScrollendEvent()}));d||(this.targetScroll=e),"number"==typeof n&&"function"!=typeof r?r=l:"function"==typeof r&&"number"!=typeof n&&(n=1),this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:r,lerp:h,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(t,e)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),d&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame((()=>{this.dispatchScrollendEvent()})),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame((()=>{this._preventNextNativeScrollEvent=!1}))}checkNestedScroll(t,{deltaX:e,deltaY:i}){const s=Date.now(),o=t._lenis??={};let n,r,l,h,a,c,p,d;const u=this.options.gestureOrientation;if(s-(o.time??0)>2e3){o.time=Date.now();const e=window.getComputedStyle(t);o.computedStyle=e;const i=e.overflowX,s=e.overflowY;if(n=["auto","overlay","scroll"].includes(i),r=["auto","overlay","scroll"].includes(s),o.hasOverflowX=n,o.hasOverflowY=r,!n&&!r)return!1;if("vertical"===u&&!r)return!1;if("horizontal"===u&&!n)return!1;a=t.scrollWidth,c=t.scrollHeight,p=t.clientWidth,d=t.clientHeight,l=a>p,h=c>d,o.isScrollableX=l,o.isScrollableY=h,o.scrollWidth=a,o.scrollHeight=c,o.clientWidth=p,o.clientHeight=d}else l=o.isScrollableX,h=o.isScrollableY,n=o.hasOverflowX,r=o.hasOverflowY,a=o.scrollWidth,c=o.scrollHeight,p=o.clientWidth,d=o.clientHeight;if(!n&&!r||!l&&!h)return!1;if(!("vertical"!==u||r&&h))return!1;if(!("horizontal"!==u||n&&l))return!1;let m,v,g,w,S,f;if("horizontal"===u)m="x";else if("vertical"===u)m="y";else{0!==e&&n&&l&&(m="x"),0!==i&&r&&h&&(m="y")}if(!m)return!1;if("x"===m)v=t.scrollLeft,g=a-p,w=e,S=n,f=l;else{if("y"!==m)return!1;v=t.scrollTop,g=c-d,w=i,S=r,f=h}return(w>0?v<g:v>0)&&S&&f}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){const t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};globalThis.Lenis=Lenis,globalThis.Lenis.prototype=Lenis.prototype;

// ============================================
// KNOOTIX — Premium Interactive Scripts
// ============================================

// --- Theme Toggle ---
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  if (label) label.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('knootix-theme', isDark ? 'light' : 'dark');
}

// Restore saved theme
(function() {
  const saved = localStorage.getItem('knootix-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (saved === 'light') {
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark';
    }
  }
})();

// --- Mobile Menu ---
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Active Nav Link ---
function updateActiveNavLink() {
  let currentPage = window.location.pathname.split('/').pop();
  // Strip .html for robust comparison
  currentPage = currentPage.replace('.html', '');
  if (!currentPage) currentPage = 'index';

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    let href = link.getAttribute('href').replace('.html', '');
    if (href === currentPage || (currentPage === '' && href === 'index')) {
      link.classList.add('active');
    }
  });
}

// --- Navbar Scroll Effects ---
(function() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
})();

// --- Scroll Reveal (Enhanced) ---
function handleScroll() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// --- Counter Animation ---
function animateCount(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.floor(target * easeOutCubic(progress));
    el.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

// Trigger counters on scroll
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCount(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => counterObserver.observe(el));
}

// --- Mouse Parallax (Hero) ---
(function() {
  const heroVisual = document.getElementById('heroVisual');
  if (!heroVisual) return;

  const floatCards = heroVisual.querySelectorAll('[data-parallax]');
  const showcaseMain = heroVisual.querySelector('.hero-showcase-main');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatCards.forEach(card => {
      const speed = parseFloat(card.dataset.parallax) * 40;
      const tx = x * speed;
      const ty = y * speed;
      card.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    if (showcaseMain) {
      const rx = y * 3;
      const ry = x * -3;
      showcaseMain.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });
})();

// --- FAQ Accordion ---
// Toggle is handled via onclick in HTML: onclick="this.classList.toggle('active')"
// Also handle service page FAQ items
document.querySelectorAll('.svc-faq-item').forEach(item => {
  item.addEventListener('click', () => {
    // Close others
    item.parentElement.querySelectorAll('.svc-faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// --- Card Tilt Effect ---
(function() {
  const tiltCards = document.querySelectorAll('.featured-card, .svc-portfolio-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = y * -6;
      const ry = x * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// --- Lazy Load Images ---
(function() {
  if ('loading' in HTMLImageElement.prototype) return; // Native lazy loading supported
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();

// --- Form Submit (Web3Forms) ---
async function handleFormSubmit() {
  const name = document.getElementById('cfName')?.value.trim();
  const email = document.getElementById('cfEmail')?.value.trim();
  const service = document.getElementById('cfService')?.value;
  const msg = document.getElementById('cfMessage')?.value.trim();
  const status = document.getElementById('formStatus');
  const submitBtn = document.querySelector('.submit-btn');

  if (!name || !email || !msg || !service) {
    if (status) {
      status.style.display = 'block';
      status.style.background = 'rgba(255,80,80,0.1)';
      status.style.border = '1px solid rgba(255,80,80,0.3)';
      status.style.color = '#ff8080';
      status.textContent = '⚠️ Please fill in all required fields.';
    }
    return;
  }

  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'db4ec93b-2da2-4505-911e-2a30f8195bf8',
        subject: 'New Contact Form Submission - Knootix Website',
        Name: name,
        Email: email,
        Service: service,
        Message: msg
      })
    });

    const result = await response.json();

    if (result.success) {
      status.style.display = 'block';
      status.style.background = 'var(--accent-glow)';
      status.style.border = '1px solid rgba(77,184,138,0.3)';
      status.style.color = 'var(--accent)';
      status.textContent = '✓ Message sent successfully! We\'ll be in touch soon.';

      document.getElementById('cfName').value = '';
      document.getElementById('cfEmail').value = '';
      document.getElementById('cfService').value = '';
      document.getElementById('cfMessage').value = '';
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    if (status) {
      status.style.display = 'block';
      status.style.background = 'rgba(255,80,80,0.1)';
      status.style.border = '1px solid rgba(255,80,80,0.3)';
      status.style.color = '#ff8080';
      status.textContent = '⚠️ Something went wrong. Please try again.';
    }
  } finally {
    submitBtn.textContent = originalBtnText;
    submitBtn.style.opacity = '1';
    submitBtn.disabled = false;
    setTimeout(() => {
      if (status) status.style.display = 'none';
    }, 5000);
  }
}

// --- AI Chat ---
function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const messages = document.getElementById('chatMessages');
  if (!messages) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  const typingMsg = document.createElement('div');
  typingMsg.className = 'msg bot typing';
  typingMsg.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typingMsg);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typingMsg.remove();
    let reply = 'Thanks for reaching out! You can drop an email at knootix@gmail.com or hit our WhatsApp for an immediate response.';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('service') || lowerText.includes('offer') || lowerText.includes('do you do')) {
      reply = 'We offer Video Editing, Graphic Design, Website Development, and Photography. Let us know which one you need help with!';
    } else if (lowerText.includes('video') || lowerText.includes('edit')) {
      reply = 'Our video editing covers brand films, cinematic reels, color grading, and VFX overlays for all social platforms.';
    } else if (lowerText.includes('design') || lowerText.includes('graphic') || lowerText.includes('logo')) {
      reply = 'For Graphic Design, we create brand identities, logos, marketing collateral, and full visual systems.';
    } else if (lowerText.includes('web') || lowerText.includes('site') || lowerText.includes('e-com') || lowerText.includes('develop')) {
      reply = 'We build custom, responsive websites, landing pages, and robust E-commerce platforms optimized for SEO.';
    } else if (lowerText.includes('photo') || lowerText.includes('shoot')) {
      reply = 'Our photography services range from product and commercial shoots to corporate headshots and event coverage.';
    } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
      reply = 'Pricing varies depending on your exact project scope. Please use the contact form and we\'ll get you a custom quote ASAP!';
    } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      reply = 'Hello there! How can we help your brand stand out today?';
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = reply;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

// ============================================
// INITIALIZE LENIS SMOOTH SCROLLING
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
});

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic');
  
  magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', function(e) {
      const position = magnet.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - window.scrollY - position.top - position.height / 2;
      
      // Move element slightly based on cursor position
      magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    magnet.addEventListener('mouseout', function(e) {
      magnet.style.transform = 'translate(0px, 0px)';
      magnet.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    magnet.addEventListener('mouseenter', function(e) {
      magnet.style.transition = 'none'; // Remove transition during hover for instant sticking
    });
  });
}

// ============================================
// THREE.JS HERO CANVAS
// ============================================
let threeJSAnimationId = null;
let threeJSMouseHandler = null;
let threeJSResizeHandler = null;

function initThreeJSHero() {
  // Cleanup previous instance to prevent Swup memory leaks
  if (threeJSAnimationId) cancelAnimationFrame(threeJSAnimationId);
  if (threeJSMouseHandler) document.removeEventListener('mousemove', threeJSMouseHandler);
  if (threeJSResizeHandler) window.removeEventListener('resize', threeJSResizeHandler);
  
  const canvas = document.getElementById('hero-3d');
  if (!canvas) return; // Only runs on pages with the hero canvas

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Geometry: Infinity Symbol
  class InfinityCurve extends THREE.Curve {
    constructor(scale = 1) {
      super();
      this.scale = scale;
    }
    getPoint(t, optionalTarget = new THREE.Vector3()) {
      const s = t * Math.PI * 2;
      const x = this.scale * (Math.sin(s) / (1 + Math.pow(Math.cos(s), 2)));
      const y = this.scale * (Math.sin(s) * Math.cos(s) / (1 + Math.pow(Math.cos(s), 2)));
      const z = Math.sin(s * 2) * (this.scale * 0.25);
      return optionalTarget.set(x, y, z);
    }
  }
  const path = new InfinityCurve(45);
  const geometry = new THREE.TubeGeometry(path, 200, 1.5, 16, true);
  
  // Material: Wireframe with Knootix Accent
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x4db88a, 
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const infinityMesh = new THREE.Mesh(geometry, material);
  
  // Position it behind the laptop, nicely centered
  infinityMesh.position.x = 0;
  infinityMesh.position.y = 0;
  infinityMesh.position.z = -40;
  
  // Initial tilt for a better 3D perspective
  infinityMesh.rotation.x = 0.3;
  infinityMesh.rotation.y = 0.4;
  
  scene.add(infinityMesh);
  camera.position.z = 10;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  threeJSMouseHandler = (e) => {
    mouseX = (e.clientX - window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2);
  };
  document.addEventListener('mousemove', threeJSMouseHandler);

  function animate() {
    threeJSAnimationId = requestAnimationFrame(animate);
    
    infinityMesh.rotation.x += 0.002;
    infinityMesh.rotation.y += 0.003;

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    infinityMesh.rotation.x += 0.05 * (targetY - infinityMesh.rotation.x);
    infinityMesh.rotation.y += 0.05 * (targetX - infinityMesh.rotation.y);

    renderer.render(scene, camera);
  }
  
  animate();

  threeJSResizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', threeJSResizeHandler);
}

// ============================================
// SWUP PAGE TRANSITIONS & LIFECYCLE
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initial load
  initMagneticButtons();
  initThreeJSHero();
  handleScroll();
  initCounters();
  updateActiveNavLink();

  // Initialize Swup
  if (typeof Swup !== 'undefined') {
    const swup = new Swup();

    // Re-run scripts on page transition
    swup.hooks.on('page:view', () => {
      initMagneticButtons();
      initThreeJSHero();
      handleScroll();
      initCounters();
      updateActiveNavLink();
      
      window.scrollTo(0, 0);
    });
  }
});
