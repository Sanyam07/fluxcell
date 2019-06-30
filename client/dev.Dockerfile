FROM node:10.8.0

WORKDIR /client/
ADD . /client
RUN npm install -g yarn
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]
