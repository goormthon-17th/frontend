# Next.js 16 — Jenkins/Kaniko 빌드용 (포트 3000, k8s frontend.yaml 과 맞춤)
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
RUN npm install -g pnpm@9.15.9
COPY package.json pnpm-lock.yaml ./
# frozen 실패 시: 원격 package.json(예: axios 1.13.6)과 lock(^1.14.0) 불일치. 락을 런타임에 맞춤.
RUN pnpm install --no-frozen-lockfile

FROM base AS builder
RUN npm install -g pnpm@9.15.9
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
