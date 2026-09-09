import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Dna,
  Download,
  FileText,
  GraduationCap,
  Leaf,
  Mail,
  Map,
  Microscope,
  Network,
  Quote,
  ScanSearch,
  Sprout,
  Waves,
} from "lucide-react";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { ADMIN_EMAIL } from "@/lib/admin-auth";
import { getEditableContent, getGalleryItems } from "@/lib/content";

export const dynamic = "force-dynamic";

const anthropoceneFramework = [
  {
    number: "01",
    title: "Pressões",
    text: "Mudanças climáticas, mineração, conversão do uso do solo, invasões biológicas e contaminantes emergentes.",
  },
  {
    number: "02",
    title: "Respostas",
    text: "Distribuição, diversidade taxonômica e funcional, interações bióticas, decomposição e serviços ecossistêmicos.",
  },
  {
    number: "03",
    title: "Evidências",
    text: "Campo, laboratório, traços funcionais, síntese científica, modelagem ecológica, geotecnologias e análise de dados.",
  },
  {
    number: "04",
    title: "Soluções",
    text: "Conservação, restauração, monitoramento, ecotecnologias, ciência para políticas públicas e educação ambiental.",
  },
];

const researchAreas = [
  {
    number: "01",
    title: "Entomologia e interações inseto–planta",
    text: "Biologia, diversidade e história natural de besouros rola-bostas, insetos galhadores, predadores de sementes, formigas e polinizadores.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Ecologia de comunidades e funções",
    text: "Respostas taxonômicas e funcionais, interações interespecíficas, decomposição, ciclagem de nutrientes e regeneração de ecossistemas.",
    icon: Dna,
  },
  {
    number: "03",
    title: "Mudanças globais e modelagem ecológica",
    text: "Modelagem de nicho, cenários climáticos, métricas da paisagem e projeções de distribuição de espécies nativas, exóticas e invasoras.",
    icon: ScanSearch,
  },
  {
    number: "04",
    title: "Impactos ambientais e restauração",
    text: "Avaliação de ecossistemas afetados por rejeitos de mineração, perda de habitat e contaminantes, com foco em recuperação baseada em evidências.",
    icon: Map,
  },
  {
    number: "05",
    title: "Limnologia, bioindicadores e interface terra–água",
    text: "Macroinvertebrados aquáticos, integridade funcional, ecossistemas ripários e processos ecológicos aplicados ao diagnóstico da qualidade ambiental.",
    icon: Waves,
  },
  {
    number: "06",
    title: "Ciência para decisão e sociedade",
    text: "Redação técnico-científica, policy briefs, formação de estudantes, educação ambiental e popularização da ciência para públicos diversos.",
    icon: FileText,
  },
];

const methods = [
  "Entomologia",
  "Interações inseto–planta",
  "Ecologia taxonômica e funcional",
  "Limnologia e bioindicadores",
  "Modelagem de nicho ecológico",
  "Traços funcionais",
  "Sensoriamento remoto e SIG",
  "Estatística e programação em R",
  "Revisão e síntese de evidências",
  "Redação técnico-científica",
  "Divulgação científica",
];

const professionalHighlights = [
  {
    value: "15+ anos",
    label: "de trajetória acadêmica e científica, iniciada em 2010",
  },
  {
    value: "4 etapas",
    label: "bacharelado, mestrado, doutorado e experiência pós-doutoral",
  },
  {
    value: "Terra ↔ água",
    label: "experiência em ecossistemas terrestres, ripários e aquáticos",
  },
  {
    value: "P&D ambiental",
    label: "ecotecnologias, bioindicadores, qualidade analítica e suporte à decisão",
  },
];

const differentials = [
  {
    number: "01",
    title: "Visão transescalar",
    text: "Conecto organismos, traços, comunidades, paisagens e cenários climáticos para interpretar processos ecológicos complexos.",
    icon: Network,
  },
  {
    number: "02",
    title: "Integração terra–água",
    text: "Reúno experiências em entomologia terrestre, macroinvertebrados aquáticos, ecossistemas ripários e funcionamento de ecossistemas.",
    icon: Waves,
  },
  {
    number: "03",
    title: "Do diagnóstico à solução",
    text: "Combino P&D, monitoramento, qualidade analítica, modelagem, ecossistemas de referência, geotecnologias e restauração para apoiar decisões ambientais.",
    icon: Microscope,
  },
  {
    number: "04",
    title: "Ciência que circula",
    text: "Transformo resultados em artigos, relatórios, policy briefs, materiais educativos, palestras e experiências de divulgação científica.",
    icon: BookOpen,
  },
];

