FROM node:alpine3.11

LABEL description="Docker image for frontend react app"

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]