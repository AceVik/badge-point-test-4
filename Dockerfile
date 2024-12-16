FROM node:22-alpine

COPY . .
RUN npm install
RUN npm run build

ENV DEBUG=true

CMD ["npm", "start"]