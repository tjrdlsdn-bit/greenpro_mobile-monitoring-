/* GreenPro 홈페이지 — 공통 스크립트 */

// 새로고침·뒤로가기 시 항상 첫 화면부터 보이도록 (브라우저의 스크롤 위치 복원 끄기)
if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }

// 홈 화면: 마우스 휠 한 번에 다음 섹션(한 화면)씩 이동
(function(){
  if(!document.querySelector('.hero.sec')) return; // 홈에서만 동작
  var main = document.querySelector('main');
  if(!main) return;
  var blocks = Array.prototype.slice.call(main.children);
  var footer = document.querySelector('footer');
  if(footer) blocks.push(footer);
  if(blocks.length < 2) return;

  var jumping = false;

  function headerH(){
    var hd = document.querySelector('header');
    return hd ? hd.getBoundingClientRect().height : 0;
  }
  function stops(){
    var offset = headerH();
    return blocks.map(function(el){
      return Math.max(0, Math.round(window.scrollY + el.getBoundingClientRect().top - offset));
    });
  }

  window.addEventListener('wheel', function(e){
    if(jumping || e.ctrlKey || !e.deltaY) return; // ctrl+휠(확대/축소)은 그대로 둠
    var down = e.deltaY > 0;
    var y = window.scrollY;
    if(!down && y <= 2) return;
    var list = stops();
    var step = Math.max(200, window.innerHeight - headerH());
    var minGap = Math.max(60, Math.round(window.innerHeight * 0.15)); // 너무 짧은 이동은 건너뜀
    var target = null;
    if(down){
      for(var i=0;i<list.length;i++){ if(list[i] > y + minGap){ target = list[i]; break; } }
      if(target === null) return; // 마지막 섹션 아래는 기본 스크롤에 맡김
      // 섹션이 한 화면보다 훨씬 길면 한 화면씩만 이동해 내용을 건너뛰지 않게 함
      if(target - y > step * 1.35) target = y + step;
    } else {
      for(var j=list.length-1;j>=0;j--){ if(list[j] < y - minGap){ target = list[j]; break; } }
      if(target === null) target = 0;
      if(y - target > step * 1.35) target = y - step;
      if(target < 0) target = 0;
    }
    var maxY = document.documentElement.scrollHeight - window.innerHeight;
    if(target > maxY) target = maxY;
    if(Math.abs(target - y) < 2) return; // 더 이동할 곳이 없으면 기본 동작에 맡김
    e.preventDefault();
    jumping = true;
    var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    window.scrollTo({top:target, behavior: reduce ? 'auto' : 'smooth'});
    setTimeout(function(){ jumping = false; }, 650);
  }, {passive:false});
})();

// 모바일 메뉴 토글
(function(){
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  if(burger && mmenu){
    burger.addEventListener('click', function(){ mmenu.classList.toggle('open'); });
  }
})();

// 숫자 카운트업 (화면에 보일 때 1회)
(function(){
  var nums = document.querySelectorAll('.num[data-to]');
  if(!nums.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  function fmt(v, decimals){
    return decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString('en-US');
  }
  function countUp(el){
    var to = +el.dataset.to, st = null;
    var decimals = (el.dataset.to.split('.')[1] || '').length;
    function step(t){
      if(!st) st = t;
      var p = Math.min((t-st)/1100, 1);
      el.textContent = fmt(p*to, decimals);
      if(p<1) requestAnimationFrame(step); else el.textContent = fmt(to, decimals);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting && !e.target.dataset.done){
        e.target.dataset.done = 1;
        var decimals = (e.target.dataset.to.split('.')[1] || '').length;
        reduce ? (e.target.textContent = fmt(+e.target.dataset.to, decimals)) : countUp(e.target);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.4});
  Array.prototype.forEach.call(nums, function(n){ io.observe(n); });
})();

// 문의 폼
// ▶ 배포 시: 아래 FORM_ENDPOINT 를 Formspree(또는 서버리스) 주소로 바꾸면 실제 전송됩니다.
//   예) var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
//   비워두면 지금처럼 "접수 완료" 안내만 표시됩니다(프론트 확인용).
(function(){
  var FORM_ENDPOINT = "https://formspree.io/f/mppzddoq";
  var form = document.getElementById('cform');
  if(!form) return;
  var ok = document.getElementById('formok');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var hp = form.querySelector('[name=_gotcha]');
    if(hp && hp.value){ done(); return; } // 허니팟 필드가 채워짐 = 봇. 실제 전송 없이 성공한 것처럼만 표시.
    if(FORM_ENDPOINT){
      var data = new FormData(form);
      fetch(FORM_ENDPOINT, {method:'POST', body:data, headers:{'Accept':'application/json'}})
        .then(function(r){ if(r.ok){ done(); } else { alert('전송에 실패했습니다. 전화로 문의해 주세요.'); } })
        .catch(function(){ alert('전송에 실패했습니다. 전화로 문의해 주세요.'); });
    } else {
      done();
    }
  });
  function done(){
    if(ok) ok.style.display = 'block';
    var btn = form.querySelector('button[type=submit]');
    if(btn) btn.textContent = '접수 완료';
    form.reset();
  }
})();
