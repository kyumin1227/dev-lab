.PHONY: install dev server client stop

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
