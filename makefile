.PHONY: test

test:
	@if [ ! -d "demo/node_modules" ]; then \
		cd demo && npm install; \
	fi

	@cd demo && npm run dev

clean:
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf dist
	rm -rf demo/node_modules
	rm -rf demo/package-lock.json
