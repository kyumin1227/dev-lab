.PHONY: install dev server client stop seed reset

install:
	cd server && npm install
	cd client && npm install

dev:
	@trap 'kill 0' SIGINT; \
	cd server && npm run dev & \
	cd client && npm run dev & \
	wait

server:
	cd server && npm run dev

client:
	cd client && npm run dev

stop:
	@lsof -ti:4000,3001 | xargs kill -9 2>/dev/null || true
	@echo "서버 종료 완료"

seed:
	sqlite3 server/board.db < server/seed.sql

reset:
	sqlite3 server/board.db "DELETE FROM comments; DELETE FROM posts; DELETE FROM users; DELETE FROM sqlite_sequence WHERE name IN ('users','posts','comments');"
	@echo "DB 초기화 완료"
