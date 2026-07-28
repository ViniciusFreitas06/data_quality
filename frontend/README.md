# Data Quality Lab — Frontend

Frontend em Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion
para o backend **Data Quality Platform** (FastAPI + pandas + scikit-learn).

O usuário envia um arquivo `.csv` e a aplicação exibe um relatório completo:
score de qualidade, valores nulos, duplicatas, colunas constantes, estatísticas
numéricas, outliers estatísticos, correlações fortes, anomalias detectadas por
Isolation Forest e sugestões de colunas-alvo para modelos de ML.

## Stack

- Next.js 15 / React 18 / TypeScript
- Tailwind CSS
- Framer Motion (animações)
- lucide-react (ícones)

## Rodando localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure a URL da API (o backend FastAPI precisa estar rodando):

   ```bash
   cp .env.example .env.local
   # edite NEXT_PUBLIC_API_URL se o backend não estiver em localhost:8000
   ```

3. Suba o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000`.

## Backend esperado

Este frontend consome um único endpoint:

```
POST /upload   (multipart/form-data, campo "file")
```

que deve retornar o JSON descrito em `app/schemas/analysis_schema.py` do
projeto Data Quality Platform. Se o backend usar CORS restrito, garanta que a
origem do frontend (ex: `http://localhost:3000`) esteja liberada.

## Estrutura

```
app/
  layout.tsx        # fontes e layout raiz
  page.tsx           # hero + fluxo de upload + dashboard
  globals.css
components/
  UploadZone.tsx     # dropzone com animação de "scan"
  QualityGauge.tsx   # gauge radial de qualidade
  Dashboard.tsx       # orquestra as seções do relatório
  NullsPanel.tsx / StatsPanel.tsx / OutliersPanel.tsx
  CorrelationPanel.tsx / MLAnomaliesPanel.tsx / TargetsPanel.tsx / WarningsPanel.tsx
lib/
  api.ts             # tipos + client HTTP para o backend
```

## Deploy

Build de produção:

```bash
npm run build
npm run start
```

Ao publicar (ex: Vercel), configure `NEXT_PUBLIC_API_URL` apontando para a
URL pública do backend FastAPI.
