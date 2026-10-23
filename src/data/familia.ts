export interface Pessoa {
  id: string;
  nome: string;
  apelido?: string;
  nascimento?: string;
  falecimento?: string;
  geracao: number;
  pais: string[];
  conjuges: string[];
  foto?: string;
  bio?: string;
  local?: string;
  profissao?: string;
  observacao?: string;
  agregado?: boolean;
}

export interface Evento {
  ano: string;
  titulo: string;
  descricao: string;
  foto?: string;
  pessoa?: string;
}

export interface Historia {
  id: string;
  titulo: string;
  texto: string;
  autor: string;
  publicado: string;
}

export interface Album {
  id: string;
  titulo: string;
  periodo: string;
  fotos: string[];
}

export const pessoas: Pessoa[] = [
  {
    id: 'yoiti-kato',
    nome: 'Yoiti Kato',
    geracao: 0,
    pais: [],
    conjuges: ['koto-kato'],
    observacao: 'Antepassado citado na planilha da família — parentesco a confirmar.',
  },
  {
    id: 'koto-kato',
    nome: 'Koto Kato',
    geracao: 0,
    pais: [],
    conjuges: ['yoiti-kato'],
    observacao: 'Antepassada citada na planilha da família — parentesco a confirmar.',
  },
  {
    id: 'masuji-fujita',
    nome: 'Masuji Fujita',
    geracao: 0,
    pais: [],
    conjuges: ['rika-fujita'],
    observacao: 'Antepassado citado na planilha da família — parentesco a confirmar.',
  },
  {
    id: 'rika-fujita',
    nome: 'Rika Fujita',
    geracao: 0,
    pais: [],
    conjuges: ['masuji-fujita'],
    observacao: 'Antepassada citada na planilha da família — parentesco a confirmar.',
  },

  {
    id: 'yotaro-kato',
    nome: 'Yotaro Kato',
    nascimento: '24/10/1894',
    falecimento: '08/11/1976',
    geracao: 1,
    pais: [],
    conjuges: ['toyo-kato'],
    bio: 'Patriarca da família Kato. Com a esposa Toyo, deu origem a sete filhos e a uma descendência que se espalhou pelo Brasil e pelo Japão.',
    observacao: 'Tiveram ainda mais dois filhos cujos nomes a família não registrou.',
  },
  {
    id: 'toyo-kato',
    nome: 'Toyo Kato',
    nascimento: '05/08/1897',
    falecimento: '22/06/1985',
    geracao: 1,
    pais: [],
    conjuges: ['yotaro-kato'],
    bio: 'Matriarca da família Kato, lembrada como a "baachan" — a avó de todos.',
  },

  {
    id: 'yoshiharu-kato',
    nome: 'Yoshiharu Kato',
    nascimento: '07/02/1939',
    falecimento: '12/04/1978',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: ['miyoko-kato'],
  },
  {
    id: 'miyoko-kato',
    agregado: true,
    nome: 'Miyoko Kato',
    nascimento: '06/03/1942',
    falecimento: '02/06/2022',
    geracao: 2,
    pais: [],
    conjuges: ['yoshiharu-kato'],
    foto: '/fotos/IMG-20260911-WA0046.jpg',
  },
  {
    id: 'yoshinobu-kato',
    nome: 'Yoshinobu Kato',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: ['tomiko-suzuki'],
    observacao: 'Casou-se com Tomiko Suzuki; na mesma época, a irmã Tamae casou-se com o irmão dela, Kiyoshi Suzuki.',
  },
  {
    id: 'tomiko-suzuki',
    agregado: true,
    nome: 'Tomiko Suzuki',
    geracao: 2,
    pais: [],
    conjuges: ['yoshinobu-kato'],
  },
  {
    id: 'tamae-suzuki',
    nome: 'Tamae Suzuki',
    apelido: 'Tia Gorda',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: ['kiyoshi-suzuki'],
    bio: 'A primeira filha do casal. Por ser a mais velha, muitas vezes tomou o lugar da mãe cuidando dos irmãos pequenos. Ficou viúva cedo e criou os filhos sozinha, sempre alegre. A família a chamava com carinho de "tia gorda" — fortinha, muito alegre e "pessoa boníssima".',
  },
  {
    id: 'kiyoshi-suzuki',
    agregado: true,
    nome: 'Kiyoshi Suzuki',
    falecimento: 'cerca de 1947',
    geracao: 2,
    pais: [],
    conjuges: ['tamae-suzuki'],
    bio: 'Marido de Tamae. Faleceu em Campos do Jordão quando o filho Yoshitaka tinha 5 anos e a filha Matsuko, 2 — a família lembra que ele adoeceu de tuberculose.',
  },
  {
    id: 'yoshitaka-kato',
    nome: 'Yoshitaka Kato',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: [],
    foto: '/fotos/IMG-20260911-WA0033.jpg',
    observacao: 'Deu nome ao neto Yoshitaka Suzuki, em homenagem ao avô.',
  },
  {
    id: 'ayako-saito',
    nome: 'Ayako Saito',
    nascimento: '05/04/1949',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: [],
    observacao: 'A segunda filha do casal (Kato). Casada com um Saito.',
  },
  {
    id: 'kioko-suzuki',
    nome: 'Kioko Suzuki',
    apelido: 'Kiyoko',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: ['takeshi-suzuki'],
  },
  {
    id: 'takeshi-suzuki',
    agregado: true,
    nome: 'Takeshi Suzuki',
    geracao: 2,
    pais: [],
    conjuges: ['kioko-suzuki'],
  },
  {
    id: 'kiyoe-kadita',
    nome: 'Kiyoe Kadita',
    apelido: 'Kyoei Kadita',
    nascimento: '27/09/1934',
    geracao: 2,
    pais: ['yotaro-kato', 'toyo-kato'],
    conjuges: ['isao-kadita'],
    local: 'São Paulo/SP',
    foto: '/fotos/IMG-20260911-WA0048.jpg',
    bio: 'A caçula das irmãs e a única filha do casal ainda viva. Fez 92 anos em 27/09/2026, cercada pela família, e mora com o filho Douglas.',
  },
  {
    id: 'isao-kadita',
    agregado: true,
    nome: 'Isao Kadita',
    falecimento: 'in memoriam',
    geracao: 2,
    pais: [],
    conjuges: ['kiyoe-kadita'],
  },

  {
    id: 'roberto-yoshio-hosomi',
    agregado: true,
    nome: 'Roberto Yoshio Hosomi',
    nascimento: '20/06/1961',
    geracao: 3,
    pais: [],
    conjuges: ['dirce-eiko-hosomi'],
  },
  {
    id: 'dirce-eiko-hosomi',
    nome: 'Dirce Eiko Hosomi',
    nascimento: '15/01/1962',
    geracao: 3,
    pais: ['yoshiharu-kato', 'miyoko-kato'],
    conjuges: ['roberto-yoshio-hosomi'],
    foto: '/fotos/IMG-20260911-WA0039.jpg',
    bio: 'A filha mais velha de Yoshiharu e Miyoko.',
  },
  {
    id: 'marcello-chaparro',
    agregado: true,
    nome: 'Marcello Chaparro',
    geracao: 4,
    pais: [],
    conjuges: ['mariana-miyuki-hosomi'],
  },
  {
    id: 'mariana-miyuki-hosomi',
    nome: 'Mariana Miyuki Hosomi',
    nascimento: '03/06/1997',
    geracao: 4,
    pais: ['roberto-yoshio-hosomi', 'dirce-eiko-hosomi'],
    conjuges: ['marcello-chaparro'],
    profissao: 'Engenheira de Produção',
    local: 'Denver, Estados Unidos',
    foto: '/fotos/IMG-20260911-WA0042.jpg',
  },
  {
    id: 'louise-remi-hosomi-chaparro',
    nome: 'Louise Remi Hosomi Chaparro',
    geracao: 5,
    pais: ['marcello-chaparro', 'mariana-miyuki-hosomi'],
    conjuges: [],
    bio: 'A primeira neta da família Hosomi.',
  },
  {
    id: 'adrielle-martins-de-souza',
    agregado: true,
    nome: 'Adrielle Martins de Souza',
    geracao: 4,
    pais: [],
    conjuges: ['lucas-yukio-hosomi'],
    profissao: 'Química (UNICAMP)',
  },
  {
    id: 'lucas-yukio-hosomi',
    nome: 'Lucas Yukio Hosomi',
    nascimento: '24/08/1998',
    geracao: 4,
    pais: ['roberto-yoshio-hosomi', 'dirce-eiko-hosomi'],
    conjuges: ['adrielle-martins-de-souza'],
    profissao: 'Engenheiro Mecatrônico (UNICAMP)',
    foto: '/fotos/IMG-20260911-WA0044.jpg',
  },
  {
    id: 'juliana-emi-hosomi',
    nome: 'Juliana Emi Hosomi',
    nascimento: '20/10/2000',
    geracao: 4,
    pais: ['roberto-yoshio-hosomi', 'dirce-eiko-hosomi'],
    conjuges: [],
    profissao: 'Médica Veterinária (UNESP Botucatu)',
    foto: '/fotos/IMG-20260911-WA0045.jpg',
  },
  {
    id: 'suzanna-yumi-hosomi',
    nome: 'Suzanna Yumi Hosomi',
    nascimento: '22/05/1992',
    falecimento: '23/05/1993',
    geracao: 4,
    pais: ['roberto-yoshio-hosomi', 'dirce-eiko-hosomi'],
    conjuges: [],
    observacao: 'Partiu ainda bebê, com um dia de vida.',
  },
  {
    id: 'valter-tomio-yamamoto',
    agregado: true,
    nome: 'Valter Tomio Yamamoto',
    nascimento: '21/04/1963',
    geracao: 3,
    pais: [],
    conjuges: ['nancy-etsuko-kato'],
  },
  {
    id: 'nancy-etsuko-kato',
    nome: 'Nancy Etsuko Kato Yamamoto',
    apelido: 'Etsuko',
    nascimento: '30/05/1964',
    geracao: 3,
    pais: ['yoshiharu-kato', 'miyoko-kato'],
    conjuges: ['valter-tomio-yamamoto'],
    bio: 'A segunda filha de Yoshiharu e Miyoko — depois da Eiko e antes do Akira. Tem dois filhos.',
  },
  {
    id: 'marcos-vinicius-yamamoto',
    nome: 'Marcos Vinícius Yamamoto',
    nascimento: '03/05/1985',
    geracao: 4,
    pais: ['valter-tomio-yamamoto', 'nancy-etsuko-kato'],
    conjuges: ['lais-ivano'],
    profissao: 'Engenheiro de Materiais',
    local: 'Alphaville, Barueri/SP',
    foto: '/fotos/IMG-20260912-WA0009.jpg',
  },
  {
    id: 'lais-ivano',
    agregado: true,
    nome: 'Lais Ivano',
    geracao: 4,
    pais: [],
    conjuges: ['marcos-vinicius-yamamoto'],
  },
  {
    id: 'pedro-henrique-yamamoto',
    nome: 'Pedro Henrique Yamamoto',
    nascimento: '13/08/2023',
    geracao: 5,
    pais: ['marcos-vinicius-yamamoto', 'lais-ivano'],
    conjuges: [],
    bio: 'Filho do Marcos e primeiro neto de Etsuko.',
  },
  {
    id: 'guilherme-henrique-yamamoto',
    nome: 'Guilherme Henrique Yamamoto',
    nascimento: '27/11/1988',
    geracao: 4,
    pais: ['valter-tomio-yamamoto', 'nancy-etsuko-kato'],
    conjuges: ['jane-katayama'],
    profissao: 'Economista',
    foto: '/fotos/IMG-20260912-WA0010.jpg',
  },
  {
    id: 'jane-katayama',
    agregado: true,
    nome: 'Jane Katayama',
    geracao: 4,
    pais: [],
    conjuges: ['guilherme-henrique-yamamoto'],
    observacao: 'Irmã de Gurê Katayama. Namora o Guilherme desde os 13 anos.',
  },
  {
    id: 'carlos-akira-kato',
    nome: 'Carlos Akira Kato',
    apelido: 'Akira',
    nascimento: '21/04/1966',
    geracao: 3,
    pais: ['yoshiharu-kato', 'miyoko-kato'],
    conjuges: ['suely-nakayama-kato'],
    bio: 'Criou o grupo "Descendentes da Família Yotaro e Toyo Kato" e montou a primeira planilha da árvore genealógica da família.',
  },
  {
    id: 'suely-nakayama-kato',
    agregado: true,
    nome: 'Suely Nakayama Kato',
    nascimento: '02/09/1966',
    geracao: 3,
    pais: [],
    conjuges: ['carlos-akira-kato'],
  },
  {
    id: 'anelise-natsumi-kato',
    nome: 'Anelise Natsumi Kato',
    nascimento: '22/05/2004',
    geracao: 4,
    pais: ['carlos-akira-kato', 'suely-nakayama-kato'],
    conjuges: [],
  },
  {
    id: 'beatriz-mei-kato',
    nome: 'Beatriz Mei Kato',
    nascimento: '02/12/2007',
    geracao: 4,
    pais: ['carlos-akira-kato', 'suely-nakayama-kato'],
    conjuges: [],
  },

  {
    id: 'milton-hiroshi-kato',
    nome: 'Milton Hiroshi Kato',
    geracao: 3,
    pais: ['yoshinobu-kato', 'tomiko-suzuki'],
    conjuges: [],
  },
  {
    id: 'anderson-kato',
    nome: 'Anderson Kato',
    geracao: 4,
    pais: ['milton-hiroshi-kato'],
    conjuges: [],
  },
  {
    id: 'jacson-kato',
    nome: 'Jacson Kato',
    nascimento: '07/10/1975',
    geracao: 4,
    pais: ['milton-hiroshi-kato'],
    conjuges: [],
  },
  {
    id: 'olavo-tadayoshi-kato',
    nome: 'Olavo Tadayoshi Kato',
    nascimento: '22/02/1951',
    falecimento: '28/07/2016',
    geracao: 3,
    pais: ['yoshinobu-kato', 'tomiko-suzuki'],
    conjuges: [],
  },
  {
    id: 'william-ernesto-bieberbach',
    agregado: true,
    nome: 'William Ernesto Bieberbach',
    nascimento: '09/10/1948',
    falecimento: '27/01/2024',
    geracao: 3,
    pais: [],
    conjuges: ['eliza-mitsuko-kato-bieberbach'],
  },
  {
    id: 'eliza-mitsuko-kato-bieberbach',
    nome: 'Eliza Mitsuko Kato Bieberbach',
    apelido: 'Eliza',
    nascimento: '22/10/1952',
    geracao: 3,
    pais: ['yoshinobu-kato', 'tomiko-suzuki'],
    conjuges: ['william-ernesto-bieberbach'],
    bio: 'Muito presente na organização da família e uma das responsáveis por reaproximar os primos no grupo de 2026.',
  },
  {
    id: 'luiz-guilherme-kato-bieberbach',
    nome: 'Luiz Guilherme Kato Bieberbach',
    geracao: 4,
    pais: ['william-ernesto-bieberbach', 'eliza-mitsuko-kato-bieberbach'],
    conjuges: [],
  },
  {
    id: 'evelize-bieberbach',
    nome: 'Evelize Bieberbach',
    geracao: 4,
    pais: ['william-ernesto-bieberbach', 'eliza-mitsuko-kato-bieberbach'],
    conjuges: [],
  },

  {
    id: 'yoshitaka-suzuki',
    nome: 'Yoshitaka Suzuki',
    nascimento: '10/09/1942',
    falecimento: '01/04/2024',
    geracao: 3,
    pais: ['kiyoshi-suzuki', 'tamae-suzuki'],
    conjuges: ['marcia-suzuki'],
    bio: 'Ganhou o nome em homenagem ao avô, Yoshitaka Kato. Ficou órfão de pai aos 5 anos.',
  },
  {
    id: 'marcia-suzuki',
    agregado: true,
    nome: 'Marcia Suzuki',
    geracao: 3,
    pais: [],
    conjuges: ['yoshitaka-suzuki'],
  },
  {
    id: 'rodrigo-suzuki',
    nome: 'Rodrigo Suzuki',
    geracao: 4,
    pais: ['yoshitaka-suzuki', 'marcia-suzuki'],
    conjuges: [],
  },
  {
    id: 'patricia-suzuki',
    nome: 'Patrícia Suzuki',
    geracao: 4,
    pais: ['yoshitaka-suzuki', 'marcia-suzuki'],
    conjuges: ['ricardo-suzuki-familia'],
    foto: '/fotos/IMG-20260912-WA0012.jpg',
    bio: 'Filha de Yoshitaka Suzuki e neta de Tamae. Tem duas filhas, Heloisa e Isadora, e ajudou a identificar as fotos antigas da família.',
  },
  {
    id: 'ricardo-suzuki-familia',
    agregado: true,
    nome: 'Ricardo',
    geracao: 4,
    pais: [],
    conjuges: ['patricia-suzuki'],
  },
  {
    id: 'heloisa-suzuki',
    nome: 'Heloisa',
    geracao: 5,
    pais: ['ricardo-suzuki-familia', 'patricia-suzuki'],
    conjuges: [],
    bio: 'Filha mais velha de Patrícia.',
  },
  {
    id: 'isadora-suzuki',
    nome: 'Isadora',
    geracao: 5,
    pais: ['ricardo-suzuki-familia', 'patricia-suzuki'],
    conjuges: [],
    bio: 'Filha mais nova de Patrícia.',
  },
  {
    id: 'moacir',
    agregado: true,
    nome: 'Moacir',
    geracao: 3,
    pais: [],
    conjuges: ['matsuko-suzuki'],
  },
  {
    id: 'matsuko-suzuki',
    nome: 'Matsuko Suzuki',
    nascimento: '04/11/1944',
    falecimento: 'maio de 2026',
    geracao: 3,
    pais: ['kiyoshi-suzuki', 'tamae-suzuki'],
    conjuges: ['moacir'],
    bio: 'Irmã de Yoshitaka Suzuki. Deixou fotos antigas da família antes de falecer.',
  },
  {
    id: 'daniel-suzuki',
    nome: 'Daniel Suzuki',
    geracao: 4,
    pais: ['moacir', 'matsuko-suzuki'],
    conjuges: [],
    bio: 'Filho de Matsuko e neto de Tamae, com quem morou sempre. Lembra que o lema da avó era "alegria, alegria, alegria".',
  },

  {
    id: 'takanobu-morishita',
    agregado: true,
    nome: 'Takanobu Morishita',
    geracao: 3,
    pais: [],
    conjuges: ['julia-morishita'],
  },
  {
    id: 'julia-morishita',
    nome: 'Júlia Morishita',
    nascimento: '05/04/1949',
    geracao: 3,
    pais: ['yoshitaka-kato'],
    conjuges: ['takanobu-morishita'],
  },
  {
    id: 'emerson-morishita',
    nome: 'Emerson Morishita',
    nascimento: '01/11/1975',
    geracao: 4,
    pais: ['takanobu-morishita', 'julia-morishita'],
    conjuges: [],
  },
  {
    id: 'carlos-morishita',
    nome: 'Carlos Morishita',
    nascimento: '07/05/1977',
    geracao: 4,
    pais: ['takanobu-morishita', 'julia-morishita'],
    conjuges: [],
  },
  {
    id: 'eliza-morishita',
    nome: 'Eliza Morishita',
    geracao: 4,
    pais: ['takanobu-morishita', 'julia-morishita'],
    conjuges: [],
  },
  {
    id: 'lincoln-massaharu-kato',
    nome: 'Lincoln Massaharu Kato',
    nascimento: '15/03/1951',
    geracao: 3,
    pais: ['yoshitaka-kato'],
    conjuges: [],
  },
  {
    id: 'sandro-yukiyoshi-kato',
    nome: 'Sandro Yukiyoshi Kato',
    geracao: 4,
    pais: ['lincoln-massaharu-kato'],
    conjuges: [],
  },
  {
    id: 'manoel-yoshidiro-kato',
    nome: 'Manoel Yoshidiro Kato',
    geracao: 3,
    pais: ['yoshitaka-kato'],
    conjuges: [],
  },
  {
    id: 'roberto-mitio-kato',
    nome: 'Roberto Mitio Kato',
    nascimento: '14/02/1955',
    geracao: 3,
    pais: ['yoshitaka-kato'],
    conjuges: [],
  },
  {
    id: 'guilherme-kato',
    nome: 'Guilherme Kato',
    geracao: 4,
    pais: ['roberto-mitio-kato'],
    conjuges: [],
  },
  {
    id: 'jean-carlos-kato',
    nome: 'Jean Carlos Kato',
    geracao: 4,
    pais: ['roberto-mitio-kato'],
    conjuges: [],
  },
  {
    id: 'nina-tie-kato',
    nome: 'Nina Tie Kato',
    nascimento: '18/06/1958',
    geracao: 3,
    pais: ['yoshitaka-kato'],
    conjuges: [],
  },

  {
    id: 'kazuyuki-takano',
    agregado: true,
    nome: 'Kazuyuki Takano',
    geracao: 3,
    pais: [],
    conjuges: ['tereza-takano'],
  },
  {
    id: 'tereza-takano',
    nome: 'Tereza Takano',
    geracao: 3,
    pais: ['ayako-saito'],
    conjuges: ['kazuyuki-takano'],
    bio: 'Filha de Ayako. Os três filhos moram em Campinas, no mesmo prédio, o que facilita os encontros da família.',
    foto: '/fotos/IMG-20260907-WA0012.jpg',
  },
  {
    id: 'mary-takano',
    nome: 'Mary Takano',
    geracao: 4,
    pais: ['kazuyuki-takano', 'tereza-takano'],
    conjuges: [],
  },
  {
    id: 'eduardo-eichi-takano',
    nome: 'Eduardo Eichi Takano',
    apelido: 'Dudu',
    geracao: 4,
    pais: ['kazuyuki-takano', 'tereza-takano'],
    conjuges: ['duane'],
    profissao: 'Oftalmologista',
    foto: '/fotos/IMG-20260907-WA0013.jpg',
  },
  {
    id: 'duane',
    agregado: true,
    nome: 'Duane',
    geracao: 4,
    pais: [],
    conjuges: ['eduardo-eichi-takano'],
    profissao: 'Advogada',
  },
  {
    id: 'helena-yumi-takano',
    nome: 'Helena Yumi Takano',
    geracao: 5,
    pais: ['eduardo-eichi-takano', 'duane'],
    conjuges: [],
    foto: '/fotos/IMG-20260907-WA0014.jpg',
  },
  {
    id: 'ricardo-yuji-takano',
    nome: 'Ricardo Yuji Takano',
    geracao: 4,
    pais: ['kazuyuki-takano', 'tereza-takano'],
    conjuges: ['erica'],
    profissao: 'Engenheiro de Automação',
  },
  {
    id: 'erica',
    agregado: true,
    nome: 'Érica',
    geracao: 4,
    pais: [],
    conjuges: ['ricardo-yuji-takano'],
    profissao: 'Advogada',
  },
  {
    id: 'aurora-akemi-takano',
    nome: 'Aurora Akemi Takano',
    geracao: 5,
    pais: ['ricardo-yuji-takano', 'erica'],
    conjuges: [],
    foto: '/fotos/IMG-20260907-WA0015.jpg',
  },
  {
    id: 'raphael-takano',
    nome: 'Raphael Takano',
    geracao: 4,
    pais: ['kazuyuki-takano', 'tereza-takano'],
    conjuges: [],
    observacao: 'Citado nas fotos da família Takano.',
  },
  {
    id: 'mario-mitsuyoshi-saito',
    nome: 'Mario Mitsuyoshi Saito',
    geracao: 3,
    pais: ['ayako-saito'],
    conjuges: ['solange'],
  },
  {
    id: 'solange',
    agregado: true,
    nome: 'Solange',
    geracao: 3,
    pais: [],
    conjuges: ['mario-mitsuyoshi-saito'],
  },
  {
    id: 'william-yoshio-costa-saito',
    nome: 'William Yoshio Costa Saito',
    geracao: 4,
    pais: ['mario-mitsuyoshi-saito', 'solange'],
    conjuges: [],
  },
  {
    id: 'wagner-yukio-costa-saito',
    nome: 'Wagner Yukio Costa Saito',
    geracao: 4,
    pais: ['mario-mitsuyoshi-saito', 'solange'],
    conjuges: [],
  },
  {
    id: 'victor-akio-costa-saito',
    nome: 'Victor Akio Costa Saito',
    geracao: 4,
    pais: ['mario-mitsuyoshi-saito', 'solange'],
    conjuges: [],
  },
  {
    id: 'cassio-kenji-costa-saito',
    nome: 'Cassio Kenji Costa Saito',
    geracao: 4,
    pais: ['mario-mitsuyoshi-saito', 'solange'],
    conjuges: [],
  },
  {
    id: 'mariza-saito',
    nome: 'Mariza Saito',
    geracao: 3,
    pais: ['ayako-saito'],
    conjuges: [],
  },
  {
    id: 'elena-saito',
    nome: 'Elena Saito',
    geracao: 3,
    pais: ['ayako-saito'],
    conjuges: [],
  },
  {
    id: 'nilton-saito',
    nome: 'Nilton Saito',
    geracao: 3,
    pais: ['ayako-saito'],
    conjuges: [],
  },

  {
    id: 'luiz-oyama',
    agregado: true,
    nome: 'Luiz Oyama',
    geracao: 3,
    pais: [],
    conjuges: ['noriko-oyama'],
  },
  {
    id: 'noriko-oyama',
    nome: 'Noriko Oyama',
    nascimento: '10/07/1952',
    geracao: 3,
    pais: ['takeshi-suzuki', 'kioko-suzuki'],
    conjuges: ['luiz-oyama'],
    local: 'Londrina/PR',
    foto: '/fotos/IMG-20260831-WA0016.jpg',
    bio: 'Filha de Kioko. Contou no grupo a viagem inesquecível que fez com a mãe até Bastos, em busca da casa natal dela.',
  },
  {
    id: 'alexandre-oyama',
    nome: 'Alexandre Oyama',
    geracao: 4,
    pais: ['luiz-oyama', 'noriko-oyama'],
    conjuges: [],
  },
  {
    id: 'eric-oyama',
    nome: 'Éric Oyama',
    geracao: 5,
    pais: ['alexandre-oyama'],
    conjuges: [],
    bio: 'Neto de Noriko e Luiz.',
  },
  {
    id: 'willian-ozawa',
    agregado: true,
    nome: 'Willian Ozawa',
    geracao: 3,
    pais: [],
    conjuges: ['cintya-carol-ozawa'],
  },
  {
    id: 'cintya-carol-ozawa',
    nome: 'Cintya Carol Ozawa',
    geracao: 3,
    pais: ['takeshi-suzuki', 'kioko-suzuki'],
    conjuges: ['willian-ozawa'],
    local: 'Curitiba/PR',
    foto: '/fotos/IMG-20260831-WA0017.jpg',
  },
  {
    id: 'pierre-ozawa',
    nome: 'Pierre Ozawa',
    geracao: 5,
    pais: ['willian-ozawa', 'cintya-carol-ozawa'],
    conjuges: [],
    bio: 'Neto de Cintya Carol, com cerca de 4 anos em 2026.',
  },
  {
    id: 'charlie-ozawa',
    nome: 'Charlie Ozawa',
    geracao: 5,
    pais: ['willian-ozawa', 'cintya-carol-ozawa'],
    conjuges: [],
    bio: 'Neto de Cintya Carol, com cerca de 5 meses em 2026.',
  },
  {
    id: 'jussara-takako-suzuki',
    agregado: true,
    nome: 'Jussara Takako Suzuki',
    geracao: 3,
    pais: [],
    conjuges: ['eduardo-hisaiti-suzuki'],
  },
  {
    id: 'eduardo-hisaiti-suzuki',
    nome: 'Eduardo Hisaiti Suzuki',
    geracao: 3,
    pais: ['takeshi-suzuki', 'kioko-suzuki'],
    conjuges: ['jussara-takako-suzuki'],
  },
  {
    id: 'alberto-hissakazu-suzuki',
    nome: 'Alberto Hissakazu Suzuki',
    apelido: 'Beto',
    geracao: 4,
    pais: ['eduardo-hisaiti-suzuki', 'jussara-takako-suzuki'],
    conjuges: [],
    local: 'Ponta Grossa/PR',
  },
  {
    id: 'franciny',
    agregado: true,
    nome: 'Franciny',
    geracao: 4,
    pais: [],
    conjuges: ['henrique-nobuaki-suzuki'],
  },
  {
    id: 'henrique-nobuaki-suzuki',
    nome: 'Henrique Nobuaki Suzuki',
    geracao: 4,
    pais: ['eduardo-hisaiti-suzuki', 'jussara-takako-suzuki'],
    conjuges: ['franciny'],
    local: 'Curitiba/PR',
  },
  {
    id: 'leandro-enrik',
    agregado: true,
    nome: 'Leandro Enrik',
    geracao: 4,
    pais: [],
    conjuges: ['cintya-leika-suzuki'],
  },
  {
    id: 'cintya-leika-suzuki',
    nome: 'Cintya Leika Suzuki',
    geracao: 4,
    pais: ['eduardo-hisaiti-suzuki', 'jussara-takako-suzuki'],
    conjuges: ['leandro-enrik'],
    local: 'Londrina/PR',
  },
  {
    id: 'francisco-kenji-doi',
    agregado: true,
    nome: 'Francisco Kenji Doi',
    nascimento: '15/06/1952',
    geracao: 3,
    pais: [],
    conjuges: ['emilia-tomoko-suzuki-doi'],
  },
  {
    id: 'emilia-tomoko-suzuki-doi',
    nome: 'Emília Tomoko Suzuki Doi',
    nascimento: '12/02/1957',
    geracao: 3,
    pais: ['takeshi-suzuki', 'kioko-suzuki'],
    conjuges: ['francisco-kenji-doi'],
    bio: 'Uma das que mais ajudou a identificar as fotos antigas e reconstruir a história da família no grupo.',
    foto: '/fotos/IMG-20260907-WA0004.jpg',
  },
  {
    id: 'luana-tiharu-doi',
    nome: 'Luana Tiharu Doi',
    nascimento: '15/10/1999',
    geracao: 4,
    pais: ['francisco-kenji-doi', 'emilia-tomoko-suzuki-doi'],
    conjuges: [],
  },
  {
    id: 'rebeca-kenna-doi',
    nome: 'Rebeca Kenna Doi',
    nascimento: '09/07/2002',
    geracao: 4,
    pais: ['francisco-kenji-doi', 'emilia-tomoko-suzuki-doi'],
    conjuges: [],
  },

  {
    id: 'amelia-kadita',
    nome: 'Amélia Kadita',
    geracao: 3,
    pais: ['isao-kadita', 'kiyoe-kadita'],
    conjuges: [],
    local: 'Japão',
    foto: '/fotos/IMG-20260911-WA0050.jpg',
    bio: 'A filha mais velha de Kiyoe. Mora no Japão e ajudou a atualizar a árvore da família.',
  },
  {
    id: 'vania',
    nome: 'Vania',
    geracao: 4,
    pais: ['amelia-kadita'],
    conjuges: ['bruno'],
    foto: '/fotos/IMG-20260911-WA0051.jpg',
  },
  {
    id: 'bruno',
    agregado: true,
    nome: 'Bruno',
    geracao: 4,
    pais: [],
    conjuges: ['vania'],
  },
  {
    id: 'laura',
    nome: 'Laura',
    geracao: 5,
    pais: ['bruno', 'vania'],
    conjuges: [],
    bio: 'Neta de Amélia.',
  },
  {
    id: 'livia',
    nome: 'Livia',
    geracao: 5,
    pais: ['bruno', 'vania'],
    conjuges: [],
    bio: 'Neta de Amélia.',
  },
  {
    id: 'fernando',
    nome: 'Fernando',
    geracao: 4,
    pais: ['amelia-kadita'],
    conjuges: ['baby-lyn'],
    foto: '/fotos/IMG-20260911-WA0052.jpg',
  },
  {
    id: 'baby-lyn',
    agregado: true,
    nome: 'Baby Lyn',
    geracao: 4,
    pais: [],
    conjuges: ['fernando'],
  },
  {
    id: 'lorenzo',
    nome: 'Lorenzo',
    geracao: 5,
    pais: ['fernando', 'baby-lyn'],
    conjuges: [],
    bio: 'Neto de Amélia.',
  },
  {
    id: 'emiko-kadita',
    nome: 'Emiko Kadita',
    apelido: 'Marlene',
    geracao: 3,
    pais: ['isao-kadita', 'kiyoe-kadita'],
    conjuges: [],
    bio: 'Filha de Kiyoe, citada como uma das que cuidam da mãe.',
    foto: '/fotos/IMG-20260911-WA0054.jpg',
  },
  {
    id: 'nelson-kadita',
    nome: 'Nelson Kadita',
    apelido: 'Hiro',
    geracao: 3,
    pais: ['isao-kadita', 'kiyoe-kadita'],
    conjuges: ['marcia-tanaka'],
    foto: '/fotos/IMG-20260911-WA0053.jpg',
  },
  {
    id: 'marcia-tanaka',
    agregado: true,
    nome: 'Marcia Tanaka',
    geracao: 3,
    pais: [],
    conjuges: ['nelson-kadita'],
  },
  {
    id: 'regina-hiroko-kadita',
    nome: 'Regina Hiroko Kadita',
    falecimento: 'in memoriam',
    geracao: 3,
    pais: ['isao-kadita', 'kiyoe-kadita'],
    conjuges: [],
  },
  {
    id: 'douglas-kazuyoshi-kadita',
    nome: 'Douglas Kazuyoshi Kadita',
    geracao: 3,
    pais: ['isao-kadita', 'kiyoe-kadita'],
    conjuges: [],
    bio: 'O filho caçula de Kiyoe, que mora com a mãe em São Paulo. É o membro mais novo da família no nome.',
  },

  {
    id: 'sandro',
    nome: 'Sandro',
    geracao: 4,
    pais: [],
    conjuges: [],
    observacao: 'Citado na festa junina de 15/06/2026 junto com Guilherme.',
    foto: '/fotos/IMG-20261007-WA0010.jpg',
  },
  {
    id: 'guilherme-primogenito',
    nome: 'Guilherme',
    geracao: 4,
    pais: [],
    conjuges: [],
    observacao: 'Primogênito citado na festa junina de 2026.',
    foto: '/fotos/IMG-20261007-WA0010.jpg',
  },
  {
    id: 'giancarlo-kyomen-kato',
    nome: 'Giancarlo Kyomen Kato',
    geracao: 4,
    pais: [],
    conjuges: [],
    observacao: 'Formou-se há 6 anos (2020).',
    foto: '/fotos/IMG-20261007-WA0011.jpg',
  },
];

