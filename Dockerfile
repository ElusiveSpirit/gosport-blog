FROM jekyll/jekyll

# Set up container
RUN mkdir -p /app

WORKDIR /app

ADD Gemfile /app
ADD Gemfile.lock /app
RUN bundle install


EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--watch"]
