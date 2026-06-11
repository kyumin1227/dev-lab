# 掲示板で学ぶ DB & SQL

自分で作成した掲示板を題材に、データベース設計から実践的なSQLクエリまで学習するプロジェクトです。

## 実習環境の準備

### 事前準備

* Node.js 22.5以上（`node:sqlite` 組み込みモジュールを使用）
* SQLite3 CLI（`make seed` / `make reset` 実行時に必要）

```bash
# macOS — 標準搭載のため追加インストール不要

# Ubuntu/Debian
sudo apt install sqlite3

# Windows (winget)
winget install SQLite.SQLite

# Windows (Chocolatey)
choco install sqlite
```

### インストールと起動

```bash
# 依存関係をインストール（サーバー + クライアント）
make install

# 開発サーバーを起動（サーバー + クライアント同時起動）
make dev
```

| サービス    | URL                   |
| ------- | --------------------- |
| クライアント  | http://localhost:3001 |
| APIサーバー | http://localhost:4000 |

### DBダミーデータ

```bash
# ダミーデータを投入（ユーザー20名・投稿100件・コメント200件）
make seed

# データを初期化
make reset

# 初期化後に再投入
make reset && make seed
```

### その他のコマンド

```bash
make server   # サーバーのみ起動
make client   # クライアントのみ起動
make stop     # 起動中のサーバーを停止
```

## 学習資料

ブラウザで `index.html` を開くと、学習ハブページにアクセスできます。

| 順番     | ドキュメント                      | 内容                                 |
| ------ | --------------------------- | ---------------------------------- |
| Step 1 | `docs/db-design.html`       | データベース設計 — ERD、テーブル構造              |
| Step 2 | `docs/sql-concepts.html`    | SELECTクエリの書き方 — 実行順序、JOIN、GROUP BY |
| Step 3 | `docs/select-practice.html` | SELECT演習 25問                       |
| Step 4 | `docs/service-queries.html` | 実サービスのクエリ14選の分析                    |

## プロジェクト構成

```text
board-example/
├── Makefile
├── index.html          # 学習ハブ
├── docs/               # 学習ドキュメント
├── client/             # React (Vite)
└── server/             # Express + SQLite
    ├── board.db
    └── seed.sql
```
