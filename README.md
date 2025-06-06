

cd /home/xiawu_ipd/serve
cd /root/aolei/ti-flow


pm2 list
pm2 start ./bootstrap.js -i max --name ipd-admin
pm2 restart ipd-admin


npm run dev


