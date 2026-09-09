import { env } from "cloudflare:workers";

export type EditableContent = {
  heroKicker: string;
  heroTitle: string;
  heroEmphasis: string;
  heroIntro: string;
  themeTitle: string;
  themeSubtitle: string;
  aboutTitle: string;
  aboutLead: string;
  aboutBody: string;
  researchTitle: string;
  researchBody: string;
  differentialsTitle: string;
  differentialsBody: string;
  publicationsTitle: string;
  publicationsBody: string;
  trajectoryTitle: string;
  trajectoryBody: string;
  insectaTitle: string;
  insectaBody: string;
  originTitle: string;
  originBody: string;
  outreachTitle: string;
  outreachBody: string;
  collaborationTitle: string;
  collaborationBody: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  year: string;
  location: string;
  caption: string;
  createdAt: string;
};

export const DEFAULT_CONTENT: EditableContent = {
  heroKicker: "Dra. Débora Lima Santos · Ecologia, entomologia e biodiversidade",
  heroTitle: "Biodiversidade no Antropoceno",
  heroEmphasis: "Da compreensão das mudanças à construção de soluções ambientais.",
  heroIntro:
    "Sou bióloga, doutora em Ecologia e Conservação da Biodiversidade e pesquisadora interdisciplinar. Investigo como espécies, comunidades e funções ecológicas respondem às mudanças climáticas e às transformações humanas — e como esse conhecimento pode orientar conservação, restauração e gestão ambiental.",
  themeTitle: "Compreender mudanças. Revelar respostas. Construir soluções.",
  themeSubtitle:
    "Meu trabalho conecta as pressões que definem o Antropoceno às respostas da biodiversidade e aos caminhos para conservar e restaurar ecossistemas. Esse eixo reúne organismos, comunidades, paisagens, ambientes terrestres e aquáticos, métodos de campo, modelagem e comunicação sob uma mesma agenda científica.",
  aboutTitle: "Uma ecóloga entre organismos, paisagens, dados e pessoas.",
  aboutLead:
    "Minha especialidade é conectar escalas: parto da história natural e das interações entre organismos para compreender mudanças em comunidades, paisagens e funções ecossistêmicas.",
  aboutBody:
    "Sou bacharel em Ciências Biológicas e mestre em Biodiversidade e Uso dos Recursos Naturais pela UNIMONTES, doutora em Ecologia e Conservação da Biodiversidade pela UESC e realizei pós-doutorado no projeto Biochronos, na UFMG. Atualmente, sou pós-doutoranda no INSECTA/UNIMONTES. Em mais de 15 anos de trajetória acadêmica e científica, integrei entomologia, limnologia, ecologia de comunidades, mudanças globais, restauração, modelagem ecológica e popularização da ciência.",
  researchTitle: "Expertise que atravessa escalas e fronteiras disciplinares.",
  researchBody:
    "Da biologia dos insetos às mudanças na distribuição de espécies; dos ecossistemas ripários aos impactos da mineração; dos dados científicos às decisões ambientais. Minhas frentes se complementam para explicar os mecanismos da perda de biodiversidade e desenvolver respostas aplicáveis.",
  differentialsTitle: "Rigor científico com visão sistêmica e capacidade de aplicação.",
  differentialsBody:
    "Meu diferencial não está apenas na variedade de temas, mas na capacidade de integrá-los: combino história natural, ecologia funcional, análise espacial, síntese de evidências e comunicação para acompanhar um problema desde a pergunta científica até sua tradução em ação.",
  publicationsTitle: "Evidências que ampliam o conhecimento e orientam decisões.",
  publicationsBody:
    "Minha produção recente investiga consequências da mineração, mudanças climáticas, espécies invasoras, polinizadores e funcionamento de ecossistemas. Os trabalhos conectam padrões ecológicos a desafios concretos de conservação e recuperação ambiental.",
  trajectoryTitle: "Formação contínua. Pesquisa conectada à realidade.",
  trajectoryBody:
    "Minha trajetória foi construída em laboratórios, áreas naturais e ecossistemas impactados, em projetos de diferentes escalas e redes interinstitucionais. Campanhas de campo, experimentos, bancos de biodiversidade, traços funcionais, geoprocessamento, programação em R, modelagem, relatórios e formação de estudantes compõem uma prática científica rigorosa e colaborativa.",
  insectaTitle: "Pesquisa em biodiversidade e ecologia de insetos",
  insectaBody:
    "Atuação pós-doutoral em estudos sobre a diversidade e as respostas de insetos e outros artrópodes à sazonalidade, ao uso da terra e às mudanças ambientais. O trabalho integra atividades de campo e laboratório, identificação taxonômica, análise de dados em R, produção científica e formação de estudantes, com aplicações em conservação, restauração e manejo sustentável.",
  originTitle: "A educação transformou minha vida. Democratizar a ciência é parte do meu trabalho.",
  originBody:
    "Sou egressa de escola pública. Ainda criança, descobri a Ciência Hoje das Crianças na biblioteca da escola e encontrei ali um universo que despertou minha curiosidade. Os estudos me permitiram romper com a miséria e chegar ao doutorado. Por isso, produzir conhecimento e torná-lo acessível são compromissos inseparáveis na minha trajetória.",
  outreachTitle: "Ciência que informa, aproxima e produz pertencimento.",
  outreachBody:
    "Escrevo, ensino e crio experiências para públicos diversos. Artigos de divulgação, materiais educativos, palestras, feiras de ciências, entrevistas e policy briefs transformam temas complexos em narrativas claras, sem perder precisão — conectando biodiversidade aos desafios do cotidiano.",
  collaborationTitle: "Conhecimento ambiental é uma construção coletiva.",
  collaborationBody:
    "Atuo em equipes interdisciplinares e projetos interinstitucionais que aproximam universidades, centros de pesquisa, setor produtivo, poder público, escolas e comunidades. Essa experiência fortalece minha capacidade de formular perguntas relevantes, coordenar entregas, colaborar com diferentes especialidades e ampliar o alcance social das soluções.",
};

const editableKeys = Object.keys(DEFAULT_CONTENT) as Array<keyof EditableContent>;

export function isEditableKey(value: string): value is keyof EditableContent {
  return editableKeys.includes(value as keyof EditableContent);
}

export async function getEditableContent(): Promise<EditableContent> {
  const content = { ...DEFAULT_CONTENT };

  try {
    const result = await env.DB.prepare(
      "SELECT key, value FROM site_content",
    ).all<{ key: string; value: string }>();

    for (const row of result.results ?? []) {
      if (isEditableKey(row.key) && row.value.trim()) {
        content[row.key] = row.value;
      }
    }
  } catch {
    // The published defaults remain available before the first migration.
  }

  return content;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const result = await env.DB.prepare(
      `SELECT id, title, year, location, caption, created_at AS createdAt
       FROM gallery_items
       ORDER BY sort_order ASC, created_at DESC`,
    ).all<GalleryItem>();

    return result.results ?? [];
  } catch {
    return [];
  }
}