export const eventos: Evento[] = [
  { ano: '1894', titulo: 'Nasce Yotaro Kato', descricao: 'Em 24 de outubro nasce o patriarca da família Kato.', pessoa: 'yotaro-kato' },
  { ano: '1897', titulo: 'Nasce Toyo Kato', descricao: 'Em 5 de agosto nasce a matriarca, a "baachan" de todos.', pessoa: 'toyo-kato' },
  { ano: '1934', titulo: 'Nasce Kiyoe Kadita', descricao: 'A caçula das irmãs, que décadas depois seria a última filha viva do casal.', pessoa: 'kiyoe-kadita' },
  { ano: '1939', titulo: 'Nasce Yoshiharu Kato', descricao: 'O filho mais velho dos irmãos Kato.', pessoa: 'yoshiharu-kato' },
  { ano: '1942', titulo: 'Nasce Yoshitaka Suzuki', descricao: 'Filho de Tamae, recebe o nome em homenagem ao avô Yoshitaka Kato.', pessoa: 'yoshitaka-suzuki' },
  { ano: '1944', titulo: 'Nasce Matsuko Suzuki', descricao: 'Segunda filha de Tamae e Kiyoshi.', pessoa: 'matsuko-suzuki' },
  { ano: 'cerca de 1947', titulo: 'A família perde Kiyoshi Suzuki', descricao: 'Ele falece em Campos do Jordão quando Yoshitaka tinha 5 anos e Matsuko, 2. Tamae cria os filhos sozinha.', pessoa: 'kiyoshi-suzuki' },
  { ano: '1976', titulo: 'Falecimento de Yotaro Kato', descricao: 'Em 8 de novembro a família se despede do patriarca.', pessoa: 'yotaro-kato' },
  { ano: '1978', titulo: 'Falecimento de Yoshiharu Kato', descricao: 'Em 12 de abril.', pessoa: 'yoshiharu-kato' },
  { ano: '1985', titulo: 'Falecimento de Toyo Kato', descricao: 'Em 22 de junho a família se despede da matriarca.', pessoa: 'toyo-kato' },
  { ano: '2024', titulo: 'Falecimento de Yoshitaka Suzuki', descricao: 'Em 1º de abril.', pessoa: 'yoshitaka-suzuki' },
  { ano: '2026', titulo: 'Nasce o grupo da família', descricao: 'Em 31 de maio, Carlos Akira Kato cria o grupo "Descendentes da Família Yotaro e Toyo Kato".', pessoa: 'carlos-akira-kato' },
  { ano: '2026', titulo: 'Despedida de Matsuko Suzuki', descricao: 'Em maio a família se despede de Matsuko, que deixa fotos antigas para os registros.', pessoa: 'matsuko-suzuki' },
  { ano: '2026', titulo: 'Kiyoe Kadita faz 92 anos', descricao: 'Em 27 de setembro, a única filha viva do casal celebra com a família.', pessoa: 'kiyoe-kadita', foto: '/fotos/IMG-20260927-WA0014.jpg' },
];

