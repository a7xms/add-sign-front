FROM node:18-alpine
WORKDIR /add_sign_front/

COPY public/ /add_sign_front/public
COPY src/ /add_sign_front/src
COPY package.json /add_sign_front/

RUN npm install

CMD ["npm", "start"]