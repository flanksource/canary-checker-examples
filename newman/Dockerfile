FROM node:latest

RUN npm install -g newman

COPY newman.json newman.json
COPY start.sh start.sh
RUN chmod +x start.sh

ENTRYPOINT ["/bin/bash", "start.sh"]
