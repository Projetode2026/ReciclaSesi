# RECICLA ♻️ SESI | Sesiverso

Plataforma interativa e educacional sobre sustentabilidade e descarte correto de resíduos nas lixeiras biodegradáveis e recicláveis.

---

## 🚀 Como Publicar no GitHub Pages

O projeto está configurado para funcionar em qualquer modalidade do GitHub Pages.

---

### Método 1: Usando a pasta `/docs` (Seu método atual no GitHub Pages)
Se você configurou no GitHub (**Settings > Pages > Deploy from a branch** selecionando a branch `main` e a pasta `/docs`):
1. A pasta **`docs/`** já foi gerada e está pronta com:
   - `index.html`
   - `404.html`
   - `assets/` (scripts e estilos minificados)
   - `.nojekyll` (evita que o GitHub tente usar o Jekyll e cause erros de compilação)
2. Basta subir tudo para o GitHub:
   ```bash
   git add .
   git commit -m "fix: adiciona pasta docs e arquivo .nojekyll"
   git push
   ```
3. O GitHub Pages encontrará a pasta `/docs` e publicará o site instantaneamente!

---

### Método 2: Automático via GitHub Actions (Sem precisar commitar a pasta docs)
1. Acesse seu repositório no GitHub.
2. Vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, alterne de "Deploy from a branch" para **GitHub Actions**.
4. O workflow `.github/workflows/deploy.yml` compilará e publicará o app automaticamente a cada push.

---

### Método 3: Via terminal com `npm run deploy`
1. Execute:
   ```bash
   npm run deploy
   ```
2. O pacote `gh-pages` enviará a build diretamente para a branch `gh-pages`.
3. Em **Settings > Pages**, selecione a branch `gh-pages` e pasta `/ (root)`.
