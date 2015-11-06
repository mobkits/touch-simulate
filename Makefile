webpack:
	@webpack-dev-server 'mocha!./test/test.js' --hot --inline

test:
	@karma start

.PHONY: test
