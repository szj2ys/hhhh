

cd /home/xiawu_ipd/serve
cd /root/aolei/ti-flow


pm2 list
pm2 start ./bootstrap.js -i max --name ipd-admin
pm2 restart ipd-admin




## 运行方式

### 1. 本地开发运行

**前提条件：**
- Node.js版本 >= 18.0.0 [2](#0-1) 
- 配置PostgreSQL数据库连接

**步骤：**
1. 进入项目目录：`cd serve`
2. 安装依赖：`npm install`
3. 开发模式启动：`npm run dev` [3](#0-2) 

### 2. 生产环境运行

**步骤：**
1. 构建项目：`npm run build` [4](#0-3) 
2. 生产模式启动：`npm start` [5](#0-4) 

### 3. 使用Docker运行

**方式一：Docker Compose（推荐）**
- 直接运行：`docker-compose up`
- 这将同时启动MySQL和Redis服务 [6](#0-5) 

**方式二：单独Docker构建**
- 构建镜像：`docker build -t ipd-admin .`
- 运行容器：`docker run -p 8001:8001 ipd-admin` [7](#0-6) 

### 4. 使用PM2管理

- 启动：`npm run pm2:start` [8](#0-7) 
- 停止：`npm run pm2:stop` [9](#0-8) 

## 数据库配置

项目使用PostgreSQL数据库，配置信息在：
- 开发环境：`src/config/config.local.ts` [10](#0-9) 
- 生产环境：`src/config/config.prod.ts` [11](#0-10) 

## 访问地址

项目启动后默认运行在端口8001 [12](#0-11) 

## Notes

- 项目集成了LangChain等AI相关库，支持多种大语言模型接口
- 开发环境会自动同步数据库表结构（synchronize: true）
- 生产环境建议关闭数据库自动同步功能
- 支持文件上传、Socket.IO实时通信等功能
- 项目使用了Cool-Admin框架，提供了完整的后台管理功能



根据这些命令分析，我识别出以下几个主要项目：

## 1. Ti-Flow项目
**地址：** `https://gitee.com/ztcbaba/ti-flow.git`  
**本地路径：** `/root/aolei/ti-flow/`  
**启动方式：**
- 后端：在 `backend/` 目录下运行 `source .venv/bin/activate` 然后 `make dev_backend` 或 `make run_backend`
- 前端：在 `frontend/` 目录下运行 `pnpm install` 然后 `pnpm dev -p 端口号`
- 使用 Docker Compose：`docker-compose -f docker-compose.dev.yml up -d`
- 端口：后端5001，前端使用多个端口（30031-30036等）

## 2. IPD管理系统  
**本地路径：** `/home/xiawu_ipd/serve`  
**启动方式：**
- 构建：`npm run build`
- 使用PM2启动：`pm2 start ./bootstrap.js -i max --name ipd-admin`
- 或 `pm2 start ./bootstrap.js -i max --name ipd-api`

## 3. 宝塔面板
**安装地址：** `http://download.bt.cn/install/install-ubuntu_6.0.sh`  
**端口：** 30011  
**启动方式：** `sudo /etc/init.d/bt restart`

## 4. FRP内网穿透服务
**本地路径：** `/root/zj/frp_0.62.1_linux_amd64/`  
**启动方式：** `bash start.sh server`  
**端口：** 7500, 30023, 30024等

## 5. TiDB数据库
**启动脚本：** `execute_tidb.sh`, `tidb-persistent.sh`  
**端口：** 4000, 30036  
**启动方式：** 通过shell脚本启动playground模式

## 6. Docker容器项目
- **Tomcat容器：** `docker run -d -p 30036:8080 tomcat`
- **PgVector数据库：** `docker pull pgvector/pgvector:pg17`

## 7. 代理工具
- **Trojan代理：** `/usr/src/trojan/`，端口1080
- **Proxychains：** 用于代理命令执行
- **ViewTurboCore：** 代理工具，端口15732

## 主要使用的端口：
- 22 (SSH)
- 4000 (TiDB)
- 5001 (Ti-Flow后端API)  
- 7500 (FRP服务端)
- 30011 (宝塔面板)
- 30023-30036 (各种前端服务)

