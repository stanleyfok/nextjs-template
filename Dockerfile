FROM node:8.9.4

ENV APP_DIR=/app

COPY package.json $APP_DIR/package.json

RUN cd $APP_DIR    \
    && npm install \
    && npm install -g forever

COPY . $APP_DIR

WORKDIR $APP_DIR

CMD forever -a -c "npm start" -o /tmp/out.log -e /tmp/err.log .
