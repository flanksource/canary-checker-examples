FROM node:latest
COPY package.json package.json
RUN npm install
RUN npx playwright install chromium
RUN npx playwright install-deps
COPY . .
#COPY node_modules node_modules
COPY start.sh start.sh
RUN chmod +x start.sh
ENTRYPOINT ["/bin/bash", "start.sh"]
