
// content.js - 浅色糖果主题
(function(){
  var html=document.documentElement;
  html.setAttribute('data-theme','light');

  // 移动端 TOC
  var sidebar=document.querySelector('.doc-sidebar');
  if(sidebar){
    var overlay=document.createElement('div');
    overlay.className='doc-toc-overlay';
    document.body.appendChild(overlay);

    var tocBtn=document.createElement('button');
    tocBtn.className='btn-toc-toggle';
    tocBtn.title='目录';
    tocBtn.textContent='☰';
    var navRight=document.querySelector('.doc-nav-right');
    if(navRight) navRight.prepend(tocBtn);

    function openToc(){sidebar.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden'}
    function closeToc(){sidebar.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow=''}
    tocBtn.addEventListener('click',function(){sidebar.classList.contains('open')?closeToc():openToc()});
    overlay.addEventListener('click',closeToc);
    sidebar.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setTimeout(closeToc,200)})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeToc()});
  }

  // 回到顶部
  var btt=document.createElement('button');
  btt.className='back-to-top';
  btt.textContent='\u2191';
  btt.title='回到顶部';
  document.body.appendChild(btt);
  btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  window.addEventListener('scroll',function(){btt.classList.toggle('show',window.scrollY>400)});

  // TOC 高亮
  var links=document.querySelectorAll('.toc-link');
  var sections=Array.prototype.map.call(links,function(l){return document.querySelector(l.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(l){l.classList.remove('active')});
          var id='#'+e.target.id;
          var act=document.querySelector('.toc-link[href="'+id+'"]');
          if(act)act.classList.add('active');
        }
      });
    },{rootMargin:'-20% 0px -70% 0px'});
    sections.forEach(function(s){if(s)obs.observe(s)});
  }

  // 搜索快捷键 Ctrl+K
  document.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();window.location.href='../index.html#search';}
  });
})();
