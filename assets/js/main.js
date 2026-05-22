'use strict';

const WHATSAPP_URL = 'https://wa.me/5511939223926?text=Ol%C3%A1%2C%20Douglas.%20Vim%20pelo%20site%20DFB%20e%20quero%20falar%20sobre%20um%20atleta.';
const ALL_MODALITY = 'Todos';
const ALLOWED_MODALITIES = ['Boxe', 'MMA', 'K1', 'Muay Thai'];

// Mantém o foco comercial do cliente sem esconder atletas antigos cadastrados.
// Ex.: atletas que estavam como Jiu-Jitsu ou Wrestling entram na fileira de MMA.
// Ex.: Kickboxing entra na fileira de K1.
const MODALITY_ALIASES = {
  'jiu-jitsu': 'MMA',
  'jiu jitsu': 'MMA',
  'jiujitsu': 'MMA',
  'wrestling': 'MMA',
  'grappling': 'MMA',
  'kickboxing': 'K1',
  'k-1': 'K1',
  'k1': 'K1',
  'boxe': 'Boxe',
  'boxing': 'Boxe',
  'mma': 'MMA',
  'muay thai': 'Muay Thai',
  'muaythai': 'Muay Thai'
};

// Para adicionar novo atleta, copie um objeto deste array, mude o id, textos e caminhos das mídias.
const fighters = [
  {
    id: 'atleta-01', name: 'Nome do Atleta 01', nickname: 'Apelido', modality: 'Boxe', category: 'Peso Médio', record: '8V • 1D • 0E', status: 'Destaque', location: 'São Paulo, SP', featured: true,
    shortBio: 'Atleta explosivo, com estilo agressivo, presença forte em combate e ótimo material para eventos.',
    story: 'Escreva aqui a história completa do atleta: início no esporte, trajetória, principais desafios, conquistas, objetivo profissional e diferencial competitivo. Este bloco foi feito para valorizar o atleta como produto esportivo e comercial.',
    avatar: 'assets/img/fighters/atleta-01-cover.jpg', portrait: 'assets/img/fighters/atleta-01-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-01-gallery-01.jpg', 'assets/img/fighters/atleta-01-gallery-02.jpg', 'assets/img/fighters/atleta-01-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-01-highlight.mp4', poster: 'assets/img/fighters/atleta-01-video-poster.jpg', description: 'Melhores momentos, golpes, movimentação e presença do atleta em combate.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-01-training.mp4', poster: 'assets/img/fighters/atleta-01-training-poster.jpg', description: 'Preparação física, treino técnico, bastidores e rotina profissional.' }
    ]
  },
  {
    id: 'atleta-02', name: 'Nome do Atleta 02', nickname: 'Mão Pesada', modality: 'MMA', category: 'Peso Leve', record: '6V • 2D • 0E', status: 'Profissional', location: 'Guarulhos, SP', featured: true,
    shortBio: 'Lutador versátil, boa leitura de luta e combinação entre trocação, queda e pressão no cage.',
    story: 'Substitua este texto pela trajetória real do atleta. Destaque origem, treinos, evolução, lutas marcantes, disciplina e próximos passos dentro da modalidade.',
    avatar: 'assets/img/fighters/atleta-02-cover.jpg', portrait: 'assets/img/fighters/atleta-02-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-02-gallery-01.jpg', 'assets/img/fighters/atleta-02-gallery-02.jpg', 'assets/img/fighters/atleta-02-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-02-highlight.mp4', poster: 'assets/img/fighters/atleta-02-video-poster.jpg', description: 'Cortes rápidos com movimentação, quedas, golpes e momentos fortes.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-02-training.mp4', poster: 'assets/img/fighters/atleta-02-training-poster.jpg', description: 'Rotina de preparação em academia, sparring, manopla e condicionamento.' }
    ]
  },
  {
    id: 'atleta-03', name: 'Nome do Atleta 03', nickname: 'Faixa Preta', modality: 'MMA', category: 'Peso Pena', record: '14V • 3D', status: 'Campeão', location: 'Osasco, SP', featured: true,
    shortBio: 'Competidor técnico, forte no controle posicional e com histórico competitivo em torneios regionais.',
    story: 'Use este espaço para contar a evolução no jiu-jitsu, graduação, equipe, títulos, estilo de jogo, participações em campeonatos e objetivos.',
    avatar: 'assets/img/fighters/atleta-03-cover.jpg', portrait: 'assets/img/fighters/atleta-03-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-03-gallery-01.jpg', 'assets/img/fighters/atleta-03-gallery-02.jpg', 'assets/img/fighters/atleta-03-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-03-highlight.mp4', poster: 'assets/img/fighters/atleta-03-video-poster.jpg', description: 'Raspagens, finalizações, passagens e conquistas no tatame.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-03-training.mp4', poster: 'assets/img/fighters/atleta-03-training-poster.jpg', description: 'Rotina no tatame, rolas, preparação técnica e bastidores.' }
    ]
  },
  {
    id: 'atleta-04', name: 'Nome do Atleta 04', nickname: 'Thai Machine', modality: 'Muay Thai', category: 'Até 70kg', record: '10V • 2D', status: 'Destaque', location: 'São Bernardo, SP', featured: false,
    shortBio: 'Atleta de striking com chutes fortes, joelhadas e ritmo alto para eventos de luta em pé.',
    story: 'Insira a história completa do atleta, origem na modalidade, equipe, cartel, eventos disputados e diferenciais de estilo.',
    avatar: 'assets/img/fighters/atleta-04-cover.jpg', portrait: 'assets/img/fighters/atleta-04-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-04-gallery-01.jpg', 'assets/img/fighters/atleta-04-gallery-02.jpg', 'assets/img/fighters/atleta-04-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-04-highlight.mp4', poster: 'assets/img/fighters/atleta-04-video-poster.jpg', description: 'Chutes, joelhadas, clinch, entradas e trechos de combate.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-04-training.mp4', poster: 'assets/img/fighters/atleta-04-training-poster.jpg', description: 'Manopla, saco, sombra, sparring e preparação física.' }
    ]
  },
  {
    id: 'atleta-05', name: 'Nome do Atleta 05', nickname: 'The Hunter', modality: 'K1', category: 'Peso Meio-Médio', record: '9V • 1D', status: 'Promessa', location: 'Santo André, SP', featured: false,
    shortBio: 'Atleta de K1 com trocação limpa, bons ângulos e ótimo potencial para eventos profissionais.',
    story: 'Troque este texto pela narrativa do atleta, incluindo início, principais resultados, estilo, rotina de treino e objetivo no esporte.',
    avatar: 'assets/img/fighters/atleta-05-cover.jpg', portrait: 'assets/img/fighters/atleta-05-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-05-gallery-01.jpg', 'assets/img/fighters/atleta-05-gallery-02.jpg', 'assets/img/fighters/atleta-05-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-05-highlight.mp4', poster: 'assets/img/fighters/atleta-05-video-poster.jpg', description: 'Sequências de striking, combinações e melhores ações.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-05-training.mp4', poster: 'assets/img/fighters/atleta-05-training-poster.jpg', description: 'Preparação, treino técnico e bastidores da rotina.' }
    ]
  },
  {
    id: 'atleta-06', name: 'Nome do Atleta 06', nickname: 'Grappler', modality: 'MMA', category: 'Até 77kg', record: '11V • 4D', status: 'Profissional', location: 'Campinas, SP', featured: false,
    shortBio: 'Base forte de quedas, controle e pressão constante para dominar o ritmo do combate.',
    story: 'Adicione histórico de competições, transição para luta profissional, rotina de treino e principais metas do atleta.',
    avatar: 'assets/img/fighters/atleta-06-cover.jpg', portrait: 'assets/img/fighters/atleta-06-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-06-gallery-01.jpg', 'assets/img/fighters/atleta-06-gallery-02.jpg', 'assets/img/fighters/atleta-06-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-06-highlight.mp4', poster: 'assets/img/fighters/atleta-06-video-poster.jpg', description: 'Entradas de queda, controle posicional e transições.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-06-training.mp4', poster: 'assets/img/fighters/atleta-06-training-poster.jpg', description: 'Drills de wrestling, preparação física e bastidores.' }
    ]
  },
  {
    id: 'atleta-07', name: 'Nome do Atleta 07', nickname: 'Predador', modality: 'Boxe', category: 'Peso Pesado', record: '5V • 0D • 0E', status: 'Invicto', location: 'São Paulo, SP', featured: true,
    shortBio: 'Boxeador de impacto, forte apelo visual e narrativa perfeita para material de promoção.',
    story: 'Conte a história do atleta, sua entrada no boxe, vitórias, estilo, equipe, rotina e próximos desafios.',
    avatar: 'assets/img/fighters/atleta-07-cover.jpg', portrait: 'assets/img/fighters/atleta-07-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-07-gallery-01.jpg', 'assets/img/fighters/atleta-07-gallery-02.jpg', 'assets/img/fighters/atleta-07-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-07-highlight.mp4', poster: 'assets/img/fighters/atleta-07-video-poster.jpg', description: 'Sequências de impacto, entrada no ringue e melhores golpes.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-07-training.mp4', poster: 'assets/img/fighters/atleta-07-training-poster.jpg', description: 'Sombra, saco, manopla e rotina de preparação.' }
    ]
  },
  {
    id: 'atleta-08', name: 'Nome do Atleta 08', nickname: 'Samurai', modality: 'MMA', category: 'Peso Galo', record: '7V • 3D', status: 'Profissional', location: 'Jundiaí, SP', featured: false,
    shortBio: 'Atleta rápido, técnico e com boa capacidade de adaptação em pé e no solo.',
    story: 'Insira detalhes da trajetória, eventos, equipe, especialidades e próximos passos na carreira esportiva.',
    avatar: 'assets/img/fighters/atleta-08-cover.jpg', portrait: 'assets/img/fighters/atleta-08-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-08-gallery-01.jpg', 'assets/img/fighters/atleta-08-gallery-02.jpg', 'assets/img/fighters/atleta-08-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-08-highlight.mp4', poster: 'assets/img/fighters/atleta-08-video-poster.jpg', description: 'Melhores momentos de luta, treino e presença no cage.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-08-training.mp4', poster: 'assets/img/fighters/atleta-08-training-poster.jpg', description: 'Preparação técnica, física e bastidores.' }
    ]
  },
  {
    id: 'atleta-09', name: 'Nome do Atleta 09', nickname: 'Finalizador', modality: 'MMA', category: 'Peso Médio', record: '18V • 5D', status: 'Campeão', location: 'São Paulo, SP', featured: false,
    shortBio: 'Especialista em finalizações, com leitura técnica e presença competitiva forte no tatame.',
    story: 'Inclua graduação, campeonatos, equipe, conquistas, estilo de luta e objetivos profissionais.',
    avatar: 'assets/img/fighters/atleta-09-cover.jpg', portrait: 'assets/img/fighters/atleta-09-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-09-gallery-01.jpg', 'assets/img/fighters/atleta-09-gallery-02.jpg', 'assets/img/fighters/atleta-09-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-09-highlight.mp4', poster: 'assets/img/fighters/atleta-09-video-poster.jpg', description: 'Finalizações, movimentações e momentos competitivos.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-09-training.mp4', poster: 'assets/img/fighters/atleta-09-training-poster.jpg', description: 'Treino no tatame, drills e rotina de preparação.' }
    ]
  },
  {
    id: 'atleta-10', name: 'Nome do Atleta 10', nickname: 'Furacão', modality: 'Muay Thai', category: 'Até 63kg', record: '12V • 2D', status: 'Destaque', location: 'Diadema, SP', featured: false,
    shortBio: 'Atleta de ritmo intenso, forte visual de campanha e perfil ideal para eventos de trocação.',
    story: 'Adicione a história real, cartel, principais eventos, equipe, conquistas e visão de futuro do atleta.',
    avatar: 'assets/img/fighters/atleta-10-cover.jpg', portrait: 'assets/img/fighters/atleta-10-portrait.jpg',
    gallery: ['assets/img/fighters/atleta-10-gallery-01.jpg', 'assets/img/fighters/atleta-10-gallery-02.jpg', 'assets/img/fighters/atleta-10-gallery-03.jpg'],
    videos: [
      { title: 'Highlight do atleta', src: 'assets/videos/fighters/atleta-10-highlight.mp4', poster: 'assets/img/fighters/atleta-10-video-poster.jpg', description: 'Melhores golpes, entradas e trechos de combate.' },
      { title: 'Treino e bastidores', src: 'assets/videos/fighters/atleta-10-training.mp4', poster: 'assets/img/fighters/atleta-10-training-poster.jpg', description: 'Sombra, manopla, sparring e bastidores de treino.' }
    ]
  }
];

