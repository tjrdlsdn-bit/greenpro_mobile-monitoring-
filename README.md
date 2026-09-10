# 그린프로 홈페이지

㈜그린프로(태양광 정부지원사업 전문 컨설팅) 공식 홈페이지. 프레임워크 없는 **정적 사이트**입니다.

| 항목 | 값 |
|---|---|
| 배포 주소 | https://greenpro-mobile-monitoring.vercel.app/ |
| 저장소 | https://github.com/tjrdlsdn-bit/greenpro_mobile-monitoring- |
| 배포 방식 | `main` 브랜치 push → Vercel 자동 재배포 (1~2분) |
| 최종 도메인 | greenpro.co.kr (연결 예정) |

---

## 다른 컴퓨터에서 이어받기

```bash
git clone https://github.com/tjrdlsdn-bit/greenpro_mobile-monitoring-.git
cd greenpro_mobile-monitoring-
git config user.name "석인우"
git config user.email "tjrdlsdn@gmail.com"
```

그다음 Claude Code(데스크톱 앱 "Code" 탭)에서 이 폴더를 열면 됩니다.
`CLAUDE.md`에 현재 진행 상황과 작업 규칙이 정리되어 있어 그대로 이어서 작업할 수 있습니다.

> 첫 `git push` 때 GitHub 로그인 창이 한 번 뜹니다. 로그인하면 이후에는 자동입니다.

## 폴더 구성

```
index.html         홈
about.html         회사소개
business.html      사업영역
record.html        실적·사례
contact.html       문의하기
privacy.html       개인정보처리방침
sitemap.xml        SEO
robots.txt         SEO
assets/css/style.css   공통 디자인 (모든 페이지 공용)
assets/js/main.js      공통 스크립트 (스크롤·메뉴·카운트업·문의폼)
assets/img/            favicon, 시공 사진
docs/                  기획안·인수인계·개인정보처리방침 전문
CLAUDE.md          ← Claude Code가 먼저 읽는 작업 규칙 (진행 상황 포함)
```

## 로컬에서 미리보기

```bash
npx serve .
```
→ http://localhost:8000

> 수정했는데 화면이 안 바뀌면 브라우저 캐시 때문입니다. `Ctrl+Shift+R`로 강력 새로고침하세요.

## 수정 → 배포 흐름

```bash
git add .
git commit -m "수정 내용"
git push origin main
```
push하면 Vercel이 자동으로 재배포합니다. 별도 배포 명령은 필요 없습니다.

## 남은 작업

`CLAUDE.md`의 "7. 아직 안 된 것" 참고. 요약하면:

1. Formspree 확인 이메일 클릭 (안 하면 문의가 이메일로 전달되지 않음)
2. greenpro.co.kr 도메인 연결 — Vercel Domains 추가 → 후이즈에서 A/CNAME 등록
   ⚠️ "그린프로" 구글 검색 1위 유지가 중요하니 URL 구조·메타는 크게 바꾸지 말 것
3. 구글 워크스페이스로 info@greenpro.co.kr 개설 (DNS 연결 시점에 MX/TXT 함께 등록)
4. 사업영역 "대상별 안내" 섹션 재작성
