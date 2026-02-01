FROM node:24.13.0-alpine

RUN npm i -g maildev@2.2.1

CMD maildev