window.DFB_FIGHTERS = fighters;

const state = { activeModality: ALL_MODALITY, activeFighterId: null };
const selectors = {
  rows: '#fightersRows',
  modal: '#fighterProfileModal',
  navbar: '[data-navbar]',
  navMenu: '[data-nav-menu]',
  navToggle: '[data-nav-toggle]'
};

function initApp() {
  safeInit('Page loader', initPageLoader);
  safeInit('Navbar', initNavbar);
  safeInit('Hero interactions', initHeroInteractions);
  safeInit('Hero 3D fighter', initHero3DFighter);
  safeInit('Hero person card', initHeroPersonCard);
  safeInit('Modality filters', initModalityFilters);
  safeInit('Fighters catalog', initFightersCatalog);
  safeInit('Amateur fighters page', initAmateurFightersPage);
  safeInit('Fighter profile modal', initFighterProfileModal);
  safeInit('Reveal animations', initRevealAnimations);
  safeInit('Sponsor animations', initSponsorAnimations);
  safeInit('Media fallbacks', initSafeMediaFallbacks);
  safeInit('Footer video', initFooterVideo);
  safeInit('Autoplay videos', initAllAutoplayVideos);
}

function safeInit(name, fn) {
  try {
    if (typeof fn === 'function') fn();
  } catch (error) {
    console.error(`Erro ao iniciar ${name}:`, error);
  }
}

