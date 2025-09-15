# -*- encoding: utf-8 -*-
# stub: jekyll-feed 0.11.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-feed".freeze
  s.version = "0.11.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ben Balter".freeze]
  s.date = "2018-09-09"
  s.email = ["ben.balter@github.com".freeze]
  s.homepage = "https://github.com/jekyll/jekyll-feed".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "2.7.7".freeze
  s.summary = "A Jekyll plugin to generate an Atom feed of your Jekyll posts".freeze

  s.installed_by_version = "3.6.9".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.3".freeze])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.15".freeze])
  s.add_development_dependency(%q<nokogiri>.freeze, ["~> 1.6".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 12.0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0".freeze])
  s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.57.2".freeze])
  s.add_development_dependency(%q<typhoeus>.freeze, [">= 0.7".freeze, "< 2.0".freeze])
end
