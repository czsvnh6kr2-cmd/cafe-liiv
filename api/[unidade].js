/* Função do site de café da manhã da Liiv Hotéis (Vercel Functions).

   Atende  GET /api/<unidade>  (cobogo, costeira, mar, hub, pipa).
   Confere a senha da equipe, consulta a API do Xenius/gerbit pelo servidor e
   devolve o mesmo JSON ao site. É necessária porque a API responde em http e
   sem CORS, o que impede o navegador de chamá-la direto.

   Variáveis de ambiente, cadastradas no painel da Vercel (nunca neste repositório):
     CHAVE_ACESSO                                   senha geral da equipe
     URL_COBOGO, URL_COSTEIRA, URL_MAR, URL_HUB, URL_PIPA   URL completa de cada API
*/
const VARIAVEIS = { cobogo: "URL_COBOGO", costeira: "URL_COSTEIRA", mar: "URL_MAR", hub: "URL_HUB", pipa: "URL_PIPA" };

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ erro: "metodo" });

  const senha = process.env.CHAVE_ACESSO;
  if (!senha) return res.status(503).json({ erro: "senha nao configurada" });
  if (req.headers["x-chave"] !== senha) return res.status(401).json({ erro: "chave" });

  const variavel = VARIAVEIS[String(req.query.unidade || "").toLowerCase()];
  if (!variavel) return res.status(404).json({ erro: "unidade desconhecida" });
  const destino = process.env[variavel];
  if (!destino) return res.status(503).json({ erro: "unidade nao configurada" });

  try {
    const r = await fetch(destino, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return res.status(502).json({ erro: "api respondeu " + r.status });
    const dados = await r.json();
    return res.status(200).json(Array.isArray(dados) ? dados : []);
  } catch (e) {
    return res.status(502).json({ erro: "api indisponivel" });
  }
};