function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  const bar = document.getElementById('pageLoaderBar');
  const percent = document.getElementById('pageLoaderPercent');

  if (!loader) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    return;
  }

  document.body.classList.add('is-loading');

  let progress = 0;
  let isDone = false;

  const setProgress = (value) => {
    progress = Math.max(progress, Math.min(value, 100));

    if (bar) {
      bar.style.width = `${progress}%`;
    }

    if (percent) {
      percent.textContent = `${Math.round(progress)}%`;
    }
  };

  const fakeProgress = window.setInterval(() => {
    if (isDone) return;

    if (progress < 82) {
      setProgress(progress + Math.random() * 9 + 3);
      return;
    }

    if (progress < 94) {
      setProgress(progress + Math.random() * 2);
    }
  }, 170);

  const waitForImages = () => {
    const images = Array.from(document.images);

    if (!images.length) return Promise.resolve();

    return Promise.allSettled(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })
    );
  };

  const waitForVideos = () => {
    const videos = Array.from(document.querySelectorAll('video'));

    if (!videos.length) return Promise.resolve();

    return Promise.allSettled(
      videos.map((video) => {
        if (video.readyState >= 2) return Promise.resolve();

        return new Promise((resolve) => {
          video.addEventListener('loadeddata', resolve, { once: true });
          video.addEventListener('canplay', resolve, { once: true });
          video.addEventListener('error', resolve, { once: true });
          window.setTimeout(resolve, 2500);
        });
      })
    );
  };

  const finishLoading = () => {
    if (isDone) return;

    isDone = true;
    window.clearInterval(fakeProgress);
    setProgress(100);

    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');

      initAllAutoplayVideos();
    }, 420);

    window.setTimeout(() => {
      loader.remove();
    }, 1300);
  };

  const minimumTime = new Promise((resolve) => window.setTimeout(resolve, 900));
  const maximumTime = new Promise((resolve) => window.setTimeout(resolve, 4500));

  Promise.race([
    Promise.all([waitForImages(), waitForVideos(), minimumTime]),
    maximumTime
  ]).then(finishLoading).catch(finishLoading);
}

function initAllAutoplayVideos(scope = document) {
  const root = scope instanceof Element || scope instanceof Document ? scope : document;
  const videos = root.querySelectorAll('video');

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    const playVideo = () => {
      const playPromise = video.play?.();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((error) => {
          console.warn('Autoplay bloqueado ou falhou:', error, video);
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
      video.addEventListener('canplay', playVideo, { once: true });
    }

    video.addEventListener('ended', () => {
      try {
        video.currentTime = 0;
        video.play?.().catch?.(() => {});
      } catch (error) {
        console.warn('Erro ao reiniciar vídeo:', error);
      }
    });
  });
}


