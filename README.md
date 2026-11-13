# Café da manhã · Liiv Hotéis

Site interno que mostra, por unidade, os apartamentos e hóspedes com café da manhã disponível.

- `index.html`: o site (um botão por unidade; lista do apartamento maior para o menor).
- `api/[unidade].js`: função que confere a senha e consulta a API do sistema do hotel.
- `vercel.json`: configuração da hospedagem (Vercel, região São Paulo).

## Publicação

1. Na Vercel, usar Add New > Project e importar este repositório
   (Framework Preset "Other", sem comando de build).
2. Em Settings > Environment Variables, cadastrar:
   `CHAVE_ACESSO`, `URL_COBOGO`, `URL_COSTEIRA`, `URL_MAR`, `URL_HUB`, `URL_PIPA`.
3. Fazer um novo deploy. Cada alteração enviada ao GitHub é publicada automaticamente.

Nenhuma senha ou URL de API deve ser gravada neste repositório.
