FROM node:12

WORKDIR /usr/src/help-o-matic

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "index.js"]
