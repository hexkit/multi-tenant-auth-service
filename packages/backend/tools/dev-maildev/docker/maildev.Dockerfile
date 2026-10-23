FROM node:24.22.1-alpine

RUN npm i -g maildev@2.2.1

CMD maildev