export const historias: Historia[] = [
  {
    id: 'viagem-a-bastos',
    titulo: 'A viagem a Bastos e a Festa do Ovo',
    texto:
      'Quando eu era criança, meu pai nos colocava — eu, o Eduardo e a Emília — em cima do caminhão, e íamos visitar o diitian e a baatian em Bastos. Fomos umas duas ou três vezes, sempre em julho, no mês da Festa do Ovo. Ficávamos admirados com a festa toda enfeitada de ovos. Anos depois, levei minha mãe de volta: ela já dava sinais de Alzheimer, mas queria rever a Seção Saúde, onde morou. O carro do tio parou no meio da estrada de chão, mas um motoqueiro nos ajudou e voltamos. A casa da minha mãe já não era a mesma. Foi uma aventura num lugar totalmente desconhecido pra mim.',
    autor: 'Noriko Oyama',
    publicado: '31/08/2026',
  },
  {
    id: 'tia-tamae',
    titulo: 'Tia Tamae, a "tia gorda"',
    texto:
      'A tia Tamae (tia gorda) era chamada assim porque as outras irmãs eram magrinhas e ela não — era fortinha. Muito alegre, pessoa boníssima. Ela sempre sorria. A minha mãe contava que ela sofreu muito: muitas vezes ficou no lugar da mãe, cuidando dos irmãos pequenos. Depois de casar, perdeu o marido, se não me engano de tuberculose. Sempre que podia, minha mãe ia visitá-la em Tatuapé, em forma de retribuir gratidão.',
    autor: 'Noriko Oyama e Tereza Takano',
    publicado: '13/09/2026',
  },
  {
    id: 'alegria-alegria',
    titulo: 'Alegria, alegria, alegria',
    texto:
      'Meu lema sempre foi o da minha avó Tamae: alegria, alegria, alegria. Ela era a vida pulsando com toda a energia positiva possível, e farmava toda a aura do mundo. Morei sempre com ela. Minha mãe, Matsuko, se foi agora em maio, e eu agradeço a todos vocês por manter a nossa história viva.',
    autor: 'Daniel Suzuki',
    publicado: '13/09/2026',
  },
  {
    id: 'disneylandia-no-sitio',
    titulo: 'A Disneylândia do sítio',
    texto:
      'Quando criança, eu sempre sentia que vocês eram muito mais felizes. Quando ia no sítio de vocês era como uma Disneylândia: tinha muitas frutas, casa grande... eu queria morar nesse lugar.',
    autor: 'Tereza Takano',
    publicado: '08/09/2026',
  },
  {
    id: 'dois-casamentos',
    titulo: 'Dois casamentos que cruzaram as famílias',
    texto:
      'A tia Tamae era casada com o irmão da minha mãe, o Kiyoshi Suzuki. E a minha mãe, Tomiko Suzuki, era casada com o irmão da tia Tamae, o Yoshinobu Kato. Por isso somos primos sanguíneos dos dois lados.',
    autor: 'Eliza Mitsuko Kato Bieberbach',
    publicado: '13/09/2026',
  },
  {
    id: 'a-unica-tia',
    titulo: 'A única tia de 92 anos',
    texto:
      'Hoje foi o aniversário da única tia viva: Kiyoe Kadita completou 92 anos. "Tia Kajita, muito dócil e muito querida. Linda desde jovem e continua bonita aos 92 anos."',
    autor: 'Emília Tomoko Suzuki Doi e Tereza Takano',
    publicado: '27/09/2026',
  },
];

