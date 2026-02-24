# ==========================================
# Stage 1: 构建前端 (React + Vite)
# ==========================================
FROM node:24-bookworm-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY frontend .
RUN npm run build

# ==========================================
# Stage 2: 构建后端 (Rust Axum)
# ==========================================
FROM rust:1.93-slim-bookworm AS backend
WORKDIR /app/backend
COPY backend/Cargo.toml backend/Cargo.lock ./
COPY backend/src ./src
RUN cargo build --release

# ==========================================
# Stage 3: 最终运行镜像 (安全且高度兼容)
# ==========================================
# 必须使用与后端 builder 相同的底层操作系统
FROM debian:bookworm-slim
WORKDIR /app

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=frontend /app/frontend/dist ./dist
COPY --from=backend /app/backend/target/release/backend ./server

EXPOSE 3000

# 启动服务
CMD ["./server"]
