# 게시판으로 배우는 DB & SQL

직접 만든 게시판을 해부하면서 데이터베이스 설계부터 실전 쿼리까지 학습하는 프로젝트입니다.

## 실습 환경 준비

### 사전 요구사항

- Node.js 22.5+ (`node:sqlite` 내장 모듈 사용)
- SQLite3 CLI — `make seed` / `make reset` 실행 시 필요

```bash
# macOS — 기본 내장, 별도 설치 불필요

# Ubuntu/Debian
sudo apt install sqlite3

# Windows (winget)
winget install SQLite.SQLite

# Windows (Chocolatey)
choco install sqlite
```

### 설치 및 실행

```bash
# 의존성 설치 (서버 + 클라이언트)
make install

# 개발 서버 실행 (서버 + 클라이언트 동시)
make dev
```

| 서비스     | 주소                  |
| ---------- | --------------------- |
| 클라이언트 | http://localhost:3001 |
| API 서버   | http://localhost:4000 |

### DB 더미 데이터

```bash
# 더미 데이터 삽입 (유저 20명 · 게시글 100개 · 댓글 200개)
make seed

# 데이터 초기화
make reset

# 초기화 후 재삽입
make reset && make seed
```

### 기타 명령어

```bash
make server   # 서버만 실행
make client   # 클라이언트만 실행
make stop     # 실행 중인 서버 종료
```

## 학습 자료

`index.html`을 브라우저로 열면 학습 허브 페이지에 접근할 수 있습니다.

| 순서   | 문서                        | 내용                                           |
| ------ | --------------------------- | ---------------------------------------------- |
| Step 1 | `docs/db-design.html`       | 데이터베이스 설계 — ERD, 테이블 구조           |
| Step 2 | `docs/sql-concepts.html`    | SELECT 쿼리 작성법 — 실행 순서, JOIN, GROUP BY |
| Step 3 | `docs/select-practice.html` | SELECT 실습 25문제                             |
| Step 4 | `docs/service-queries.html` | 서비스 실사용 쿼리 14개 분석                   |

## 프로젝트 구조

```
board-example/
├── Makefile
├── index.html          # 학습 허브
├── docs/               # 학습 문서
├── client/             # React (Vite)
└── server/             # Express + SQLite
    ├── board.db
    └── seed.sql
```
