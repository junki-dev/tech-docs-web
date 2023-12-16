FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json tsconfig.json

COPY . .

ENV NEXT_PUBLIC_DOCS_API_ENDPOINT=${NEXT_PUBLIC_DOCS_API_ENDPOINT}

RUN yarn install

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --prod

COPY --from=development /usr/src/app/.next ./.next

CMD ["yarn", "start"]