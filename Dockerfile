
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