// ─────────────────────────────────────────────────────────────
// Página estática de atletas amadores: amadores.html
// Para adicionar novo atleta amador, copie um objeto abaixo e atualize id, textos e caminhos das mídias.
// ─────────────────────────────────────────────────────────────
const amateurFighters = [
  {
    id: 'amador-01',
    name: 'Atleta Amador 01',
    nickname: '',
    level: 'Amador',
    modality: 'Boxe',
    category: 'Peso Leve',
    record: '0V • 0D',
    location: 'São Paulo, SP',
    shortBio: 'Atleta amador em desenvolvimento, com foco em evolução técnica e preparação competitiva.',
    story: 'História do atleta amador em atualização. Use este espaço para contar o início na modalidade, rotina de treino, evolução, objetivos e próximas competições.',
    avatar: 'assets/img/fighters/amadores/amador-01-cover.jpg',
    cover: 'assets/img/fighters/amadores/amador-01-cover.jpg',
    portrait: 'assets/img/fighters/amadores/amador-01-portrait.jpg',
    video: { title: 'Vídeo em breve', src: '', poster: 'assets/img/fighters/amadores/amador-01-video-poster.jpg', description: 'Treinos, movimentação, highlights e preparação do atleta amador.' },
    gallery: ['assets/img/fighters/amadores/amador-01-gallery-01.jpg', 'assets/img/fighters/amadores/amador-01-gallery-02.jpg', 'assets/img/fighters/amadores/amador-01-gallery-03.jpg']
  },
  {
    id: 'amador-02',
    name: 'Atleta Amador 02',
    nickname: '',
    level: 'Amador',
    modality: 'MMA',
    category: 'Peso Médio',
    record: '0V • 0D',
    location: 'São Paulo, SP',
    shortBio: 'Atleta amador com perfil versátil, preparado para evoluir em pé, quedas e controle de combate.',
    story: 'História do atleta amador em atualização. Destaque equipe, base técnica, rotina de treino, metas e participação em competições.',
    avatar: 'assets/img/fighters/amadores/amador-02-cover.jpg',
    cover: 'assets/img/fighters/amadores/amador-02-cover.jpg',
    portrait: 'assets/img/fighters/amadores/amador-02-portrait.jpg',
    video: { title: 'Vídeo em breve', src: '', poster: 'assets/img/fighters/amadores/amador-02-video-poster.jpg', description: 'Vídeo do atleta em breve.' },
    gallery: ['assets/img/fighters/amadores/amador-02-gallery-01.jpg', 'assets/img/fighters/amadores/amador-02-gallery-02.jpg', 'assets/img/fighters/amadores/amador-02-gallery-03.jpg']
  },
  {
    id: 'amador-03',
    name: 'Atleta Amador 03',
    nickname: '',
    level: 'Amador',
    modality: 'K1',
    category: 'Peso Meio-Médio',
    record: '0V • 0D',
    location: 'São Paulo, SP',
    shortBio: 'Atleta amador de trocação, com foco em disciplina, ritmo de luta e evolução técnica.',
    story: 'História do atleta amador em atualização. Conte a trajetória no K1, treinos, objetivos e próximos desafios.',
    avatar: 'assets/img/fighters/amadores/amador-03-cover.jpg',
    cover: 'assets/img/fighters/amadores/amador-03-cover.jpg',
    portrait: 'assets/img/fighters/amadores/amador-03-portrait.jpg',
    video: { title: 'Vídeo em breve', src: '', poster: 'assets/img/fighters/amadores/amador-03-video-poster.jpg', description: 'Vídeo do atleta em breve.' },
    gallery: ['assets/img/fighters/amadores/amador-03-gallery-01.jpg', 'assets/img/fighters/amadores/amador-03-gallery-02.jpg', 'assets/img/fighters/amadores/amador-03-gallery-03.jpg']
  },
  {
    id: 'amador-04',
    name: 'Atleta Amador 04',
    nickname: '',
    level: 'Amador',
    modality: 'Muay Thai',
    category: 'Peso Pena',
    record: '0V • 0D',
    location: 'São Paulo, SP',
    shortBio: 'Atleta amador em evolução, com foco em combate em pé, clinch e intensidade competitiva.',
    story: 'História do atleta amador em atualização. Destaque início no Muay Thai, rotina, equipe, evolução e metas competitivas.',
    avatar: 'assets/img/fighters/amadores/amador-04-cover.jpg',
    cover: 'assets/img/fighters/amadores/amador-04-cover.jpg',
    portrait: 'assets/img/fighters/amadores/amador-04-portrait.jpg',
    video: { title: 'Vídeo em breve', src: '', poster: 'assets/img/fighters/amadores/amador-04-video-poster.jpg', description: 'Vídeo do atleta em breve.' },
    gallery: ['assets/img/fighters/amadores/amador-04-gallery-01.jpg', 'assets/img/fighters/amadores/amador-04-gallery-02.jpg', 'assets/img/fighters/amadores/amador-04-gallery-03.jpg']
  }
];

window.DFB_AMATEUR_FIGHTERS = amateurFighters;

function getAmateurFightersData() {
  if (Array.isArray(window.DFB_AMATEUR_FIGHTERS)) return window.DFB_AMATEUR_FIGHTERS;
  if (typeof amateurFighters !== 'undefined' && Array.isArray(amateurFighters)) return amateurFighters;
  return [];
}

function renderAmateurFighterCard(fighter, index = 0) {
  const delay = Math.min(index * 70, 420);
  const fighterId = escapeAttr(fighter.id || '');
  const name = fighter.name || 'Atleta Amador';
  const image = fighter.cover || fighter.avatar || fighter.portrait || 'assets/img/fighters/atleta-placeholder.jpg';
  const modality = resolveModality(fighter.modality) || fighter.modality || '';
  const category = fighter.category || '';

  return `
    <article
      class="fighter-card amateur-fighter-card"
      data-fighter-card
      data-fighter-id="${fighterId}"
      data-amateur-fighter-id="${fighterId}"
      tabindex="0"
      role="button"
      aria-label="Abrir perfil de ${escapeAttr(name)}"
      onclick="window.openFighterProfile && window.openFighterProfile('${fighterId}')"
      style="animation-delay:${delay}ms"
    >
      <div class="amateur-fighter-card__media">
        <img src="${escapeAttr(image)}" alt="${escapeAttr(name)}" loading="lazy">
      </div>

      <div class="amateur-fighter-card__overlay"></div>

      <div class="amateur-fighter-card__top">
        <span>Amador</span>
      </div>

      <div class="amateur-fighter-card__content">
        <span class="amateur-fighter-card__modality">${escapeHtml(modality)}</span>
        <h3>${escapeHtml(name)}</h3>
        ${category ? `<p>${escapeHtml(category)}</p>` : ''}
      </div>

      <span class="amateur-fighter-card__action">Ver perfil</span>
    </article>
  `;
}

