INSERT INTO `site_content` (`key`, `value`, `updated_at`) VALUES
  ('heroKicker', 'Dra. Débora Lima Santos · Bióloga, ecóloga e pesquisadora', CURRENT_TIMESTAMP),
  ('heroTitle', 'Biodiversidade no Antropoceno', CURRENT_TIMESTAMP),
  ('heroEmphasis', 'Da compreensão das mudanças à construção de soluções ambientais.', CURRENT_TIMESTAMP),
  ('heroIntro', 'Investigo como espécies, comunidades e interações ecológicas respondem às mudanças climáticas e às transformações humanas dos ecossistemas. Integro pesquisa, dados e aplicação para apoiar a conservação, a restauração e a gestão ambiental.', CURRENT_TIMESTAMP),
  ('themeTitle', 'Compreender respostas. Produzir evidências. Construir soluções.', CURRENT_TIMESTAMP),
  ('themeSubtitle', 'Meu trabalho conecta as pressões que definem o Antropoceno às respostas da biodiversidade e às ações necessárias para conservar e restaurar ecossistemas. É um eixo capaz de reunir diferentes organismos, ambientes, escalas e ferramentas sob uma mesma pergunta científica.', CURRENT_TIMESTAMP),
  ('aboutTitle', 'Ciência multidisciplinar com propósito ambiental.', CURRENT_TIMESTAMP),
  ('aboutLead', 'Sou bióloga e doutora em Ecologia e Conservação da Biodiversidade. Minha trajetória parte dos organismos e de suas interações para compreender processos que operam em comunidades, paisagens e territórios.', CURRENT_TIMESTAMP),
  ('aboutBody', 'Há mais de 15 anos construo uma trajetória acadêmica e científica entre entomologia, ecologia de comunidades, mudanças globais, restauração e comunicação da ciência. Desde 2018, participo de projetos ecológicos e ambientais aplicados, conciliando trabalho de campo, análise de dados, modelagem, curadoria, redação técnico-científica e articulação entre instituições. Meu foco é transformar conhecimento robusto em decisões e soluções ambientalmente responsáveis.', CURRENT_TIMESTAMP),
  ('researchTitle', 'Uma pergunta central. Múltiplas escalas de investigação.', CURRENT_TIMESTAMP),
  ('researchBody', 'Da história natural de insetos às mudanças na distribuição de espécies; dos impactos da mineração aos ecossistemas de referência; dos dados científicos ao diálogo com a sociedade. As frentes se complementam para explicar e enfrentar a perda de biodiversidade.', CURRENT_TIMESTAMP),
  ('trajectoryTitle', 'Campo, laboratório, território, dados e pessoas.', CURRENT_TIMESTAMP),
  ('trajectoryBody', 'Minha formação foi construída em ambientes diversos e em redes de colaboração. Campanhas de amostragem, coleções biológicas, experimentos, bancos de biodiversidade, geoprocessamento, programação em R, relatórios e atividades formativas compõem uma prática científica que une rigor, capacidade operacional e visão sistêmica.', CURRENT_TIMESTAMP),
  ('collaborationTitle', 'Conhecimento ambiental é uma construção coletiva.', CURRENT_TIMESTAMP),
  ('collaborationBody', 'Atuo em equipes interdisciplinares e projetos interinstitucionais que aproximam universidades, centros de pesquisa, setor produtivo, poder público, escolas e comunidades. Essa rede amplia a qualidade das perguntas, a consistência das evidências e o alcance das soluções.', CURRENT_TIMESTAMP),
  ('communicationTitle', 'A ciência ganha força quando circula e produz pertencimento.', CURRENT_TIMESTAMP),
  ('communicationBody', 'Desenvolvo estratégias de divulgação científica, educação ambiental e ciência cidadã para diferentes públicos — de estudantes e comunidades a pesquisadores, gestores públicos e profissionais de empresas. Traduzir sem simplificar em excesso é parte essencial do meu compromisso com uma ciência plural, acessível e socialmente engajada.', CURRENT_TIMESTAMP)
ON CONFLICT(`key`) DO UPDATE SET
  `value` = excluded.`value`,
  `updated_at` = CURRENT_TIMESTAMP;
