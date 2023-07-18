set -x
mkdir -p /tmp/junit-results
newman run newman.json --reporters junit --reporter-export /tmp/junit.xml
cp /tmp/*.xml /tmp/junit-results/
touch /tmp/junit-results/done
