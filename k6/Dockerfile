FROM node:latest

ADD https://github.com/grafana/k6/releases/download/v0.45.0/k6-v0.45.0-linux-amd64.tar.gz k6.tar.gz
RUN tar xf k6.tar.gz && rm k6.tar.gz

COPY script.js script.js
COPY package.json package.json
COPY node_modules node_modules
COPY start.sh start.sh
RUN chmod +x start.sh

ENTRYPOINT ["/bin/bash", "start.sh"]