export const albuns: Album[] = [
  {
    id: 'yotaro-toyo',
    titulo: 'Yotaro e Toyo Kato',
    periodo: 'Foto dos filhos',
    fotos: ['IMG-20260906-WA0017.jpg', 'IMG-20260906-WA0018.jpg'],
  },
  {
    id: 'fotos-antigas',
    titulo: 'Fotos antigas (tia Matsuko)',
    periodo: 'Século XX',
    fotos: [
      'IMG-20260907-WA0006.jpg',
      'IMG-20260907-WA0007.jpg',
      'IMG-20260907-WA0009.jpg',
      'IMG-20260907-WA0010.jpg',
      'IMG-20260911-WA0009.jpg',
      'IMG-20260911-WA0010.jpg',
      'IMG-20260911-WA0011.jpg',
      'IMG-20260911-WA0012.jpg',
      'IMG-20260911-WA0013.jpg',
      'IMG-20260911-WA0014.jpg',
      'IMG-20260911-WA0015.jpg',
      'IMG-20260911-WA0016.jpg',
      'IMG-20260911-WA0017.jpg',
      'IMG-20260911-WA0018.jpg',
      'IMG-20260911-WA0019.jpg',
      'IMG-20260911-WA0020.jpg',
      'IMG-20260911-WA0021.jpg',
      'IMG-20260911-WA0022.jpg',
      'IMG-20260911-WA0023.jpg',
    ],
  },
  {
    id: 'tamae-suzuki',
    titulo: 'Tamae Suzuki',
    periodo: 'Fotos antigas e aniversário de 80 anos',
    fotos: ['IMG-20260907-WA0008.jpg', 'IMG-20260913-WA0014.jpg'],
  },
  {
    id: 'familia-hosomi',
    titulo: 'Família Hosomi (Yoshiharu e Miyoko)',
    periodo: 'Setembro de 2026',
    fotos: [
      'IMG-20260911-WA0039.jpg',
      'IMG-20260911-WA0040.jpg',
      'IMG-20260911-WA0041.jpg',
      'IMG-20260911-WA0042.jpg',
      'IMG-20260911-WA0043.jpg',
      'IMG-20260911-WA0044.jpg',
      'IMG-20260911-WA0045.jpg',
      'IMG-20260911-WA0046.jpg',
      'IMG-20260911-WA0047.jpg',
      'IMG-20260913-WA0020.jpg',
    ],
  },
  {
    id: 'familia-kadita',
    titulo: 'Família Kadita (Kiyoe)',
    periodo: 'Setembro de 2026',
    fotos: [
      'IMG-20260911-WA0048.jpg',
      'IMG-20260911-WA0050.jpg',
      'IMG-20260911-WA0051.jpg',
      'IMG-20260911-WA0052.jpg',
      'IMG-20260911-WA0053.jpg',
      'IMG-20260911-WA0054.jpg',
      'IMG-20260927-WA0014.jpg',
    ],
  },
  {
    id: 'familia-takano',
    titulo: 'Família Takano (Ayako)',
    periodo: 'Setembro de 2026',
    fotos: [
      'IMG-20260907-WA0012.jpg',
      'IMG-20260907-WA0013.jpg',
      'IMG-20260907-WA0014.jpg',
      'IMG-20260907-WA0015.jpg',
    ],
  },
  {
    id: 'familia-oyama',
    titulo: 'Família Oyama (Kioko)',
    periodo: 'Agosto de 2026',
    fotos: ['IMG-20260831-WA0016.jpg', 'IMG-20260831-WA0017.jpg'],
  },
  {
    id: 'familia-suzuki-kioko',
    titulo: 'Família Suzuki (Kioko)',
    periodo: 'Setembro de 2026',
    fotos: ['IMG-20260913-WA0018.jpg', 'IMG-20260907-WA0004.jpg'],
  },
  {
    id: 'familia-yamamoto',
    titulo: 'Família Yamamoto (Etsuko)',
    periodo: 'Setembro de 2026',
    fotos: [
      'IMG-20260912-WA0009.jpg',
      'IMG-20260912-WA0010.jpg',
      'IMG-20260912-WA0011.jpg',
    ],
  },
  {
    id: 'familia-suzuki-tamae',
    titulo: 'Família Suzuki (Patrícia)',
    periodo: 'Setembro de 2026',
    fotos: ['IMG-20260912-WA0012.jpg'],
  },
  {
    id: 'eventos-2026',
    titulo: 'Eventos 2026',
    periodo: 'Outubro de 2026',
    fotos: ['IMG-20261007-WA0010.jpg', 'IMG-20261007-WA0011.jpg'],
  },
];