const projects = [
  {
    label: "2025—Atual · INSECTA / UNIMONTES",
    title: "Pesquisa em biodiversidade e ecologia de insetos",
    text: "Atuação pós-doutoral em estudos sobre a diversidade e as respostas de insetos e outros artrópodes à sazonalidade, ao uso da terra e às mudanças ambientais. O trabalho integra atividades de campo e laboratório, identificação taxonômica, análise de dados em R, produção científica e formação de estudantes, com aplicações em conservação, restauração e manejo sustentável.",
    icon: Leaf,
  },
  {
    label: "2024—2025 · BIOCHRONOS / UFMG",
    title: "Apoio técnico e pesquisa pós-doutoral na bacia do Rio Doce",
    text: "Atuação profissional no Biochronos inicialmente em apoio técnico e, posteriormente, como pós-doutoranda, contribuindo para o monitoramento da degradação oculta na interface terra–água. As atividades incluíram planejamento de experimento de decomposição aquática ao longo de mais de 600 km do Rio Doce, gestão de amostras e insumos, organização de campanhas, apoio laboratorial, capacitação em subprojetos, comunicação e divulgação científica. Também integrou as comissões organizadoras do III Workshop Biochronos e do Restaura+.",
    icon: Waves,
  },
  {
    label: "2020—2024 · Doutorado / UESC",
    title: "Ecologia e conservação de besouros rola-bostas",
    text: "Pesquisa sobre Scarabaeinae que integra modelos, ameaças ambientais e perspectivas de conservação na Mata Atlântica.",
    icon: Network,
  },
  {
    label: "2019—2020 · Restauração com Ciência / UFMG",
    title: "Ecossistemas de referência e restauração do Rio Doce",
    text: "Coordenação de projeto voltado à seleção de espécies, desempenho de mudas e desenvolvimento de sensoriamento remoto para áreas degradadas.",
    icon: Sprout,
  },
  {
    label: "2018—2019 · P&D ANEEL–CEMIG GT-599 / UFMG",
    title: "P&D em ecotecnologias para diagnóstico ambiental",
    text: "Bolsista de apoio técnico no Laboratório de Ecologia de Bentos, com atuação em calibração e manutenção de equipamentos para análises físico-químicas da água, preparo de reagentes e amostras, implantação da rotina de extração de clorofila, controle de insumos e suporte a instituições parceiras. Também participou do treinamento da equipe para a reamostragem padronizada de 40 riachos na unidade hidrológica de Nova Ponte e para a aplicação de protocolos de integridade biológica.",
    icon: Microscope,
  },
];

const selectedPublications = [
  {
    year: "2026",
    journal: "Forest Ecology and Management",
    title: "Rejeitos de mineração e a decomposição de espécies nativas no Rio Doce",
    text: "Estudo sobre consequências persistentes dos rejeitos para um processo-chave de ciclagem de nutrientes e recuperação florestal.",
    href: "https://doi.org/10.1016/j.foreco.2025.123270",
  },
  {
    year: "2026",
    journal: "Journal of Applied Entomology",
    title: "Mudanças climáticas, abelhas e a paisagem impactada por rejeitos",
    text: "Projeções da área climaticamente adequada para Apis mellifera na bacia do Rio Doce e sua sobreposição com a mancha de rejeitos.",
    href: "https://doi.org/10.1111/jen.70102",
  },
  {
    year: "2025",
    journal: "Environmental Monitoring and Assessment",
    title: "Mudanças na distribuição de minhocas invasoras",
    text: "Modelos de nicho revelam como clima, cobertura florestal e o contexto da mineração podem reorganizar espécies invasoras na bacia do Rio Doce.",
    href: "https://doi.org/10.1007/s10661-025-14196-y",
  },
  {
    year: "2020",
    journal: "Perspectives in Ecology and Conservation",
    title: "Campo Rupestre: biodiversidade, serviços e sustentabilidade",
    text: "Uma agenda integrada de conhecimento, conservação, restauração e políticas para um dos hotspots mais singulares do Brasil.",
    href: "https://doi.org/10.1016/j.pecon.2020.10.004",
  },
];

