FROM node:8.10.0-alpine as ng-builder

RUN apk add --no-cache git

WORKDIR /usr/src/app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY . .

RUN npm install

RUN ./node_modules/@angular/cli/bin/ng build --prod --aot

FROM nginx:latest

# Install and build the application
COPY --from=ng-builder  /usr/src/app/dist/business-webapp-admin /usr/src/app

WORKDIR /usr/src/app

COPY ./default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
