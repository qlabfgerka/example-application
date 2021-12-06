FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/angular-frontend /usr/share/nginx/html
EXPOSE 80