const knowledgeProducts = [
  {
    type: "Policy brief · 2025",
    role: "Primeira autora",
    title: "Invasão biológica na Serra do Cipó: capim-natal",
    text: "Alerta técnico sobre o avanço de Melinis repens no campo rupestre, seus impactos sobre a biodiversidade e caminhos para prevenção, controle e governança.",
    cover: "/trabalhos/capas/capim-natal.webp",
    pdf: "/trabalhos/capim-natal.pdf",
    sourceHref: "https://doi.org/10.6084/m9.figshare.29979736",
    sourceLabel: "Acessar DOI",
  },
  {
    type: "Resumo executivo · 2025",
    role: "Coautora",
    title: "Prioridades na restauração de ecossistemas no Brasil",
    text: "Síntese nacional de prioridades científicas, sociais e institucionais para orientar políticas e ações de restauração ecológica em diferentes biomas.",
    cover: "/trabalhos/capas/prioridades-restauracao.webp",
    pdf: "/trabalhos/prioridades-restauracao.pdf",
    sourceHref: "https://doi.org/10.6084/m9.figshare.29646914",
    sourceLabel: "Acessar DOI",
  },
  {
    type: "Alerta científico · 2025",
    role: "Signatária",
    title: "Alerta científico sobre a bacia do Rio Doce",
    text: "Posicionamento coletivo baseado em evidências sobre riscos socioambientais, integridade ecológica e a necessidade de decisões responsáveis para a bacia.",
    cover: "/trabalhos/capas/alerta-rio-doce.webp",
    pdf: "/trabalhos/alerta-rio-doce.pdf",
  },
  {
    type: "Policy brief · 2025",
    role: "Coautora",
    title: "Invasão biológica na Serra do Cipó: capim-meloso",
    text: "Diagnóstico acessível sobre a expansão do capim-meloso no campo rupestre, os efeitos ecológicos da invasão e prioridades de manejo integrado.",
    cover: "/trabalhos/capas/capim-meloso.webp",
    pdf: "/trabalhos/capim-meloso.pdf",
    sourceHref: "https://doi.org/10.6084/m9.figshare.29839706",
    sourceLabel: "Acessar DOI",
  },
  {
    type: "Policy brief · 2025",
    role: "Coautora",
    title: "Invasão biológica na Serra do Cipó: unha-de-gato",
    text: "Alerta sobre uma planta invasora capaz de alterar a vegetação nativa, com recomendações para detecção, controle e participação das comunidades locais.",
    cover: "/trabalhos/capas/unha-de-gato.webp",
    pdf: "/trabalhos/unha-de-gato.pdf",
    sourceHref: "https://doi.org/10.6084/m9.figshare.30311899",
    sourceLabel: "Acessar DOI",
  },
  {
    type: "Policy brief · 2025",
    role: "Coautora",
    title: "Invasão biológica na Serra do Cipó: pinheiro-americano",
    text: "Síntese sobre os impactos do pinheiro-americano no campo rupestre e sobre medidas de prevenção, controle e restauração dos ambientes afetados.",
    cover: "/trabalhos/capas/pinheiro-americano.webp",
    pdf: "/trabalhos/pinheiro-americano.pdf",
    sourceHref: "https://doi.org/10.6084/m9.figshare.30921011",
    sourceLabel: "Acessar DOI",
  },
  {
    type: "Material educativo",
    role: "Redação e distribuição",
    title: "Germinação de sementes: por que estudar e por que conservar?",
    text: "Material de divulgação que traduz evidências sobre a germinação de plantas endêmicas do Campo Rupestre em uma narrativa visual, clara e acessível.",
    cover: "/trabalhos/capas/germinacao-campo-rupestre.webp",
    pdf: "/trabalhos/germinacao-campo-rupestre.pdf",
  },
];

