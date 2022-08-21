FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

ENV REACT_APP_BACKEND_URL https://api.schniepp.ch

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build" ]