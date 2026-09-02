# 그린프로 홈페이지 — 시작 & 배포 가이드

이 폴더는 **완성된 그린프로 홈페이지(5페이지)** 입니다. 그대로 배포하거나, Claude Code로 더 다듬은 뒤 배포하세요.

## 0. 폴더 구성
```
index.html         홈
about.html         회사소개
business.html      사업영역
record.html        실적·사례
contact.html       문의하기
privacy.html       개인정보처리방침
assets/css/style.css   공통 디자인
assets/js/main.js      공통 스크립트(메뉴·숫자·폼)
assets/img/            이미지 (시공 사진 넣는 곳)
CLAUDE.md          ← Claude Code가 먼저 읽는 작업 규칙
```

## 1. Claude Code로 열기
1. 이 폴더를 컴퓨터에 저장(압축 풀기).
2. Claude Code(데스크톱 앱 "Code" 탭)에서 이 폴더를 엽니다.
3. Claude Code가 `CLAUDE.md`를 자동으로 참고합니다. "홈페이지 다듬고 배포하고 싶어. CLAUDE.md 참고해줘"라고 시작하세요.

## 2. 로컬에서 미리보기
프레임워크 없는 정적 사이트라 바로 열립니다:
```
python3 -m http.server 8000
```
→ 브라우저에서 http://localhost:8000 (이때 진짜 Pretendard 폰트로 보입니다.)

## 3. 배포 전 채울 것 (중요)
- **문의 폼 연결**: `assets/js/main.js`의 `FORM_ENDPOINT`에 폼 서비스 주소 입력.
  - 가장 간단: [Formspree](https://formspree.io) 무료 가입 → 폼 만들고 받은 주소(`https://formspree.io/f/xxxx`)를 붙여넣기. 그러면 문의가 info@greenpro.co.kr로 옵니다.
- **시공 사진**: `assets/img/`에 사진 넣고, `record.html`·`index.html`의 `[ 시공 사진 ]` 부분 교체.
- (선택) favicon, sitemap.xml.

## 4. 배포 (GitHub → Vercel)
1. **GitHub**: 새 저장소 만들고 이 폴더를 push. (Claude Code에게 "GitHub에 올려줘" 하면 명령을 안내/실행해줍니다.)
2. **Vercel**: [vercel.com](https://vercel.com) 가입 → "New Project" → 그 GitHub 저장소 연결 → Deploy. (설정 특별히 없음, 정적 사이트 자동 인식.)
3. 배포되면 `xxxx.vercel.app` 임시 주소가 나옵니다. 여기서 먼저 확인.

## 5. 도메인 연결 (greenpro.co.kr)
> ⚠️ 그린프로는 "그린프로" 구글 검색 1위입니다. DNS 전환은 **마감 며칠 전 버퍼를 두고** 진행하고, 전환 후 검색 노출을 확인하세요.
1. Vercel 프로젝트 → Settings → Domains → `greenpro.co.kr` 추가.
2. Vercel이 알려주는 값(A 레코드 또는 CNAME)을 **후이즈(whois.co.kr)** 의 DNS 관리에서 등록. (네임서버를 Vercel로 바꾸는 방식도 안내됨.)
3. 반영까지 최대 수십 분~수 시간. HTTPS 인증서는 Vercel이 자동 발급.

## 6. 회사 이메일 (같은 시점에)
DNS를 만지는 이 시점에 **구글 워크스페이스**로 `info@greenpro.co.kr` 개설 + MX/TXT 레코드를 후이즈에 함께 등록하는 걸 권장. (지금 미리 하지 말고 DNS 연결 때 같이.)

## 문의/유지보수
배포 후 내용 수정은 파일 고쳐서 GitHub에 push하면 Vercel이 1~2분 내 자동 재배포합니다. 두 컴퓨터를 오갈 땐 push/pull로 동기화하세요.