const timeline = [
  {
    date: "2010—2014",
    institution: "UNIMONTES",
    title: "Bacharelado em Ciências Biológicas",
    text: "Formação iniciada em limnologia e ecologia de macrófitas aquáticas e aprofundada em entomologia, com TCC sobre predação de sementes de palmeiras por Bruchinae.",
  },
  {
    date: "2015—2017",
    institution: "UNIMONTES",
    title: "Mestrado em Biodiversidade e Uso dos Recursos Naturais",
    text: "Pesquisa sobre a distribuição de insetos galhadores em diferentes habitats do Cerrado, conectando heterogeneidade ambiental, estresse e interações inseto–planta.",
  },
  {
    date: "2018—2019",
    institution: "UFMG · P&D ANEEL–CEMIG GT-599",
    title: "Bolsista de apoio técnico no PROECOS",
    text: "Atuação em P&D ambiental com controle de qualidade de equipamentos e dados, análises físico-químicas da água, preparo de reagentes e amostras, extração de clorofila e capacitação da equipe para a reamostragem de 40 riachos e o uso de protocolos de integridade biológica.",
  },
  {
    date: "2019—2020",
    institution: "UFMG · Restauração com Ciência",
    title: "Pesquisa aplicada à restauração do Rio Doce",
    text: "Coordenação de projeto dedicado a ecossistemas de referência, seleção e desempenho de espécies e desenvolvimento de sensoriamento remoto para monitorar áreas degradadas.",
  },
  {
    date: "2020—2024",
    institution: "UESC · CAPES",
    title: "Doutorado em Ecologia e Conservação da Biodiversidade",
    text: "Tese “Ecologia e conservação de besouros rola-bostas: modelos, ameaças e perspectivas”, com foco em Scarabaeinae, mudanças climáticas e fármacos médico-veterinários.",
  },
  {
    date: "2024—2025",
    institution: "UFMG · Biochronos",
    title: "Apoio técnico e pesquisa pós-doutoral",
    text: "Atuação profissional inicialmente em apoio técnico e, depois, como pós-doutoranda no Biochronos, com planejamento experimental em decomposição aquática, gestão de amostras e insumos, logística de campo, apoio laboratorial, capacitação em subprojetos, comunicação institucional e divulgação de resultados. Participação nas comissões organizadoras do III Workshop Biochronos e do Restaura+.",
  },
  {
    date: "2025—Atual",
    institution: "INSECTA · UNIMONTES",
    title: "Pesquisa pós-doutoral em biodiversidade e entomologia",
    text: "Atuação no Centro Multiusuário de Pesquisa e Extensão em Biologia e Taxonomia de Insetos, investigando respostas de comunidades de artrópodes às mudanças ambientais e conectando taxonomia, análise de dados, produção científica e formação de estudantes.",
  },
];

const outreachWork = [
  {
    type: "Artigo de divulgação · 2023",
    title: "Pandemia no mundo dos insetos",
    text: "Uma narrativa que parte de memórias do cotidiano para explicar o declínio de insetos, seus serviços ecossistêmicos e a contaminação silenciosa por pesticidas e fármacos veterinários.",
    href: "https://popularmente-meioambiente.blogspot.com/2023/12/pandemia-no-mundo-dos-insetos.html",
  },
  {
    type: "Extensão e equidade · 2024",
    title: "Ciência no Quilombo do Jatimane",
    text: "Participação na equipe técnica de uma feira de ciências orientada pelo diálogo entre conhecimentos tradicionais e científicos e pela valorização da cultura afro-brasileira.",
  },
  {
    type: "Palestra · UFMG · 2025",
    title: "De Khepri à Coprisina",
    text: "Palestra sobre a jornada evolutiva dos besouros do esterco para estudantes, docentes e convidados da UFMG, conectando história, evolução e ecologia.",
  },
  {
    type: "Material educativo · Campo Rupestre",
    title: "Germinação de sementes: por que estudar e por que conservar?",
    text: "Redação e distribuição de material que traduz uma síntese científica sobre germinação de plantas endêmicas em linguagem visual e acessível.",
    href: "https://www.youtube.com/watch?v=8syWalyr01g",
  },
  {
    type: "Ciência para políticas públicas · 2025",
    title: "Invasões biológicas e governança ambiental",
    text: "Produção de policy briefs sobre capim-natal, capim-meloso, unha-de-gato, restauração do Rio Doce e riscos do PL 2159/2021.",
    href: "https://doi.org/10.6084/m9.figshare.29979736",
  },
];

