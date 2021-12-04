FROM node:14

RUN mkdir /app
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
COPY package.json /app
RUN yarn install
# RUN yarn add web-vitals

COPY . /app

RUN yarn build

CMD ["yarn", "start"]