export function tipoDeEvento(e: Evento): 'nascimento' | 'despedida' | 'marco' {
  const t = `${e.titulo} ${e.descricao}`;
  if (/^Nasce\s+[A-ZÀ-Ú]/.test(e.titulo)) return 'nascimento';
  if (/Falecimento|perde|Despedida/.test(t)) return 'despedida';
  return 'marco';
}

export function pessoaPorId(id: string): Pessoa | undefined {
  return pessoas.find((p) => p.id === id);
}

export function nomeDe(id: string): string {
  return pessoaPorId(id)?.nome ?? id;
}

export function anosDe(p: Pessoa): string {
  if (p.nascimento && p.falecimento) return `${p.nascimento} – ${p.falecimento}`;
  if (p.nascimento) return p.nascimento;
  if (p.falecimento) return `f. ${p.falecimento}`;
  return '';
}

export function geracoes(): Pessoa[][] {
  const ids = new Set(pessoas.map((p) => p.geracao));
  return [...ids]
    .sort((a, b) => a - b)
    .map((g) => pessoas.filter((p) => p.geracao === g));
}

export function filhosDe(id: string): Pessoa[] {
  return pessoas.filter((p) => p.pais.includes(id));
}

export function geracaoLabel(g: number): string {
  if (g === 0) return 'Antepassados';
  const ordinais = ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª', '8ª', '9ª', '10ª'];
  return `${ordinais[g - 1] ?? `${g}ª`} geração`;
}