const institutions = [
  "UNIMONTES",
  "UESC",
  "UFMG",
  "INSECTA",
  "Biochronos",
  "Centro de Conhecimento em Biodiversidade",
  "CEMIG / PROECOS",
  "Observatório da Biodiversidade Brasileira",
  "CNPq / CAPES",
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Débora Lima Santos",
  honorificPrefix: "Dra.",
  jobTitle: "Bióloga, ecóloga e pesquisadora",
  url: "https://debora-lima-santos.deblslima3.chatgpt.site",
  image: "https://debora-lima-santos.deblslima3.chatgpt.site/debora-lima-santos.jpg",
  sameAs: [
    "http://lattes.cnpq.br/6554187008411187",
    "https://orcid.org/0000-0001-5890-6575",
    "https://www.researchgate.net/profile/Debora-Lima-Santos",
    "https://www.linkedin.com/in/debls/",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidade Estadual de Montes Claros" },
    { "@type": "CollegeOrUniversity", name: "Universidade Estadual de Santa Cruz" },
  ],
  affiliation: [
    { "@type": "Organization", name: "Centro de Conhecimento em Biodiversidade" },
  ],
  knowsAbout: [
    "Ecologia",
    "Entomologia",
    "Biodiversidade",
    "Ecologia de comunidades",
    "Interações inseto-planta",
    "Limnologia",
    "Modelagem ecológica",
    "Restauração ambiental",
    "Divulgação científica",
  ],
};

