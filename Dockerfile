FROM node:15.13-alpine
WORKDIR /scubyt
RUN npm install
ENV PATH="/.node_modules:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]