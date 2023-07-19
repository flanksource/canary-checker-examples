mkdir -p /tmp/junit-results
./k6-v0.45.0-linux-amd64/k6 -q run script.js
cp /tmp/*.xml /tmp/junit-results/
touch /tmp/junit-results/done