function filterAmateurFightersByModality(modality) {
  const fightersData = getAmateurFightersData().filter((fighter) => isAllowedModality(fighter.modality));
  if (modality === ALL_MODALITY) return fightersData;

  const normalizedFilter = normalizeModality(modality);
  return fightersData.filter((fighter) => normalizeModality(resolveModality(fighter.modality)) === normalizedFilter);
}

function renderAmateurFightersRows(activeModality = ALL_MODALITY) {
  const container = document.getElementById('amateurFightersRows');
  if (!container) return;

  const filteredFighters = filterAmateurFightersByModality(activeModality);

  if (!filteredFighters.length) {
    container.innerHTML = `
      <div class="empty-state fighters-empty">
        <h3>Nenhum atleta encontrado</h3>
        <p>Não há atletas amadores em ${escapeHtml(activeModality)} no momento.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <section class="fighters-row reveal is-visible" data-fighters-row>
      <div class="fighters-row__header">
        <h3>${activeModality === ALL_MODALITY ? 'Todos os amadores' : escapeHtml(activeModality)}</h3>
        <div class="fighters-row__controls" aria-label="Controles da fileira de atletas amadores">
          <button type="button" data-row-prev aria-label="Rolar para esquerda">‹</button>
          <button type="button" data-row-next aria-label="Rolar para direita">›</button>
        </div>
      </div>
      <div class="fighters-row__scroller" data-row-scroller tabindex="0">
        <div class="fighters-row__track">
          ${filteredFighters.map(renderAmateurFighterCard).join('')}
        </div>
      </div>
    </section>
  `;

  bindFighterCards(container);
  initHorizontalScroll(container);
}

function initAmateurFilters() {
  const buttons = document.querySelectorAll('[data-amateur-modality]');
  const section = document.getElementById('amadores');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const modality = button.dataset.amateurModality || ALL_MODALITY;
      if (modality !== ALL_MODALITY && !isAllowedModality(modality)) return;

      buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.amateurModality === modality));
      renderAmateurFightersRows(modality);
      closeMobileMenu();
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initAmateurFightersPage() {
  const container = document.getElementById('amateurFightersRows');
  if (!container) return;

  // Na página amadora, o modal existente passa a consumir somente a base dos atletas amadores.
  window.DFB_FIGHTERS = getAmateurFightersData();

  renderAmateurFightersRows(ALL_MODALITY);
  initAmateurFilters();
}


document.addEventListener('DOMContentLoaded', initApp);

function initFightersCatalog() {
  renderFightersRows(state.activeModality);
}

function renderFightersRows(modality = ALL_MODALITY) {
  const rowsContainer = document.querySelector(selectors.rows);
  if (!rowsContainer) return;

  const groups = getFighterGroups(modality);

  if (!groups.length) {
    rowsContainer.innerHTML = `<div class="empty-state">Nenhum atleta encontrado para esta modalidade.</div>`;
    return;
  }

  rowsContainer.innerHTML = groups.map(({ title, items }) => `
    <section class="fighters-row reveal is-visible" data-fighters-row>
      <div class="fighters-row__header">
        <h3>${escapeHtml(title)}</h3>
        <div class="fighters-row__controls" aria-label="Controles da fileira ${escapeHtml(title)}">
          <button type="button" data-row-prev aria-label="Rolar para esquerda">‹</button>
          <button type="button" data-row-next aria-label="Rolar para direita">›</button>
        </div>
      </div>
      <div class="fighters-row__scroller" data-row-scroller tabindex="0">
        <div class="fighters-row__track">
          ${items.map(renderFighterCard).join('')}
        </div>
      </div>
    </section>
  `).join('');

  bindFighterCards(rowsContainer);
  initHorizontalScroll(rowsContainer);
}

function getFighterGroups(modality) {
  const allowedFighters = fighters.filter((fighter) => isAllowedModality(fighter.modality));

  if (modality !== ALL_MODALITY) {
    return [{ title: modality, items: filterFightersByModality(modality) }].filter(group => group.items.length);
  }

  const featured = allowedFighters.filter(fighter => fighter.featured);
  const rows = featured.length ? [{ title: 'Destaques', items: featured }] : [];

  ALLOWED_MODALITIES.forEach((currentModality) => {
    const items = filterFightersByModality(currentModality);
    if (items.length) rows.push({ title: currentModality, items });
  });

  return rows;
}

