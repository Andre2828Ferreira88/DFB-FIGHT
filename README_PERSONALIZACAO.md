# DFB — Landing Page Catálogo de Lutadores

Projeto pronto para publicar na Netlify, com HTML, CSS e JavaScript puro. O foco é uma experiência premium estilo catálogo/streaming, com filtros por modalidade, fileiras horizontais, modal/drawer de atleta, vídeos, galeria e espaços para patrocinadores.

## 1. Estrutura do projeto

```txt
index.html
assets/css/style.css
assets/js/main.js
assets/img/logo.png
assets/img/hero-poster.jpg
assets/videos/hero-fight.mp4
assets/img/fighters/
assets/videos/fighters/
assets/img/sponsors/
```

## 2. Como trocar a logo

Coloque a logo final em:

```txt
assets/img/logo.png
```

Recomendado: PNG transparente, versão clara/dourada, até 500 KB. Se a imagem não carregar, o site mostra um fallback com “DFB”.

## 3. Como trocar o vídeo do hero

Coloque o vídeo principal em:

```txt
assets/videos/hero-fight.mp4
```

Coloque a imagem de capa em:

```txt
assets/img/hero-poster.jpg
```

Descrição recomendada do vídeo: vídeo cinematográfico de bastidores de luta, com atletas treinando em ringue, luvas, bandagens, saco de pancada, treino de boxe, jiu-jitsu, MMA e preparação física. Ambiente escuro, iluminação dramática, fumaça leve, close em socos, suor, foco, treino intenso e atmosfera profissional. Ideal em 16:9, 1920x1080, MP4, loop suave de 10 a 20 segundos.

Termos para buscar: boxing training cinematic, MMA fighter training, fight gym cinematic, boxing gloves close up, jiu jitsu training cinematic, fighter shadow boxing, combat sports training, athlete preparation fight, dark boxing gym, professional fighter promo video.

Bancos possíveis: Pexels, Pixabay, Videvo, Envato Elements, Storyblocks, Artgrid, Adobe Stock.

## 4. Como editar atletas

Abra:

```txt
assets/js/main.js
```

No começo do arquivo existe o array:

```js
const fighters = [ ... ];
```

Cada atleta fica em um objeto. Para editar, altere os campos:

```js
{
  id: 'atleta-01',
  name: 'Nome do Atleta 01',
  nickname: 'Apelido',
  modality: 'Boxe',
  category: 'Peso Médio',
  record: '8V • 1D • 0E',
  status: 'Destaque',
  location: 'São Paulo, SP',
  featured: true,
  shortBio: 'Resumo curto...',
  story: 'História completa...',
  avatar: 'assets/img/fighters/atleta-01-cover.jpg',
  portrait: 'assets/img/fighters/atleta-01-portrait.jpg',
  gallery: [...],
  videos: [...]
}
```

## 5. Como adicionar novo atleta

Copie um bloco inteiro do array `fighters`, cole abaixo do último atleta e altere:

1. `id` para um valor único, exemplo: `atleta-11`
2. nome, apelido, modalidade, categoria, cartel e localização
3. textos `shortBio` e `story`
4. caminhos das fotos e vídeos
5. `featured: true` se quiser que apareça na fileira “Destaques”

## 6. Fotos dos atletas

Caminhos prontos por atleta:

```txt
assets/img/fighters/atleta-01-cover.jpg
assets/img/fighters/atleta-01-portrait.jpg
assets/img/fighters/atleta-01-gallery-01.jpg
assets/img/fighters/atleta-01-gallery-02.jpg
assets/img/fighters/atleta-01-gallery-03.jpg
assets/img/fighters/atleta-01-video-poster.jpg
assets/img/fighters/atleta-01-training-poster.jpg
```

Repita o padrão até `atleta-10` ou crie novos nomes para novos atletas.

Descrição das fotos:

- Cover: foto horizontal do atleta em pose forte, fundo escuro, iluminação dramática, luvas ou uniforme da modalidade, olhar confiante, estilo pôster esportivo.
- Portrait: foto vertical do atleta, corpo inteiro ou meio corpo, pose profissional, fundo de academia ou cenário escuro, boa iluminação, ideal para perfil.
- Gallery: fotos de treino, combate, bastidores, preparação, detalhes de luvas, kimono, ringue, tatame, faixa, troféus e momentos esportivos.

Recomendação: JPG/WebP, até 350 KB por imagem quando possível.

## 7. Vídeos dos atletas

Caminhos prontos:

```txt
assets/videos/fighters/atleta-01-highlight.mp4
assets/videos/fighters/atleta-01-training.mp4
```

Descrição dos vídeos:

- Highlight: vídeo de melhores momentos do atleta, com cortes rápidos, golpes, movimentação, entradas no ringue/tatame, vitórias, treinos fortes e presença de combate. Estilo trailer esportivo, com energia alta e edição cinematográfica.
- Treino: vídeo de preparação do atleta, mostrando treino técnico, treino físico, bastidores, foco, suor, aquecimento, sombra, manopla, sparring ou rola de jiu-jitsu. Visual profissional e escuro, ideal para destacar disciplina e preparação.
- Entrevista opcional: vídeo curto do atleta falando sobre trajetória, objetivo, modalidade e próximos desafios. Plano médio, áudio limpo, fundo neutro ou academia.

Recomendação: MP4, 720p ou 1080p, comprimido, entre 5 e 25 MB dependendo do uso.

## 8. Como alterar modalidades

No `main.js`, altere o campo `modality` de cada atleta. Exemplo:

```js
modality: 'Boxe'
```

No `index.html`, existem botões com `data-modality`. Para criar nova modalidade, adicione um botão com o mesmo nome exato usado no JavaScript.

Exemplo:

```html
<button type="button" data-modality="Judô">Judô</button>
```

## 9. Como alterar patrocinadores

Troque as imagens em:

```txt
assets/img/sponsors/sponsor-01.png
assets/img/sponsors/sponsor-02.png
assets/img/sponsors/sponsor-03.png
assets/img/sponsors/sponsor-04.png
```

Recomendado: PNG transparente, versão branca ou dourada, até 200 KB.

No `index.html`, procure por `sponsor-card` para alterar textos e links.

## 10. Como trocar WhatsApp

No `index.html`, procure por:

```txt
5511939223926
```

No `assets/js/main.js`, altere:

```js
const WHATSAPP_URL = 'https://wa.me/5511939223926?...';
```

Use formato internacional sem espaços. Exemplo: `55` + DDD + número.

## 11. Como publicar na Netlify

1. Entre na Netlify.
2. Clique em “Add new site”.
3. Escolha “Deploy manually”.
4. Arraste a pasta do projeto ou o ZIP descompactado.
5. Aguarde publicar.
6. Depois configure domínio em “Domain management”, se necessário.

## 12. Observação importante

O site não usa painel administrativo, login, banco de dados, jQuery ou biblioteca pesada. Todo o catálogo é renderizado pelo JavaScript a partir do array `fighters`, exatamente para facilitar manutenção e expansão.
