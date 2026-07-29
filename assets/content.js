
(function(){
  var html=document.documentElement;
  var saved=localStorage.getItem('theme')||'dark';
  html.setAttribute('data-theme',saved);
  var btn=document.getElementById('themeBtn');
  if(btn){btn.textContent=saved==='dark'?'🌙':'☀️';
    btn.addEventListener('click',function(){
      var cur=html.getAttribute('data-theme');
      var next=cur==='dark'?'light':'dark';
      html.setAttribute('data-theme',next);localStorage.setItem('theme',next);
      btn.textContent=next==='dark'?'🌙':'☀️';
      if(window.mermaid){try{mermaid.initialize({startOnLoad:true,theme:next});
        document.querySelectorAll('.mermaid').forEach(function(el){try{mermaid.render('m'+(Math.random()+'').slice(2),el.textContent,function(svg){el.innerHTML=svg;});}catch(e){}});}catch(e){}}
    });
  }
  var links=document.querySelectorAll('.toc-link');
  var sections=Array.prototype.map.call(links,function(l){return document.querySelector(l.getAttribute('href'));});
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(l){l.classList.remove('active');});
          var id='#'+e.target.id;
          var act=document.querySelector('.toc-link[href="'+id+'"]');
          if(act)act.classList.add('active');
        }
      });
    },{rootMargin:'-20% 0px -70% 0px'});
    sections.forEach(function(s){if(s)obs.observe(s);});
  }
})();
