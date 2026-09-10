[ 이미지 폴더 안내 ]

현재 들어있는 파일
  favicon.svg               브라우저 탭 아이콘 (블루 배경 + 흰색 G)
  case-ds1.jpg              DS단석 1공장 (전북 군산 · 바이오에너지 · 1,800kW)
  case-chamfre-gunsan.jpg   참프레 군산공장 (전북 군산 · 육가공 · 1,650kW)
  case-jw.jpg               JW생명과학 물류동 (충남 당진 · 제약 · 800kW)

시공 사진을 추가하거나 교체할 때
1) 반드시 JPG로 넣으세요. PNG는 같은 사진도 용량이 3~7배 큽니다.
   변환 예시:  ffmpeg -i 원본.png -q:v 3 case-이름.jpg
2) 이 폴더에 저장한 뒤, index.html 과 record.html 의 카드 부분을 함께 수정합니다.
   <div class="ph"><img src="assets/img/case-이름.jpg" alt="설명"></div>
3) 카드 이미지는 가로로 잘려서 표시됩니다(object-fit: cover).
   가로로 넓은 사진이 잘 어울리고, 가로 600px 이상이면 충분합니다.

주의
- index.html 과 record.html 에 같은 카드가 중복되어 있습니다. 두 파일 모두 고쳐야 합니다.
- 변환 전 원본(*.jpg.png 등)은 .gitignore 로 제외되어 저장소에 올라가지 않습니다.
