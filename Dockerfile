FROM node:18-alpine
 
WORKDIR /user/src/app

COPY package*.json ./
COPY . .

# RUN npm install -g prisma
RUN npm install
# RUN npm ci --omit=dev
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]