export default async function Home() {
  const [content, gallery, user] = await Promise.all([
    getEditableContent(),
    getGalleryItems(),
    getChatGPTUser(),
  ]);
  const isOwner = user?.email.toLowerCase() === ADMIN_EMAIL;
  const projectItems = projects.map((project, index) =>
    index === 0
      ? { ...project, title: content.insectaTitle, text: content.insectaBody }
      : project,
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir ao início">
          <span className="brand-mark">DLS</span>
          <span>Débora Lima Santos</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#tema">Tema central</a>
          <a href="#atuacao">Expertises</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#pesquisa">Projetos</a>
          <a href="#publicacoes">Produção</a>
          <a href="#trajetoria">Trajetória</a>
        </nav>
        <a className="header-link" href="#contato">
          Contato <ArrowDownRight size={16} />
        </a>
      </header>

      <div id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> {content.heroKicker}</p>
            <h1>
              <span>{content.heroTitle}</span>
              <em>{content.heroEmphasis}</em>
            </h1>
            <p className="hero-intro">{content.heroIntro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#atuacao">
                Conhecer minha atuação <ArrowDownRight size={18} />
              </a>
              <a className="text-link" href="http://lattes.cnpq.br/6554187008411187" target="_blank" rel="noreferrer">
                Currículo Lattes <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="anthropocene-stamp" aria-hidden="true">
              <span>A</span><small>ANTRO<br />POCENO</small>
            </div>
            <div className="portrait-frame">
              <img src="/debora-lima-santos.jpg" alt="Retrato profissional de Débora Lima Santos" />
            </div>
            <div className="coordinate-card">
              <span>PESQUISA MULTIDISCIPLINAR</span>
              <strong>15+ anos</strong>
              <small>Da história natural aos cenários globais. Da evidência à ação.</small>
            </div>
            <div className="orbit-label">ECOLOGIA · ENTOMOLOGIA · DADOS · CONSERVAÇÃO · SOCIEDADE</div>
          </div>
        </section>

        <section className="theme-section" id="tema">
          <div className="theme-intro">
            <p className="section-kicker">01 / Grande tema de pesquisa</p>
            <h2>{content.themeTitle}</h2>
            <p>{content.themeSubtitle}</p>
          </div>
          <div className="framework" aria-label="Estrutura integradora da pesquisa">
            {anthropoceneFramework.map((item, index) => (
              <article className="framework-step" key={item.title}>
                <div className="framework-top">
                  <span>{item.number}</span>
                  {index < anthropoceneFramework.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : <Leaf size={20} aria-hidden="true" />}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto" id="sobre">
          <p className="section-kicker">02 / Perfil</p>
          <div className="manifesto-grid">
            <h2>{content.aboutTitle}</h2>
            <div className="manifesto-copy">
              <p className="lead">{content.aboutLead}</p>
              <p>{content.aboutBody}</p>
            </div>
          </div>
          <div className="method-ribbon" aria-label="Métodos e competências">
            {methods.map((method) => <span key={method}>{method}</span>)}
          </div>
        </section>

        <section className="experience-strip" aria-label="Resumo da experiência profissional">
          {professionalHighlights.map((item) => (
            <article key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="research" id="atuacao">
          <div className="section-heading">
            <div>
              <p className="section-kicker light">03 / Expertises</p>
              <h2>{content.researchTitle}</h2>
            </div>
            <p>{content.researchBody}</p>
          </div>
          <div className="research-grid">
            {researchAreas.map(({ number, title, text, icon: Icon }) => (
              <article className="research-card" key={title}>
                <div className="card-top"><span>{number}</span><Icon size={27} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="differentials" id="diferenciais">
          <div className="differentials-heading">
            <p className="section-kicker">04 / Diferenciais</p>
            <h2>{content.differentialsTitle}</h2>
            <p>{content.differentialsBody}</p>
          </div>
          <div className="differential-grid">
            {differentials.map(({ number, title, text, icon: Icon }) => (
              <article className="differential-card" key={title}>
                <div><span>{number}</span><Icon size={24} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="pesquisa">
          <div className="section-heading projects-heading">
            <div>
              <p className="section-kicker">05 / Projetos e experiências-chave</p>
              <h2>Pesquisa construída em desafios reais.</h2>
            </div>
            <p>Projetos de pesquisa básica e aplicada que conectam biodiversidade, mudanças globais, ecossistemas impactados e construção de soluções.</p>
          </div>
          <div className="project-list">
            {projectItems.map(({ label, title, text, icon: Icon }, index) => (
              <article className="project-row" key={title}>
                <span className="project-index">0{index + 1}</span>
                <div className="project-icon"><Icon size={24} strokeWidth={1.5} /></div>
                <div className="project-title">
                  <span>{label}</span>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="publications" id="publicacoes">
          <div className="section-heading publication-heading">
            <div>
              <p className="section-kicker light">06 / Produção selecionada</p>
              <h2>{content.publicationsTitle}</h2>
            </div>
            <p>{content.publicationsBody}</p>
          </div>
          <div className="publication-grid">
            {selectedPublications.map((publication, index) => (
              <a
                className="publication-card"
                href={publication.href}
                target="_blank"
                rel="noreferrer"
                key={publication.title}
                aria-label={`${publication.title} — abrir publicação`}
              >
                <div className="publication-meta">
                  <span>0{index + 1}</span>
                  <span>{publication.year}</span>
                </div>
                <p className="publication-journal">{publication.journal}</p>
                <h3>{publication.title}</h3>
                <p>{publication.text}</p>
                <span className="publication-link">Acessar publicação <ArrowUpRight size={16} /></span>
              </a>
            ))}
          </div>
          <a className="all-work-link" href="https://orcid.org/0000-0001-5890-6575" target="_blank" rel="noreferrer">
            Ver produção completa no ORCID <ArrowUpRight size={17} />
          </a>

          <div className="knowledge-heading">
            <p className="section-kicker light">Produção técnico-científica e divulgação</p>
            <div>
              <h3>Conhecimento que orienta decisões e amplia o acesso à ciência.</h3>
              <p>Policy briefs, sínteses e materiais educativos que conectam biodiversidade, restauração e comunicação pública.</p>
            </div>
          </div>
          <div className="knowledge-grid">
            {knowledgeProducts.map((item) => (
              <article className="knowledge-card" key={item.title}>
                <a className="knowledge-cover" href={item.pdf} target="_blank" rel="noreferrer" aria-label={`${item.title} — abrir PDF`}>
                  <img src={item.cover} alt={`Capa de ${item.title}`} loading="lazy" />
                </a>
                <div className="knowledge-copy">
                  <div className="knowledge-meta">
                    <span>{item.type}</span>
                    <strong>{item.role}</strong>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  <div className="knowledge-links">
                    <a href={item.pdf} target="_blank" rel="noreferrer">Abrir PDF <Download size={15} /></a>
                    {item.sourceHref ? (
                      <a href={item.sourceHref} target="_blank" rel="noreferrer">{item.sourceLabel} <ArrowUpRight size={15} /></a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="trajectory" id="trajetoria">
          <div className="trajectory-visual">
            <div className="terrain-photo" role="img" aria-label="Paisagem de campo em área de pesquisa" />
            <div className="trajectory-quote">
              <span>07 / DA FORMAÇÃO À APLICAÇÃO</span>
              <strong>{content.trajectoryTitle}</strong>
              <p>{content.trajectoryBody}</p>
            </div>
          </div>
          <div className="timeline" aria-label="Linha do tempo acadêmica e profissional">
            <p className="section-kicker light">Trajetória acadêmica e profissional</p>
            {timeline.map((item) => (
              <article className="timeline-item" key={`${item.date}-${item.title}`}>
                <div className="timeline-meta"><span>{item.date}</span><small>{item.institution}</small></div>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="science-society" id="divulgacao">
          <div className="society-heading">
            <div>
              <p className="section-kicker">08 / Ciência e sociedade</p>
              <h2>{content.outreachTitle}</h2>
            </div>
            <p>{content.outreachBody}</p>
          </div>
          <div className="society-layout">
            <article className="origin-story">
              <Quote size={34} strokeWidth={1.35} aria-hidden="true" />
              <h3>{content.originTitle}</h3>
              <p>{content.originBody}</p>
              <span><GraduationCap size={18} /> Escola pública · ciência · transformação</span>
            </article>
            <div className="outreach-list" aria-label="Atuações em divulgação científica e extensão">
              {outreachWork.map((item, index) => {
                const cardContent = (
                  <>
                    <div className="outreach-index">0{index + 1}</div>
                    <div>
                      <span>{item.type}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    {item.href ? <ArrowUpRight size={19} aria-hidden="true" /> : <CheckCircle2 size={19} aria-label="Atuação comprovada" />}
                  </>
                );

                return item.href ? (
                  <a className="outreach-row" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                    {cardContent}
                  </a>
                ) : (
                  <article className="outreach-row" key={item.title}>{cardContent}</article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="collaboration">
          <div className="collaboration-copy">
            <p className="section-kicker">09 / Redes e colaboração</p>
            <h2>{content.collaborationTitle}</h2>
            <p>{content.collaborationBody}</p>
          </div>
          <div className="institution-list" aria-label="Instituições e redes de colaboração">
            {institutions.map((institution, index) => (
              <div key={institution}><span>0{index + 1}</span><strong>{institution}</strong></div>
            ))}
          </div>
        </section>

        {gallery.length ? (
          <section className="career-gallery" id="galeria">
            <div className="gallery-heading">
              <div>
                <p className="section-kicker">10 / Memória visual</p>
                <h2>Ciência em movimento.</h2>
              </div>
              <p>Registros de campo, projetos, encontros e experiências que constroem uma trajetória multidisciplinar.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item) => (
                <figure className="gallery-card" key={item.id}>
                  <img src={`/media/${item.id}`} alt={item.title} loading="lazy" />
                  <figcaption>
                    <span>{[item.year, item.location].filter(Boolean).join(" · ")}</span>
                    <strong>{item.title}</strong>
                    {item.caption ? <p>{item.caption}</p> : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <footer id="contato">
        <div className="footer-main">
          <p className="section-kicker light">Pesquisa · consultoria · colaboração · divulgação científica</p>
          <h2>Vamos transformar evidências em soluções para a biodiversidade?</h2>
          <a className="footer-email" href="mailto:debora.santos@edu.unimontes.br">
            debora.santos@edu.unimontes.br <ArrowUpRight size={26} />
          </a>
        </div>
        <div className="footer-links">
          <a href="http://lattes.cnpq.br/6554187008411187" target="_blank" rel="noreferrer">Lattes <ArrowUpRight size={15} /></a>
          <a href="https://orcid.org/0000-0001-5890-6575" target="_blank" rel="noreferrer">ORCID <ArrowUpRight size={15} /></a>
          <a href="https://www.researchgate.net/profile/Debora-Lima-Santos" target="_blank" rel="noreferrer">ResearchGate <ArrowUpRight size={15} /></a>
          <a href="https://www.linkedin.com/in/debls/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
          <a href="mailto:deblslima3@gmail.com"><Mail size={16} /> E-mail</a>
          {isOwner ? <a href="/editar">Editar site <ArrowUpRight size={15} /></a> : null}
        </div>
        <div className="footer-bottom">
          <span>Débora Lima Santos © 2026</span>
          <span>Biodiversidade no Antropoceno</span>
        </div>
      </footer>
    </main>
  );
}