// --- Árvore (nós que se desdobram em filhos) ---

export interface Uniao {
  membros: Pessoa[];
  filhos: Uniao[];
}

function dataDe(p: Pessoa): number {
  const m = p.nascimento?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return Number.MAX_SAFE_INTEGER;
  return Number(m[3]) * 10000 + Number(m[2]) * 100 + Number(m[1]);
}

/** Cônjuge que é da família (não agregado) — usado para o vínculo "casou-se com". */
export function esposoDaFamilia(p: Pessoa): Pessoa | undefined {
  if (!p.agregado) return undefined;
  return p.conjuges.map((c) => pessoaPorId(c)).find((x) => x && !x.agregado);
}

function constroiUniao(membros: Pessoa[]): Uniao {
  const filhos: Uniao[] = [];
  const vistos = new Set<string>();
  for (const m of membros) {
    for (const f of filhosDe(m.id)) {
      if (vistos.has(f.id)) continue;
      vistos.add(f.id);
      const parceiro = f.conjuges
        .map((c) => pessoaPorId(c))
        .find((p) => p !== undefined && p.id !== m.id);
      filhos.push(constroiUniao([f, parceiro].filter((p): p is Pessoa => !!p)));
    }
  }
  filhos.sort((a, b) => dataDe(a.membros[0]) - dataDe(b.membros[0]));
  return { membros, filhos };
}

/** Árvore completa a partir do casal fundador. */
export function arvoreDe(): Uniao {
  const yotaro = pessoaPorId('yotaro-kato');
  const toyo = pessoaPorId('toyo-kato');
  return constroiUniao([yotaro, toyo].filter((p): p is Pessoa => !!p));
}

/** Pessoas que não têm ligação com ninguém na árvore (deixadas de fora). */
export function semVinculo(): Pessoa[] {
  const naArvore = new Set<string>();
  const percorre = (u: Uniao) => {
    u.membros.forEach((p) => naArvore.add(p.id));
    u.filhos.forEach(percorre);
  };
  percorre(arvoreDe());
  return pessoas.filter((p) => !naArvore.has(p.id) && p.geracao !== 0);
}
