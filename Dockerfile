# syntax=docker/dockerfile:1

FROM node:18.16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["npm", "run", "no-build-start"]