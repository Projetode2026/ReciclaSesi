# RECICLA ♻️ SESI | Sesiverso

Plataforma interativa e educacional sobre sustentabilidade e descarte correto de resíduos nas lixeiras biodegradáveis e recicláveis.

---

## 🚀 Como Publicar no GitHub Pages

O projeto já está **100% configurado e corrigido** para o GitHub Pages (caminhos relativos `./assets/`, fallback `404.html` e script de build automatizado).

Você tem duas formas simples de publicar:

### Opção 1: Automático via GitHub Actions (Recomendado)
Esta opção é a mais fácil e não requer rodar comandos de build na sua máquina:
1. Suba o projeto para o seu repositório no GitHub (`git push`).
2. Acesse seu repositório no GitHub e clique na aba **Settings** (Configurações).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
5. Pronto! O arquivo `.github/workflows/deploy.yml` já criado irá compilar e publicar seu app automaticamente em menos de 1 minuto no link `https://seu-usuario.github.io/seu-repositorio/`.

---

### Opção 2: Publicação com comando `npm run deploy`
Se preferir publicar a partir do seu terminal:
1. No seu terminal, execute:
   ```bash
   npm run deploy
   ```
2. Este comando gera a pasta `dist` e envia automaticamente para a branch `gh-pages`.
3. No GitHub (**Settings > Pages**), certifique-se de que a branch de publicação está configurada como `gh-pages` e pasta `/ (root)`.

---

### Opção 3: Exportação manual da pasta `dist`
Se você for subir os arquivos estáticos diretamente:
1. Execute:
   ```bash
   npm run build
   ```
2. A pasta **`dist`** gerada conterá:
   - `index.html`
   - `404.html`
   - pasta `assets/` (com JS e CSS empacotados e otimizados com caminhos relativos prontos)
3. Suba o conteúdo de dentro de `dist` para a branch ou serviço desejado.
