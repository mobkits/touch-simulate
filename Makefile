test:
	@webpack-dev-server 'mocha!./test/test.js' --hot --inline --devtool eval

doc:
	@ghp-import example -n -p

test-karma:
	@karma start

.PHONY: test
