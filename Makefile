.phony: install
install:
	bundle install

.phony: serve
serve:
	bundle exec jekyll serve --future

.phony: build
build:
	bundle exec jekyll build
