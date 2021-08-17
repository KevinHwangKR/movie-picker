FROM node:alpine3.11

LABEL description="Docker image for backend react app"

RUN mkdir -p /app/backend
WORKDIR /app/backend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]