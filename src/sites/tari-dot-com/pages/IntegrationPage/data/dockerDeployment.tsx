import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';

export const dockerDeployment = [
    {
        label: 'Docker Compose',
        content: (
            <CodeContent
                code={`version: '3.8'

services:
  tari-node:
    # WARNING: Use specific version tags in production, not 'latest'
        image: tariproject/minotari_node:latest
    container_name: tari-node
    restart: unless-stopped
    ports:
      - "18141:18141"  # P2P port
      - "127.0.0.1:18142:18142"  # gRPC port (localhost only)
    volumes:
      - tari-node-data:/root/.tari
      - ./config/node-config.toml:/root/.tari/mainnet/config/config.toml:ro
    environment:
      - TARI_NETWORK=mainnet
      - RUST_LOG=info
    networks:
      - tari-network

  tari-wallet:
    image: tariproject/minotari_console_wallet:latest
    container_name: tari-wallet
    restart: unless-stopped
    ports:
      - "127.0.0.1:18143:18143"  # gRPC port (localhost only)
    volumes:
      - tari-wallet-data:/root/.tari
      - ./config/wallet-config.toml:/root/.tari/mainnet/config/config.toml:ro
    environment:
      - TARI_NETWORK=mainnet
      - TARI_WALLET__CUSTOM_BASE_NODE=tari-node:18142
    depends_on:
      - tari-node
    networks:
      - tari-network

  redis:
    image: redis:7-alpine
    container_name: tari-redis
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - tari-network

  postgres:
    image: postgres:15
    container_name: tari-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_DB=tari_exchange
      - POSTGRES_USER=tari_user
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./sql/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - tari-network

  exchange-api:
    build: .
    container_name: tari-exchange-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://tari_user:\${DB_PASSWORD}@postgres:5432/tari_exchange
      - REDIS_URL=redis://redis:6379
      - TARI_WALLET_GRPC=http://tari-wallet:18143
      - TARI_NODE_GRPC=http://tari-node:18142
    depends_on:
      - postgres
      - redis
      - tari-wallet
    networks:
      - tari-network

volumes:
  tari-node-data:
  tari-wallet-data:
  redis-data:
  postgres-data:

networks:
  tari-network:
    driver: bridge`}
            />
        ),
    },
    {
        label: 'Dockerfile',
        content: (
            <CodeContent
                code={`# Multi-stage Dockerfile for Node.js exchange API
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install security updates
RUN apk upgrade --no-cache

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S tari -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=tari:nodejs /app/dist ./dist
COPY --from=builder --chown=tari:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=tari:nodejs /app/package.json ./

# Switch to non-root user
USER tari

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/index.js"]`}
            />
        ),
    },
    {
        label: 'Kubernetes',
        content: (
            <CodeContent
                code={`# Kubernetes deployment for Tari exchange
apiVersion: v1
kind: Namespace
metadata:
  name: tari-exchange

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: tari-config
  namespace: tari-exchange
data:
  node-config.toml: |
    [base_node.mainnet]
    grpc_enabled = true
    grpc_base_node_address = "http://0.0.0.0:18142"
    transport = "tor"
    allow_test_addresses = false
    
  wallet-config.toml: |
    [wallet]
    grpc_enabled = true
    grpc_address = "http://0.0.0.0:18143"
    grpc_authentication = { username = "exchange", password = "secure_password" }

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tari-node
  namespace: tari-exchange
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tari-node
  template:
    metadata:
      labels:
        app: tari-node
    spec:
      containers:
      - name: tari-node
        # WARNING: Use specific version tags in production, not 'latest'
        image: tariproject/minotari_node:latest
        ports:
        - containerPort: 18141
        - containerPort: 18142
        volumeMounts:
        - name: tari-data
          mountPath: /root/.tari
        - name: config
          mountPath: /root/.tari/mainnet/config/config.toml
          subPath: node-config.toml
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
      volumes:
      - name: tari-data
        persistentVolumeClaim:
          claimName: tari-node-pvc
      - name: config
        configMap:
          name: tari-config

---
apiVersion: v1
kind: Service
metadata:
  name: tari-node-service
  namespace: tari-exchange
spec:
  selector:
    app: tari-node
  ports:
  - name: grpc
    port: 18142
    targetPort: 18142
  type: ClusterIP

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: tari-node-pvc
  namespace: tari-exchange
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: fast-ssd`}
            />
        ),
    },
];