function normalizeModality(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function resolveModality(modality) {
  const normalized = normalizeModality(modality);
  const aliased = MODALITY_ALIASES[normalized];

  if (aliased) return aliased;

  return ALLOWED_MODALITIES.find((item) => normalizeModality(item) === normalized) || '';
}

function isAllowedModality(modality) {
  return Boolean(resolveModality(modality));
}

function renderFighterCard(fighter, index) {
  const delay = Math.min(index * 70, 420);
  const fighterId = escapeAttr(fighter.id || '');

  return `
    <button
      class="fighter-card"
      type="button"
      data-fighter-card
      data-fighter-id="${fighterId}"
      aria-label="Abrir perfil de ${escapeAttr(fighter.name || 'Atleta DFB')}"
      onclick="window.openFighterProfile && window.openFighterProfile('${fighterId}')"
      style="animation-delay:${delay}ms"
    >
      <img src="${escapeAttr(fighter.cover || fighter.avatar || fighter.portrait || '')}" alt="${escapeAttr(fighter.name || 'Atleta DFB')}" loading="lazy">
      <div class="fighter-card__content">
        <h4>${escapeHtml(fighter.name || '')}</h4>
        <p>${escapeHtml(fighter.nickname || fighter.shortBio || '')}</p>
        <div class="fighter-card__meta">
          <span>${escapeHtml(resolveModality(fighter.modality) || fighter.modality || '')}</span>
          <span>${escapeHtml(fighter.category || '')}</span>
          <span>${escapeHtml(fighter.record || '')}</span>
        </div>
        <div class="fighter-card__action">Ver perfil</div>
      </div>
    </button>
  `;
}

function filterFightersByModality(modality) {
  const allowedFighters = fighters.filter((fighter) => isAllowedModality(fighter.modality));

  if (modality === ALL_MODALITY) return allowedFighters;

  const normalizedFilter = normalizeModality(modality);

  return allowedFighters.filter((fighter) => {
    return normalizeModality(resolveModality(fighter.modality)) === normalizedFilter;
  });
}

function initModalityFilters() {
  const buttons = document.querySelectorAll('[data-modality]');
  const section = document.getElementById('atletas');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const modality = button.dataset.modality || ALL_MODALITY;
      if (modality !== ALL_MODALITY && !isAllowedModality(modality)) return;
      state.activeModality = modality;

      buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.modality === modality));
      renderFightersRows(modality);
      closeMobileMenu();

      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFighterProfileModal() {
  ensureFighterProfileModal();
  bindFighterCards(document);

  // Clique delegado definitivo: funciona mesmo quando filtros recriam os cards.
  // Mantém o popup abrindo em cards dinâmicos, no desktop e no mobile.
  if (document.documentElement.dataset.dfbProfileDelegated !== 'true') {
    document.documentElement.dataset.dfbProfileDelegated = 'true';

    const handleOpenFromEvent = (event) => {
      const closeButton = event.target.closest?.('[data-close-fighter-modal]');
      if (closeButton) {
        event.preventDefault();
        closeFighterProfile();
        return;
      }

      const card = event.target.closest?.('[data-fighter-id]');
      if (!card || card.closest('[data-ignore-fighter-profile]')) return;

      const fighterId = card.getAttribute('data-fighter-id');
      if (!fighterId) {
        console.warn('DFB: card encontrado sem data-fighter-id.', card);
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      openFighterProfile(fighterId);
    };

    document.addEventListener('click', handleOpenFromEvent, true);

    document.addEventListener('keydown', (event) => {
      const modalElement = document.querySelector(selectors.modal);

      if (event.key === 'Escape' && modalElement?.classList.contains('is-open')) {
        closeFighterProfile();
        return;
      }

      if (event.key !== 'Enter' && event.key !== ' ') return;

      const card = event.target.closest?.('[data-fighter-id]');
      if (!card) return;

      event.preventDefault();
      openFighterProfile(card.getAttribute('data-fighter-id'));
    });
  }

  // Se o catálogo for renderizado novamente por algum motivo externo,
  // os cards continuam recebendo acessibilidade e fallback de clique.
  if (!window.__dfbFighterCardObserver) {
    window.__dfbFighterCardObserver = new MutationObserver(() => bindFighterCards(document));
    window.__dfbFighterCardObserver.observe(document.body, { childList: true, subtree: true });
  }
}

function ensureFighterProfileModal() {
  let modal = document.querySelector(selectors.modal);
  if (modal) return modal;

  // Segurança: se o HTML antigo estiver sem o modal, o JS cria a estrutura automaticamente.
  document.body.insertAdjacentHTML('beforeend', `
    <div class="fighter-profile-modal" id="fighterProfileModal" aria-hidden="true">
      <div class="fighter-profile-modal__backdrop" data-close-fighter-modal></div>
      <div class="fighter-profile-modal__dialog" role="dialog" aria-modal="true" aria-label="Perfil do atleta">
        <button class="fighter-profile-modal__close" type="button" data-close-fighter-modal aria-label="Fechar perfil">×</button>
        <div class="fighter-profile-modal__hero">
          <div class="fighter-profile-modal__media">
            <img id="fighterModalPortrait" src="" alt="">
          </div>
          <div class="fighter-profile-modal__headline">
            <span id="fighterModalModality"></span>
            <h2 id="fighterModalName"></h2>
            <p id="fighterModalShortBio"></p>
          </div>
        </div>
        <div class="fighter-profile-modal__content">
          <div class="fighter-profile-modal__stats" id="fighterModalStats"></div>
          <div class="fighter-profile-modal__story">
            <span>História</span>
            <p id="fighterModalStory"></p>
          </div>
          <div class="fighter-profile-modal__video" id="fighterModalVideo"></div>
          <div class="fighter-profile-modal__gallery" id="fighterModalGallery"></div>
          <div class="fighter-profile-modal__actions">
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="btn btn-primary">Contato comercial</a>
          </div>
        </div>
      </div>
    </div>
  `);

  return document.querySelector(selectors.modal);
}

function bindFighterCards(scope = document) {
  const cards = scope.querySelectorAll('[data-fighter-card], [data-fighter-id]');

  cards.forEach((card) => {
    card.dataset.boundProfile = 'true';

    if (!card.hasAttribute('tabindex') && card.tagName.toLowerCase() !== 'button') {
      card.setAttribute('tabindex', '0');
    }

    if (!card.getAttribute('aria-label')) {
      const name = card.querySelector('h3, h4')?.textContent?.trim();
      card.setAttribute('aria-label', name ? `Abrir perfil de ${name}` : 'Abrir perfil do atleta');
    }
  });
}

function getFightersData() {
  const professionalData = Array.isArray(window.DFB_FIGHTERS)
    ? window.DFB_FIGHTERS
    : (typeof fighters !== 'undefined' && Array.isArray(fighters) ? fighters : []);

  const amateurData = Array.isArray(window.DFB_AMATEUR_FIGHTERS)
    ? window.DFB_AMATEUR_FIGHTERS
    : (typeof amateurFighters !== 'undefined' && Array.isArray(amateurFighters) ? amateurFighters : []);

  if (document.body?.dataset.page === 'amadores') {
    return amateurData.length ? amateurData : professionalData;
  }

  return professionalData;
}

function openFighterModal(fighterId) {
  openFighterProfile(fighterId);
}

function openFighterProfile(fighterId) {
  ensureFighterProfileModal();

  const fightersData = getFightersData();
  const fighter = fightersData.find(item => String(item.id) === String(fighterId));
  const modal = document.querySelector(selectors.modal);

  if (!fighter || !modal) {
    console.warn('DFB: atleta não encontrado ou modal ausente:', fighterId);
    if (fightersData.length) {
      console.table(fightersData.map(item => ({ id: item.id, name: item.name })));
    }
    return;
  }

  state.activeFighterId = fighterId;

  const portrait = document.getElementById('fighterModalPortrait');
  const modality = document.getElementById('fighterModalModality');
  const name = document.getElementById('fighterModalName');
  const shortBio = document.getElementById('fighterModalShortBio');
  const story = document.getElementById('fighterModalStory');
  const stats = document.getElementById('fighterModalStats');
  const video = document.getElementById('fighterModalVideo');
  const gallery = document.getElementById('fighterModalGallery');

  if (portrait) {
    portrait.src = fighter.portrait || fighter.cover || fighter.avatar || 'assets/img/fighters/atleta-01-portrait.jpg';
    portrait.alt = fighter.name || 'Atleta DFB';
  }

  if (modality) modality.textContent = resolveModality(fighter.modality) || fighter.modality || 'Atleta DFB';
  if (name) name.textContent = fighter.nickname ? `${fighter.name} “${fighter.nickname}”` : (fighter.name || 'Atleta DFB');
  if (shortBio) shortBio.textContent = fighter.shortBio || 'Perfil profissional do atleta DFB.';
  if (story) story.textContent = fighter.story || 'História do atleta em breve.';
  if (stats) stats.innerHTML = renderFighterStats(fighter);
  if (video) video.innerHTML = renderFighterVideo(fighter);
  if (gallery) gallery.innerHTML = renderFighterGallery(fighter);

  initAllAutoplayVideos(modal);

  modal.classList.add('is-open');
  document.body.classList.add('is-fighter-modal-open', 'modal-open');

  requestAnimationFrame(() => {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.fighter-profile-modal__close')?.focus({ preventScroll: true });
  });
}

window.openFighterProfile = openFighterProfile;
window.openFighterModal = openFighterModal;
window.closeFighterProfile = closeFighterProfile;

function closeFighterModal() {
  closeFighterProfile();
}

function closeFighterProfile() {
  const modal = document.querySelector(selectors.modal);
  if (!modal || !modal.classList.contains('is-open')) return;

  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');

  modal.querySelectorAll('video').forEach((video) => {
    video.pause();
    video.removeAttribute('src');
    video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'));
    video.load();
  });

  window.setTimeout(() => {
    modal.classList.remove('is-open');
    document.body.classList.remove('is-fighter-modal-open', 'modal-open');
    state.activeFighterId = null;
  }, 360);
}

function renderFighterStats(fighter) {
  const stats = [
    { label: 'Modalidade', value: resolveModality(fighter.modality) || fighter.modality },
    { label: 'Categoria', value: fighter.category },
    { label: 'Cartel', value: fighter.record },
    { label: 'Base', value: fighter.location }
  ].filter((item) => item.value);

  return stats.map((item) => `
    <div class="fighter-stat">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join('');
}

function renderFighterVideo(fighter) {
  const video = fighter.video || fighter.videos?.[0];

  if (!video || !video.src) {
    return `
      <div class="fighter-video-empty">
        <span>Vídeo em breve</span>
        <p>Adicione o caminho do vídeo no array do atleta para exibir o highlight.</p>
      </div>
    `;
  }

  return `
    <div class="fighter-video-card">
      <video controls autoplay muted loop playsinline preload="metadata" poster="${escapeAttr(video.poster || '')}">
        <source src="${escapeAttr(video.src)}" type="video/mp4">
      </video>

      <div>
        <h3>${escapeHtml(video.title || 'Highlight do atleta')}</h3>
        <p>${escapeHtml(video.description || '')}</p>
      </div>
    </div>
  `;
}

function renderFighterGallery(fighter) {
  const gallery = fighter.gallery || [];

  if (!gallery.length) return '';

  return gallery.map((image, index) => `
    <button type="button" class="fighter-gallery-item" aria-label="Foto ${index + 1} de ${escapeAttr(fighter.name)}">
      <img src="${escapeAttr(image)}" alt="${escapeAttr(fighter.name)} foto ${index + 1}" loading="lazy">
    </button>
  `).join('');
}

function initHorizontalScroll(scope = document) {
  scope.querySelectorAll('[data-fighters-row]').forEach((row) => {
    const scroller = row.querySelector('[data-row-scroller]');
    const prev = row.querySelector('[data-row-prev]');
    const next = row.querySelector('[data-row-next]');
    if (!scroller || scroller.dataset.scrollReady === 'true') return;
    scroller.dataset.scrollReady = 'true';

    prev?.addEventListener('click', () => scroller.scrollBy({ left: -scroller.clientWidth * 0.82, behavior: 'smooth' }));
    next?.addEventListener('click', () => scroller.scrollBy({ left: scroller.clientWidth * 0.82, behavior: 'smooth' }));

    scroller.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        scroller.scrollBy({ left: event.deltaY * 1.2, behavior: 'smooth' });
      }
    }, { passive: false });

    let isDown = false;
    let wasDragged = false;
    let startX = 0;
    let scrollLeft = 0;

    scroller.addEventListener('pointerdown', (event) => {
      isDown = true;
      wasDragged = false;
      startX = event.pageX;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener('pointermove', (event) => {
      if (!isDown) return;

      if (!wasDragged && Math.abs(event.pageX - startX) > 6) {
        wasDragged = true;
        scroller.classList.add('is-dragging');
        try { scroller.setPointerCapture(event.pointerId); } catch (_) {}
      }

      if (wasDragged) {
        const walk = (event.pageX - startX) * 1.4;
        scroller.scrollLeft = scrollLeft - walk;
      }
    });

    scroller.addEventListener('click', (event) => {
      if (wasDragged) {
        event.stopPropagation();
        event.preventDefault();
        wasDragged = false;
      }
    }, true);

    ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
      scroller.addEventListener(type, () => {
        isDown = false;
        scroller.classList.remove('is-dragging');
      });
    });
  });
}

function initHeroInteractions() {
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 28));
    const tick = () => {
      current = Math.min(target, current + step);
      counter.textContent = `${current}+`;
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  if (!hero || !video) return;

  // Garante autoplay em navegadores mobile/Netlify quando o arquivo MP4 existir no caminho correto.
  video.muted = true;
  video.playsInline = true;
  const playPromise = video.play?.();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      hero.classList.add('is-video-paused');
    });
  }

  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / Math.max(hero.offsetHeight, 1), 1);
    video.style.opacity = String(0.96 - progress * 0.22);
    video.style.transform = `scale(${1.04 + progress * 0.035})`;
  }, { passive: true });
}

function initHero3DFighter() {
  const hero3d = document.querySelector('[data-hero-3d]');
  if (!hero3d) return;

  const image = hero3d.querySelector('.hero-3d-fighter__image');
  const maxTilt = 8;

  hero3d.addEventListener('pointermove', (event) => {
    const rect = hero3d.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    hero3d.style.setProperty('--hero-3d-x', `${x * 100}%`);
    hero3d.style.setProperty('--hero-3d-y', `${y * 100}%`);

    if (image) {
      image.style.transform = `translateZ(60px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }
  });

  hero3d.addEventListener('pointerleave', () => {
    hero3d.style.setProperty('--hero-3d-x', '50%');
    hero3d.style.setProperty('--hero-3d-y', '45%');

    if (image) {
      image.style.transform = 'translateZ(60px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  });
}


function initHeroPersonCard() {
  const card = document.querySelector('[data-hero-person]');
  if (!card) return;

  const frame = card.querySelector('.hero-person-card__frame');
  const image = card.querySelector('.hero-person-card__image');

  if (!frame) return;

  const maxTilt = 5;

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    frame.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    if (image) {
      image.style.transform = `scale(1.055) translateX(${(x - 0.5) * 8}px) translateY(${(y - 0.5) * 8}px)`;
    }
  });

  card.addEventListener('pointerleave', () => {
    frame.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';

    if (image) {
      image.style.transform = 'scale(1.02)';
    }
  });
}


function initSafeMediaFallbacks() {
  document.addEventListener('error', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;

    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';

    const label = encodeURIComponent(target.alt || 'DFB');
    target.src = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23050505'/%3E%3Cstop offset='.62' stop-color='%23111111'/%3E%3Cstop offset='1' stop-color='%238a6817'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='1200' fill='url(%23g)'/%3E%3Ccircle cx='700' cy='160' r='220' fill='%23d4af37' opacity='.12'/%3E%3Ctext x='64' y='620' fill='%23ffe08a' font-size='72' font-family='Arial' font-weight='700'%3E${label}%3C/text%3E%3Ctext x='64' y='700' fill='%23ffffff' opacity='.55' font-size='26' font-family='Arial'%3ESubstitua pela imagem final%3C/text%3E%3C/svg%3E`;
  }, true);
}

