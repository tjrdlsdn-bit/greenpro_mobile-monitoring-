/* GreenPro 홈페이지 — 공통 스크립트 */

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
  function countUp(el){
    var to = +el.dataset.to, st = null;
    function step(t){
      if(!st) st = t;
      var p = Math.min((t-st)/1100, 1);
      el.textContent = Math.floor(p*to).toLocaleString('en-US');
      if(p<1) requestAnimationFrame(step); else el.textContent = to.toLocaleString('en-US');
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting && !e.target.dataset.done){
        e.target.dataset.done = 1;
        reduce ? (e.target.textContent = (+e.target.dataset.to).toLocaleString('en-US')) : countUp(e.target);
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
