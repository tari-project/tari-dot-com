.phony: install
install:
	bundle install

.phony: serve
serve:
	bundle exec jekyll serve

.phony: build
build:
	bundle exec jekyll build
