FROM amberframework/amber:v0.6.7

WORKDIR /app

COPY shard.* /app/
RUN crystal deps

ADD . /app

CMD amber watch
