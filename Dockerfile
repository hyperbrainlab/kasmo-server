FROM node:18

RUN mkdir -p /app

WORKDIR /app

COPY . .

COPY serviceAccountKey.json /app/serviceAccountKey.json

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]