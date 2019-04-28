FROM node:10.8.0

RUN mkdir /server
ADD . /server
WORKDIR /server
RUN npm install -g yarn
RUN yarn install

EXPOSE 4000
CMD [ "yarn", "start" ]

