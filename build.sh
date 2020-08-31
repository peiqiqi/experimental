rm -rf ./dist
yarn build
cp -r ./dist ./
docker build -t registry.cn-shenzhen.aliyuncs.com/tycho/statistics-web-front-end:v0.0.1 ./
docker push registry.cn-shenzhen.aliyuncs.com/tycho/statistics-web-front-end:v0.0.1
