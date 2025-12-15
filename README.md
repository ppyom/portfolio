# Portfolio

관리 기능을 포함한 개인 포트폴리오 웹 애플리케이션

## 📑 개요

다른 사람들에게 나의 포트폴리오를 보여주고, 내가 관리자 페이지에서 컨텐츠를 관리하는 기능을 제공하는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 포트폴리오 조회

- 자기소개, 보유 스킬, 프로젝트 목록 조회
- DarkMode 지원

### 관리자 기능

> [!IMPORTANT]
> 회원가입 페이지는 별도로 제공되지 않아 신규 계정 생성은 Postman 등을 통해 API 호출로 진행해야하며, DB에서 `admin` 값을 직접 수정해야 관리자 권한 부여 가능합니다.

- 로그인 / 인증 기반 접근 제어 (NextAuth, proxy.ts)
- 프로젝트 관리 (CRUD)

## ⚙️ 설치 및 실행

### 1. 클론 및 설치

```bash
git clone https://github.com/ppyom/portfolio.git
cd portfolio
npm install
```

### 2. 환경변수 설정

```
# 🔐 인증 관련
BCRYPT_ROUND=<your-bcrypt-round> (default: 10)
NEXTAUTH_SECRET=<your-nextauth-secret>

# ⚡ Supabase
DATABASE_URL=<your-supabase-url>

# ☁️ Cloudflare R2
CLOUDFLARE_REGION=<your-cloudflare-region> (default: auto)
CLOUDFLARE_ACCESS_KEY=<your-cloudflare-access-key>
CLOUDFLARE_SECRET_KEY=<your-cloudflare-secret-key>
CLOUDFLARE_ENDPOINT=<your-cloudflare-endpoint>
CLOUDFLARE_BUCKET=<your-cloudflare-bucket>
CLOUDFLARE_PUBLIC_URL=<your-cloudflare-public-url>
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
npm start
```

## 📚 기술 스택

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, ShadcnUI
- **Backend / DB**: Supabase(Postgres), Drizzle ORM
- **인증**: NextAuth
- **이미지 관리**: Cloudflare R2
- **폼 유효성 검사**: react-hook-form, zod
