#!/bin/bash
# NaRegua — Deploy com cache busting automatico
# Uso: ./deploy.sh "mensagem do commit"
# Atualiza ?v=X em todos os HTML, bumpa o SW, comita e faz push

set -e
cd "$(dirname "$0")"

# Gerar versao baseada em timestamp (ex: 20260320091500)
VERSION=$(date +%Y%m%d%H%M%S)
SHORT_V=$(date +%m%d%H%M)

echo "=== NaRegua Deploy ==="
echo "Versao: $VERSION"

# 1. Atualizar ?v=XXXX em todos os HTMLs para JS e CSS
echo "[1/4] Atualizando cache busting em HTMLs..."
for f in *.html; do
  # JS: supabase.js?v=X → supabase.js?v=NOVO
  sed -i -E "s/\.js(\?v=[0-9a-zA-Z]+)?\"/.js?v=$SHORT_V\"/g" "$f"
  # CSS: style.css?v=X → style.css?v=NOVO
  sed -i -E "s/\.css(\?v=[0-9a-zA-Z]+)?\"/.css?v=$SHORT_V\"/g" "$f"
done

# 2. Atualizar CACHE_NAME no service worker + versao no console
echo "[2/4] Atualizando Service Worker e versao..."
sed -i -E "s/const CACHE_NAME = 'naregua-v[0-9]+';/const CACHE_NAME = 'naregua-v$VERSION';/" sw.js
sed -i -E "s/const _NR_VER = 'naregua-[0-9]+';/const _NR_VER = 'naregua-$SHORT_V';/" js/auth.js js/sidebar.js

# 3. Git commit + push
echo "[3/4] Commitando..."
MSG="${1:-deploy: cache busting v$SHORT_V}"
git add -A
git commit -m "$MSG" || echo "Nada pra comitar"

# 4. Push dev + sync main
echo "[4/4] Publicando..."
git push
CURRENT=$(git branch --show-current)
if [ "$CURRENT" = "dev" ]; then
  git checkout main
  git reset --hard dev
  git push --force-with-lease
  git checkout dev
fi

echo ""
echo "=== Deploy concluido! ==="
echo "Versao: $SHORT_V"
echo "Cache SW: naregua-v$VERSION"
echo "Todos os clientes vao atualizar automaticamente."

# Fechar itens no DM Stack automaticamente pelo commit message
DMS_KW="${2:-}"
if [ -z "$DMS_KW" ]; then
  DMS_KW=$(echo "$MSG" | tr '[:upper:]' '[:lower:]' | \
    grep -oE '[a-záàâãéèêíïóôõöúüç-]{5,}' | \
    grep -vE '^(cache|busting|deploy|versao|fixes|update|remove|corrige|corrigir|adiciona|adicionar|atualiza|atualizar|insere|inserir)$' | \
    head -1)
fi
if [ -n "$DMS_KW" ]; then
  bash "$HOME/dms-resolve.sh" "$DMS_KW" "NAREGUA"
fi
