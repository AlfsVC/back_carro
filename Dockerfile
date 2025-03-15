FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Cambiar permisos de la carpeta dist
# RUN chmod -R 777 ./dist

FROM node:20-alpine as production

WORKDIR /usr/src/app

COPY package*.json .
COPY .env .

# RUN npm install 

COPY --from=development /usr/src/app/dist ./dist

# EXPOSE 8080

# CMD ["node", "./dist/bundle.js"]
CMD ["npm", "run", "prod"]