/* ── Funções que estavam faltando e impediam initApp() de rodar ── */

function initNavbar() {
  const toggle = document.querySelector(selectors.navToggle);
  const menu = document.querySelector(selectors.navMenu);
  const navbar = document.querySelector(selectors.navbar);
  const backdrop = document.querySelector('[data-mobile-menu-backdrop]');

  if (!toggle || !menu) return;

  function openMenu() {
    toggle.classList.add('is-active');
    menu.classList.add('is-open');
    backdrop?.classList.add('is-active');
    document.body.classList.add('is-mobile-menu-open');

    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    navbar?.classList.add('is-menu-open');
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);
  backdrop?.addEventListener('click', closeMobileMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const toggle = document.querySelector(selectors.navToggle);
  const menu = document.querySelector(selectors.navMenu);
  const navbar = document.querySelector(selectors.navbar);
  const backdrop = document.querySelector('[data-mobile-menu-backdrop]');

  if (!menu) return;

  menu.classList.remove('is-open');
  backdrop?.classList.remove('is-active');
  document.body.classList.remove('is-mobile-menu-open');

  toggle?.classList.remove('is-active');
  toggle?.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  navbar?.classList.remove('is-menu-open');
}


function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function initSponsorAnimations() {
  // Espaço reservado — sem animação customizada no momento.
}



function initFooterVideo() {
  const footer = document.querySelector('.footer-pro, .site-footer, .footer');
  const footerVideo = document.querySelector('.footer-bg-video, .footer-pro__video');

  if (!footerVideo) return;

  footerVideo.muted = true;
  footerVideo.loop = true;
  footerVideo.playsInline = true;
  footerVideo.setAttribute('muted', '');
  footerVideo.setAttribute('playsinline', '');

  const markVideoLoaded = () => {
    footer?.classList.add('footer-video-loaded');
    footer?.classList.remove('footer-video-error');
    footerVideo.classList.remove('is-paused');
  };

  const markVideoError = () => {
    footer?.classList.add('footer-video-error');
    footerVideo.classList.add('is-paused');
  };

  footerVideo.addEventListener('loadeddata', markVideoLoaded, { once: true });
  footerVideo.addEventListener('canplay', markVideoLoaded, { once: true });
  footerVideo.addEventListener('error', markVideoError);

  const playFooterVideo = () => {
    const attempt = footerVideo.play();

    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch((error) => {
        console.warn('Autoplay do vídeo do footer foi bloqueado ou falhou:', error);
        footerVideo.classList.add('is-paused');
      });
    }
  };

  if (footerVideo.readyState > 1) {
    markVideoLoaded();
  }

  playFooterVideo();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      footerVideo.pause();
      return;
    }

    playFooterVideo();
  });
}


/* ── Utilitários de escape ── */

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}
