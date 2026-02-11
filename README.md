# Jacob Portfolio

Jacob의 개인 포트폴리오 웹사이트입니다. 게임과 AI 산업에 집중하는 벤처 캐피탈리스트로서의 경력, 프로젝트, 그리고 글을 소개합니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Animation**: Motion (Framer Motion)
- **Content**: MDX (next-mdx-remote + Shiki)
- **i18n**: next-intl (한국어/영어)
- **Dark Mode**: next-themes
- **Forms**: Formspree + react-hot-toast

## 주요 기능

- 🌐 **다국어 지원**: 한국어(기본) / 영어
- 🌙 **다크 모드**: 시스템 설정 연동
- 📝 **블로그**: MDX 기반, 코드 하이라이팅, 목차 자동 생성
- 📧 **연락처 폼**: Formspree 연동, 프로젝트 제안 폼
- ♿ **접근성**: WCAG 2.1 AA 준수
- 🔍 **SEO**: 메타태그, OG 이미지, sitemap, robots.txt

## 시작하기

### 사전 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/your-username/jacob-portfolio.git
cd jacob-portfolio
npm install
```

### 환경 변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 필요한 값을 입력:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_FORMSPREE_CONTACT_ID=your_contact_form_id
NEXT_PUBLIC_FORMSPREE_PROPOSAL_ID=your_proposal_form_id
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 빌드

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
├── content/
│   └── blog/           # MDX 블로그 포스트
├── messages/
│   ├── ko.json         # 한국어 번역
│   └── en.json         # 영어 번역
├── public/
│   ├── favicon.ico     # 파비콘
│   └── icon.svg        # SVG 아이콘
├── src/
│   ├── app/
│   │   ├── [locale]/   # 다국어 라우트
│   │   ├── layout.tsx  # 루트 레이아웃
│   │   ├── sitemap.ts  # 사이트맵 생성
│   │   ├── robots.ts   # robots.txt 생성
│   │   └── manifest.ts # PWA 매니페스트
│   ├── components/
│   │   ├── layout/     # Header, Footer
│   │   ├── providers/  # Theme, Toast
│   │   └── ui/         # UI 컴포넌트
│   ├── data/           # 정적 데이터 (경력, 프로젝트)
│   ├── i18n/           # 다국어 설정
│   └── lib/            # 유틸리티 함수
└── package.json
```

## 페이지

| 경로 | 설명 |
|------|------|
| `/` | 홈 (Hero 섹션) |
| `/about` | 소개 |
| `/experience` | 경력 |
| `/writing` | 블로그 |
| `/projects` | 프로젝트 |
| `/contact` | 연락처 & 제안 폼 |

## 블로그 포스트 작성

`content/blog/` 폴더에 MDX 파일을 추가:

```mdx
---
title: "포스트 제목"
date: "2024-01-01"
description: "포스트 설명"
tags: ["태그1", "태그2"]
---

# 본문 내용

마크다운 문법을 사용할 수 있습니다.
```

## 배포

### 환경 변수 목록

배포 전 다음 환경 변수를 설정해야 합니다:

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL (예: https://jacob.dev) | ✅ |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Formspree 연락 폼 ID | 선택 |
| `NEXT_PUBLIC_FORMSPREE_PROPOSAL_ID` | Formspree 제안 폼 ID | 선택 |

### Vercel (권장)

Next.js 공식 플랫폼으로 가장 쉽고 빠른 배포가 가능합니다.

#### 방법 1: Vercel 대시보드

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/jacob-portfolio)

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택 (jacob-portfolio)
4. 환경 변수 설정:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app`
5. "Deploy" 클릭
6. 배포 완료 후 도메인 확인

#### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포 (프로덕션)
vercel --prod

# 환경 변수 설정
vercel env add NEXT_PUBLIC_SITE_URL
```

#### 커스텀 도메인 연결 (Vercel)

1. Vercel 대시보드 → 프로젝트 선택 → Settings → Domains
2. 도메인 입력 (예: `jacob.dev`)
3. DNS 설정 안내에 따라 레코드 추가:
   - **A 레코드**: `76.76.19.19`
   - **CNAME 레코드**: `cname.vercel-dns.com`
4. SSL 인증서 자동 발급 (몇 분 소요)
5. `NEXT_PUBLIC_SITE_URL` 환경 변수를 새 도메인으로 업데이트

---

### Netlify (대안)

#### 방법 1: Netlify 대시보드

1. [Netlify](https://netlify.com)에 GitHub 계정으로 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정 확인:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 환경 변수 설정 (Site settings → Environment variables)
6. "Deploy site" 클릭

#### 방법 2: Netlify CLI

```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 로그인
netlify login

# 사이트 연결
netlify init

# 배포
netlify deploy --prod
```

#### 커스텀 도메인 연결 (Netlify)

1. Netlify 대시보드 → Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 후 DNS 설정:
   - **A 레코드**: `75.2.60.5`
   - **CNAME 레코드**: `your-site.netlify.app`
4. HTTPS 자동 활성화

---

### 수동 배포 (기타 플랫폼)

```bash
# 빌드
npm run build

# Node.js 서버로 실행
npm run start

# 또는 PM2로 실행
pm2 start npm --name "jacob-portfolio" -- start
```

포트 기본값: 3000 (변경: `PORT=8080 npm run start`)

## 라이선스

MIT License

## 연락처

- Email: hello@jacob.com
- GitHub: [@jacob](https://github.com)
- LinkedIn: [Jacob](https://linkedin.com)
