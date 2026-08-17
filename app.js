/* ============================= DADOS DE REFERÊNCIA ============================= */
const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const AGRAVOS = {
  grave: {label:"Acidente de Trabalho Grave", cid:"Y96", implemented:true},
  biologico: {label:"Exposição a Material Biológico", cid:"Z20.9", implemented:true},
  mental: {label:"Transtorno Mental Relacionado ao Trabalho", cid:"F99", implemented:true},
  lerdort: {label:"LER/DORT", cid:"Z57.9", implemented:true},
};

const STATUS_OPTIONS = [
  ['finalizado','Finalizado'],
  ['aguardando_investigacao','Aguardando investigação'],
];

// Base de CID-10 relevante à saúde do trabalhador (referência local — não substitui a tabela oficial completa do DATASUS)
const CID10_DB = [
  {code:"V01",desc:"Pedestre traumatizado em colisão com veículo a pedal"},
  {code:"V09",desc:"Pedestre traumatizado em outros acidentes de transporte"},
  {code:"V20",desc:"Motociclista traumatizado em colisão com veículo a motor de duas ou três rodas"},
  {code:"V29",desc:"Motociclista traumatizado em outros acidentes de transporte"},
  {code:"V43",desc:"Ocupante de automóvel traumatizado em colisão com outro veículo a motor"},
  {code:"V89",desc:"Acidente de veículo a motor ou sem motor, tipo não especificado"},
  {code:"W00",desc:"Queda no mesmo nível envolvendo gelo e neve"},
  {code:"W01",desc:"Queda no mesmo nível por escorregão, tropeção ou passo em falso"},
  {code:"W03",desc:"Outra queda no mesmo nível por colisão com outra pessoa"},
  {code:"W05",desc:"Queda de cadeira de rodas"},
  {code:"W10",desc:"Queda em ou de escadas ou degraus"},
  {code:"W11",desc:"Queda em ou de escada de mão (portátil)"},
  {code:"W12",desc:"Queda em ou de andaime"},
  {code:"W13",desc:"Queda em ou de edifício ou outra estrutura"},
  {code:"W17",desc:"Outra queda de um nível a outro"},
  {code:"W18",desc:"Outra queda no mesmo nível"},
  {code:"W19",desc:"Queda não especificada"},
  {code:"W20",desc:"Atingido por objeto lançado, projetado ou em queda"},
  {code:"W21",desc:"Impacto contra ou golpe por equipamento de esporte"},
  {code:"W23",desc:"Ficar preso, esmagado, cortado, comprimido entre objetos"},
  {code:"W24",desc:"Contato traumático com equipamento de elevação e transmissão não especificado"},
  {code:"W25",desc:"Contato traumático com vidro cortante"},
  {code:"W26",desc:"Contato traumático com faca, espada ou punhal"},
  {code:"W27",desc:"Contato traumático com ferramenta manual sem força motriz"},
  {code:"W28",desc:"Contato traumático com cortador de grama motorizado"},
  {code:"W29",desc:"Contato traumático com outras ferramentas motorizadas manuais"},
  {code:"W31",desc:"Contato traumático com outras máquinas e as não especificadas"},
  {code:"W45",desc:"Corpo estranho penetrante ou objeto penetrante através da pele"},
  {code:"W49",desc:"Exposição a outras forças mecânicas inanimadas"},
  {code:"W54",desc:"Mordedura ou golpe por cão"},
  {code:"X30",desc:"Exposição a calor natural excessivo"},
  {code:"X33",desc:"Vítima de relâmpago"},
  {code:"X50",desc:"Excesso de esforços e movimentos extenuantes ou repetitivos"},
  {code:"Y96",desc:"Circunstância relativa às condições de trabalho"},
  {code:"Y97",desc:"Circunstância relativa a condições de poluição ambiental"},
  {code:"Y98",desc:"Circunstância relativa às condições do modo de vida"},
  {code:"Z20.9",desc:"Contato e exposição a doença infecciosa não especificada"},
  {code:"B20",desc:"Doença pelo HIV resultando em doenças infecciosas e parasitárias"},
  {code:"B16",desc:"Hepatite aguda B"},
  {code:"B17.1",desc:"Hepatite aguda C"},
  {code:"B18",desc:"Hepatite viral crônica"},
  {code:"F32",desc:"Episódios depressivos"},
  {code:"F41",desc:"Outros transtornos ansiosos"},
  {code:"F43",desc:"Reações ao estresse grave e transtornos de adaptação"},
  {code:"Z73.0",desc:"Síndrome de esgotamento profissional (Burnout)"},
  {code:"F10",desc:"Transtornos mentais e comportamentais devidos ao uso de álcool"},
  {code:"R45",desc:"Sintomas e sinais relativos ao estado emocional"},
  {code:"G56",desc:"Mononeuropatias dos membros superiores (ex.: Síndrome do túnel do carpo)"},
  {code:"M54",desc:"Dorsalgia"},
  {code:"M65",desc:"Sinovite e tenossinovite"},
  {code:"M70",desc:"Transtornos dos tecidos moles relacionados com o uso, uso excessivo e pressão"},
  {code:"M75",desc:"Lesões do ombro"},
  {code:"M77",desc:"Outras entesopatias (ex.: epicondilite)"},
  {code:"G90",desc:"Transtornos do sistema nervoso autônomo"},
];

// Base completa de ocupações SINAN/CBO extraída do PDF oficial enviado pela usuária.
const CBO_DB = [
  {sinan:"2305",code:"848505",desc:"ABATEDOR"},
  {sinan:"1916",code:"764305",desc:"ACABADOR DE CALCADOS"},
  {sinan:"1950",code:"766305",desc:"ACABADOR DE EMBALAGENS (FLEXIVEIS E CARTOTECNICAS)"},
  {sinan:"1581",code:"716105",desc:"ACABADOR DE SUPERFICIES DE CONCRETO"},
  {sinan:"2306",code:"848510",desc:"ACOUGUEIRO"},
  {sinan:"1036",code:"376205",desc:"ACROBATA"},
  {sinan:"847",code:"322105",desc:"ACUPUNTURISTA"},
  {sinan:"1407",code:"623005",desc:"ADESTRADOR DE ANIMAIS"},
  {sinan:"606",code:"252105",desc:"ADMINISTRADOR"},
  {sinan:"206",code:"212305",desc:"ADMINISTRADOR DE BANCO DE DADOS"},
  {sinan:"1169",code:"510110",desc:"ADMINISTRADOR DE EDIFICIOS"},
  {sinan:"614",code:"252505",desc:"ADMINISTRADOR DE FUNDOS E CARTEIRAS DE INVESTIMENTO"},
  {sinan:"207",code:"212310",desc:"ADMINISTRADOR DE REDES"},
  {sinan:"208",code:"212315",desc:"ADMINISTRADOR DE SISTEMAS OPERACIONAIS"},
  {sinan:"2541",code:"212320",desc:"ADMINISTRADOR EM SEGURANCA DA INFORMACAO"},
  {sinan:"545",code:"241005",desc:"ADVOGADO"},
  {sinan:"550",code:"241030",desc:"ADVOGADO (AREAS ESPECIAIS)"},
  {sinan:"547",code:"241015",desc:"ADVOGADO (DIREITO CIVIL)"},
  {sinan:"551",code:"241035",desc:"ADVOGADO (DIREITO DO TRABALHO)"},
  {sinan:"549",code:"241025",desc:"ADVOGADO (DIREITO PENAL)"},
  {sinan:"548",code:"241020",desc:"ADVOGADO (DIREITO PUBLICO)"},
  {sinan:"553",code:"241205",desc:"ADVOGADO DA UNIAO"},
  {sinan:"546",code:"241010",desc:"ADVOGADO DE EMPRESA"},
  {sinan:"1630",code:"721305",desc:"AFIADOR DE CARDAS"},
  {sinan:"1631",code:"721310",desc:"AFIADOR DE CUTELARIA"},
  {sinan:"1632",code:"721315",desc:"AFIADOR DE FERRAMENTAS"},
  {sinan:"1633",code:"721320",desc:"AFIADOR DE SERRAS"},
  {sinan:"1772",code:"742105",desc:"AFINADOR DE INSTRUMENTOS MUSICAIS"},
  {sinan:"909",code:"342120",desc:"AFRETADOR"},
  {sinan:"972",code:"354110",desc:"AGENCIADOR DE PROPAGANDA"},
  {sinan:"1219",code:"515105",desc:"AGENTE COMUNITARIO DE SAUDE"},
  {sinan:"2468",code:"515310",desc:"AGENTE DE ACAO SOCIAL"},
  {sinan:"955",code:"352205",desc:"AGENTE DE DEFESA AMBIENTAL"},
  {sinan:"961",code:"352405",desc:"AGENTE DE DIREITOS AUTORAIS"},
  {sinan:"915",code:"342405",desc:"AGENTE DE ESTACAO (FERROVIA E METRO)"},
  {sinan:"637",code:"254310",desc:"AGENTE DE HIGIENE E SEGURANCA"},
  {sinan:"2660",code:"351905",desc:"AGENTE DE INTELIGENCIA"},
  {sinan:"301",code:"215105",desc:"AGENTE DE MANOBRA E DOCAGEM"},
  {sinan:"2638",code:"411050",desc:"AGENTE DE MICROCREDITO"},
  {sinan:"2072",code:"783105",desc:"AGENTE DE PATIO"},
  {sinan:"1261",code:"517205",desc:"AGENTE DE POLICIA FEDERAL"},
  {sinan:"1265",code:"517305",desc:"AGENTE DE PROTECAO DE AEROPORTO"},
  {sinan:"2528",code:"342550",desc:"AGENTE DE PROTECAO DE AVIACAO CIVIL"},
  {sinan:"933",code:"351315",desc:"AGENTE DE RECRUTAMENTO E SELECAO"},
  {sinan:"956",code:"352210",desc:"AGENTE DE SAUDE PUBLICA"},
  {sinan:"1266",code:"517310",desc:"AGENTE DE SEGURANCA"},
  {sinan:"1267",code:"517315",desc:"AGENTE DE SEGURANCA PENITENCIARIA"},
  {sinan:"1264",code:"517220",desc:"AGENTE DE TRANSITO"},
  {sinan:"973",code:"354120",desc:"AGENTE DE VENDAS DE SERVICOS"},
  {sinan:"990",code:"354815",desc:"AGENTE DE VIAGEM"},
  {sinan:"958",code:"352310",desc:"AGENTE FISCAL DE QUALIDADE"},
  {sinan:"959",code:"352315",desc:"AGENTE FISCAL METROLOGICO"},
  {sinan:"960",code:"352320",desc:"AGENTE FISCAL TEXTIL"},
  {sinan:"1251",code:"516505",desc:"AGENTE FUNERARIO"},
  {sinan:"2641",code:"515130",desc:"AGENTE INDIGENA DE SANEAMENTO"},
  {sinan:"2640",code:"515125",desc:"AGENTE INDIGENA DE SAUDE"},
  {sinan:"624",code:"253115",desc:"AGENTE PUBLICITARIO"},
  {sinan:"2661",code:"351910",desc:"AGENTE TECNICO DE INTELIGENCIA"},
  {sinan:"1484",code:"632615",desc:"AJUDANTE DE CARVOARIA"},
  {sinan:"2471",code:"763125",desc:"AJUDANTE DE CONFECCAO"},
  {sinan:"910",code:"342205",desc:"AJUDANTE DE DESPACHANTE ADUANEIRO"},
  {sinan:"2078",code:"783225",desc:"AJUDANTE DE MOTORISTA"},
  {sinan:"1767",code:"741105",desc:"AJUSTADOR DE INSTRUMENTOS DE PRECISAO"},
  {sinan:"1710",code:"725005",desc:"AJUSTADOR FERRAMENTEIRO"},
  {sinan:"1711",code:"725010",desc:"AJUSTADOR MECANICO"},
  {sinan:"1712",code:"725015",desc:"AJUSTADOR MECANICO (USINAGEM EM BANCADA E EM MAQUINASFERRAMENTAS)"},
  {sinan:"1713",code:"725020",desc:"AJUSTADOR MECANICO EM BANCADA"},
  {sinan:"1714",code:"725025",desc:"AJUSTADOR NAVAL (REPARO E CONSTRUCAO)"},
  {sinan:"2267",code:"841705",desc:"ALAMBIQUEIRO"},
  {sinan:"1893",code:"763005",desc:"ALFAIATE"},
  {sinan:"2084",code:"784205",desc:"ALIMENTADOR DE LINHA DE PRODUCAO"},
  {sinan:"2414",code:"992105",desc:"ALINHADOR DE PNEUS"},
  {sinan:"1119",code:"414105",desc:"ALMOXARIFE"},
  {sinan:"1863",code:"761405",desc:"ALVEJADOR (TECIDOS)"},
  {sinan:"1506",code:"711105",desc:"AMOSTRADOR DE MINERIOS"},
  {sinan:"615",code:"252510",desc:"ANALISTA DE CAMBIO"},
  {sinan:"616",code:"252515",desc:"ANALISTA DE COBRANCA (INSTITUICOES FINANCEIRAS)"},
  {sinan:"617",code:"252525",desc:"ANALISTA DE CREDITO (INSTITUICOES FINANCEIRAS)"},
  {sinan:"618",code:"252530",desc:"ANALISTA DE CREDITO RURAL"},
  {sinan:"209",code:"212405",desc:"ANALISTA DE DESENVOLVIMENTO DE SISTEMAS"},
  {sinan:"981",code:"354305",desc:"ANALISTA DE EXPORTACAO E IMPORTACAO"},
  {sinan:"1110",code:"413105",desc:"ANALISTA DE FOLHA DE PAGAMENTO"},
  {sinan:"652",code:"261215",desc:"ANALISTA DE INFORMACOES (PESQUISADOR DE INFORMACOES DE REDE)"},
  {sinan:"619",code:"252535",desc:"ANALISTA DE LEASING"},
  {sinan:"625",code:"253120",desc:"ANALISTA DE NEGOCIOS"},
  {sinan:"626",code:"253125",desc:"ANALISTA DE PESQUISA DE MERCADO"},
  {sinan:"2431",code:"111510",desc:"ANALISTA DE PLANEJAMENTO E ORCAMENTO - APO"},
  {sinan:"620",code:"252540",desc:"ANALISTA DE PRODUTOS BANCARIOS"},
  {sinan:"613",code:"252405",desc:"ANALISTA DE RECURSOS HUMANOS"},
  {sinan:"210",code:"212410",desc:"ANALISTA DE REDES E DE COMUNICACAO DE DADOS"},
  {sinan:"944",code:"351705",desc:"ANALISTA DE SEGUROS (TECNICO)"},
  {sinan:"945",code:"351710",desc:"ANALISTA DE SINISTROS"},
  {sinan:"211",code:"212415",desc:"ANALISTA DE SISTEMAS DE AUTOMACAO"},
  {sinan:"212",code:"212420",desc:"ANALISTA DE SUPORTE COMPUTACIONAL"},
  {sinan:"906",code:"342105",desc:"ANALISTA DE TRANSPORTE EM COMERCIO EXTERIOR"},
  {sinan:"621",code:"252545",desc:"ANALISTA FINANCEIRO (INSTITUICOES FINANCEIRAS)"},
  {sinan:"670",code:"261705",desc:"ANCORA DE RADIO E TELEVISAO"},
  {sinan:"581",code:"251105",desc:"ANTROPOLOGO"},
  {sinan:"1361",code:"613405",desc:"APICULTOR"},
  {sinan:"1575",code:"715705",desc:"APLICADOR DE ASFALTO IMPERMEABILIZANTE (COBERTURAS)"},
  {sinan:"1796",code:"752205",desc:"APLICADOR SERIGRAFICO EM VIDROS"},
  {sinan:"1122",code:"414205",desc:"APONTADOR DE MAO-DE-OBRA"},
  {sinan:"1123",code:"414210",desc:"APONTADOR DE PRODUCAO"},
  {sinan:"2426",code:"999993",desc:"APOSENTADO/PENSIONISTA"},
  {sinan:"1051",code:"376325",desc:"APRESENTADOR DE CIRCO"},
  {sinan:"1047",code:"376305",desc:"APRESENTADOR DE EVENTOS"},
  {sinan:"1048",code:"376310",desc:"APRESENTADOR DE FESTAS POPULARES"},
  {sinan:"1049",code:"376315",desc:"APRESENTADOR DE PROGRAMAS DE RADIO"},
  {sinan:"1050",code:"376320",desc:"APRESENTADOR DE PROGRAMAS DE TELEVISAO"},
  {sinan:"1065",code:"377210",desc:"ARBITRO DE ATLETISMO"},
  {sinan:"1066",code:"377215",desc:"ARBITRO DE BASQUETE"},
  {sinan:"1067",code:"377220",desc:"ARBITRO DE FUTEBOL"},
  {sinan:"1068",code:"377225",desc:"ARBITRO DE FUTEBOL DE SALAO"},
  {sinan:"1069",code:"377230",desc:"ARBITRO DE JUDO"},
  {sinan:"1070",code:"377235",desc:"ARBITRO DE KARATE"},
  {sinan:"1071",code:"377240",desc:"ARBITRO DE POLO AQUATICO"},
  {sinan:"1072",code:"377245",desc:"ARBITRO DE VOLEI"},
  {sinan:"1064",code:"377205",desc:"ARBITRO DESPORTIVO"},
  {sinan:"1557",code:"715305",desc:"ARMADOR DE ESTRUTURA DE CONCRETO"},
  {sinan:"1559",code:"715315",desc:"ARMADOR DE ESTRUTURA DE CONCRETO ARMADO"},
  {sinan:"1120",code:"414110",desc:"ARMAZENISTA"},
  {sinan:"873",code:"325010",desc:"AROMISTA"},
  {sinan:"582",code:"251110",desc:"ARQUEOLOGO"},
  {sinan:"240",code:"214105",desc:"ARQUITETO DE EDIFICACOES"},
  {sinan:"241",code:"214110",desc:"ARQUITETO DE INTERIORES"},
  {sinan:"242",code:"214115",desc:"ARQUITETO DE PATRIMONIO"},
  {sinan:"243",code:"214120",desc:"ARQUITETO PAISAGISTA"},
  {sinan:"244",code:"214125",desc:"ARQUITETO URBANISTA"},
  {sinan:"653",code:"261305",desc:"ARQUIVISTA"},
  {sinan:"1125",code:"415105",desc:"ARQUIVISTA DE DOCUMENTOS"},
  {sinan:"642",code:"261105",desc:"ARQUIVISTA PESQUISADOR (JORNALISMO)"},
  {sinan:"1904",code:"763305",desc:"ARREMATADEIRA"},
  {sinan:"2647",code:"791105",desc:"ARTESAO BORDADOR"},
  {sinan:"2648",code:"791110",desc:"ARTESAO CERAMISTA"},
  {sinan:"2649",code:"791115",desc:"ARTESAO COM MATERIAL RECICLAVEL"},
  {sinan:"2650",code:"791120",desc:"ARTESAO CONFECCIONADOR DE BIOJOIAS E ECOJOIAS"},
  {sinan:"2656",code:"791150",desc:"ARTESAO CROCHETEIRO"},
  {sinan:"2651",code:"791125",desc:"ARTESAO DO COURO"},
  {sinan:"2652",code:"791130",desc:"ARTESAO ESCULTOR"},
  {sinan:"1792",code:"752105",desc:"ARTESAO MODELADOR (VIDROS)"},
  {sinan:"2653",code:"791135",desc:"ARTESAO MOVELEIRO (EXCETO RECICLADO)"},
  {sinan:"2659",code:"791160",desc:"ARTESAO RENDEIRO"},
  {sinan:"2654",code:"791140",desc:"ARTESAO TECELAO"},
  {sinan:"2655",code:"791145",desc:"ARTESAO TRANCADOR"},
  {sinan:"2657",code:"791155",desc:"ARTESAO TRICOTEIRO"},
  {sinan:"2668",code:"226310",desc:"ARTETERAPEUTA"},
  {sinan:"1967",code:"768305",desc:"ARTIFICE DO COURO"},
  {sinan:"695",code:"262405",desc:"ARTISTA (ARTES VISUAIS)"},
  {sinan:"1037",code:"376210",desc:"ARTISTA AEREO"},
  {sinan:"1038",code:"376215",desc:"ARTISTA DE CIRCO (OUTROS)"},
  {sinan:"1210",code:"514105",desc:"ASCENSORISTA"},
  {sinan:"1679",code:"724105",desc:"ASSENTADOR DE CANALIZACAO (EDIFICACOES)"},
  {sinan:"643",code:"261110",desc:"ASSESSOR DE IMPRENSA"},
  {sinan:"1097",code:"411010",desc:"ASSISTENTE ADMINISTRATIVO"},
  {sinan:"946",code:"351715",desc:"ASSISTENTE COMERCIAL DE SEGUROS"},
  {sinan:"704",code:"262805",desc:"ASSISTENTE DE COREOGRAFIA"},
  {sinan:"2146",code:"818105",desc:"ASSISTENTE DE LABORATORIO INDUSTRIAL"},
  {sinan:"974",code:"354125",desc:"ASSISTENTE DE VENDAS"},
  {sinan:"604",code:"251605",desc:"ASSISTENTE SOCIAL"},
  {sinan:"947",code:"351720",desc:"ASSISTENTE TECNICO DE SEGUROS"},
  {sinan:"1591",code:"716505",desc:"ASSOALHADOR"},
  {sinan:"1254",code:"516705",desc:"ASTROLOGO"},
  {sinan:"230",code:"213305",desc:"ASTRONOMO"},
  {sinan:"1139",code:"421105",desc:"ATENDENTE COMERCIAL (AGENCIA POSTAL)"},
  {sinan:"1113",code:"413205",desc:"ATENDENTE DE AGENCIA"},
  {sinan:"862",code:"322415",desc:"ATENDENTE DE CONSULTORIO DENTARIO"},
  {sinan:"1220",code:"515110",desc:"ATENDENTE DE ENFERMAGEM"},
  {sinan:"1299",code:"521130",desc:"ATENDENTE DE FARMACIA - BALCONISTA"},
  {sinan:"1098",code:"411015",desc:"ATENDENTE DE JUDICIARIO"},
  {sinan:"1209",code:"513435",desc:"ATENDENTE DE LANCHONETE"},
  {sinan:"1246",code:"516340",desc:"ATENDENTE DE LAVANDERIA"},
  {sinan:"1055",code:"377105",desc:"ATLETA PROFISSIONAL (OUTRAS MODALIDADES)"},
  {sinan:"1056",code:"377110",desc:"ATLETA PROFISSIONAL DE FUTEBOL"},
  {sinan:"1057",code:"377115",desc:"ATLETA PROFISSIONAL DE GOLFE"},
  {sinan:"1058",code:"377120",desc:"ATLETA PROFISSIONAL DE LUTA"},
  {sinan:"1059",code:"377125",desc:"ATLETA PROFISSIONAL DE TENIS"},
  {sinan:"697",code:"262505",desc:"ATOR"},
  {sinan:"196",code:"211105",desc:"ATUARIO"},
  {sinan:"2525",code:"261430",desc:"AUDIODESCRITOR"},
  {sinan:"607",code:"252205",desc:"AUDITOR (CONTADORES E AFINS)"},
  {sinan:"635",code:"254205",desc:"AUDITOR-FISCAL DA PREVIDENCIA SOCIAL"},
  {sinan:"633",code:"254105",desc:"AUDITOR-FISCAL DA RECEITA FEDERAL"},
  {sinan:"636",code:"254305",desc:"AUDITOR-FISCAL DO TRABALHO"},
  {sinan:"659",code:"261505",desc:"AUTOR-ROTEIRISTA"},
  {sinan:"1223",code:"515205",desc:"AUXILIAR DE BANCO DE SANGUE"},
  {sinan:"992",code:"371105",desc:"AUXILIAR DE BIBLIOTECA"},
  {sinan:"1100",code:"411025",desc:"AUXILIAR DE CARTORIO"},
  {sinan:"2499",code:"3224F2",desc:"AUXILIAR DE CONSULTORIO DENTARIO DE SAUDE DA FAMILIA"},
  {sinan:"1111",code:"413110",desc:"AUXILIAR DE CONTABILIDADE"},
  {sinan:"1897",code:"763105",desc:"AUXILIAR DE CORTE (PREPARACAO DA CONFECCAO DE ROUPAS)"},
  {sinan:"883",code:"331110",desc:"AUXILIAR DE DESENVOLVIMENTO INFANTIL"},
  {sinan:"855",code:"322230",desc:"AUXILIAR DE ENFERMAGEM"},
  {sinan:"2631",code:"322250",desc:"AUXILIAR DE ENFERMAGEM DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"2497",code:"3222E2",desc:"AUXILIAR DE ENFERMAGEM DE SAUDE DA FAMILIA"},
  {sinan:"856",code:"322235",desc:"AUXILIAR DE ENFERMAGEM DO TRABALHO"},
  {sinan:"1096",code:"411005",desc:"AUXILIAR DE ESCRITORIO,EM GERAL"},
  {sinan:"1102",code:"411035",desc:"AUXILIAR DE ESTATISTICA"},
  {sinan:"1224",code:"515210",desc:"AUXILIAR DE FARMACIA DE MANIPULACAO"},
  {sinan:"1112",code:"413115",desc:"AUXILIAR DE FATURAMENTO"},
  {sinan:"1099",code:"411020",desc:"AUXILIAR DE JUDICIARIO"},
  {sinan:"1225",code:"515215",desc:"AUXILIAR DE LABORATORIO DE ANALISES CLINICAS"},
  {sinan:"2147",code:"818110",desc:"AUXILIAR DE LABORATORIO DE ANALISES FISICO-QUIMICAS"},
  {sinan:"1226",code:"515220",desc:"AUXILIAR DE LABORATORIO DE IMUNOBIOLOGICOS"},
  {sinan:"1247",code:"516345",desc:"AUXILIAR DE LAVANDERIA"},
  {sinan:"2462",code:"514310",desc:"AUXILIAR DE MANUTENCAO PREDIAL"},
  {sinan:"2062",code:"782625",desc:"AUXILIAR DE MAQUINISTA DE TREM"},
  {sinan:"1101",code:"411030",desc:"AUXILIAR DE PESSOAL"},
  {sinan:"2282",code:"842120",desc:"AUXILIAR DE PROCESSAMENTO DE FUMO"},
  {sinan:"1227",code:"515225",desc:"AUXILIAR DE PRODUCAO FARMACEUTICA"},
  {sinan:"863",code:"322420",desc:"AUXILIAR DE PROTESE DENTARIA"},
  {sinan:"1958",code:"766420",desc:"AUXILIAR DE RADIOLOGIA (REVELACAO FOTOGRAFICA)"},
  {sinan:"857",code:"322240",desc:"AUXILIAR DE SAUDE (NAVEGACAO MARITIMA)"},
  {sinan:"1103",code:"411040",desc:"AUXILIAR DE SEGUROS"},
  {sinan:"1104",code:"411045",desc:"AUXILIAR DE SERVICOS DE IMPORTACAO E EXPORTACAO"},
  {sinan:"939",code:"351430",desc:"AUXILIAR DE SERVICOS JURIDICOS"},
  {sinan:"2633",code:"322430",desc:"AUXILIAR EM SAUDE BUCAL DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"2422",code:"992225",desc:"AUXILIAR GERAL DE CONSERVACAO DE VIAS PERMANENTES (EXCETO TRILHOS)"},
  {sinan:"2456",code:"513505",desc:"AUXILIAR NOS SERVICOS DE ALIMENTACAO"},
  {sinan:"875",code:"325105",desc:"AUXILIAR TECNICO EM LABORATORIO DE FARMACIA"},
  {sinan:"871",code:"324210",desc:"AUXILIAR TECNICO EM PATOLOGIA CLINICA"},
  {sinan:"984",code:"354415",desc:"AVALIADOR DE BENS MOVEIS"},
  {sinan:"983",code:"354410",desc:"AVALIADOR DE IMOVEIS"},
  {sinan:"962",code:"352410",desc:"AVALIADOR DE PRODUTOS DO MEIO DE COMUNICACAO"},
  {sinan:"420",code:"224105",desc:"AVALIADOR FISICO"},
  {sinan:"1359",code:"613305",desc:"AVICULTOR"},
  {sinan:"1236",code:"516205",desc:"BABA"},
  {sinan:"705",code:"262810",desc:"BAILARINO (EXCETO DANCAS POPULARES)"},
  {sinan:"2415",code:"992110",desc:"BALANCEADOR"},
  {sinan:"1121",code:"414115",desc:"BALANCEIRO"},
  {sinan:"2124",code:"811705",desc:"BAMBURISTA"},
  {sinan:"1280",code:"519315",desc:"BANHISTA DE ANIMAIS DOMESTICOS"},
  {sinan:"1228",code:"516105",desc:"BARBEIRO"},
  {sinan:"2531",code:"513440",desc:"BARISTA"},
  {sinan:"1206",code:"513420",desc:"BARMAN"},
  {sinan:"1786",code:"751105",desc:"BATE-FOLHA A MAQUINA"},
  {sinan:"650",code:"261205",desc:"BIBLIOTECARIO"},
  {sinan:"1184",code:"511220",desc:"BILHETEIRO (ESTACOES DE METRO,FERROVIARIAS E ASSEMELHADAS)"},
  {sinan:"1140",code:"421110",desc:"BILHETEIRO DE TRANSPORTES COLETIVOS"},
  {sinan:"1141",code:"421115",desc:"BILHETEIRO NO SERVICO DE DIVERSOES"},
  {sinan:"157",code:"201105",desc:"BIOENGENHEIRO"},
  {sinan:"318",code:"221105",desc:"BIOLOGO"},
  {sinan:"2435",code:"221205",desc:"BIOMEDICO"},
  {sinan:"158",code:"201110",desc:"BIOTECNOLOGISTA"},
  {sinan:"2533",code:"783230",desc:"BLOQUEIRO (TRABALHADOR PORTUARIO)"},
  {sinan:"1747",code:"731165",desc:"BOBINADOR ELETRICISTA,A MAO"},
  {sinan:"1748",code:"731170",desc:"BOBINADOR ELETRICISTA,A MAQUINA"},
  {sinan:"2070",code:"782815",desc:"BOIADEIRO"},
  {sinan:"1258",code:"517105",desc:"BOMBEIRO DE AERODROMO"},
  {sinan:"1259",code:"517110",desc:"BOMBEIRO DE SEGURANCA DO TRABALHO"},
  {sinan:"1919",code:"765015",desc:"BONELEIRO"},
  {sinan:"1965",code:"768205",desc:"BORDADOR,A MAO"},
  {sinan:"1905",code:"763310",desc:"BORDADOR,A MAQUINA"},
  {sinan:"2416",code:"992115",desc:"BORRACHEIRO"},
  {sinan:"1692",code:"724305",desc:"BRASADOR"},
  {sinan:"1229",code:"516110",desc:"CABELEIREIRO"},
  {sinan:"1657",code:"722405",desc:"CABLEADOR"},
  {sinan:"27",code:"031205",desc:"CABO BOMBEIRO MILITAR"},
  {sinan:"18",code:"021205",desc:"CABO DA POLICIA MILITAR"},
  {sinan:"56",code:"113005",desc:"CACIQUE"},
  {sinan:"1333",code:"612605",desc:"CAFEICULTOR"},
  {sinan:"1114",code:"413210",desc:"CAIXA DE BANCO"},
  {sinan:"1598",code:"716605",desc:"CALAFETADOR"},
  {sinan:"2125",code:"811710",desc:"CALANDRISTA DE BORRACHA"},
  {sinan:"2220",code:"832105",desc:"CALANDRISTA DE PAPEL"},
  {sinan:"1551",code:"715205",desc:"CALCETEIRO"},
  {sinan:"1697",code:"724405",desc:"CALDEIREIRO (CHAPAS DE COBRE)"},
  {sinan:"1698",code:"724410",desc:"CALDEIREIRO (CHAPAS DE FERRO E ACO)"},
  {sinan:"1198",code:"513305",desc:"CAMAREIRA DE TEATRO"},
  {sinan:"1199",code:"513310",desc:"CAMAREIRA DE TELEVISAO"},
  {sinan:"1201",code:"513320",desc:"CAMAREIRO DE EMBARCACOES"},
  {sinan:"1200",code:"513315",desc:"CAMAREIRO DE HOTEL"},
  {sinan:"2055",code:"782505",desc:"CAMINHONEIRO AUTONOMO (ROTAS REGIONAIS E INTERNACIONAIS)"},
  {sinan:"1507",code:"711110",desc:"CANTEIRO"},
  {sinan:"23",code:"030205",desc:"CAPITAO BOMBEIRO MILITAR"},
  {sinan:"13",code:"020205",desc:"CAPITAO DA POLICIA MILITAR"},
  {sinan:"302",code:"215110",desc:"CAPITAO DE MANOBRA DA MARINHA MERCANTE"},
  {sinan:"1483",code:"632610",desc:"CARBONIZADOR"},
  {sinan:"1563",code:"715505",desc:"CARPINTEIRO"},
  {sinan:"1565",code:"715515",desc:"CARPINTEIRO (CENARIOS)"},
  {sinan:"1564",code:"715510",desc:"CARPINTEIRO (ESQUADRIAS)"},
  {sinan:"1566",code:"715520",desc:"CARPINTEIRO (MINERACAO)"},
  {sinan:"1568",code:"715530",desc:"CARPINTEIRO (TELHADOS)"},
  {sinan:"2030",code:"777205",desc:"CARPINTEIRO DE CARRETAS"},
  {sinan:"2031",code:"777210",desc:"CARPINTEIRO DE CARROCERIAS"},
  {sinan:"1569",code:"715535",desc:"CARPINTEIRO DE FORMAS PARA CONCRETO"},
  {sinan:"1567",code:"715525",desc:"CARPINTEIRO DE OBRAS"},
  {sinan:"1570",code:"715540",desc:"CARPINTEIRO DE OBRAS CIVIS DE ARTE (PONTES,TUNEIS,BARRAGENS)"},
  {sinan:"2027",code:"777105",desc:"CARPINTEIRO NAVAL (CONSTRUCAO DE PEQUENAS EMBARCACOES)"},
  {sinan:"2028",code:"777110",desc:"CARPINTEIRO NAVAL (EMBARCACOES)"},
  {sinan:"2029",code:"777115",desc:"CARPINTEIRO NAVAL (ESTALEIROS)"},
  {sinan:"2074",code:"783205",desc:"CARREGADOR (AERONAVES)"},
  {sinan:"2075",code:"783210",desc:"CARREGADOR (ARMAZEM)"},
  {sinan:"2076",code:"783215",desc:"CARREGADOR (VEICULOS DE TRANSPORTES TERRESTRES)"},
  {sinan:"1283",code:"519905",desc:"CARTAZEIRO"},
  {sinan:"1130",code:"415205",desc:"CARTEIRO"},
  {sinan:"2231",code:"833205",desc:"CARTONAGEIRO,A MAO (CAIXAS DE PAPELAO)"},
  {sinan:"2226",code:"833105",desc:"CARTONAGEIRO,A MAQUINA"},
  {sinan:"1482",code:"632605",desc:"CARVOEIRO"},
  {sinan:"1369",code:"622005",desc:"CASEIRO (AGRICULTURA)"},
  {sinan:"1430",code:"631005",desc:"CATADOR DE CARANGUEJOS E SIRIS"},
  {sinan:"1431",code:"631010",desc:"CATADOR DE MARISCOS"},
  {sinan:"1277",code:"519205",desc:"CATADOR DE MATERIAL RECICLAVEL"},
  {sinan:"2534",code:"000000",desc:"CBO SEM DEFINICAO"},
  {sinan:"2287",code:"842225",desc:"CELOFANISTA NA FABRICACAO DE CHARUTOS"},
  {sinan:"1660",code:"723105",desc:"CEMENTADOR DE METAIS"},
  {sinan:"689",code:"262305",desc:"CENOGRAFO CARNAVALESCO E FESTAS POPULARES"},
  {sinan:"690",code:"262310",desc:"CENOGRAFO DE CINEMA"},
  {sinan:"691",code:"262315",desc:"CENOGRAFO DE EVENTOS"},
  {sinan:"692",code:"262320",desc:"CENOGRAFO DE TEATRO"},
  {sinan:"693",code:"262325",desc:"CENOGRAFO DE TV"},
  {sinan:"1022",code:"374205",desc:"CENOTECNICO (CINEMA,VIDEO,TELEVISAO,TEATRO E ESPETACULOS)"},
  {sinan:"1803",code:"752305",desc:"CERAMISTA"},
  {sinan:"1804",code:"752310",desc:"CERAMISTA (TORNO DE PEDAL E MOTOR)"},
  {sinan:"1805",code:"752315",desc:"CERAMISTA (TORNO SEMI-AUTOMATICO)"},
  {sinan:"1806",code:"752320",desc:"CERAMISTA MODELADOR"},
  {sinan:"1807",code:"752325",desc:"CERAMISTA MOLDADOR"},
  {sinan:"1808",code:"752330",desc:"CERAMISTA PRENSADOR"},
  {sinan:"1966",code:"768210",desc:"CERZIDOR"},
  {sinan:"2021",code:"776405",desc:"CESTEIRO"},
  {sinan:"1699",code:"724415",desc:"CHAPEADOR"},
  {sinan:"1702",code:"724430",desc:"CHAPEADOR DE AERONAVES"},
  {sinan:"1700",code:"724420",desc:"CHAPEADOR DE CARROCERIAS METALICAS (FABRICACAO)"},
  {sinan:"1701",code:"724425",desc:"CHAPEADOR NAVAL"},
  {sinan:"1963",code:"768125",desc:"CHAPELEIRO (CHAPEUS DE PALHA)"},
  {sinan:"1918",code:"765010",desc:"CHAPELEIRO DE SENHORAS"},
  {sinan:"2288",code:"842230",desc:"CHARUTEIRO A MAO"},
  {sinan:"1303",code:"523115",desc:"CHAVEIRO"},
  {sinan:"1173",code:"510130",desc:"CHEFE DE BAR"},
  {sinan:"2235",code:"840120",desc:"CHEFE DE CONFEITARIA"},
  {sinan:"929",code:"351110",desc:"CHEFE DE CONTABILIDADE (TECNICO)"},
  {sinan:"1172",code:"510125",desc:"CHEFE DE COZINHA"},
  {sinan:"926",code:"342605",desc:"CHEFE DE ESTACAO PORTUARIA"},
  {sinan:"1171",code:"510120",desc:"CHEFE DE PORTARIA DE HOTEL"},
  {sinan:"912",code:"342305",desc:"CHEFE DE SERVICO DE TRANSPORTE RODOVIARIO (PASSAGEIROS E CARGAS)"},
  {sinan:"971",code:"353235",desc:"CHEFE DE SERVICOS BANCARIOS"},
  {sinan:"2457",code:"513605",desc:"CHURRASQUEIRO"},
  {sinan:"1275",code:"519105",desc:"CICLISTA MENSAGEIRO"},
  {sinan:"583",code:"251115",desc:"CIENTISTA POLITICO"},
  {sinan:"2215",code:"831105",desc:"CILINDREIRO NA PREPARACAO DE PASTA PARA FABRICACAO DE PAPEL"},
  {sinan:"2140",code:"813105",desc:"CILINDRISTA (PETROQUIMICA E AFINS)"},
  {sinan:"800",code:"316340",desc:"CIMENTADOR (POCOS DE PETROLEO)"},
  {sinan:"380",code:"223204",desc:"CIRURGIAO DENTISTA - AUDITOR"},
  {sinan:"381",code:"223208",desc:"CIRURGIAO DENTISTA - CLINICO GERAL"},
  {sinan:"2437",code:"223280",desc:"CIRURGIAO DENTISTA - DENTISTICA"},
  {sinan:"2438",code:"223284",desc:"CIRURGIAO DENTISTA - DISFUNCAO TEMPOROMANDIBULAR E DOR OROFACIAL"},
  {sinan:"382",code:"223212",desc:"CIRURGIAO DENTISTA - ENDODONTISTA"},
  {sinan:"383",code:"223216",desc:"CIRURGIAO DENTISTA - EPIDEMIOLOGISTA"},
  {sinan:"384",code:"223220",desc:"CIRURGIAO DENTISTA - ESTOMATOLOGISTA"},
  {sinan:"385",code:"223224",desc:"CIRURGIAO DENTISTA - IMPLANTODONTISTA"},
  {sinan:"386",code:"223228",desc:"CIRURGIAO DENTISTA - ODONTOGERIATRA"},
  {sinan:"2436",code:"223276",desc:"CIRURGIAO DENTISTA - ODONTOLOGIA DO TRABALHO"},
  {sinan:"2439",code:"223288",desc:"CIRURGIAO DENTISTA - ODONTOLOGIA PARA PACIENTES COM NECESSIDADES ESPECIAIS"},
  {sinan:"387",code:"223232",desc:"CIRURGIAO DENTISTA - ODONTOLOGISTA LEGAL"},
  {sinan:"388",code:"223236",desc:"CIRURGIAO DENTISTA - ODONTOPEDIATRA"},
  {sinan:"389",code:"223240",desc:"CIRURGIAO DENTISTA - ORTOPEDISTA E ORTODONTISTA"},
  {sinan:"390",code:"223244",desc:"CIRURGIAO DENTISTA - PATOLOGISTA BUCAL"},
  {sinan:"391",code:"223248",desc:"CIRURGIAO DENTISTA - PERIODONTISTA"},
  {sinan:"392",code:"223252",desc:"CIRURGIAO DENTISTA - PROTESIOLOGO BUCOMAXILOFACIAL"},
  {sinan:"393",code:"223256",desc:"CIRURGIAO DENTISTA - PROTESISTA"},
  {sinan:"394",code:"223260",desc:"CIRURGIAO DENTISTA - RADIOLOGISTA"},
  {sinan:"395",code:"223264",desc:"CIRURGIAO DENTISTA - REABILITADOR ORAL"},
  {sinan:"396",code:"223268",desc:"CIRURGIAO DENTISTA - TRAUMATOLOGISTA BUCOMAXILOFACIAL"},
  {sinan:"397",code:"223272",desc:"CIRURGIAO DENTISTA DE SAUDE COLETIVA"},
  {sinan:"2489",code:"2232B1",desc:"CIRURGIAO DENTISTA DE SAUDE DA FAMILIA"},
  {sinan:"2555",code:"223293",desc:"CIRURGIAO-DENTISTA DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"2285",code:"842215",desc:"CLASSIFICADOR DE CHARUTOS"},
  {sinan:"1881",code:"762210",desc:"CLASSIFICADOR DE COUROS"},
  {sinan:"1827",code:"761105",desc:"CLASSIFICADOR DE FIBRAS TEXTEIS"},
  {sinan:"2281",code:"842115",desc:"CLASSIFICADOR DE FUMO"},
  {sinan:"2475",code:"848425",desc:"CLASSIFICADOR DE GRAOS"},
  {sinan:"1986",code:"772105",desc:"CLASSIFICADOR DE MADEIRA"},
  {sinan:"1875",code:"762105",desc:"CLASSIFICADOR DE PELES"},
  {sinan:"1451",code:"632105",desc:"CLASSIFICADOR DE TORAS"},
  {sinan:"2207",code:"823305",desc:"CLASSIFICADOR E EMPILHADOR DE TIJOLOS REFRATARIOS"},
  {sinan:"1183",code:"511215",desc:"COBRADOR DE TRANSPORTES COLETIVOS (EXCETO TREM)"},
  {sinan:"1146",code:"421305",desc:"COBRADOR EXTERNO"},
  {sinan:"1147",code:"421310",desc:"COBRADOR INTERNO"},
  {sinan:"1126",code:"415115",desc:"CODIFICADOR DE DADOS"},
  {sinan:"1922",code:"765205",desc:"COLCHOEIRO (CONFECCAO DE COLCHOES)"},
  {sinan:"994",code:"371205",desc:"COLECIONADOR DE SELOS E MOEDAS"},
  {sinan:"1214",code:"514205",desc:"COLETOR DE LIXO"},
  {sinan:"2460",code:"514230",desc:"COLETOR DE RESIDUOS SOLIDOS DE SERVICOS DE SAUDE"},
  {sinan:"737",code:"311705",desc:"COLORISTA DE PAPEL"},
  {sinan:"738",code:"311710",desc:"COLORISTA TEXTIL"},
  {sinan:"303",code:"215115",desc:"COMANDANTE DA MARINHA MERCANTE"},
  {sinan:"671",code:"261710",desc:"COMENTARISTA DE RADIO E TELEVISAO"},
  {sinan:"119",code:"141405",desc:"COMERCIANTE ATACADISTA"},
  {sinan:"120",code:"141410",desc:"COMERCIANTE VAREJISTA"},
  {sinan:"1179",code:"511110",desc:"COMISSARIO DE TREM"},
  {sinan:"1178",code:"511105",desc:"COMISSARIO DE VOO"},
  {sinan:"1115",code:"413215",desc:"COMPENSADOR DE BANCO"},
  {sinan:"698",code:"262605",desc:"COMPOSITOR"},
  {sinan:"979",code:"354205",desc:"COMPRADOR"},
  {sinan:"2033",code:"781105",desc:"CONDUTOR DE PROCESSOS ROBOTIZADOS DE PINTURA"},
  {sinan:"2034",code:"781110",desc:"CONDUTOR DE PROCESSOS ROBOTIZADOS DE SOLDAGEM"},
  {sinan:"2071",code:"782820",desc:"CONDUTOR DE VEICULOS A PEDAIS"},
  {sinan:"2068",code:"782805",desc:"CONDUTOR DE VEICULOS DE TRACAO ANIMAL (RUAS E ESTRADAS)"},
  {sinan:"903",code:"341305",desc:"CONDUTOR MAQUINISTA FLUVIAL"},
  {sinan:"904",code:"341310",desc:"CONDUTOR MAQUINISTA MARITIMO"},
  {sinan:"1773",code:"742110",desc:"CONFECCIONADOR DE ACORDEAO"},
  {sinan:"1917",code:"765005",desc:"CONFECCIONADOR DE ARTEFATOS DE COURO (EXCETO SAPATOS)"},
  {sinan:"2227",code:"833110",desc:"CONFECCIONADOR DE BOLSAS,SACOS E SACOLAS E PAPEL,A MAQUINA"},
  {sinan:"1923",code:"765215",desc:"CONFECCIONADOR DE BRINQUEDOS DE PANO"},
  {sinan:"1977",code:"768630",desc:"CONFECCIONADOR DE CARIMBOS DE BORRACHA"},
  {sinan:"2022",code:"776410",desc:"CONFECCIONADOR DE ESCOVAS,PINCEIS E PRODUTOS SIMILARES (A MAO)"},
  {sinan:"2023",code:"776415",desc:"CONFECCIONADOR DE ESCOVAS,PINCEIS E PRODUTOS SIMILARES (A MAQUINA)"},
  {sinan:"1774",code:"742115",desc:"CONFECCIONADOR DE INSTRUMENTOS DE CORDA"},
  {sinan:"1775",code:"742120",desc:"CONFECCIONADOR DE INSTRUMENTOS DE PERCUSSAO (PELE,COURO OU PLASTICO)"},
  {sinan:"1776",code:"742125",desc:"CONFECCIONADOR DE INSTRUMENTOS DE SOPRO (MADEIRA)"},
  {sinan:"1777",code:"742130",desc:"CONFECCIONADOR DE INSTRUMENTOS DE SOPRO (METAL)"},
  {sinan:"2024",code:"776420",desc:"CONFECCIONADOR DE MOVEIS DE VIME,JUNCO E BAMBU"},
  {sinan:"1778",code:"742135",desc:"CONFECCIONADOR DE ORGAO"},
  {sinan:"1779",code:"742140",desc:"CONFECCIONADOR DE PIANO"},
  {sinan:"2126",code:"811715",desc:"CONFECCIONADOR DE PNEUMATICOS"},
  {sinan:"2228",code:"833115",desc:"CONFECCIONADOR DE SACOS DE CELOFANE,A MAQUINA"},
  {sinan:"1924",code:"765225",desc:"CONFECCIONADOR DE VELAS NAUTICAS,BARRACAS E TOLDOS"},
  {sinan:"2127",code:"811725",desc:"CONFECCIONADOR DE VELAS POR IMERSAO"},
  {sinan:"2128",code:"811735",desc:"CONFECCIONADOR DE VELAS POR MOLDAGEM"},
  {sinan:"2298",code:"848310",desc:"CONFEITEIRO"},
  {sinan:"1124",code:"414215",desc:"CONFERENTE DE CARGA E DESCARGA"},
  {sinan:"1116",code:"413220",desc:"CONFERENTE DE SERVICOS BANCARIOS"},
  {sinan:"1245",code:"516335",desc:"CONFERENTE-EXPEDIDOR DE ROUPAS (LAVANDERIAS)"},
  {sinan:"2470",code:"515320",desc:"CONSELHEIRO TUTELAR"},
  {sinan:"2412",code:"991410",desc:"CONSERVADOR DE FACHADAS"},
  {sinan:"2403",code:"991105",desc:"CONSERVADOR DE VIA PERMANENTE (TRILHOS)"},
  {sinan:"2452",code:"262415",desc:"CONSERVADOR-RESTAURADOR DE BENS CULTURAIS"},
  {sinan:"930",code:"351115",desc:"CONSULTOR CONTABIL (TECNICO)"},
  {sinan:"552",code:"241040",desc:"CONSULTOR JURIDICO"},
  {sinan:"608",code:"252210",desc:"CONTADOR"},
  {sinan:"1109",code:"412205",desc:"CONTINUO"},
  {sinan:"1039",code:"376220",desc:"CONTORCIONISTA"},
  {sinan:"1815",code:"760105",desc:"CONTRAMESTRE DE ACABAMENTO (INDUSTRIA TEXTIL)"},
  {sinan:"897",code:"341205",desc:"CONTRAMESTRE DE CABOTAGEM"},
  {sinan:"1816",code:"760110",desc:"CONTRAMESTRE DE FIACAO (INDUSTRIA TEXTIL)"},
  {sinan:"1817",code:"760115",desc:"CONTRAMESTRE DE MALHARIA (INDUSTRIA TEXTIL)"},
  {sinan:"1818",code:"760120",desc:"CONTRAMESTRE DE TECELAGEM (INDUSTRIA TEXTIL)"},
  {sinan:"1075",code:"391115",desc:"CONTROLADOR DE ENTRADA E SAIDA"},
  {sinan:"1284",code:"519910",desc:"CONTROLADOR DE PRAGAS"},
  {sinan:"908",code:"342115",desc:"CONTROLADOR DE SERVICOS DE MAQUINAS E VEICULOS"},
  {sinan:"917",code:"342505",desc:"CONTROLADOR DE TRAFEGO AEREO"},
  {sinan:"304",code:"215120",desc:"COORDENADOR DE OPERACOES DE COMBATE A POLUICAO NO MEIO AQUAVIARIO"},
  {sinan:"539",code:"239405",desc:"COORDENADOR PEDAGOGICO"},
  {sinan:"1207",code:"513425",desc:"COPEIRO"},
  {sinan:"1208",code:"513430",desc:"COPEIRO DE HOSPITAL"},
  {sinan:"1930",code:"766105",desc:"COPIADOR DE CHAPA"},
  {sinan:"706",code:"262815",desc:"COREOGRAFO"},
  {sinan:"20",code:"030105",desc:"CORONEL BOMBEIRO MILITAR"},
  {sinan:"10",code:"020105",desc:"CORONEL DA POLICIA MILITAR"},
  {sinan:"986",code:"354605",desc:"CORRETOR DE IMOVEIS"},
  {sinan:"985",code:"354505",desc:"CORRETOR DE SEGUROS"},
  {sinan:"632",code:"253305",desc:"CORRETOR DE VALORES,ATIVOS FINANCEIROS,MERCADORIAS E DERIVATIVOS"},
  {sinan:"1920",code:"765105",desc:"CORTADOR DE ARTEFATOS DE COURO (EXCETO ROUPAS E CALCADOS)"},
  {sinan:"1968",code:"768310",desc:"CORTADOR DE CALCADOS,A MAO (EXCETO SOLAS)"},
  {sinan:"1910",code:"764105",desc:"CORTADOR DE CALCADOS,A MAQUINA (EXCETO SOLAS E PALMILHAS)"},
  {sinan:"2286",code:"842220",desc:"CORTADOR DE CHARUTOS"},
  {sinan:"1989",code:"773105",desc:"CORTADOR DE LAMINADOS DE MADEIRA"},
  {sinan:"1536",code:"712205",desc:"CORTADOR DE PEDRAS"},
  {sinan:"1898",code:"763110",desc:"CORTADOR DE ROUPAS"},
  {sinan:"1911",code:"764110",desc:"CORTADOR DE SOLAS E PALMILHAS,A MAQUINA"},
  {sinan:"1921",code:"765110",desc:"CORTADOR DE TAPECARIA"},
  {sinan:"1797",code:"752210",desc:"CORTADOR DE VIDRO"},
  {sinan:"1969",code:"768315",desc:"COSTURADOR DE ARTEFATOS DE COURO,A MAO (EXCETO ROUPAS E CALCADOS)"},
  {sinan:"1927",code:"765310",desc:"COSTURADOR DE ARTEFATOS DE COURO,A MAQUINA (EXCETO ROUPAS E CALCADOS)"},
  {sinan:"1914",code:"764205",desc:"COSTURADOR DE CALCADOS,A MAQUINA"},
  {sinan:"1894",code:"763010",desc:"COSTUREIRA DE PECAS SOB ENCOMENDA"},
  {sinan:"1895",code:"763015",desc:"COSTUREIRA DE REPARACAO DE ROUPAS"},
  {sinan:"1896",code:"763020",desc:"COSTUREIRO DE ROUPA DE COURO E PELE"},
  {sinan:"1901",code:"763205",desc:"COSTUREIRO DE ROUPAS DE COURO E PELE,A MAQUINA NA CONFECCAO EM SERIE"},
  {sinan:"1902",code:"763210",desc:"COSTUREIRO NA CONFECCAO EM SERIE"},
  {sinan:"1903",code:"763215",desc:"COSTUREIRO,A MAQUINA NA CONFECCAO EM SERIE"},
  {sinan:"2245",code:"841408",desc:"COZINHADOR (CONSERVACAO DE ALIMENTOS)"},
  {sinan:"2246",code:"841416",desc:"COZINHADOR DE CARNES"},
  {sinan:"2247",code:"841420",desc:"COZINHADOR DE FRUTAS E LEGUMES"},
  {sinan:"2272",code:"841730",desc:"COZINHADOR DE MALTE"},
  {sinan:"2248",code:"841428",desc:"COZINHADOR DE PESCADO"},
  {sinan:"1197",code:"513225",desc:"COZINHEIRO DE EMBARCACOES"},
  {sinan:"1196",code:"513220",desc:"COZINHEIRO DE HOSPITAL"},
  {sinan:"1194",code:"513210",desc:"COZINHEIRO DO SERVICO DOMESTICO"},
  {sinan:"1193",code:"513205",desc:"COZINHEIRO GERAL"},
  {sinan:"1195",code:"513215",desc:"COZINHEIRO INDUSTRIAL"},
  {sinan:"1349",code:"613010",desc:"CRIADOR DE ANIMAIS DOMESTICOS"},
  {sinan:"1362",code:"613410",desc:"CRIADOR DE ANIMAIS PRODUTORES DE VENENO"},
  {sinan:"1350",code:"613105",desc:"CRIADOR DE ASININOS E MUARES"},
  {sinan:"1351",code:"613110",desc:"CRIADOR DE BOVINOS (CORTE)"},
  {sinan:"1352",code:"613115",desc:"CRIADOR DE BOVINOS (LEITE)"},
  {sinan:"1353",code:"613120",desc:"CRIADOR DE BUBALINOS (CORTE)"},
  {sinan:"1354",code:"613125",desc:"CRIADOR DE BUBALINOS (LEITE)"},
  {sinan:"1437",code:"631305",desc:"CRIADOR DE CAMAROES"},
  {sinan:"1356",code:"613205",desc:"CRIADOR DE CAPRINOS"},
  {sinan:"1355",code:"613130",desc:"CRIADOR DE EQUINOS"},
  {sinan:"1438",code:"631310",desc:"CRIADOR DE JACARES"},
  {sinan:"1439",code:"631315",desc:"CRIADOR DE MEXILHOES"},
  {sinan:"1440",code:"631320",desc:"CRIADOR DE OSTRAS"},
  {sinan:"1357",code:"613210",desc:"CRIADOR DE OVINOS"},
  {sinan:"1441",code:"631325",desc:"CRIADOR DE PEIXES"},
  {sinan:"1442",code:"631330",desc:"CRIADOR DE QUELONIOS"},
  {sinan:"1443",code:"631335",desc:"CRIADOR DE RAS"},
  {sinan:"1358",code:"613215",desc:"CRIADOR DE SUINOS"},
  {sinan:"1348",code:"613005",desc:"CRIADOR EM PECUARIA POLIVALENTE"},
  {sinan:"660",code:"261510",desc:"CRITICO"},
  {sinan:"1964",code:"768130",desc:"CROCHETEIRO,A MAO"},
  {sinan:"1073",code:"391105",desc:"CRONOANALISTA"},
  {sinan:"1074",code:"391110",desc:"CRONOMETRISTA"},
  {sinan:"1452",code:"632110",desc:"CUBADOR DE MADEIRA"},
  {sinan:"1237",code:"516210",desc:"CUIDADOR DE IDOSOS"},
  {sinan:"2643",code:"516220",desc:"CUIDADOR EM SAUDE"},
  {sinan:"1205",code:"513415",desc:"CUMIM"},
  {sinan:"1360",code:"613310",desc:"CUNICULTOR"},
  {sinan:"1880",code:"762205",desc:"CURTIDOR (COUROS E PELES)"},
  {sinan:"1035",code:"376110",desc:"DANCARINO POPULAR"},
  {sinan:"1034",code:"376105",desc:"DANCARINO TRADICIONAL"},
  {sinan:"1105",code:"412105",desc:"DATILOGRAFO"},
  {sinan:"1665",code:"723205",desc:"DECAPADOR"},
  {sinan:"1809",code:"752405",desc:"DECORADOR DE CERAMICA"},
  {sinan:"2637",code:"375120",desc:"DECORADOR DE EVENTOS"},
  {sinan:"710",code:"262905",desc:"DECORADOR DE INTERIORES DE NIVEL SUPERIOR"},
  {sinan:"1810",code:"752410",desc:"DECORADOR DE VIDRO"},
  {sinan:"1811",code:"752415",desc:"DECORADOR DE VIDRO A PINCEL"},
  {sinan:"579",code:"242405",desc:"DEFENSOR PUBLICO"},
  {sinan:"2291",code:"848105",desc:"DEFUMADOR DE CARNES E PESCADOS"},
  {sinan:"2301",code:"848405",desc:"DEGUSTADOR DE CAFE"},
  {sinan:"2302",code:"848410",desc:"DEGUSTADOR DE CHA"},
  {sinan:"2289",code:"842235",desc:"DEGUSTADOR DE CHARUTOS"},
  {sinan:"2303",code:"848415",desc:"DEGUSTADOR DE DERIVADOS DE CACAU"},
  {sinan:"2304",code:"848420",desc:"DEGUSTADOR DE VINHOS OU LICORES"},
  {sinan:"578",code:"242305",desc:"DELEGADO DE POLICIA"},
  {sinan:"1601",code:"717005",desc:"DEMOLIDOR DE EDIFICACOES"},
  {sinan:"1297",code:"521120",desc:"DEMONSTRADOR DE MERCADORIAS"},
  {sinan:"31",code:"111115",desc:"DEPUTADO ESTADUAL E DISTRITAL"},
  {sinan:"30",code:"111110",desc:"DEPUTADO FEDERAL"},
  {sinan:"1876",code:"762110",desc:"DESCARNADOR DE COUROS E PELES,A MAQUINA"},
  {sinan:"2427",code:"999994",desc:"DESEMPREGADO CRONICO OU CUJA OCUPACAO HABITUAL NAO FOI POSSIVEL OBTER"},
  {sinan:"808",code:"318010",desc:"DESENHISTA COPISTA"},
  {sinan:"809",code:"318015",desc:"DESENHISTA DETALHISTA"},
  {sinan:"696",code:"262410",desc:"DESENHISTA INDUSTRIAL (DESIGNER)"},
  {sinan:"2625",code:"262420",desc:"DESENHISTA INDUSTRIAL DE PRODUTO (DESIGNER DE PRODUTO)"},
  {sinan:"2626",code:"262425",desc:"DESENHISTA INDUSTRIAL DE PRODUTO DE MODA (DESIGNER DE MODA"},
  {sinan:"825",code:"318505",desc:"DESENHISTA PROJETISTA DE ARQUITETURA"},
  {sinan:"826",code:"318510",desc:"DESENHISTA PROJETISTA DE CONSTRUCAO CIVIL"},
  {sinan:"829",code:"318705",desc:"DESENHISTA PROJETISTA DE ELETRICIDADE"},
  {sinan:"827",code:"318605",desc:"DESENHISTA PROJETISTA DE MAQUINAS"},
  {sinan:"830",code:"318710",desc:"DESENHISTA PROJETISTA ELETRONICO"},
  {sinan:"828",code:"318610",desc:"DESENHISTA PROJETISTA MECANICO"},
  {sinan:"807",code:"318005",desc:"DESENHISTA TECNICO"},
  {sinan:"810",code:"318105",desc:"DESENHISTA TECNICO (ARQUITETURA)"},
  {sinan:"819",code:"318405",desc:"DESENHISTA TECNICO (ARTES GRAFICAS)"},
  {sinan:"818",code:"318310",desc:"DESENHISTA TECNICO (CALEFACAO,VENTILACAO E REFRIGERACAO)"},
  {sinan:"811",code:"318110",desc:"DESENHISTA TECNICO (CARTOGRAFIA)"},
  {sinan:"812",code:"318115",desc:"DESENHISTA TECNICO (CONSTRUCAO CIVIL)"},
  {sinan:"817",code:"318305",desc:"DESENHISTA TECNICO (ELETRICIDADE E ELETRONICA)"},
  {sinan:"820",code:"318410",desc:"DESENHISTA TECNICO (ILUSTRACOES ARTISTICAS)"},
  {sinan:"821",code:"318415",desc:"DESENHISTA TECNICO (ILUSTRACOES TECNICAS)"},
  {sinan:"822",code:"318420",desc:"DESENHISTA TECNICO (INDUSTRIA TEXTIL)"},
  {sinan:"813",code:"318120",desc:"DESENHISTA TECNICO (INSTALACOES HIDROSSANITARIAS)"},
  {sinan:"823",code:"318425",desc:"DESENHISTA TECNICO (MOBILIARIO)"},
  {sinan:"815",code:"318210",desc:"DESENHISTA TECNICO AERONAUTICO"},
  {sinan:"824",code:"318430",desc:"DESENHISTA TECNICO DE EMBALAGENS,MAQUETES E LEIAUTES"},
  {sinan:"814",code:"318205",desc:"DESENHISTA TECNICO MECANICO"},
  {sinan:"816",code:"318215",desc:"DESENHISTA TECNICO NAVAL"},
  {sinan:"2249",code:"841432",desc:"DESIDRATADOR DE ALIMENTOS"},
  {sinan:"1031",code:"375105",desc:"DESIGNER DE INTERIORES"},
  {sinan:"1032",code:"375110",desc:"DESIGNER DE VITRINES"},
  {sinan:"2450",code:"239435",desc:"DESIGNER EDUCACIONAL"},
  {sinan:"799",code:"316335",desc:"DESINCRUSTADOR (POCOS DE PETROLEO)"},
  {sinan:"2307",code:"848515",desc:"DESOSSADOR"},
  {sinan:"911",code:"342210",desc:"DESPACHANTE ADUANEIRO"},
  {sinan:"2639",code:"423110",desc:"DESPACHANTE DE TRANSITO"},
  {sinan:"1182",code:"511210",desc:"DESPACHANTE DE TRANSPORTES COLETIVOS (EXCETO TREM)"},
  {sinan:"1162",code:"423105",desc:"DESPACHANTE DOCUMENTALISTA"},
  {sinan:"918",code:"342510",desc:"DESPACHANTE OPERACIONAL DE VOO"},
  {sinan:"2273",code:"841735",desc:"DESSECADOR DE MALTE"},
  {sinan:"2106",code:"811405",desc:"DESTILADOR DE MADEIRA"},
  {sinan:"2107",code:"811410",desc:"DESTILADOR DE PRODUTOS QUIMICOS (EXCETO PETROLEO)"},
  {sinan:"1508",code:"711115",desc:"DESTROCADOR DE PEDRA"},
  {sinan:"952",code:"351805",desc:"DETETIVE PROFISSIONAL"},
  {sinan:"1509",code:"711120",desc:"DETONADOR"},
  {sinan:"418",code:"223705",desc:"DIETISTA"},
  {sinan:"1106",code:"412110",desc:"DIGITADOR"},
  {sinan:"91",code:"123105",desc:"DIRETOR ADMINISTRATIVO"},
  {sinan:"92",code:"123110",desc:"DIRETOR ADMINISTRATIVO E FINANCEIRO"},
  {sinan:"96",code:"123305",desc:"DIRETOR COMERCIAL"},
  {sinan:"80",code:"122705",desc:"DIRETOR COMERCIAL EM OPERACOES DE INTERMEDIACAO FINANCEIRA"},
  {sinan:"694",code:"262330",desc:"DIRETOR DE ARTE"},
  {sinan:"83",code:"122720",desc:"DIRETOR DE CAMBIO E COMERCIO EXTERIOR"},
  {sinan:"685",code:"262205",desc:"DIRETOR DE CINEMA"},
  {sinan:"84",code:"122725",desc:"DIRETOR DE COMPLIANCE"},
  {sinan:"85",code:"122730",desc:"DIRETOR DE CREDITO (EXCETO CREDITO IMOBILIARIO)"},
  {sinan:"86",code:"122735",desc:"DIRETOR DE CREDITO IMOBILIARIO"},
  {sinan:"82",code:"122715",desc:"DIRETOR DE CREDITO RURAL"},
  {sinan:"1000",code:"372105",desc:"DIRETOR DE FOTOGRAFIA"},
  {sinan:"109",code:"131305",desc:"DIRETOR DE INSTITUICAO EDUCACIONAL DA AREA PRIVADA"},
  {sinan:"110",code:"131310",desc:"DIRETOR DE INSTITUICAO EDUCACIONAL PUBLICA"},
  {sinan:"87",code:"122740",desc:"DIRETOR DE LEASING"},
  {sinan:"102",code:"123805",desc:"DIRETOR DE MANUTENCAO"},
  {sinan:"97",code:"123310",desc:"DIRETOR DE MARKETING"},
  {sinan:"88",code:"122745",desc:"DIRETOR DE MERCADO DE CAPITAIS"},
  {sinan:"72",code:"122405",desc:"DIRETOR DE OPERACOES COMERCIAIS (COMERCIO ATACADISTA E VAREJISTA)"},
  {sinan:"76",code:"122605",desc:"DIRETOR DE OPERACOES DE CORREIOS"},
  {sinan:"71",code:"122305",desc:"DIRETOR DE OPERACOES DE OBRAS PUBLICA E CIVIL"},
  {sinan:"77",code:"122610",desc:"DIRETOR DE OPERACOES DE SERVICOS DE ARMAZENAMENTO"},
  {sinan:"78",code:"122615",desc:"DIRETOR DE OPERACOES DE SERVICOS DE TELECOMUNICACOES"},
  {sinan:"79",code:"122620",desc:"DIRETOR DE OPERACOES DE SERVICOS DE TRANSPORTE"},
  {sinan:"101",code:"123705",desc:"DIRETOR DE PESQUISA E DESENVOLVIMENTO (P&D)"},
  {sinan:"64",code:"121005",desc:"DIRETOR DE PLANEJAMENTO ESTRATEGICO"},
  {sinan:"70",code:"122205",desc:"DIRETOR DE PRODUCAO E OPERACOES DA INDUSTRIA DE TRANSFORMACAO,EXTRACAO MINERAL E UTILIDA"},
  {sinan:"73",code:"122505",desc:"DIRETOR DE PRODUCAO E OPERACOES DE ALIMENTACAO"},
  {sinan:"74",code:"122510",desc:"DIRETOR DE PRODUCAO E OPERACOES DE HOTEL"},
  {sinan:"75",code:"122515",desc:"DIRETOR DE PRODUCAO E OPERACOES DE TURISMO"},
  {sinan:"66",code:"122105",desc:"DIRETOR DE PRODUCAO E OPERACOES EM EMPRESA AGROPECUARIA"},
  {sinan:"67",code:"122110",desc:"DIRETOR DE PRODUCAO E OPERACOES EM EMPRESA AQUICOLA"},
  {sinan:"68",code:"122115",desc:"DIRETOR DE PRODUCAO E OPERACOES EM EMPRESA FLORESTAL"},
  {sinan:"69",code:"122120",desc:"DIRETOR DE PRODUCAO E OPERACOES EM EMPRESA PESQUEIRA"},
  {sinan:"81",code:"122710",desc:"DIRETOR DE PRODUTOS BANCARIOS"},
  {sinan:"686",code:"262210",desc:"DIRETOR DE PROGRAMAS DE RADIO"},
  {sinan:"687",code:"262215",desc:"DIRETOR DE PROGRAMAS DE TELEVISAO"},
  {sinan:"89",code:"122750",desc:"DIRETOR DE RECUPERACAO DE CREDITOS EM OPERACOES DE INTERMEDIACAO FINANCEIRA"},
  {sinan:"94",code:"123205",desc:"DIRETOR DE RECURSOS HUMANOS"},
  {sinan:"644",code:"261115",desc:"DIRETOR DE REDACAO"},
  {sinan:"95",code:"123210",desc:"DIRETOR DE RELACOES DE TRABALHO"},
  {sinan:"90",code:"122755",desc:"DIRETOR DE RISCOS DE MERCADO"},
  {sinan:"103",code:"131105",desc:"DIRETOR DE SERVICOS CULTURAIS"},
  {sinan:"100",code:"123605",desc:"DIRETOR DE SERVICOS DE INFORMATICA"},
  {sinan:"107",code:"131205",desc:"DIRETOR DE SERVICOS DE SAUDE"},
  {sinan:"104",code:"131110",desc:"DIRETOR DE SERVICOS SOCIAIS"},
  {sinan:"98",code:"123405",desc:"DIRETOR DE SUPRIMENTOS"},
  {sinan:"99",code:"123410",desc:"DIRETOR DE SUPRIMENTOS NO SERVICO PUBLICO"},
  {sinan:"93",code:"123115",desc:"DIRETOR FINANCEIRO"},
  {sinan:"65",code:"121010",desc:"DIRETOR GERAL DE EMPRESA E ORGANIZACOES (EXCETO DE INTERESSE PUBLICO)"},
  {sinan:"688",code:"262220",desc:"DIRETOR TEATRAL"},
  {sinan:"59",code:"114105",desc:"DIRIGENTE DE PARTIDO POLITICO"},
  {sinan:"54",code:"111410",desc:"DIRIGENTE DO SERVICO PUBLICO ESTADUAL E DISTRITAL"},
  {sinan:"53",code:"111405",desc:"DIRIGENTE DO SERVICO PUBLICO FEDERAL"},
  {sinan:"55",code:"111415",desc:"DIRIGENTE DO SERVICO PUBLICO MUNICIPAL"},
  {sinan:"63",code:"114405",desc:"DIRIGENTE E ADMINISTRADOR DE ORGANIZACAO DA SOCIEDADE CIVIL SEM FINS LUCRATIVOS"},
  {sinan:"62",code:"114305",desc:"DIRIGENTE E ADMINISTRADOR DE ORGANIZACAO RELIGIOSA"},
  {sinan:"60",code:"114205",desc:"DIRIGENTES DE ENTIDADES DE TRABALHADORES"},
  {sinan:"61",code:"114210",desc:"DIRIGENTES DE ENTIDADES PATRONAIS"},
  {sinan:"2530",code:"374145",desc:"DJ (DISC JOCKEY)"},
  {sinan:"651",code:"261210",desc:"DOCUMENTALISTA"},
  {sinan:"1040",code:"376225",desc:"DOMADOR DE ANIMAIS (CIRCENSE)"},
  {sinan:"2425",code:"999992",desc:"DONA DE CASA"},
  {sinan:"2526",code:"322135",desc:"DOULA"},
  {sinan:"2135",code:"811810",desc:"DRAGEADOR (MEDICAMENTOS)"},
  {sinan:"707",code:"262820",desc:"DRAMATURGO DE DANCA"},
  {sinan:"585",code:"251205",desc:"ECONOMISTA"},
  {sinan:"586",code:"251210",desc:"ECONOMISTA AGROINDUSTRIAL"},
  {sinan:"590",code:"251230",desc:"ECONOMISTA AMBIENTAL"},
  {sinan:"589",code:"251225",desc:"ECONOMISTA DO SETOR PUBLICO"},
  {sinan:"605",code:"251610",desc:"ECONOMISTA DOMESTICO"},
  {sinan:"587",code:"251215",desc:"ECONOMISTA FINANCEIRO"},
  {sinan:"588",code:"251220",desc:"ECONOMISTA INDUSTRIAL"},
  {sinan:"591",code:"251235",desc:"ECONOMISTA REGIONAL E URBANO"},
  {sinan:"645",code:"261120",desc:"EDITOR"},
  {sinan:"665",code:"261605",desc:"EDITOR DE JORNAL"},
  {sinan:"666",code:"261610",desc:"EDITOR DE LIVRO"},
  {sinan:"667",code:"261615",desc:"EDITOR DE MIDIA ELETRONICA"},
  {sinan:"668",code:"261620",desc:"EDITOR DE REVISTA"},
  {sinan:"669",code:"261625",desc:"EDITOR DE REVISTA CIENTIFICA"},
  {sinan:"1932",code:"766120",desc:"EDITOR DE TEXTO E IMAGEM"},
  {sinan:"1027",code:"374405",desc:"EDITOR DE TV E VIDEO"},
  {sinan:"2467",code:"515305",desc:"EDUCADOR SOCIAL"},
  {sinan:"905",code:"341315",desc:"ELETRICISTA DE BORDO"},
  {sinan:"1574",code:"715615",desc:"ELETRICISTA DE INSTALACOES"},
  {sinan:"2392",code:"953105",desc:"ELETRICISTA DE INSTALACOES (AERONAVES)"},
  {sinan:"1572",code:"715605",desc:"ELETRICISTA DE INSTALACOES (CENARIOS)"},
  {sinan:"1573",code:"715610",desc:"ELETRICISTA DE INSTALACOES (EDIFICIOS)"},
  {sinan:"2393",code:"953110",desc:"ELETRICISTA DE INSTALACOES (EMBARCACOES)"},
  {sinan:"2394",code:"953115",desc:"ELETRICISTA DE INSTALACOES (VEICULOS AUTOMOTORES E MAQUINAS OPERATRIZES,EXCETO AERONAVES"},
  {sinan:"1758",code:"732105",desc:"ELETRICISTA DE MANUTENCAO DE LINHAS ELETRICAS,TELEFONICAS E DE COMUNICACAO DE DADOS"},
  {sinan:"2389",code:"951105",desc:"ELETRICISTA DE MANUTENCAO ELETROELETRONICA"},
  {sinan:"2395",code:"954105",desc:"ELETROMECANICO DE MANUTENCAO DE ELEVADORES"},
  {sinan:"2396",code:"954110",desc:"ELETROMECANICO DE MANUTENCAO DE ESCADAS ROLANTES"},
  {sinan:"2397",code:"954115",desc:"ELETROMECANICO DE MANUTENCAO DE PORTAS AUTOMATICAS"},
  {sinan:"749",code:"313105",desc:"ELETROTECNICO"},
  {sinan:"750",code:"313110",desc:"ELETROTECNICO (PRODUCAO DE ENERGIA)"},
  {sinan:"751",code:"313115",desc:"ELETROTENICO NA FABRICACAO,MONTAGEM E INSTALACAO DE MAQUINAS E EQUIPAMENTOS"},
  {sinan:"2079",code:"784105",desc:"EMBALADOR,A MAO"},
  {sinan:"2080",code:"784110",desc:"EMBALADOR,A MAQUINA"},
  {sinan:"880",code:"328105",desc:"EMBALSAMADOR"},
  {sinan:"1759",code:"732110",desc:"EMENDADOR DE CABOS ELETRICOS E TELEFONICOS (AEREOS E SUBTERRANEOS)"},
  {sinan:"1142",code:"421120",desc:"EMISSOR DE PASSAGENS"},
  {sinan:"1187",code:"512110",desc:"EMPREGADO DOMESTICO ARRUMADOR"},
  {sinan:"1189",code:"512120",desc:"EMPREGADO DOMESTICO DIARISTA"},
  {sinan:"1188",code:"512115",desc:"EMPREGADO DOMESTICO FAXINEIRO"},
  {sinan:"1186",code:"512105",desc:"EMPREGADO DOMESTICO NOS SERVICOS GERAIS"},
  {sinan:"680",code:"262105",desc:"EMPRESARIO DE ESPETACULO"},
  {sinan:"1680",code:"724110",desc:"ENCANADOR"},
  {sinan:"2175",code:"821405",desc:"ENCARREGADO DE ACABAMENTO DE CHAPAS E METAIS (TEMPERA)"},
  {sinan:"1821",code:"760305",desc:"ENCARREGADO DE CORTE NA CONFECCAO DO VESTUARIO"},
  {sinan:"1822",code:"760310",desc:"ENCARREGADO DE COSTURA NA CONFECCAO DO VESTUARIO"},
  {sinan:"2419",code:"992210",desc:"ENCARREGADO DE EQUIPE DE CONSERVACAO DE VIAS PERMANENTES (EXCETO TRILHOS)"},
  {sinan:"765",code:"313415",desc:"ENCARREGADO DE MANUTENCAO DE INSTRUMENTOS DE CONTROLE,MEDICAO E SIMILARES"},
  {sinan:"2387",code:"950205",desc:"ENCARREGADO DE MANUTENCAO ELETRICA DE VEICULOS"},
  {sinan:"2334",code:"910105",desc:"ENCARREGADO DE MANUTENCAO MECANICA DE SISTEMAS OPERACIONAIS"},
  {sinan:"2418",code:"992205",desc:"ENCARREGADO GERAL DE OPERACOES DE CONSERVACAO DE VIAS PERMANENTES (EXCETO TRILHOS)"},
  {sinan:"402",code:"223505",desc:"ENFERMEIRO"},
  {sinan:"403",code:"223510",desc:"ENFERMEIRO AUDITOR"},
  {sinan:"2491",code:"2235C2",desc:"ENFERMEIRO DA ESTRATEGIA DE AGENTE COMUNITARIO DE SAUDE"},
  {sinan:"2556",code:"223565",desc:"ENFERMEIRO DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"404",code:"223515",desc:"ENFERMEIRO DE BORDO"},
  {sinan:"405",code:"223520",desc:"ENFERMEIRO DE CENTRO CIRURGICO"},
  {sinan:"406",code:"223525",desc:"ENFERMEIRO DE TERAPIA INTENSIVA"},
  {sinan:"407",code:"223530",desc:"ENFERMEIRO DO TRABALHO"},
  {sinan:"408",code:"223535",desc:"ENFERMEIRO NEFROLOGISTA"},
  {sinan:"409",code:"223540",desc:"ENFERMEIRO NEONATOLOGISTA"},
  {sinan:"410",code:"223545",desc:"ENFERMEIRO OBSTETRICO"},
  {sinan:"411",code:"223550",desc:"ENFERMEIRO PSIQUIATRICO"},
  {sinan:"412",code:"223555",desc:"ENFERMEIRO PUERICULTOR E PEDIATRICO"},
  {sinan:"413",code:"223560",desc:"ENFERMEIRO SANITARISTA"},
  {sinan:"2490",code:"2235C1",desc:"ENFERMEIRO SAUDE DA FAMILIA"},
  {sinan:"1278",code:"519305",desc:"ENFERMEIRO VETERINARIO"},
  {sinan:"1899",code:"763115",desc:"ENFESTADOR DE ROUPAS"},
  {sinan:"1782",code:"751005",desc:"ENGASTADOR (JOIAS)"},
  {sinan:"276",code:"214425",desc:"ENGENHEIRO AERONAUTICO"},
  {sinan:"319",code:"222105",desc:"ENGENHEIRO AGRICOLA"},
  {sinan:"294",code:"214805",desc:"ENGENHEIRO AGRIMENSOR"},
  {sinan:"320",code:"222110",desc:"ENGENHEIRO AGRONOMO"},
  {sinan:"2543",code:"214005",desc:"ENGENHEIRO AMBIENTAL"},
  {sinan:"295",code:"214810",desc:"ENGENHEIRO CARTOGRAFO"},
  {sinan:"245",code:"214205",desc:"ENGENHEIRO CIVIL"},
  {sinan:"246",code:"214210",desc:"ENGENHEIRO CIVIL (AEROPORTOS)"},
  {sinan:"247",code:"214215",desc:"ENGENHEIRO CIVIL (EDIFICACOES)"},
  {sinan:"248",code:"214220",desc:"ENGENHEIRO CIVIL (ESTRUTURAS METALICAS)"},
  {sinan:"249",code:"214225",desc:"ENGENHEIRO CIVIL (FERROVIAS E METROVIAS)"},
  {sinan:"250",code:"214230",desc:"ENGENHEIRO CIVIL (GEOTECNIA)"},
  {sinan:"252",code:"214240",desc:"ENGENHEIRO CIVIL (HIDRAULICA)"},
  {sinan:"251",code:"214235",desc:"ENGENHEIRO CIVIL (HIDROLOGIA)"},
  {sinan:"253",code:"214245",desc:"ENGENHEIRO CIVIL (PONTES E VIADUTOS)"},
  {sinan:"254",code:"214250",desc:"ENGENHEIRO CIVIL (PORTOS E VIAS NAVEGAVEIS)"},
  {sinan:"255",code:"214255",desc:"ENGENHEIRO CIVIL (RODOVIAS)"},
  {sinan:"256",code:"214260",desc:"ENGENHEIRO CIVIL (SANEAMENTO)"},
  {sinan:"258",code:"214270",desc:"ENGENHEIRO CIVIL (TRANSPORTES E TRANSITO)"},
  {sinan:"257",code:"214265",desc:"ENGENHEIRO CIVIL (TUNEIS)"},
  {sinan:"2658",code:"222205",desc:"ENGENHEIRO DE ALIMENTOS"},
  {sinan:"203",code:"212205",desc:"ENGENHEIRO DE APLICATIVOS EM COMPUTACAO"},
  {sinan:"297",code:"214910",desc:"ENGENHEIRO DE CONTROLE DE QUALIDADE"},
  {sinan:"269",code:"214355",desc:"ENGENHEIRO DE CONTROLE E AUTOMACAO"},
  {sinan:"204",code:"212210",desc:"ENGENHEIRO DE EQUIPAMENTOS EM COMPUTACAO"},
  {sinan:"265",code:"214335",desc:"ENGENHEIRO DE MANUTENCAO DE TELECOMUNICACOES"},
  {sinan:"284",code:"214605",desc:"ENGENHEIRO DE MATERIAIS"},
  {sinan:"286",code:"214705",desc:"ENGENHEIRO DE MINAS"},
  {sinan:"287",code:"214710",desc:"ENGENHEIRO DE MINAS (BENEFICIAMENTO)"},
  {sinan:"288",code:"214715",desc:"ENGENHEIRO DE MINAS (LAVRA A CEU ABERTO)"},
  {sinan:"289",code:"214720",desc:"ENGENHEIRO DE MINAS (LAVRA SUBTERRANEA)"},
  {sinan:"290",code:"214725",desc:"ENGENHEIRO DE MINAS (PESQUISA MINERAL)"},
  {sinan:"291",code:"214730",desc:"ENGENHEIRO DE MINAS (PLANEJAMENTO)"},
  {sinan:"292",code:"214735",desc:"ENGENHEIRO DE MINAS (PROCESSO)"},
  {sinan:"293",code:"214740",desc:"ENGENHEIRO DE MINAS (PROJETO)"},
  {sinan:"321",code:"222115",desc:"ENGENHEIRO DE PESCA"},
  {sinan:"296",code:"214905",desc:"ENGENHEIRO DE PRODUCAO"},
  {sinan:"268",code:"214350",desc:"ENGENHEIRO DE REDES DE COMUNICACAO"},
  {sinan:"299",code:"214920",desc:"ENGENHEIRO DE RISCOS"},
  {sinan:"298",code:"214915",desc:"ENGENHEIRO DE SEGURANCA DO TRABALHO"},
  {sinan:"266",code:"214340",desc:"ENGENHEIRO DE TELECOMUNICACOES"},
  {sinan:"300",code:"214925",desc:"ENGENHEIRO DE TEMPOS E MOVIMENTOS"},
  {sinan:"259",code:"214305",desc:"ENGENHEIRO ELETRICISTA"},
  {sinan:"261",code:"214315",desc:"ENGENHEIRO ELETRICISTA DE MANUTENCAO"},
  {sinan:"262",code:"214320",desc:"ENGENHEIRO ELETRICISTA DE PROJETOS"},
  {sinan:"260",code:"214310",desc:"ENGENHEIRO ELETRONICO"},
  {sinan:"263",code:"214325",desc:"ENGENHEIRO ELETRONICO DE MANUTENCAO"},
  {sinan:"264",code:"214330",desc:"ENGENHEIRO ELETRONICO DE PROJETOS"},
  {sinan:"322",code:"222120",desc:"ENGENHEIRO FLORESTAL"},
  {sinan:"272",code:"214405",desc:"ENGENHEIRO MECANICO"},
  {sinan:"274",code:"214415",desc:"ENGENHEIRO MECANICO (ENERGIA NUCLEAR)"},
  {sinan:"273",code:"214410",desc:"ENGENHEIRO MECANICO AUTOMOTIVO"},
  {sinan:"275",code:"214420",desc:"ENGENHEIRO MECANICO INDUSTRIAL"},
  {sinan:"165",code:"202105",desc:"ENGENHEIRO MECATRONICO"},
  {sinan:"285",code:"214610",desc:"ENGENHEIRO METALURGISTA"},
  {sinan:"277",code:"214430",desc:"ENGENHEIRO NAVAL"},
  {sinan:"267",code:"214345",desc:"ENGENHEIRO PROJETISTA DE TELECOMUNICACOES"},
  {sinan:"278",code:"214505",desc:"ENGENHEIRO QUIMICO"},
  {sinan:"279",code:"214510",desc:"ENGENHEIRO QUIMICO (INDUSTRIA QUIMICA)"},
  {sinan:"280",code:"214515",desc:"ENGENHEIRO QUIMICO (MINERACAO,METALURGIA,SIDERURGIA,CIMENTEIRA E CERAMICA)"},
  {sinan:"281",code:"214520",desc:"ENGENHEIRO QUIMICO (PAPEL E CELULOSE)"},
  {sinan:"282",code:"214525",desc:"ENGENHEIRO QUIMICO (PETROLEO E BORRACHA)"},
  {sinan:"283",code:"214530",desc:"ENGENHEIRO QUIMICO (UTILIDADES E MEIO AMBIENTE)"},
  {sinan:"205",code:"212215",desc:"ENGENHEIROS DE SISTEMAS OPERACIONAIS EM COMPUTACAO"},
  {sinan:"1285",code:"519915",desc:"ENGRAXATE"},
  {sinan:"872",code:"325005",desc:"ENOLOGO"},
  {sinan:"708",code:"262825",desc:"ENSAIADOR DE DANCA"},
  {sinan:"2017",code:"775105",desc:"ENTALHADOR DE MADEIRA"},
  {sinan:"1163",code:"424105",desc:"ENTREVISTADOR CENSITARIO E DE PESQUISAS AMOSTRAIS"},
  {sinan:"1164",code:"424110",desc:"ENTREVISTADOR DE PESQUISA DE OPINIAO E MIDIA"},
  {sinan:"1165",code:"424115",desc:"ENTREVISTADOR DE PESQUISAS DE MERCADO"},
  {sinan:"1166",code:"424120",desc:"ENTREVISTADOR DE PRECOS"},
  {sinan:"1882",code:"762215",desc:"ENXUGADOR DE COUROS"},
  {sinan:"1041",code:"376230",desc:"EQUILIBRISTA"},
  {sinan:"2669",code:"226315",desc:"EQUOTERAPEUTA"},
  {sinan:"2176",code:"821410",desc:"ESCARFADOR"},
  {sinan:"1084",code:"391225",desc:"ESCOLHEDOR DE PAPEL"},
  {sinan:"1510",code:"711125",desc:"ESCORADOR DE MINAS"},
  {sinan:"934",code:"351405",desc:"ESCREVENTE"},
  {sinan:"661",code:"261515",desc:"ESCRITOR DE FICCAO"},
  {sinan:"662",code:"261520",desc:"ESCRITOR DE NAO FICCAO"},
  {sinan:"1117",code:"413225",desc:"ESCRITURARIO DE BANCO"},
  {sinan:"1167",code:"424125",desc:"ESCRITURARIO EM ESTATISTICA"},
  {sinan:"937",code:"351420",desc:"ESCRIVAO DE POLICIA"},
  {sinan:"936",code:"351415",desc:"ESCRIVAO EXTRA - JUDICIAL"},
  {sinan:"935",code:"351410",desc:"ESCRIVAO JUDICIAL"},
  {sinan:"1256",code:"516805",desc:"ESOTERICO"},
  {sinan:"2430",code:"111505",desc:"ESPECIALISTA DE POLITICAS PUBLICAS E GESTAO GOVERNAMENTAL"},
  {sinan:"161",code:"201210",desc:"ESPECIALISTA EM CALIBRACOES METROLOGICAS"},
  {sinan:"2432",code:"142610",desc:"ESPECIALISTA EM DESENVOLVIMENTO DE CIGARROS"},
  {sinan:"162",code:"201215",desc:"ESPECIALISTA EM ENSAIOS METROLOGICOS"},
  {sinan:"163",code:"201220",desc:"ESPECIALISTA EM INSTRUMENTACAO METROLOGICA"},
  {sinan:"164",code:"201225",desc:"ESPECIALISTA EM MATERIAIS DE REFERENCIA METROLOGICA"},
  {sinan:"197",code:"211110",desc:"ESPECIALISTA EM PESQUISA OPERACIONAL"},
  {sinan:"1864",code:"761410",desc:"ESTAMPADOR DE TECIDO"},
  {sinan:"200",code:"211205",desc:"ESTATISTICO"},
  {sinan:"201",code:"211210",desc:"ESTATISTICO (ESTATISTICA APLICADA)"},
  {sinan:"202",code:"211215",desc:"ESTATISTICO TEORICO"},
  {sinan:"2025",code:"776425",desc:"ESTEIREIRO"},
  {sinan:"942",code:"351515",desc:"ESTENOTIPISTA"},
  {sinan:"2250",code:"841440",desc:"ESTERILIZADOR DE ALIMENTOS"},
  {sinan:"1230",code:"516115",desc:"ESTETICISTA"},
  {sinan:"1279",code:"519310",desc:"ESTETICISTA DE ANIMAIS DOMESTICOS"},
  {sinan:"1884",code:"762305",desc:"ESTIRADOR DE COUROS E PELES (ACABAMENTO)"},
  {sinan:"1877",code:"762115",desc:"ESTIRADOR DE COUROS E PELES (PREPARACAO)"},
  {sinan:"1658",code:"722410",desc:"ESTIRADOR DE TUBOS DE METAL SEM COSTURA"},
  {sinan:"2077",code:"783220",desc:"ESTIVADOR"},
  {sinan:"1925",code:"765230",desc:"ESTOFADOR DE AVIOES"},
  {sinan:"1926",code:"765235",desc:"ESTOFADOR DE MOVEIS"},
  {sinan:"2424",code:"999991",desc:"ESTUDANTE"},
  {sinan:"1760",code:"732115",desc:"EXAMINADOR DE CABOS,LINHAS ELETRICAS E TELEFONICAS"},
  {sinan:"2197",code:"823210",desc:"EXTRUSOR DE FIOS OU FIBRAS DE VIDRO"},
  {sinan:"400",code:"223405",desc:"FARMACEUTICO"},
  {sinan:"2511",code:"223415",desc:"FARMACEUTICO ANALISTA CLINICO"},
  {sinan:"401",code:"223410",desc:"FARMACEUTICO BIOQUIMICO"},
  {sinan:"2512",code:"223420",desc:"FARMACEUTICO DE ALIMENTOS"},
  {sinan:"2514",code:"223430",desc:"FARMACEUTICO EM SAUDE PUBLICA"},
  {sinan:"2517",code:"223445",desc:"FARMACEUTICO HOSPITALAR E CLINICO"},
  {sinan:"2515",code:"223435",desc:"FARMACEUTICO INDUSTRIAL"},
  {sinan:"2513",code:"223425",desc:"FARMACEUTICO PRATICAS INTEGRATIVAS E COMPLEMENTARES"},
  {sinan:"2516",code:"223440",desc:"FARMACEUTICO TOXICOLOGISTA"},
  {sinan:"1215",code:"514210",desc:"FAXINEIRO"},
  {sinan:"1305",code:"524205",desc:"FEIRANTE"},
  {sinan:"2269",code:"841715",desc:"FERMENTADOR"},
  {sinan:"1622",code:"721105",desc:"FERRAMENTEIRO"},
  {sinan:"1623",code:"721110",desc:"FERRAMENTEIRO DE MANDRIS,CALIBRADORES E OUTROS DISPOSITIVOS"},
  {sinan:"655",code:"261405",desc:"FILOLOGO"},
  {sinan:"593",code:"251405",desc:"FILOSOFO"},
  {sinan:"2268",code:"841710",desc:"FILTRADOR DE CERVEJA"},
  {sinan:"1028",code:"374410",desc:"FINALIZADOR DE FILMES"},
  {sinan:"1029",code:"374415",desc:"FINALIZADOR DE VIDEO"},
  {sinan:"919",code:"342515",desc:"FISCAL DE AVIACAO CIVIL (FAC)"},
  {sinan:"1505",code:"710225",desc:"FISCAL DE PATIO DE USINA DE CONCRETO"},
  {sinan:"1181",code:"511205",desc:"FISCAL DE TRANSPORTES COLETIVOS (EXCETO TREM)"},
  {sinan:"638",code:"254405",desc:"FISCAL DE TRIBUTOS ESTADUAL"},
  {sinan:"639",code:"254410",desc:"FISCAL DE TRIBUTOS MUNICIPAL"},
  {sinan:"213",code:"213105",desc:"FISICO"},
  {sinan:"214",code:"213110",desc:"FISICO (ACUSTICA)"},
  {sinan:"215",code:"213115",desc:"FISICO (ATOMICA E MOLECULAR)"},
  {sinan:"216",code:"213120",desc:"FISICO (COSMOLOGIA)"},
  {sinan:"217",code:"213125",desc:"FISICO (ESTATISTICA E MATEMATICA)"},
  {sinan:"218",code:"213130",desc:"FISICO (FLUIDOS)"},
  {sinan:"219",code:"213135",desc:"FISICO (INSTRUMENTACAO)"},
  {sinan:"220",code:"213140",desc:"FISICO (MATERIA CONDENSADA)"},
  {sinan:"221",code:"213145",desc:"FISICO (MATERIAIS)"},
  {sinan:"222",code:"213150",desc:"FISICO (MEDICINA)"},
  {sinan:"223",code:"213155",desc:"FISICO (NUCLEAR E REATORES)"},
  {sinan:"224",code:"213160",desc:"FISICO (OPTICA)"},
  {sinan:"225",code:"213165",desc:"FISICO (PARTICULAS E CAMPOS)"},
  {sinan:"226",code:"213170",desc:"FISICO (PLASMA)"},
  {sinan:"227",code:"213175",desc:"FISICO (TERMICA)"},
  {sinan:"414",code:"223605",desc:"FISIOTERAPEUTA"},
  {sinan:"2445",code:"223650",desc:"FISIOTERAPEUTA ACUPUNTURISTA"},
  {sinan:"2447",code:"223660",desc:"FISIOTERAPEUTA DO TRABALHO"},
  {sinan:"2446",code:"223655",desc:"FISIOTERAPEUTA ESPORTIVO"},
  {sinan:"2441",code:"223630",desc:"FISIOTERAPEUTA NEUROFUNCIONAL"},
  {sinan:"2443",code:"223640",desc:"FISIOTERAPEUTA OSTEOPATA"},
  {sinan:"2444",code:"223645",desc:"FISIOTERAPEUTA QUIROPRAXISTA"},
  {sinan:"2440",code:"223625",desc:"FISIOTERAPEUTA RESPIRATORIA"},
  {sinan:"2442",code:"223635",desc:"FISIOTERAPEUTA TRAUMATO-ORTOPEDICA FUNCIONAL"},
  {sinan:"1127",code:"415120",desc:"FITOTECARIO"},
  {sinan:"2319",code:"862105",desc:"FOGUISTA (LOCOMOTIVAS A VAPOR)"},
  {sinan:"2018",code:"775110",desc:"FOLHEADOR DE MOVEIS DE MADEIRA"},
  {sinan:"415",code:"223610",desc:"FONOAUDIOLOGO"},
  {sinan:"2518",code:"223815",desc:"FONOAUDIOLOGO EDUCACIONAL"},
  {sinan:"2519",code:"223820",desc:"FONOAUDIOLOGO EM AUDIOLOGIA"},
  {sinan:"2520",code:"223825",desc:"FONOAUDIOLOGO EM DISFAGIA"},
  {sinan:"2521",code:"223830",desc:"FONOAUDIOLOGO EM LINGUAGEM"},
  {sinan:"2522",code:"223835",desc:"FONOAUDIOLOGO EM MOTRICIDADE OROFACIAL"},
  {sinan:"2523",code:"223840",desc:"FONOAUDIOLOGO EM SAUDE COLETIVA"},
  {sinan:"2524",code:"223845",desc:"FONOAUDIOLOGO EM VOZ"},
  {sinan:"2477",code:"223810",desc:"FONOAUDIOLOGO GERAL"},
  {sinan:"1641",code:"722105",desc:"FORJADOR"},
  {sinan:"1642",code:"722110",desc:"FORJADOR A MARTELO"},
  {sinan:"1643",code:"722115",desc:"FORJADOR PRENSISTA"},
  {sinan:"2208",code:"823315",desc:"FORNEIRO (MATERIAIS DE CONSTRUCAO)"},
  {sinan:"2185",code:"822105",desc:"FORNEIRO DE CUBILO"},
  {sinan:"2186",code:"822110",desc:"FORNEIRO DE FORNO-POCO"},
  {sinan:"2187",code:"822115",desc:"FORNEIRO DE FUNDICAO (FORNO DE REDUCAO)"},
  {sinan:"2188",code:"822120",desc:"FORNEIRO DE REAQUECIMENTO E TRATAMENTO TERMICO NA METALURGIA"},
  {sinan:"2189",code:"822125",desc:"FORNEIRO DE REVERBERO"},
  {sinan:"2157",code:"821205",desc:"FORNEIRO E OPERADOR (ALTO-FORNO)"},
  {sinan:"2158",code:"821210",desc:"FORNEIRO E OPERADOR (CONVERSOR A OXIGENIO)"},
  {sinan:"2159",code:"821215",desc:"FORNEIRO E OPERADOR (FORNO ELETRICO)"},
  {sinan:"2160",code:"821220",desc:"FORNEIRO E OPERADOR (REFINO DE METAIS NAO-FERROSOS)"},
  {sinan:"2161",code:"821225",desc:"FORNEIRO E OPERADOR DE FORNO DE REDUCAO DIRETA"},
  {sinan:"2198",code:"823215",desc:"FORNEIRO NA FUNDICAO DE VIDRO"},
  {sinan:"2199",code:"823220",desc:"FORNEIRO NO RECOZIMENTO DE VIDRO"},
  {sinan:"1666",code:"723210",desc:"FOSFATIZADOR"},
  {sinan:"676",code:"261805",desc:"FOTOGRAFO"},
  {sinan:"677",code:"261810",desc:"FOTOGRAFO PUBLICITARIO"},
  {sinan:"678",code:"261815",desc:"FOTOGRAFO RETRATISTA"},
  {sinan:"1300",code:"521135",desc:"FRENTISTA"},
  {sinan:"1878",code:"762120",desc:"FULONEIRO"},
  {sinan:"1885",code:"762310",desc:"FULONEIRO NO ACABAMENTO DE COUROS E PELES"},
  {sinan:"1787",code:"751110",desc:"FUNDIDOR (JOALHERIA E OURIVESARIA)"},
  {sinan:"1644",code:"722205",desc:"FUNDIDOR DE METAIS"},
  {sinan:"2408",code:"991305",desc:"FUNILEIRO DE VEICULOS (REPARACAO)"},
  {sinan:"1703",code:"724435",desc:"FUNILEIRO INDUSTRIAL"},
  {sinan:"1667",code:"723215",desc:"GALVANIZADOR"},
  {sinan:"1286",code:"519920",desc:"GANDULA"},
  {sinan:"1211",code:"514110",desc:"GARAGISTA"},
  {sinan:"1203",code:"513405",desc:"GARCOM"},
  {sinan:"1204",code:"513410",desc:"GARCOM (SERVICOS DE VINHOS)"},
  {sinan:"1216",code:"514215",desc:"GARI"},
  {sinan:"1527",code:"711405",desc:"GARIMPEIRO"},
  {sinan:"1444",code:"631405",desc:"GELADOR INDUSTRIAL"},
  {sinan:"1445",code:"631410",desc:"GELADOR PROFISSIONAL"},
  {sinan:"159",code:"201115",desc:"GENETICISTA"},
  {sinan:"235",code:"213415",desc:"GEOFISICO"},
  {sinan:"231",code:"213310",desc:"GEOFISICO ESPACIAL"},
  {sinan:"592",code:"251305",desc:"GEOGRAFO"},
  {sinan:"233",code:"213405",desc:"GEOLOGO"},
  {sinan:"234",code:"213410",desc:"GEOLOGO DE ENGENHARIA"},
  {sinan:"236",code:"213420",desc:"GEOQUIMICO"},
  {sinan:"137",code:"142105",desc:"GERENTE ADMINISTRATIVO"},
  {sinan:"142",code:"142305",desc:"GERENTE COMERCIAL"},
  {sinan:"920",code:"342520",desc:"GERENTE DA ADMINISTRACAO DE AEROPORTOS"},
  {sinan:"131",code:"141710",desc:"GERENTE DE AGENCIA"},
  {sinan:"148",code:"142415",desc:"GERENTE DE ALMOXARIFADO"},
  {sinan:"125",code:"141515",desc:"GERENTE DE BAR"},
  {sinan:"132",code:"141715",desc:"GERENTE DE CAMBIO E COMERCIO EXTERIOR"},
  {sinan:"627",code:"253205",desc:"GERENTE DE CAPTACAO (FUNDOS E INVESTIMENTOS INSTITUCIONAIS)"},
  {sinan:"628",code:"253210",desc:"GERENTE DE CLIENTES ESPECIAIS (PRIVATE)"},
  {sinan:"146",code:"142405",desc:"GERENTE DE COMPRAS"},
  {sinan:"143",code:"142310",desc:"GERENTE DE COMUNICACAO"},
  {sinan:"629",code:"253215",desc:"GERENTE DE CONTAS - PESSOA FISICA E JURIDICA"},
  {sinan:"133",code:"141720",desc:"GERENTE DE CREDITO E COBRANCA"},
  {sinan:"134",code:"141725",desc:"GERENTE DE CREDITO IMOBILIARIO"},
  {sinan:"135",code:"141730",desc:"GERENTE DE CREDITO RURAL"},
  {sinan:"141",code:"142210",desc:"GERENTE DE DEPARTAMENTO PESSOAL"},
  {sinan:"150",code:"142510",desc:"GERENTE DE DESENVOLVIMENTO DE SISTEMAS"},
  {sinan:"921",code:"342525",desc:"GERENTE DE EMPRESA AEREA EM AEROPORTOS"},
  {sinan:"630",code:"253220",desc:"GERENTE DE GRANDES CONTAS (CORPORATE)"},
  {sinan:"123",code:"141505",desc:"GERENTE DE HOTEL"},
  {sinan:"111",code:"131315",desc:"GERENTE DE INSTITUICAO EDUCACIONAL DA AREA PRIVADA"},
  {sinan:"129",code:"141615",desc:"GERENTE DE LOGISTICA (ARMAZENAGEM E DISTRIBUICAO)"},
  {sinan:"121",code:"141415",desc:"GERENTE DE LOJA E SUPERMERCADO"},
  {sinan:"144",code:"142315",desc:"GERENTE DE MARKETING"},
  {sinan:"128",code:"141610",desc:"GERENTE DE OPERACOES DE CORREIOS E TELECOMUNICACOES"},
  {sinan:"122",code:"141420",desc:"GERENTE DE OPERACOES DE SERVICOS DE ASSISTENCIA TECNICA"},
  {sinan:"127",code:"141605",desc:"GERENTE DE OPERACOES DE TRANSPORTES"},
  {sinan:"126",code:"141520",desc:"GERENTE DE PENSAO"},
  {sinan:"155",code:"142605",desc:"GERENTE DE PESQUISA E DESENVOLVIMENTO (P&D)"},
  {sinan:"151",code:"142515",desc:"GERENTE DE PRODUCAO DE TECNOLOGIA DA INFORMACAO"},
  {sinan:"117",code:"141205",desc:"GERENTE DE PRODUCAO E OPERACOES"},
  {sinan:"115",code:"141115",desc:"GERENTE DE PRODUCAO E OPERACOES AGROPECUARIAS"},
  {sinan:"113",code:"141105",desc:"GERENTE DE PRODUCAO E OPERACOES AQUICOLAS"},
  {sinan:"118",code:"141305",desc:"GERENTE DE PRODUCAO E OPERACOES DA CONSTRUCAO CIVIL E OBRAS PUBLICAS"},
  {sinan:"114",code:"141110",desc:"GERENTE DE PRODUCAO E OPERACOES FLORESTAIS"},
  {sinan:"116",code:"141120",desc:"GERENTE DE PRODUCAO E OPERACOES PESQUEIRAS"},
  {sinan:"130",code:"141705",desc:"GERENTE DE PRODUTOS BANCARIOS"},
  {sinan:"152",code:"142520",desc:"GERENTE DE PROJETOS DE TECNOLOGIA DA INFORMACAO"},
  {sinan:"156",code:"142705",desc:"GERENTE DE PROJETOS E SERVICOS DE MANUTENCAO"},
  {sinan:"136",code:"141735",desc:"GERENTE DE RECUPERACAO DE CREDITO"},
  {sinan:"140",code:"142205",desc:"GERENTE DE RECURSOS HUMANOS"},
  {sinan:"149",code:"142505",desc:"GERENTE DE REDE"},
  {sinan:"124",code:"141510",desc:"GERENTE DE RESTAURANTE"},
  {sinan:"138",code:"142110",desc:"GERENTE DE RISCOS"},
  {sinan:"153",code:"142525",desc:"GERENTE DE SEGURANCA DE TECNOLOGIA DA INFORMACAO"},
  {sinan:"105",code:"131115",desc:"GERENTE DE SERVICOS CULTURAIS"},
  {sinan:"108",code:"131210",desc:"GERENTE DE SERVICOS DE SAUDE"},
  {sinan:"112",code:"131320",desc:"GERENTE DE SERVICOS EDUCACIONAIS DA AREA PUBLICA"},
  {sinan:"106",code:"131120",desc:"GERENTE DE SERVICOS SOCIAIS"},
  {sinan:"154",code:"142530",desc:"GERENTE DE SUPORTE TECNICO DE TECNOLOGIA DA INFORMACAO"},
  {sinan:"147",code:"142410",desc:"GERENTE DE SUPRIMENTOS"},
  {sinan:"2537",code:"141525",desc:"GERENTE DE TURISMO"},
  {sinan:"145",code:"142320",desc:"GERENTE DE VENDAS"},
  {sinan:"139",code:"142115",desc:"GERENTE FINANCEIRO"},
  {sinan:"1590",code:"716405",desc:"GESSEIRO"},
  {sinan:"2622",code:"252605",desc:"GESTOR EM SEGURANCA"},
  {sinan:"38",code:"111230",desc:"GOVERNADOR DE ESTADO"},
  {sinan:"39",code:"111235",desc:"GOVERNADOR DO DISTRITO FEDERAL"},
  {sinan:"1192",code:"513115",desc:"GOVERNANTA DE HOTELARIA"},
  {sinan:"1788",code:"751115",desc:"GRAVADOR (JOALHERIA E OURIVESARIA)"},
  {sinan:"1537",code:"712210",desc:"GRAVADOR DE INSCRICOES EM PEDRA"},
  {sinan:"1935",code:"766135",desc:"GRAVADOR DE MATRIZ CALCOGRAFICA"},
  {sinan:"1931",code:"766115",desc:"GRAVADOR DE MATRIZ PARA FLEXOGRAFIA (CLICHERISTA)"},
  {sinan:"1934",code:"766130",desc:"GRAVADOR DE MATRIZ PARA ROTOGRAVURA (ELETROMECANICO E QUIMICO)"},
  {sinan:"1936",code:"766140",desc:"GRAVADOR DE MATRIZ SERIGRAFICA"},
  {sinan:"1538",code:"712215",desc:"GRAVADOR DE RELEVOS EM PEDRA"},
  {sinan:"1798",code:"752215",desc:"GRAVADOR DE VIDRO A AGUA-FORTE"},
  {sinan:"1799",code:"752220",desc:"GRAVADOR DE VIDRO A ESMERIL"},
  {sinan:"1800",code:"752225",desc:"GRAVADOR DE VIDRO A JATO DE AREIA"},
  {sinan:"1978",code:"768705",desc:"GRAVADOR,A MAO (ENCADERNACAO)"},
  {sinan:"2644",code:"517335",desc:"GUARDA PORTUARIO"},
  {sinan:"1263",code:"517215",desc:"GUARDA-CIVIL MUNICIPAL"},
  {sinan:"1202",code:"513325",desc:"GUARDA-ROUPEIRA DE CINEMA"},
  {sinan:"1287",code:"519925",desc:"GUARDADOR DE VEICULOS"},
  {sinan:"1185",code:"511405",desc:"GUIA DE TURISMO"},
  {sinan:"1448",code:"632005",desc:"GUIA FLORESTAL"},
  {sinan:"2046",code:"782205",desc:"GUINCHEIRO (CONSTRUCAO CIVIL)"},
  {sinan:"2251",code:"841444",desc:"HIDROGENADOR DE OLEOS E GORDURAS"},
  {sinan:"237",code:"213425",desc:"HIDROGEOLOGO"},
  {sinan:"1453",code:"632115",desc:"IDENTIFICADOR FLORESTAL"},
  {sinan:"2423",code:"998999",desc:"IGNORADA"},
  {sinan:"1001",code:"372110",desc:"ILUMINADOR (TELEVISAO)"},
  {sinan:"305",code:"215125",desc:"IMEDIATO DA MARINHA MERCANTE"},
  {sinan:"1987",code:"772110",desc:"IMPREGNADOR DE MADEIRA"},
  {sinan:"1940",code:"766205",desc:"IMPRESSOR (SERIGRAFIA)"},
  {sinan:"1941",code:"766210",desc:"IMPRESSOR CALCOGRAFICO"},
  {sinan:"1951",code:"766310",desc:"IMPRESSOR DE CORTE E VINCO"},
  {sinan:"1942",code:"766215",desc:"IMPRESSOR DE OFSETE (PLANO E ROTATIVO)"},
  {sinan:"1943",code:"766220",desc:"IMPRESSOR DE ROTATIVA"},
  {sinan:"1944",code:"766225",desc:"IMPRESSOR DE ROTOGRAVURA"},
  {sinan:"1945",code:"766230",desc:"IMPRESSOR DIGITAL"},
  {sinan:"1946",code:"766235",desc:"IMPRESSOR FLEXOGRAFICO"},
  {sinan:"1947",code:"766240",desc:"IMPRESSOR LETTERSET"},
  {sinan:"1948",code:"766245",desc:"IMPRESSOR TAMPOGRAFICO"},
  {sinan:"1949",code:"766250",desc:"IMPRESSOR TIPOGRAFICO"},
  {sinan:"1408",code:"623010",desc:"INSEMINADOR"},
  {sinan:"891",code:"334105",desc:"INSPETOR DE ALUNOS DE ESCOLA PRIVADA"},
  {sinan:"892",code:"334110",desc:"INSPETOR DE ALUNOS DE ESCOLA PUBLICA"},
  {sinan:"922",code:"342530",desc:"INSPETOR DE AVIACAO CIVIL"},
  {sinan:"1870",code:"761805",desc:"INSPETOR DE ESTAMPARIA (PRODUCAO TEXTIL)"},
  {sinan:"1080",code:"391205",desc:"INSPETOR DE QUALIDADE"},
  {sinan:"948",code:"351725",desc:"INSPETOR DE RISCO"},
  {sinan:"913",code:"342310",desc:"INSPETOR DE SERVICOS DE TRANSPORTES RODOVIARIOS (PASSAGEIROS E CARGAS)"},
  {sinan:"949",code:"351730",desc:"INSPETOR DE SINISTROS"},
  {sinan:"779",code:"314605",desc:"INSPETOR DE SOLDAGEM"},
  {sinan:"306",code:"215130",desc:"INSPETOR DE TERMINAL"},
  {sinan:"1503",code:"710215",desc:"INSPETOR DE TERRAPLENAGEM"},
  {sinan:"2404",code:"991110",desc:"INSPETOR DE VIA PERMANENTE (TRILHOS)"},
  {sinan:"307",code:"215135",desc:"INSPETOR NAVAL"},
  {sinan:"1301",code:"523105",desc:"INSTALADOR DE CORTINAS E PERSIANAS,PORTAS SANFONADAS E BOXE"},
  {sinan:"1576",code:"715710",desc:"INSTALADOR DE ISOLANTES ACUSTICOS"},
  {sinan:"1577",code:"715715",desc:"INSTALADOR DE ISOLANTES TERMICOS (REFRIGERACAO E CLIMATIZACAO)"},
  {sinan:"1578",code:"715720",desc:"INSTALADOR DE ISOLANTES TERMICOS DE CALDEIRA E TUBULACOES"},
  {sinan:"1761",code:"732120",desc:"INSTALADOR DE LINHAS ELETRICAS DE ALTA E BAIXA - TENSAO (REDE AEREA E SUBTERRANEA)"},
  {sinan:"1579",code:"715725",desc:"INSTALADOR DE MATERIAL ISOLANTE,A MAO (EDIFICACOES)"},
  {sinan:"1580",code:"715730",desc:"INSTALADOR DE MATERIAL ISOLANTE,A MAQUINA (EDIFICACOES)"},
  {sinan:"2390",code:"951305",desc:"INSTALADOR DE SISTEMAS ELETROELETRONICOS DE SEGURANCA"},
  {sinan:"1302",code:"523110",desc:"INSTALADOR DE SOM E ACESSORIOS DE VEICULOS"},
  {sinan:"1681",code:"724115",desc:"INSTALADOR DE TUBULACOES"},
  {sinan:"1682",code:"724120",desc:"INSTALADOR DE TUBULACOES (AERONAVES)"},
  {sinan:"1683",code:"724125",desc:"INSTALADOR DE TUBULACOES (EMBARCACOES)"},
  {sinan:"1684",code:"724130",desc:"INSTALADOR DE TUBULACOES DE GAS COMBUSTIVEL (PRODUCAO E DISTRIBUICAO)"},
  {sinan:"1685",code:"724135",desc:"INSTALADOR DE TUBULACOES DE VAPOR (PRODUCAO E DISTRIBUICAO)"},
  {sinan:"1762",code:"732125",desc:"INSTALADOR ELETRICISTA (TRACAO DE VEICULOS)"},
  {sinan:"1752",code:"731305",desc:"INSTALADOR-REPARADOR DE EQUIPAMENTOS DE COMUTACAO EM TELEFONIA"},
  {sinan:"1753",code:"731310",desc:"INSTALADOR-REPARADOR DE EQUIPAMENTOS DE ENERGIA EM TELEFONIA"},
  {sinan:"1754",code:"731315",desc:"INSTALADOR-REPARADOR DE EQUIPAMENTOS DE TRANSMISSAO EM TELEFONIA"},
  {sinan:"1755",code:"731320",desc:"INSTALADOR-REPARADOR DE LINHAS E APARELHOS DE TELECOMUNICACOES"},
  {sinan:"1756",code:"731325",desc:"INSTALADOR-REPARADOR DE REDES E CABOS TELEFONICOS"},
  {sinan:"1763",code:"732130",desc:"INSTALADOR-REPARADOR DE REDES TELEFONICAS E DE COMUNICACAO DE DADOS"},
  {sinan:"854",code:"322225",desc:"INSTRUMENTADOR CIRURGICO"},
  {sinan:"460",code:"233205",desc:"INSTRUTOR DE APRENDIZAGEM E TREINAMENTO AGROPECUARIO"},
  {sinan:"461",code:"233210",desc:"INSTRUTOR DE APRENDIZAGEM E TREINAMENTO INDUSTRIAL"},
  {sinan:"888",code:"333105",desc:"INSTRUTOR DE AUTO-ESCOLA"},
  {sinan:"889",code:"333110",desc:"INSTRUTOR DE CURSOS LIVRES"},
  {sinan:"317",code:"215315",desc:"INSTRUTOR DE VOO"},
  {sinan:"656",code:"261410",desc:"INTERPRETE"},
  {sinan:"2451",code:"261425",desc:"INTERPRETE DE LINGUA DE SINAIS"},
  {sinan:"953",code:"351810",desc:"INVESTIGADOR DE POLICIA"},
  {sinan:"1370",code:"622010",desc:"JARDINEIRO"},
  {sinan:"1783",code:"751010",desc:"JOALHEIRO"},
  {sinan:"1784",code:"751015",desc:"JOALHEIRO (REPARACOES)"},
  {sinan:"1060",code:"377130",desc:"JOQUEI"},
  {sinan:"1306",code:"524210",desc:"JORNALEIRO (EM BANCA DE JORNAL)"},
  {sinan:"646",code:"261125",desc:"JORNALISTA"},
  {sinan:"51",code:"111340",desc:"JUIZ AUDITOR ESTADUAL - JUSTICA MILITAR"},
  {sinan:"50",code:"111335",desc:"JUIZ AUDITOR FEDERAL - JUSTICA MILITAR"},
  {sinan:"48",code:"111325",desc:"JUIZ DE DIREITO"},
  {sinan:"52",code:"111345",desc:"JUIZ DO TRABALHO"},
  {sinan:"49",code:"111330",desc:"JUIZ FEDERAL"},
  {sinan:"1128",code:"415125",desc:"KARDEXISTA"},
  {sinan:"1955",code:"766405",desc:"LABORATORISTA FOTOGRAFICO"},
  {sinan:"1592",code:"716510",desc:"LADRILHEIRO"},
  {sinan:"2252",code:"841448",desc:"LAGAREIRO"},
  {sinan:"1789",code:"751120",desc:"LAMINADOR DE METAIS PRECIOSOS A MAO"},
  {sinan:"2129",code:"811745",desc:"LAMINADOR DE PLASTICO"},
  {sinan:"1785",code:"751020",desc:"LAPIDADOR (JOIAS)"},
  {sinan:"1801",code:"752230",desc:"LAPIDADOR DE VIDROS E CRISTAIS"},
  {sinan:"1239",code:"516305",desc:"LAVADEIRO,EM GERAL"},
  {sinan:"1241",code:"516315",desc:"LAVADOR DE ARTEFATOS DE TAPECARIA"},
  {sinan:"1288",code:"519930",desc:"LAVADOR DE GARRAFAS,VIDROS E OUTROS UTENSILIOS"},
  {sinan:"1828",code:"761110",desc:"LAVADOR DE LA"},
  {sinan:"2417",code:"992120",desc:"LAVADOR DE PECAS"},
  {sinan:"1248",code:"516405",desc:"LAVADOR DE ROUPAS"},
  {sinan:"1240",code:"516310",desc:"LAVADOR DE ROUPAS A MAQUINA"},
  {sinan:"1289",code:"519935",desc:"LAVADOR DE VEICULOS"},
  {sinan:"982",code:"354405",desc:"LEILOEIRO"},
  {sinan:"1290",code:"519940",desc:"LEITURISTA"},
  {sinan:"57",code:"113010",desc:"LIDER DE COMUNIDADE CAICARA"},
  {sinan:"1764",code:"732135",desc:"LIGADOR DE LINHAS TELEFONICAS"},
  {sinan:"1242",code:"516320",desc:"LIMPADOR A SECO,A MAQUINA"},
  {sinan:"2413",code:"991415",desc:"LIMPADOR DE FACHADAS"},
  {sinan:"2466",code:"514330",desc:"LIMPADOR DE PISCINAS"},
  {sinan:"1249",code:"516410",desc:"LIMPADOR DE ROUPAS A SECO,A MAO"},
  {sinan:"1217",code:"514220",desc:"LIMPADOR DE VIDROS"},
  {sinan:"1645",code:"722210",desc:"LINGOTADOR"},
  {sinan:"657",code:"261415",desc:"LINGUISTA"},
  {sinan:"1973",code:"768610",desc:"LINOTIPISTA"},
  {sinan:"1886",code:"762315",desc:"LIXADOR DE COUROS E PELES"},
  {sinan:"1148",code:"421315",desc:"LOCALIZADOR (COBRADOR)"},
  {sinan:"672",code:"261715",desc:"LOCUTOR DE RADIO E TELEVISAO"},
  {sinan:"673",code:"261720",desc:"LOCUTOR PUBLICITARIO DE RADIO E TELEVISAO"},
  {sinan:"2380",code:"919115",desc:"LUBRIFICADOR DE EMBARCACOES"},
  {sinan:"2379",code:"919110",desc:"LUBRIFICADOR DE VEICULOS AUTOMOTORES (EXCETO EMBARCACOES)"},
  {sinan:"2378",code:"919105",desc:"LUBRIFICADOR INDUSTRIAL"},
  {sinan:"421",code:"224110",desc:"LUDOMOTRICISTA"},
  {sinan:"2019",code:"775115",desc:"LUSTRADOR DE PECAS DE MADEIRA"},
  {sinan:"1594",code:"716520",desc:"LUSTRADOR DE PISO"},
  {sinan:"2375",code:"915215",desc:"LUTHIER (RESTAURACAO DE CORDAS ARCADAS)"},
  {sinan:"1651",code:"722305",desc:"MACHEIRO,A MAO"},
  {sinan:"1652",code:"722310",desc:"MACHEIRO,A MAQUINA"},
  {sinan:"1238",code:"516215",desc:"MAE SOCIAL"},
  {sinan:"2308",code:"848520",desc:"MAGAREFE"},
  {sinan:"1042",code:"376235",desc:"MAGICO"},
  {sinan:"1174",code:"510135",desc:"MAITRE"},
  {sinan:"21",code:"030110",desc:"MAJOR BOMBEIRO MILITAR"},
  {sinan:"12",code:"020115",desc:"MAJOR DA POLICIA MILITAR"},
  {sinan:"1043",code:"376240",desc:"MALABARISTA"},
  {sinan:"2271",code:"841725",desc:"MALTEIRO (GERMINACAO)"},
  {sinan:"1231",code:"516120",desc:"MANICURE"},
  {sinan:"2073",code:"783110",desc:"MANOBRADOR"},
  {sinan:"2296",code:"848215",desc:"MANTEIGUEIRO NA FABRICACAO DE LATICINIO"},
  {sinan:"2407",code:"991205",desc:"MANTENEDOR DE EQUIPAMENTOS DE PARQUES DE DIVERSOES E SIMILARES"},
  {sinan:"2391",code:"951310",desc:"MANTENEDOR DE SISTEMAS ELETROELETRONICOS DE SEGURANCA"},
  {sinan:"1984",code:"771115",desc:"MAQUETISTA NA MARCENARIA"},
  {sinan:"1232",code:"516125",desc:"MAQUIADOR"},
  {sinan:"1233",code:"516130",desc:"MAQUIADOR DE CARACTERIZACAO"},
  {sinan:"1023",code:"374210",desc:"MAQUINISTA DE CINEMA E VIDEO"},
  {sinan:"2320",code:"862110",desc:"MAQUINISTA DE EMBARCACOES"},
  {sinan:"1024",code:"374215",desc:"MAQUINISTA DE TEATRO E ESPETACULOS"},
  {sinan:"2059",code:"782610",desc:"MAQUINISTA DE TREM"},
  {sinan:"2060",code:"782615",desc:"MAQUINISTA DE TREM METROPOLITANO"},
  {sinan:"1906",code:"763315",desc:"MARCADOR DE PECAS CONFECCIONADAS PARA BORDAR"},
  {sinan:"2177",code:"821415",desc:"MARCADOR DE PRODUTOS (SIDERURGICO E METALURGICO)"},
  {sinan:"1982",code:"771105",desc:"MARCENEIRO"},
  {sinan:"2020",code:"775120",desc:"MARCHETEIRO"},
  {sinan:"2064",code:"782705",desc:"MARINHEIRO DE CONVES (MARITIMO E FLUVIARIO)"},
  {sinan:"2472",code:"782725",desc:"MARINHEIRO DE ESPORTE E RECREIO"},
  {sinan:"2065",code:"782710",desc:"MARINHEIRO DE MAQUINAS"},
  {sinan:"1595",code:"716525",desc:"MARMORISTA (CONSTRUCAO)"},
  {sinan:"1234",code:"516135",desc:"MASSAGISTA"},
  {sinan:"2299",code:"848315",desc:"MASSEIRO (MASSAS ALIMENTICIAS)"},
  {sinan:"2453",code:"322120",desc:"MASSOTERAPEUTA"},
  {sinan:"198",code:"211115",desc:"MATEMATICO"},
  {sinan:"199",code:"211120",desc:"MATEMATICO APLICADO"},
  {sinan:"1887",code:"762320",desc:"MATIZADOR DE COUROS E PELES"},
  {sinan:"2361",code:"914105",desc:"MECANICO DE MANUTENCAO DE AERONAVES,EM GERAL"},
  {sinan:"2357",code:"913105",desc:"MECANICO DE MANUTENCAO DE APARELHOS DE LEVANTAMENTO"},
  {sinan:"2382",code:"919305",desc:"MECANICO DE MANUTENCAO DE APARELHOS ESPORTIVOS E DE GINASTICA"},
  {sinan:"2365",code:"914405",desc:"MECANICO DE MANUTENCAO DE AUTOMOVEIS,MOTOCICLETAS E VEICULOS SIMILARES"},
  {sinan:"2383",code:"919310",desc:"MECANICO DE MANUTENCAO DE BICICLETAS E VEICULOS SIMILARES"},
  {sinan:"2344",code:"911105",desc:"MECANICO DE MANUTENCAO DE BOMBA INJETORA (EXCETO DE VEICULOS AUTOMOTORES)"},
  {sinan:"2345",code:"911110",desc:"MECANICO DE MANUTENCAO DE BOMBAS"},
  {sinan:"2346",code:"911115",desc:"MECANICO DE MANUTENCAO DE COMPRESSORES DE AR"},
  {sinan:"2366",code:"914410",desc:"MECANICO DE MANUTENCAO DE EMPILHADEIRAS E OUTROS VEICULOS DE CARGAS LEVES"},
  {sinan:"2358",code:"913110",desc:"MECANICO DE MANUTENCAO DE EQUIPAMENTO DE MINERACAO"},
  {sinan:"2398",code:"954120",desc:"MECANICO DE MANUTENCAO DE INSTALACOES MECANICAS DE EDIFICIOS"},
  {sinan:"2359",code:"913115",desc:"MECANICO DE MANUTENCAO DE MAQUINAS AGRICOLAS"},
  {sinan:"2381",code:"919205",desc:"MECANICO DE MANUTENCAO DE MAQUINAS CORTADORAS DE GRAMA,ROCADEIRAS,MOTOSSERRAS E SIMILA"},
  {sinan:"2360",code:"913120",desc:"MECANICO DE MANUTENCAO DE MAQUINAS DE CONSTRUCAO E TERRAPLENAGEM"},
  {sinan:"2353",code:"911310",desc:"MECANICO DE MANUTENCAO DE MAQUINAS GRAFICAS"},
  {sinan:"2354",code:"911315",desc:"MECANICO DE MANUTENCAO DE MAQUINAS OPERATRIZES (LAVRA DE MADEIRA)"},
  {sinan:"2355",code:"911320",desc:"MECANICO DE MANUTENCAO DE MAQUINAS TEXTEIS"},
  {sinan:"2352",code:"911305",desc:"MECANICO DE MANUTENCAO DE MAQUINAS,EM GERAL"},
  {sinan:"2356",code:"911325",desc:"MECANICO DE MANUTENCAO DE MAQUINAS-FERRAMENTAS (USINAGEM DE METAIS)"},
  {sinan:"2367",code:"914415",desc:"MECANICO DE MANUTENCAO DE MOTOCICLETAS"},
  {sinan:"2347",code:"911120",desc:"MECANICO DE MANUTENCAO DE MOTORES DIESEL (EXCETO DE VEICULOS AUTOMOTORES)"},
  {sinan:"2363",code:"914205",desc:"MECANICO DE MANUTENCAO DE MOTORES E EQUIPAMENTOS NAVAIS"},
  {sinan:"2348",code:"911125",desc:"MECANICO DE MANUTENCAO DE REDUTORES"},
  {sinan:"2362",code:"914110",desc:"MECANICO DE MANUTENCAO DE SISTEMA HIDRAULICO DE AERONAVES (SERVICOS DE PISTA E HANGAR)"},
  {sinan:"2368",code:"914420",desc:"MECANICO DE MANUTENCAO DE TRATORES"},
  {sinan:"2349",code:"911130",desc:"MECANICO DE MANUTENCAO DE TURBINAS (EXCETO DE AERONAVES)"},
  {sinan:"2350",code:"911135",desc:"MECANICO DE MANUTENCAO DE TURBOCOMPRESSORES"},
  {sinan:"2364",code:"914305",desc:"MECANICO DE MANUTENCAO DE VEICULOS FERROVIARIOS"},
  {sinan:"2351",code:"911205",desc:"MECANICO DE MANUTENCAO E INSTALACAO DE APARELHOS DE CLIMATIZACAO E REFRIGERACAO"},
  {sinan:"1733",code:"725705",desc:"MECANICO DE REFRIGERACAO"},
  {sinan:"2369",code:"914425",desc:"MECANICO DE VEICULOS AUTOMOTORES A DIESEL (EXCETO TRATORES)"},
  {sinan:"895",code:"341115",desc:"MECANICO DE VOO"},
  {sinan:"1725",code:"725405",desc:"MECANICO MONTADOR DE MOTORES DE AERONAVES"},
  {sinan:"1726",code:"725410",desc:"MECANICO MONTADOR DE MOTORES DE EMBARCACOES"},
  {sinan:"1727",code:"725415",desc:"MECANICO MONTADOR DE MOTORES DE EXPLOSAO E DIESEL"},
  {sinan:"1728",code:"725420",desc:"MECANICO MONTADOR DE TURBOALIMENTADORES"},
  {sinan:"323",code:"223101",desc:"MEDICO ACUPUNTURISTA"},
  {sinan:"324",code:"223102",desc:"MEDICO ALERGISTA E IMUNOLOGISTA"},
  {sinan:"325",code:"223103",desc:"MEDICO ANATOMOPATOLOGISTA"},
  {sinan:"326",code:"223104",desc:"MEDICO ANESTESIOLOGISTA"},
  {sinan:"327",code:"223105",desc:"MEDICO ANGIOLOGISTA"},
  {sinan:"2480",code:"2231A1",desc:"MEDICO BRONCOESOFALOGISTA"},
  {sinan:"2608",code:"225290",desc:"MEDICO CANCEROLOGISTA CIRURGICO"},
  {sinan:"2485",code:"2231F6",desc:"MEDICO CANCEROLOGISTA CLINICO"},
  {sinan:"2569",code:"225122",desc:"MEDICO CANCEROLOGISTA PEDIATRICO"},
  {sinan:"328",code:"223106",desc:"MEDICO CARDIOLOGISTA"},
  {sinan:"2665",code:"2231G1",desc:"MEDICO CARDIOLOGISTA INTERVENCIONISTA"},
  {sinan:"329",code:"223107",desc:"MEDICO CIRURGIAO CARDIOVASCULAR"},
  {sinan:"2609",code:"225295",desc:"MEDICO CIRURGIAO DA MAO"},
  {sinan:"330",code:"223108",desc:"MEDICO CIRURGIAO DE CABECA E PESCOCO"},
  {sinan:"331",code:"223109",desc:"MEDICO CIRURGIAO DO APARELHO DIGESTIVO"},
  {sinan:"332",code:"223110",desc:"MEDICO CIRURGIAO GERAL"},
  {sinan:"333",code:"223111",desc:"MEDICO CIRURGIAO PEDIATRICO"},
  {sinan:"334",code:"223112",desc:"MEDICO CIRURGIAO PLASTICO"},
  {sinan:"335",code:"223113",desc:"MEDICO CIRURGIAO TORACICO"},
  {sinan:"2482",code:"2231F3",desc:"MEDICO CIRURGIAO VASCULAR"},
  {sinan:"336",code:"223114",desc:"MEDICO CITOPATOLOGISTA"},
  {sinan:"337",code:"223115",desc:"MEDICO CLINICO"},
  {sinan:"2606",code:"225280",desc:"MEDICO COLOPROCTOLOGISTA"},
  {sinan:"2579",code:"225142",desc:"MEDICO DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"338",code:"223116",desc:"MEDICO DE SAUDE DA FAMILIA"},
  {sinan:"339",code:"223117",desc:"MEDICO DERMATOLOGISTA"},
  {sinan:"340",code:"223118",desc:"MEDICO DO TRABALHO"},
  {sinan:"2592",code:"225203",desc:"MEDICO EM CIRURGIA VASCULAR"},
  {sinan:"341",code:"223119",desc:"MEDICO EM ELETROENCEFALOGRAFIA"},
  {sinan:"342",code:"223120",desc:"MEDICO EM ENDOSCOPIA"},
  {sinan:"2486",code:"2231F7",desc:"MEDICO EM MEDICINA DE FAMILIA E COMUNIDADE"},
  {sinan:"343",code:"223121",desc:"MEDICO EM MEDICINA DE TRAFEGO"},
  {sinan:"344",code:"223122",desc:"MEDICO EM MEDICINA INTENSIVA"},
  {sinan:"345",code:"223123",desc:"MEDICO EM MEDICINA NUCLEAR"},
  {sinan:"2487",code:"2231F8",desc:"MEDICO EM MEDICINA PREVENTIVA E SOCIAL"},
  {sinan:"346",code:"223124",desc:"MEDICO EM RADIOLOGIA E DIAGNOSTICO POR IMAGEM"},
  {sinan:"347",code:"223125",desc:"MEDICO ENDOCRINOLOGISTA E METABOLOGISTA"},
  {sinan:"348",code:"223126",desc:"MEDICO FISIATRA"},
  {sinan:"349",code:"223127",desc:"MEDICO FONIATRA"},
  {sinan:"350",code:"223128",desc:"MEDICO GASTROENTEROLOGISTA"},
  {sinan:"351",code:"223129",desc:"MEDICO GENERALISTA"},
  {sinan:"352",code:"223130",desc:"MEDICO GENETICISTA"},
  {sinan:"353",code:"223131",desc:"MEDICO GERIATRA"},
  {sinan:"354",code:"223132",desc:"MEDICO GINECOLOGISTA E OBSTETRA"},
  {sinan:"2481",code:"2231A2",desc:"MEDICO HANSENOLOGISTA"},
  {sinan:"355",code:"223133",desc:"MEDICO HEMATOLOGISTA"},
  {sinan:"356",code:"223134",desc:"MEDICO HEMOTERAPEUTA"},
  {sinan:"2618",code:"225345",desc:"MEDICO HIPERBARISTA"},
  {sinan:"357",code:"223135",desc:"MEDICO HOMEOPATA"},
  {sinan:"358",code:"223136",desc:"MEDICO INFECTOLOGISTA"},
  {sinan:"359",code:"223137",desc:"MEDICO LEGISTA"},
  {sinan:"360",code:"223138",desc:"MEDICO MASTOLOGISTA"},
  {sinan:"361",code:"223139",desc:"MEDICO NEFROLOGISTA"},
  {sinan:"362",code:"223140",desc:"MEDICO NEUROCIRURGIAO"},
  {sinan:"363",code:"223141",desc:"MEDICO NEUROFISIOLOGISTA"},
  {sinan:"2619",code:"225350",desc:"MEDICO NEUROFISIOLOGISTA CLINICO"},
  {sinan:"364",code:"223142",desc:"MEDICO NEUROLOGISTA"},
  {sinan:"365",code:"223143",desc:"MEDICO NUTROLOGISTA"},
  {sinan:"366",code:"223144",desc:"MEDICO OFTALMOLOGISTA"},
  {sinan:"367",code:"223145",desc:"MEDICO ONCOLOGISTA"},
  {sinan:"2568",code:"225121",desc:"MEDICO ONCOLOGISTA CLINICO"},
  {sinan:"368",code:"223146",desc:"MEDICO ORTOPEDISTA E TRAUMATOLOGISTA"},
  {sinan:"369",code:"223147",desc:"MEDICO OTORRINOLARINGOLOGISTA"},
  {sinan:"2614",code:"225325",desc:"MEDICO PATOLOGISTA"},
  {sinan:"370",code:"223148",desc:"MEDICO PATOLOGISTA CLINICO"},
  {sinan:"2616",code:"225335",desc:"MEDICO PATOLOGISTA CLINICO / MEDICINA LABORATORIAL"},
  {sinan:"371",code:"223149",desc:"MEDICO PEDIATRA"},
  {sinan:"372",code:"223150",desc:"MEDICO PERITO"},
  {sinan:"373",code:"223151",desc:"MEDICO PNEUMOLOGISTA"},
  {sinan:"374",code:"223152",desc:"MEDICO PROCTOLOGISTA"},
  {sinan:"375",code:"223153",desc:"MEDICO PSIQUIATRA"},
  {sinan:"376",code:"223154",desc:"MEDICO RADIOTERAPEUTA"},
  {sinan:"2488",code:"2231F9",desc:"MEDICO RESIDENTE"},
  {sinan:"377",code:"223155",desc:"MEDICO REUMATOLOGISTA"},
  {sinan:"378",code:"223156",desc:"MEDICO SANITARISTA"},
  {sinan:"379",code:"223157",desc:"MEDICO UROLOGISTA"},
  {sinan:"398",code:"223305",desc:"MEDICO VETERINARIO"},
  {sinan:"58",code:"113015",desc:"MEMBRO DE LIDERANCA QUILOMBOLA"},
  {sinan:"37",code:"111225",desc:"MEMBRO SUPERIOR DO PODER EXECUTIVO"},
  {sinan:"2036",code:"781705",desc:"MERGULHADOR PROFISSIONAL (RASO E PROFUNDO)"},
  {sinan:"1606",code:"720105",desc:"MESTRE (AFIADOR DE FERRAMENTAS)"},
  {sinan:"1501",code:"710205",desc:"MESTRE (CONSTRUCAO CIVIL)"},
  {sinan:"1618",code:"720205",desc:"MESTRE (CONSTRUCAO NAVAL)"},
  {sinan:"1619",code:"720210",desc:"MESTRE (INDUSTRIA DE AUTOMOTORES E MATERIAL DE TRANSPORTES)"},
  {sinan:"2087",code:"810205",desc:"MESTRE (INDUSTRIA DE BORRACHA E PLASTICO)"},
  {sinan:"2214",code:"830105",desc:"MESTRE (INDUSTRIA DE CELULOSE,PAPEL E PAPELAO)"},
  {sinan:"1980",code:"770105",desc:"MESTRE (INDUSTRIA DE MADEIRA E MOBILIARIO)"},
  {sinan:"1620",code:"720215",desc:"MESTRE (INDUSTRIA DE MAQUINAS E OUTROS EQUIPAMENTOS MECANICOS)"},
  {sinan:"2085",code:"810105",desc:"MESTRE (INDUSTRIA PETROQUIMICA E CARBOQUIMICA)"},
  {sinan:"1819",code:"760125",desc:"MESTRE (INDUSTRIA TEXTIL E DE CONFECCOES)"},
  {sinan:"1981",code:"770110",desc:"MESTRE CARPINTEIRO"},
  {sinan:"2149",code:"820110",desc:"MESTRE DE ACIARIA"},
  {sinan:"2150",code:"820115",desc:"MESTRE DE ALTO-FORNO"},
  {sinan:"898",code:"341210",desc:"MESTRE DE CABOTAGEM"},
  {sinan:"1607",code:"720110",desc:"MESTRE DE CALDEIRARIA"},
  {sinan:"1621",code:"720220",desc:"MESTRE DE CONSTRUCAO DE FORNOS"},
  {sinan:"1608",code:"720115",desc:"MESTRE DE FERRAMENTARIA"},
  {sinan:"1609",code:"720120",desc:"MESTRE DE FORJARIA"},
  {sinan:"2151",code:"820120",desc:"MESTRE DE FORNO ELETRICO"},
  {sinan:"1610",code:"720125",desc:"MESTRE DE FUNDICAO"},
  {sinan:"1611",code:"720130",desc:"MESTRE DE GALVANOPLASTIA"},
  {sinan:"2152",code:"820125",desc:"MESTRE DE LAMINACAO"},
  {sinan:"1502",code:"710210",desc:"MESTRE DE LINHAS (FERROVIAS)"},
  {sinan:"1612",code:"720135",desc:"MESTRE DE PINTURA (TRATAMENTO DE SUPERFICIES)"},
  {sinan:"2088",code:"810305",desc:"MESTRE DE PRODUCAO FARMACEUTICA"},
  {sinan:"2086",code:"810110",desc:"MESTRE DE PRODUCAO QUIMICA"},
  {sinan:"2148",code:"820105",desc:"MESTRE DE SIDERURGIA"},
  {sinan:"1613",code:"720140",desc:"MESTRE DE SOLDAGEM"},
  {sinan:"1614",code:"720145",desc:"MESTRE DE TREFILACAO DE METAIS"},
  {sinan:"1615",code:"720150",desc:"MESTRE DE USINAGEM"},
  {sinan:"899",code:"341215",desc:"MESTRE FLUVIAL"},
  {sinan:"1616",code:"720155",desc:"MESTRE SERRALHEIRO"},
  {sinan:"1669",code:"723225",desc:"METALIZADOR (BANHO QUENTE)"},
  {sinan:"1668",code:"723220",desc:"METALIZADOR A PISTOLA"},
  {sinan:"232",code:"213315",desc:"METEOROLOGISTA"},
  {sinan:"957",code:"352305",desc:"METROLOGISTA"},
  {sinan:"1021",code:"374140",desc:"MICROFONISTA"},
  {sinan:"2503",code:"5152A1",desc:"MICROSCOPISTA"},
  {sinan:"1511",code:"711130",desc:"MINEIRO"},
  {sinan:"1363",code:"613415",desc:"MINHOCULTOR"},
  {sinan:"711",code:"263105",desc:"MINISTRO DE CULTO RELIGIOSO"},
  {sinan:"35",code:"111215",desc:"MINISTRO DE ESTADO"},
  {sinan:"45",code:"111310",desc:"MINISTRO DO SUPERIOR TRIBUNAL DE JUSTICA"},
  {sinan:"47",code:"111320",desc:"MINISTRO DO SUPERIOR TRIBUNAL DO TRABALHO"},
  {sinan:"46",code:"111315",desc:"MINISTRO DO SUPERIOR TRIBUNAL MILITAR"},
  {sinan:"44",code:"111305",desc:"MINISTRO DO SUPREMO TRIBUNAL FEDERAL"},
  {sinan:"712",code:"263110",desc:"MISSIONARIO"},
  {sinan:"2261",code:"841605",desc:"MISTURADOR DE CAFE"},
  {sinan:"2266",code:"841630",desc:"MISTURADOR DE CHA OU MATE"},
  {sinan:"2066",code:"782715",desc:"MOCO DE CONVES (MARITIMO E FLUVIARIO)"},
  {sinan:"2067",code:"782720",desc:"MOCO DE MAQUINAS (MARITIMO E FLUVIARIO)"},
  {sinan:"1983",code:"771110",desc:"MODELADOR DE MADEIRA"},
  {sinan:"1624",code:"721115",desc:"MODELADOR DE METAIS (FUNDICAO)"},
  {sinan:"833",code:"318815",desc:"MODELISTA DE CALCADOS"},
  {sinan:"832",code:"318810",desc:"MODELISTA DE ROUPAS"},
  {sinan:"1052",code:"376405",desc:"MODELO ARTISTICO"},
  {sinan:"1053",code:"376410",desc:"MODELO DE MODAS"},
  {sinan:"1054",code:"376415",desc:"MODELO PUBLICITARIO"},
  {sinan:"2263",code:"841615",desc:"MOEDOR DE CAFE"},
  {sinan:"2239",code:"841205",desc:"MOEDOR DE SAL"},
  {sinan:"1793",code:"752110",desc:"MOLDADOR (VIDROS)"},
  {sinan:"2200",code:"823230",desc:"MOLDADOR DE ABRASIVOS NA FABRICACAO DE CERAMICA,VIDRO E PORCELANA"},
  {sinan:"2130",code:"811750",desc:"MOLDADOR DE BORRACHA POR COMPRESSAO"},
  {sinan:"1558",code:"715310",desc:"MOLDADOR DE CORPOS DE PROVA EM USINAS DE CONCRETO"},
  {sinan:"2131",code:"811760",desc:"MOLDADOR DE PLASTICO POR COMPRESSAO"},
  {sinan:"2132",code:"811770",desc:"MOLDADOR DE PLASTICO POR INJECAO"},
  {sinan:"1653",code:"722315",desc:"MOLDADOR,A MAO"},
  {sinan:"1654",code:"722320",desc:"MOLDADOR,A MAQUINA"},
  {sinan:"2091",code:"811105",desc:"MOLEIRO (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2236",code:"841105",desc:"MOLEIRO DE CEREAIS (EXCETO ARROZ)"},
  {sinan:"2237",code:"841110",desc:"MOLEIRO DE ESPECIARIAS"},
  {sinan:"1529",code:"712105",desc:"MOLEIRO DE MINERIOS"},
  {sinan:"2469",code:"515315",desc:"MONITOR DE DEPENDENTE QUIMICO"},
  {sinan:"1156",code:"422215",desc:"MONITOR DE TELEATENDIMENTO"},
  {sinan:"2635",code:"334115",desc:"MONITOR DE TRANSPORTE ESCOLAR"},
  {sinan:"1974",code:"768615",desc:"MONOTIPISTA"},
  {sinan:"1571",code:"715545",desc:"MONTADOR DE ANDAIMES (EDIFICACOES)"},
  {sinan:"1928",code:"765315",desc:"MONTADOR DE ARTEFATOS DE COURO (EXCETO ROUPAS E CALCADOS)"},
  {sinan:"2384",code:"919315",desc:"MONTADOR DE BICICLETAS"},
  {sinan:"1915",code:"764210",desc:"MONTADOR DE CALCADOS"},
  {sinan:"1721",code:"725305",desc:"MONTADOR DE EQUIPAMENTO DE LEVANTAMENTO"},
  {sinan:"1741",code:"731135",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS"},
  {sinan:"1738",code:"731120",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (APARELHOS ELETRODOMESTICOS)"},
  {sinan:"1739",code:"731125",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (CENTRAIS ELETRICAS)"},
  {sinan:"1745",code:"731155",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (ELEVADORES E EQUIPAMENTOS SIMILARES)"},
  {sinan:"1737",code:"731115",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (INSTRUMENTOS DE MEDICAO)"},
  {sinan:"1740",code:"731130",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (MOTORES E DINAMOS)"},
  {sinan:"1746",code:"731160",desc:"MONTADOR DE EQUIPAMENTOS ELETRICOS (TRANSFORMADORES)"},
  {sinan:"1744",code:"731150",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS"},
  {sinan:"1735",code:"731105",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS (APARELHOS MEDICOS)"},
  {sinan:"1736",code:"731110",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS (COMPUTADORES E EQUIPAMENTOS AUXILIARES)"},
  {sinan:"1751",code:"731205",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS (ESTACAO DE RADIO,TV E EQUIPAMENTOS DE RADAR)"},
  {sinan:"1742",code:"731140",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS (INSTALACOES DE SINALIZACAO)"},
  {sinan:"1743",code:"731145",desc:"MONTADOR DE EQUIPAMENTOS ELETRONICOS (MAQUINAS INDUSTRIAIS)"},
  {sinan:"1731",code:"725605",desc:"MONTADOR DE ESTRUTURAS DE AERONAVES"},
  {sinan:"1686",code:"724205",desc:"MONTADOR DE ESTRUTURAS METALICAS"},
  {sinan:"1687",code:"724210",desc:"MONTADOR DE ESTRUTURAS METALICAS DE EMBARCACOES"},
  {sinan:"1030",code:"374420",desc:"MONTADOR DE FILMES"},
  {sinan:"1933",code:"766125",desc:"MONTADOR DE FOTOLITO (ANALOGICO E DIGITAL)"},
  {sinan:"1768",code:"741110",desc:"MONTADOR DE INSTRUMENTOS DE OPTICA"},
  {sinan:"1769",code:"741115",desc:"MONTADOR DE INSTRUMENTOS DE PRECISAO"},
  {sinan:"1716",code:"725205",desc:"MONTADOR DE MAQUINAS"},
  {sinan:"1722",code:"725310",desc:"MONTADOR DE MAQUINAS AGRICOLAS"},
  {sinan:"1723",code:"725315",desc:"MONTADOR DE MAQUINAS DE MINAS E PEDREIRAS"},
  {sinan:"1724",code:"725320",desc:"MONTADOR DE MAQUINAS DE TERRAPLENAGEM"},
  {sinan:"1717",code:"725210",desc:"MONTADOR DE MAQUINAS GRAFICAS"},
  {sinan:"1718",code:"725215",desc:"MONTADOR DE MAQUINAS OPERATRIZES PARA MADEIRA"},
  {sinan:"1719",code:"725220",desc:"MONTADOR DE MAQUINAS TEXTEIS"},
  {sinan:"1715",code:"725105",desc:"MONTADOR DE MAQUINAS,MOTORES E ACESSORIOS (MONTAGEM EM SERIE)"},
  {sinan:"1720",code:"725225",desc:"MONTADOR DE MAQUINAS-FERRAMENTAS (USINAGEM DE METAIS)"},
  {sinan:"2016",code:"774105",desc:"MONTADOR DE MOVEIS E ARTEFATOS DE MADEIRA"},
  {sinan:"1732",code:"725610",desc:"MONTADOR DE SISTEMAS DE COMBUSTIVEL DE AERONAVES"},
  {sinan:"1729",code:"725505",desc:"MONTADOR DE VEICULOS (LINHA DE MONTAGEM)"},
  {sinan:"2409",code:"991310",desc:"MONTADOR DE VEICULOS (REPARACAO)"},
  {sinan:"1191",code:"513110",desc:"MORDOMO DE HOTELARIA"},
  {sinan:"1190",code:"513105",desc:"MORDOMO DE RESIDENCIA"},
  {sinan:"1596",code:"716530",desc:"MOSAISTA"},
  {sinan:"1276",code:"519110",desc:"MOTOCICLISTA NO TRANSPORTE DE DOCUMENTOS E PEQUENOS VOLUMES"},
  {sinan:"2056",code:"782510",desc:"MOTORISTA DE CAMINHAO (ROTAS REGIONAIS E INTERNACIONAIS)"},
  {sinan:"2049",code:"782305",desc:"MOTORISTA DE CARRO DE PASSEIO"},
  {sinan:"2050",code:"782310",desc:"MOTORISTA DE FURGAO OU VEICULO SIMILAR"},
  {sinan:"2052",code:"782405",desc:"MOTORISTA DE ONIBUS RODOVIARIO"},
  {sinan:"2053",code:"782410",desc:"MOTORISTA DE ONIBUS URBANO"},
  {sinan:"2051",code:"782315",desc:"MOTORISTA DE TAXI"},
  {sinan:"2054",code:"782415",desc:"MOTORISTA DE TROLEBUS"},
  {sinan:"2057",code:"782515",desc:"MOTORISTA OPERACIONAL DE GUINCHO"},
  {sinan:"2061",code:"782620",desc:"MOTORNEIRO"},
  {sinan:"654",code:"261310",desc:"MUSEOLOGO"},
  {sinan:"699",code:"262610",desc:"MUSICO ARRANJADOR"},
  {sinan:"702",code:"262705",desc:"MUSICO INTERPRETE CANTOR"},
  {sinan:"703",code:"262710",desc:"MUSICO INTERPRETE INSTRUMENTISTA"},
  {sinan:"700",code:"262615",desc:"MUSICO REGENTE"},
  {sinan:"701",code:"262620",desc:"MUSICOLOGO"},
  {sinan:"2558",code:"223915",desc:"MUSICOTERAPEUTA"},
  {sinan:"674",code:"261725",desc:"NARRADOR EM PROGRAMAS DE RADIO E TELEVISAO"},
  {sinan:"602",code:"251545",desc:"NEUROPSICOLOGO"},
  {sinan:"1661",code:"723110",desc:"NORMALIZADOR DE METAIS E DE COMPOSITOS"},
  {sinan:"1255",code:"516710",desc:"NUMEROLOGO"},
  {sinan:"419",code:"223710",desc:"NUTRICIONISTA"},
  {sinan:"2433",code:"213440",desc:"OCEANOGRAFO"},
  {sinan:"4",code:"010205",desc:"OFICIAL DA AERONAUTICA"},
  {sinan:"6",code:"010215",desc:"OFICIAL DA MARINHA"},
  {sinan:"2662",code:"242905",desc:"OFICIAL DE INTELIGENCIA"},
  {sinan:"938",code:"351425",desc:"OFICIAL DE JUSTICA"},
  {sinan:"308",code:"215140",desc:"OFICIAL DE QUARTO DE NAVEGACAO DA MARINHA MERCANTE"},
  {sinan:"560",code:"241305",desc:"OFICIAL DE REGISTRO DE CONTRATOS MARITIMOS"},
  {sinan:"5",code:"010210",desc:"OFICIAL DO EXERCITO"},
  {sinan:"561",code:"241310",desc:"OFICIAL DO REGISTRO CIVIL DE PESSOAS JURIDICAS"},
  {sinan:"562",code:"241315",desc:"OFICIAL DO REGISTRO CIVIL DE PESSOAS NATURAIS"},
  {sinan:"563",code:"241320",desc:"OFICIAL DO REGISTRO DE DISTRIBUICOES"},
  {sinan:"564",code:"241325",desc:"OFICIAL DO REGISTRO DE IMOVEIS"},
  {sinan:"565",code:"241330",desc:"OFICIAL DO REGISTRO DE TITULOS E DOCUMENTOS"},
  {sinan:"1",code:"010105",desc:"OFICIAL GENERAL DA AERONAUTICA"},
  {sinan:"3",code:"010115",desc:"OFICIAL GENERAL DA MARINHA"},
  {sinan:"2",code:"010110",desc:"OFICIAL GENERAL DO EXERCITO"},
  {sinan:"311",code:"215205",desc:"OFICIAL SUPERIOR DE MAQUINAS DA MARINHA MERCANTE"},
  {sinan:"2663",code:"242910",desc:"OFICIAL TECNICO DE INTELIGENCIA"},
  {sinan:"2212",code:"828105",desc:"OLEIRO (FABRICACAO DE TELHAS)"},
  {sinan:"2213",code:"828110",desc:"OLEIRO (FABRICACAO DE TIJOLOS)"},
  {sinan:"1829",code:"761205",desc:"OPERADOR DE ABERTURA (FIACAO)"},
  {sinan:"1952",code:"766315",desc:"OPERADOR DE ACABAMENTO (INDUSTRIA GRAFICA)"},
  {sinan:"1646",code:"722215",desc:"OPERADOR DE ACABAMENTO DE PECAS FUNDIDAS"},
  {sinan:"2162",code:"821230",desc:"OPERADOR DE ACIARIA (BASCULAMENTO DE CONVERTEDOR)"},
  {sinan:"2163",code:"821235",desc:"OPERADOR DE ACIARIA (DESSULFURACAO DE GUSA)"},
  {sinan:"2164",code:"821240",desc:"OPERADOR DE ACIARIA (RECEBIMENTO DE GUSA)"},
  {sinan:"2108",code:"811415",desc:"OPERADOR DE ALAMBIQUE DE FUNCIONAMENTO CONTINUO (PRODUTOS QUIMICOS,EXCETO PETROLEO)"},
  {sinan:"1530",code:"712110",desc:"OPERADOR DE APARELHO DE FLOTACAO"},
  {sinan:"1531",code:"712115",desc:"OPERADOR DE APARELHO DE PRECIPITACAO (MINAS DE OURO OU PRATA)"},
  {sinan:"2109",code:"811420",desc:"OPERADOR DE APARELHO DE REACAO E CONVERSAO (PRODUTOS QUIMICOS,EXCETO PETROLEO)"},
  {sinan:"2165",code:"821245",desc:"OPERADOR DE AREA DE CORRIDA"},
  {sinan:"923",code:"342535",desc:"OPERADOR DE ATENDIMENTO AEROVIARIO"},
  {sinan:"2196",code:"823135",desc:"OPERADOR DE ATOMIZADOR"},
  {sinan:"1005",code:"373105",desc:"OPERADOR DE AUDIO DE CONTINUIDADE (RADIO)"},
  {sinan:"2201",code:"823235",desc:"OPERADOR DE BANHO METALICO DE VIDRO POR FLUTUACAO"},
  {sinan:"1542",code:"715105",desc:"OPERADOR DE BATE-ESTACAS"},
  {sinan:"2321",code:"862115",desc:"OPERADOR DE BATERIA DE GAS DE HULHA"},
  {sinan:"1560",code:"715405",desc:"OPERADOR DE BETONEIRA"},
  {sinan:"1830",code:"761210",desc:"OPERADOR DE BINADEIRA"},
  {sinan:"1831",code:"761215",desc:"OPERADOR DE BOBINADEIRA"},
  {sinan:"2178",code:"821420",desc:"OPERADOR DE BOBINADEIRA DE TIRAS A QUENTE,NO ACABAMENTO DE CHAPAS E METAIS"},
  {sinan:"1561",code:"715410",desc:"OPERADOR DE BOMBA DE CONCRETO"},
  {sinan:"2216",code:"831110",desc:"OPERADOR DE BRANQUEADOR DE PASTA PARA FABRICACAO DE PAPEL"},
  {sinan:"2093",code:"811115",desc:"OPERADOR DE BRITADEIRA (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2114",code:"811605",desc:"OPERADOR DE BRITADOR DE COQUE"},
  {sinan:"1532",code:"712120",desc:"OPERADOR DE BRITADOR DE MANDIBULAS"},
  {sinan:"2179",code:"821425",desc:"OPERADOR DE CABINE DE LAMINACAO (FIO-MAQUINA)"},
  {sinan:"1143",code:"421125",desc:"OPERADOR DE CAIXA"},
  {sinan:"2141",code:"813110",desc:"OPERADOR DE CALANDRA (QUIMICA,PETROQUIMICA E AFINS)"},
  {sinan:"1865",code:"761415",desc:"OPERADOR DE CALANDRAS (TECIDOS)"},
  {sinan:"2097",code:"811205",desc:"OPERADOR DE CALCINACAO (TRATAMENTO QUIMICO E AFINS)"},
  {sinan:"2322",code:"862120",desc:"OPERADOR DE CALDEIRA"},
  {sinan:"2253",code:"841456",desc:"OPERADOR DE CAMARAS FRIAS"},
  {sinan:"1002",code:"372115",desc:"OPERADOR DE CAMERA DE TELEVISAO"},
  {sinan:"1512",code:"711205",desc:"OPERADOR DE CAMINHAO (MINAS E PEDREIRAS)"},
  {sinan:"1832",code:"761220",desc:"OPERADOR DE CARDAS"},
  {sinan:"1513",code:"711210",desc:"OPERADOR DE CARREGADEIRA"},
  {sinan:"2115",code:"811610",desc:"OPERADOR DE CARRO DE APAGAMENTO E COQUE"},
  {sinan:"2420",code:"992215",desc:"OPERADOR DE CEIFADEIRA NA CONSERVACAO DE VIAS PERMANENTES"},
  {sinan:"1562",code:"715415",desc:"OPERADOR DE CENTRAL DE CONCRETO"},
  {sinan:"1006",code:"373110",desc:"OPERADOR DE CENTRAL DE RADIO"},
  {sinan:"2314",code:"861105",desc:"OPERADOR DE CENTRAL HIDRELETRICA"},
  {sinan:"2316",code:"861115",desc:"OPERADOR DE CENTRAL TERMOELETRICA"},
  {sinan:"2099",code:"811305",desc:"OPERADOR DE CENTRIFUGADORA (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2155",code:"821105",desc:"OPERADOR DE CENTRO DE CONTROLE"},
  {sinan:"916",code:"342410",desc:"OPERADOR DE CENTRO DE CONTROLE (FERROVIA E METRO)"},
  {sinan:"1635",code:"721405",desc:"OPERADOR DE CENTRO DE USINAGEM COM COMANDO NUMERICO"},
  {sinan:"2014",code:"773505",desc:"OPERADOR DE CENTRO DE USINAGEM DE MADEIRA (CNC)"},
  {sinan:"1866",code:"761420",desc:"OPERADOR DE CHAMUSCADEIRA DE TECIDOS"},
  {sinan:"1118",code:"413230",desc:"OPERADOR DE COBRANCA BANCARIA"},
  {sinan:"1488",code:"642005",desc:"OPERADOR DE COLHEDOR FLORESTAL"},
  {sinan:"1485",code:"641005",desc:"OPERADOR DE COLHEITADEIRA"},
  {sinan:"1543",code:"715110",desc:"OPERADOR DE COMPACTADORA DE SOLOS"},
  {sinan:"2323",code:"862130",desc:"OPERADOR DE COMPRESSOR DE AR"},
  {sinan:"805",code:"317205",desc:"OPERADOR DE COMPUTADOR (INCLUSIVE MICROCOMPUTADOR)"},
  {sinan:"2094",code:"811120",desc:"OPERADOR DE CONCENTRACAO"},
  {sinan:"1833",code:"761225",desc:"OPERADOR DE CONICALEIRA"},
  {sinan:"2221",code:"832110",desc:"OPERADOR DE CORTADEIRA DE PAPEL"},
  {sinan:"2241",code:"841305",desc:"OPERADOR DE CRISTALIZACAO NA REFINACAO DE ACUCAR"},
  {sinan:"1999",code:"773305",desc:"OPERADOR DE DESEMPENADEIRA NA USINAGEM CONVENCIONAL DE MADEIRA"},
  {sinan:"2166",code:"821250",desc:"OPERADOR DE DESGASEIFICACAO"},
  {sinan:"2116",code:"811615",desc:"OPERADOR DE DESTILACAO E SUBPRODUTOS DE COQUE"},
  {sinan:"2217",code:"831115",desc:"OPERADOR DE DIGESTOR DE PASTA PARA FABRICACAO DE PAPEL"},
  {sinan:"2047",code:"782210",desc:"OPERADOR DE DOCAGEM"},
  {sinan:"2037",code:"782105",desc:"OPERADOR DE DRAGA"},
  {sinan:"2048",code:"782220",desc:"OPERADOR DE EMPILHADEIRA"},
  {sinan:"2117",code:"811620",desc:"OPERADOR DE ENFORNAMENTO E DESENFORNAMENTO DE COQUE"},
  {sinan:"1856",code:"761348",desc:"OPERADOR DE ENGOMADEIRA DE URDUME"},
  {sinan:"2000",code:"773310",desc:"OPERADOR DE ENTALHADEIRA (USINAGEM DE MADEIRA)"},
  {sinan:"2110",code:"811425",desc:"OPERADOR DE EQUIPAMENTO DE DESTILACAO DE ALCOOL"},
  {sinan:"1673",code:"723305",desc:"OPERADOR DE EQUIPAMENTO DE SECAGEM DE PINTURA"},
  {sinan:"1662",code:"723115",desc:"OPERADOR DE EQUIPAMENTO PARA RESFRIAMENTO"},
  {sinan:"1655",code:"722325",desc:"OPERADOR DE EQUIPAMENTOS DE PREPARACAO DE AREIA"},
  {sinan:"2242",code:"841310",desc:"OPERADOR DE EQUIPAMENTOS DE REFINACAO DE ACUCAR (PROCESSO CONTINUO)"},
  {sinan:"1544",code:"715115",desc:"OPERADOR DE ESCAVADEIRA"},
  {sinan:"2180",code:"821430",desc:"OPERADOR DE ESCORIA E SUCATA"},
  {sinan:"1812",code:"752420",desc:"OPERADOR DE ESMALTADEIRA"},
  {sinan:"1813",code:"752425",desc:"OPERADOR DE ESPELHAMENTO"},
  {sinan:"1533",code:"712125",desc:"OPERADOR DE ESPESSADOR"},
  {sinan:"1857",code:"761351",desc:"OPERADOR DE ESPULADEIRA"},
  {sinan:"2324",code:"862140",desc:"OPERADOR DE ESTACAO DE BOMBEAMENTO"},
  {sinan:"2327",code:"862205",desc:"OPERADOR DE ESTACAO DE CAPTACAO,TRATAMENTO E DISTRIBUICAO DE AGUA"},
  {sinan:"2328",code:"862305",desc:"OPERADOR DE ESTACAO DE TRATAMENTO DE AGUA E EFLUENTES"},
  {sinan:"2111",code:"811430",desc:"OPERADOR DE EVAPORADOR NA DESTILACAO"},
  {sinan:"2118",code:"811625",desc:"OPERADOR DE EXAUSTOR (COQUERIA)"},
  {sinan:"2100",code:"811310",desc:"OPERADOR DE EXPLORACAO DE PETROLEO"},
  {sinan:"1007",code:"373115",desc:"OPERADOR DE EXTERNA (RADIO)"},
  {sinan:"2264",code:"841620",desc:"OPERADOR DE EXTRACAO DE CAFE SOLUVEL"},
  {sinan:"2142",code:"813115",desc:"OPERADOR DE EXTRUSORA (QUIMICA,PETROQUIMICA E AFINS)"},
  {sinan:"1834",code:"761230",desc:"OPERADOR DE FILATORIO"},
  {sinan:"2101",code:"811315",desc:"OPERADOR DE FILTRO DE SECAGEM (MINERACAO)"},
  {sinan:"2102",code:"811320",desc:"OPERADOR DE FILTRO DE TAMBOR ROTATIVO (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2103",code:"811325",desc:"OPERADOR DE FILTRO-ESTEIRA (MINERACAO)"},
  {sinan:"2104",code:"811330",desc:"OPERADOR DE FILTRO-PRENSA (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2105",code:"811335",desc:"OPERADOR DE FILTROS DE PARAFINA (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"2276",code:"841805",desc:"OPERADOR DE FORNO (FABRICACAO DE PAES,BISCOITOS E SIMILARES)"},
  {sinan:"1252",code:"516605",desc:"OPERADOR DE FORNO (SERVICOS FUNERARIOS)"},
  {sinan:"2329",code:"862310",desc:"OPERADOR DE FORNO DE INCINERACAO NO TRATAMENTO DE AGUA,EFLUENTES E RESIDUOS INDUSTRIAIS"},
  {sinan:"1663",code:"723120",desc:"OPERADOR DE FORNO DE TRATAMENTO TERMICO DE METAIS"},
  {sinan:"2001",code:"773315",desc:"OPERADOR DE FRESADORA (USINAGEM DE MADEIRA)"},
  {sinan:"1636",code:"721410",desc:"OPERADOR DE FRESADORA COM COMANDO NUMERICO"},
  {sinan:"1008",code:"373120",desc:"OPERADOR DE GRAVACAO DE RADIO"},
  {sinan:"1953",code:"766320",desc:"OPERADOR DE GUILHOTINA (CORTE DE PAPEL)"},
  {sinan:"2038",code:"782110",desc:"OPERADOR DE GUINDASTE (FIXO)"},
  {sinan:"2039",code:"782115",desc:"OPERADOR DE GUINDASTE MOVEL"},
  {sinan:"1867",code:"761425",desc:"OPERADOR DE IMPERMEABILIZADOR DE TECIDOS"},
  {sinan:"1421",code:"623315",desc:"OPERADOR DE INCUBADORA"},
  {sinan:"1082",code:"391215",desc:"OPERADOR DE INSPECAO DE QUALIDADE"},
  {sinan:"2333",code:"862515",desc:"OPERADOR DE INSTALACAO DE AR-CONDICIONADO"},
  {sinan:"2330",code:"862405",desc:"OPERADOR DE INSTALACAO DE EXTRACAO,PROCESSAMENTO,ENVASAMENTO E DISTRIBUICAO DE GASES"},
  {sinan:"2331",code:"862505",desc:"OPERADOR DE INSTALACAO DE REFRIGERACAO"},
  {sinan:"2181",code:"821435",desc:"OPERADOR DE JATO ABRASIVO"},
  {sinan:"1534",code:"712130",desc:"OPERADOR DE JIG (MINAS)"},
  {sinan:"1708",code:"724605",desc:"OPERADOR DE LACOS DE CABOS DE ACO"},
  {sinan:"1835",code:"761235",desc:"OPERADOR DE LAMINADEIRA E REUNIDEIRA"},
  {sinan:"2168",code:"821305",desc:"OPERADOR DE LAMINADOR"},
  {sinan:"2169",code:"821310",desc:"OPERADOR DE LAMINADOR DE BARRAS A FRIO"},
  {sinan:"2170",code:"821315",desc:"OPERADOR DE LAMINADOR DE BARRAS A QUENTE"},
  {sinan:"2171",code:"821320",desc:"OPERADOR DE LAMINADOR DE METAIS NAO-FERROSOS"},
  {sinan:"2172",code:"821325",desc:"OPERADOR DE LAMINADOR DE TUBOS"},
  {sinan:"2218",code:"831120",desc:"OPERADOR DE LAVAGEM E DEPURACAO DE PASTA PARA FABRICACAO DE PAPEL"},
  {sinan:"1749",code:"731175",desc:"OPERADOR DE LINHA DE MONTAGEM (APARELHOS ELETRICOS)"},
  {sinan:"1750",code:"731180",desc:"OPERADOR DE LINHA DE MONTAGEM (APARELHOS ELETRONICOS)"},
  {sinan:"2002",code:"773320",desc:"OPERADOR DE LIXADEIRA (USINAGEM DE MADEIRA)"},
  {sinan:"1836",code:"761240",desc:"OPERADOR DE MACAROQUEIRA"},
  {sinan:"1637",code:"721415",desc:"OPERADOR DE MANDRILADORA COM COMANDO NUMERICO"},
  {sinan:"2473",code:"842125",desc:"OPERADOR DE MAQUINA (FABRICACAO DE CIGARROS)"},
  {sinan:"2010",code:"773405",desc:"OPERADOR DE MAQUINA BORDATRIZ"},
  {sinan:"1647",code:"722220",desc:"OPERADOR DE MAQUINA CENTRIFUGADORA DE FUNDICAO"},
  {sinan:"1129",code:"415130",desc:"OPERADOR DE MAQUINA COPIADORA (EXCETO OPERADOR DE GRAFICA RAPIDA)"},
  {sinan:"1514",code:"711215",desc:"OPERADOR DE MAQUINA CORTADORA (MINAS E PEDREIRAS)"},
  {sinan:"1545",code:"715120",desc:"OPERADOR DE MAQUINA DE ABRIR VALAS"},
  {sinan:"1705",code:"724505",desc:"OPERADOR DE MAQUINA DE CILINDRAR CHAPAS"},
  {sinan:"1858",code:"761354",desc:"OPERADOR DE MAQUINA DE CORDOALHA"},
  {sinan:"2229",code:"833120",desc:"OPERADOR DE MAQUINA DE CORTAR E DOBRAR PAPELAO"},
  {sinan:"2011",code:"773410",desc:"OPERADOR DE MAQUINA DE CORTINA DAGUA (PRODUCAO DE MOVEIS)"},
  {sinan:"1907",code:"763320",desc:"OPERADOR DE MAQUINA DE COSTURA DE ACABAMENTO"},
  {sinan:"1706",code:"724510",desc:"OPERADOR DE MAQUINA DE DOBRAR CHAPAS"},
  {sinan:"1625",code:"721205",desc:"OPERADOR DE MAQUINA DE ELETROEROSAO"},
  {sinan:"2082",code:"784120",desc:"OPERADOR DE MAQUINA DE ENVASAR LIQUIDOS"},
  {sinan:"2081",code:"784115",desc:"OPERADOR DE MAQUINA DE ETIQUETAR"},
  {sinan:"1515",code:"711220",desc:"OPERADOR DE MAQUINA DE EXTRACAO CONTINUA (MINAS DE CARVAO)"},
  {sinan:"2136",code:"811815",desc:"OPERADOR DE MAQUINA DE FABRICACAO DE COSMETICOS"},
  {sinan:"2137",code:"811820",desc:"OPERADOR DE MAQUINA DE FABRICACAO DE PRODUTOS DE HIGIENE E LIMPEZA (SABAO,SABONETE,DETERG"},
  {sinan:"2284",code:"842210",desc:"OPERADOR DE MAQUINA DE FABRICAR CHARUTOS E CIGARRILHAS"},
  {sinan:"2290",code:"842305",desc:"OPERADOR DE MAQUINA DE FABRICAR CIGARROS"},
  {sinan:"2223",code:"832120",desc:"OPERADOR DE MAQUINA DE FABRICAR PAPEL (FASE SECA)"},
  {sinan:"2222",code:"832115",desc:"OPERADOR DE MAQUINA DE FABRICAR PAPEL (FASE UMIDA)"},
  {sinan:"2224",code:"832125",desc:"OPERADOR DE MAQUINA DE FABRICAR PAPEL E PAPELAO"},
  {sinan:"1648",code:"722225",desc:"OPERADOR DE MAQUINA DE FUNDIR SOB PRESSAO"},
  {sinan:"1868",code:"761430",desc:"OPERADOR DE MAQUINA DE LAVAR FIOS E TECIDOS"},
  {sinan:"1656",code:"722330",desc:"OPERADOR DE MAQUINA DE MOLDAR AUTOMATIZADA"},
  {sinan:"2474",code:"842135",desc:"OPERADOR DE MAQUINA DE PREPARACAO DE MATERIA PRIMA PARA PRODUCAO DE CIGARROS"},
  {sinan:"2134",code:"811805",desc:"OPERADOR DE MAQUINA DE PRODUTOS FARMACEUTICOS"},
  {sinan:"2219",code:"831125",desc:"OPERADOR DE MAQUINA DE SECAR CELULOSE"},
  {sinan:"2156",code:"821110",desc:"OPERADOR DE MAQUINA DE SINTERIZAR"},
  {sinan:"2202",code:"823240",desc:"OPERADOR DE MAQUINA DE SOPRAR VIDRO"},
  {sinan:"2012",code:"773415",desc:"OPERADOR DE MAQUINA DE USINAGEM DE MADEIRA (PRODUCAO EM SERIE)"},
  {sinan:"2003",code:"773325",desc:"OPERADOR DE MAQUINA DE USINAGEM MADEIRA,EM GERAL"},
  {sinan:"1638",code:"721420",desc:"OPERADOR DE MAQUINA ELETROEROSAO,A FIO,COM COMANDO NUMERICO"},
  {sinan:"2203",code:"823245",desc:"OPERADOR DE MAQUINA EXTRUSORA DE VARETAS E TUBOS DE VIDRO"},
  {sinan:"1995",code:"773205",desc:"OPERADOR DE MAQUINA INTERCALADORA E PLACAS (COMPENSADOS)"},
  {sinan:"2092",code:"811110",desc:"OPERADOR DE MAQUINA MISTURADEIRA (TRATAMENTOS QUIMICOS E AFINS)"},
  {sinan:"1516",code:"711225",desc:"OPERADOR DE MAQUINA PERFURADORA (MINAS E PEDREIRAS)"},
  {sinan:"1517",code:"711230",desc:"OPERADOR DE MAQUINA PERFURATRIZ"},
  {sinan:"1670",code:"723230",desc:"OPERADOR DE MAQUINA RECOBRIDORA DE ARAME"},
  {sinan:"2040",code:"782120",desc:"OPERADOR DE MAQUINA RODOFERROVIARIA"},
  {sinan:"1486",code:"641010",desc:"OPERADOR DE MAQUINAS DE BENEFICIAMENTO DE PRODUTOS AGRICOLAS"},
  {sinan:"1546",code:"715125",desc:"OPERADOR DE MAQUINAS DE CONSTRUCAO CIVIL E MINERACAO"},
  {sinan:"2278",code:"841815",desc:"OPERADOR DE MAQUINAS DE FABRICACAO DE CHOCOLATES E ACHOCOLATADOS"},
  {sinan:"2277",code:"841810",desc:"OPERADOR DE MAQUINAS DE FABRICACAO DE DOCES,SALGADOS E MASSAS ALIMENTICIAS"},
  {sinan:"2015",code:"773510",desc:"OPERADOR DE MAQUINAS DE USINAR MADEIRA (CNC)"},
  {sinan:"1888",code:"762325",desc:"OPERADOR DE MAQUINAS DO ACABAMENTO DE COUROS E PELES"},
  {sinan:"2405",code:"991115",desc:"OPERADOR DE MAQUINAS ESPECIAIS EM CONSERVACAO DE VIA PERMANENTE (TRILHOS)"},
  {sinan:"2325",code:"862150",desc:"OPERADOR DE MAQUINAS FIXAS,EM GERAL"},
  {sinan:"1489",code:"642010",desc:"OPERADOR DE MAQUINAS FLORESTAIS ESTATICAS"},
  {sinan:"1626",code:"721210",desc:"OPERADOR DE MAQUINAS OPERATRIZES"},
  {sinan:"1627",code:"721215",desc:"OPERADOR DE MAQUINAS-FERRAMENTA CONVENCIONAIS"},
  {sinan:"1602",code:"717010",desc:"OPERADOR DE MARTELETE"},
  {sinan:"1107",code:"412115",desc:"OPERADOR DE MENSAGENS DE TELECOMUNICACOES (CORREIOS)"},
  {sinan:"2243",code:"841315",desc:"OPERADOR DE MOENDA NA FABRICACAO DE ACUCAR"},
  {sinan:"2004",code:"773330",desc:"OPERADOR DE MOLDURADORA (USINAGEM DE MADEIRA)"},
  {sinan:"2041",code:"782125",desc:"OPERADOR DE MONTA-CARGAS (CONSTRUCAO CIVIL)"},
  {sinan:"2173",code:"821330",desc:"OPERADOR DE MONTAGEM DE CILINDROS E MANCAIS"},
  {sinan:"1547",code:"715130",desc:"OPERADOR DE MOTONIVELADORA"},
  {sinan:"1518",code:"711235",desc:"OPERADOR DE MOTONIVELADORA (EXTRACAO DE MINERAIS SOLIDOS)"},
  {sinan:"1454",code:"632120",desc:"OPERADOR DE MOTOSSERRA"},
  {sinan:"631",code:"253225",desc:"OPERADOR DE NEGOCIOS"},
  {sinan:"1837",code:"761245",desc:"OPERADOR DE OPEN-END"},
  {sinan:"1548",code:"715135",desc:"OPERADOR DE PA CARREGADEIRA"},
  {sinan:"2119",code:"811630",desc:"OPERADOR DE PAINEL DE CONTROLE"},
  {sinan:"2112",code:"811505",desc:"OPERADOR DE PAINEL DE CONTROLE (REFINACAO DE PETROLEO)"},
  {sinan:"1838",code:"761250",desc:"OPERADOR DE PASSADOR (FIACAO)"},
  {sinan:"1549",code:"715140",desc:"OPERADOR DE PAVIMENTADORA (ASFALTO,CONCRETO E MATERIAIS SIMILARES)"},
  {sinan:"1535",code:"712135",desc:"OPERADOR DE PENEIRAS HIDRAULICAS"},
  {sinan:"1839",code:"761255",desc:"OPERADOR DE PENTEADEIRA"},
  {sinan:"2005",code:"773335",desc:"OPERADOR DE PLAINA DESENGROSSADEIRA"},
  {sinan:"2042",code:"782130",desc:"OPERADOR DE PONTE ROLANTE"},
  {sinan:"2043",code:"782135",desc:"OPERADOR DE PORTICO ROLANTE"},
  {sinan:"2013",code:"773420",desc:"OPERADOR DE PRENSA DE ALTA FREQUENCIA NA USINAGEM DE MADEIRA"},
  {sinan:"2230",code:"833125",desc:"OPERADOR DE PRENSA DE EMBUTIR PAPELAO"},
  {sinan:"2083",code:"784125",desc:"OPERADOR DE PRENSA DE ENFARDAMENTO"},
  {sinan:"2646",code:"519215",desc:"OPERADOR DE PRENSA DE MATERIAL RECICLAVEL"},
  {sinan:"2204",code:"823250",desc:"OPERADOR DE PRENSA DE MOLDAR VIDRO"},
  {sinan:"2254",code:"841460",desc:"OPERADOR DE PREPARACAO DE GRAOS VEGETAIS (OLEOS E GORDURAS)"},
  {sinan:"2120",code:"811635",desc:"OPERADOR DE PRESERVACAO E CONTROLE TERMICO"},
  {sinan:"2143",code:"813120",desc:"OPERADOR DE PROCESSO (QUIMICA,PETROQUIMICA E AFINS)"},
  {sinan:"2238",code:"841115",desc:"OPERADOR DE PROCESSO DE MOAGEM"},
  {sinan:"1938",code:"766150",desc:"OPERADOR DE PROCESSO DE TRATAMENTO DE IMAGEM"},
  {sinan:"2089",code:"811005",desc:"OPERADOR DE PROCESSOS QUIMICOS E PETROQUIMICOS"},
  {sinan:"2144",code:"813125",desc:"OPERADOR DE PRODUCAO (QUIMICA,PETROQUIMICA E AFINS)"},
  {sinan:"1025",code:"374305",desc:"OPERADOR DE PROJETOR CINEMATOGRAFICO"},
  {sinan:"2315",code:"861110",desc:"OPERADOR DE QUADRO DE DISTRIBUICAO DE ENERGIA ELETRICA"},
  {sinan:"1157",code:"422220",desc:"OPERADOR DE RADIO-CHAMADA"},
  {sinan:"1869",code:"761435",desc:"OPERADOR DE RAMEUSE"},
  {sinan:"2121",code:"811640",desc:"OPERADOR DE REATOR DE COQUE DE PETROLEO"},
  {sinan:"2317",code:"861120",desc:"OPERADOR DE REATOR NUCLEAR"},
  {sinan:"2225",code:"832135",desc:"OPERADOR DE REBOBINADEIRA NA FABRICACAO DE PAPEL E PAPELAO"},
  {sinan:"1003",code:"372205",desc:"OPERADOR DE REDE DE TELEPROCESSAMENTO"},
  {sinan:"2122",code:"811645",desc:"OPERADOR DE REFRIGERACAO (COQUERIA)"},
  {sinan:"2332",code:"862510",desc:"OPERADOR DE REFRIGERACAO COM AMONIA"},
  {sinan:"1639",code:"721425",desc:"OPERADOR DE RETIFICADORA COM COMANDO NUMERICO"},
  {sinan:"1840",code:"761260",desc:"OPERADOR DE RETORCEDEIRA"},
  {sinan:"2090",code:"811010",desc:"OPERADOR DE SALA DE CONTROLE DE INSTALACOES QUIMICAS,PETROQUIMICAS E AFINS"},
  {sinan:"1528",code:"711410",desc:"OPERADOR DE SALINA (SAL MARINHO)"},
  {sinan:"1519",code:"711240",desc:"OPERADOR DE SCHUTTHECAR"},
  {sinan:"2006",code:"773340",desc:"OPERADOR DE SERRAS (USINAGEM DE MADEIRA)"},
  {sinan:"1990",code:"773110",desc:"OPERADOR DE SERRAS NO DESDOBRAMENTO DE MADEIRA"},
  {sinan:"2123",code:"811650",desc:"OPERADOR DE SISTEMA DE REVERSAO (COQUERIA)"},
  {sinan:"1937",code:"766145",desc:"OPERADOR DE SISTEMAS DE PROVA (ANALOGICO E DIGITAL)"},
  {sinan:"1521",code:"711305",desc:"OPERADOR DE SONDA DE PERCUSSAO"},
  {sinan:"1522",code:"711310",desc:"OPERADOR DE SONDA ROTATIVA"},
  {sinan:"2318",code:"861205",desc:"OPERADOR DE SUBESTACAO"},
  {sinan:"2044",code:"782140",desc:"OPERADOR DE TALHA ELETRICA"},
  {sinan:"2063",code:"782630",desc:"OPERADOR DE TELEFERICO (PASSAGEIROS)"},
  {sinan:"1158",code:"422305",desc:"OPERADOR DE TELEMARKETING ATIVO"},
  {sinan:"1159",code:"422310",desc:"OPERADOR DE TELEMARKETING ATIVO E RECEPTIVO"},
  {sinan:"1160",code:"422315",desc:"OPERADOR DE TELEMARKETING RECEPTIVO"},
  {sinan:"1161",code:"422320",desc:"OPERADOR DE TELEMARKETING TECNICO"},
  {sinan:"2182",code:"821440",desc:"OPERADOR DE TESOURA MECANICA E MAQUINA DE CORTE,NO ACABAMENTO DE CHAPAS E METAIS"},
  {sinan:"1730",code:"725510",desc:"OPERADOR DE TIME DE MONTAGEM"},
  {sinan:"2007",code:"773345",desc:"OPERADOR DE TORNO AUTOMATICO (USINAGEM DE MADEIRA)"},
  {sinan:"1640",code:"721430",desc:"OPERADOR DE TORNO COM COMANDO NUMERICO"},
  {sinan:"2113",code:"811510",desc:"OPERADOR DE TRANSFERENCIA E ESTOCAGEM - NA REFINACAO DO PETROLEO"},
  {sinan:"1009",code:"373125",desc:"OPERADOR DE TRANSMISSOR DE RADIO"},
  {sinan:"907",code:"342110",desc:"OPERADOR DE TRANSPORTE MULTIMODAL"},
  {sinan:"2244",code:"841320",desc:"OPERADOR DE TRATAMENTO DE CALDA NA REFINACAO DE ACUCAR"},
  {sinan:"2098",code:"811215",desc:"OPERADOR DE TRATAMENTO QUIMICO DE MATERIAIS RADIOATIVOS"},
  {sinan:"1520",code:"711245",desc:"OPERADOR DE TRATOR (MINAS E PEDREIRAS)"},
  {sinan:"1550",code:"715145",desc:"OPERADOR DE TRATOR DE LAMINA"},
  {sinan:"1490",code:"642015",desc:"OPERADOR DE TRATOR FLORESTAL"},
  {sinan:"2058",code:"782605",desc:"OPERADOR DE TREM DE METRO"},
  {sinan:"1131",code:"415210",desc:"OPERADOR DE TRIAGEM E TRANSBORDO"},
  {sinan:"2008",code:"773350",desc:"OPERADOR DE TUPIA (USINAGEM DE MADEIRA)"},
  {sinan:"989",code:"354810",desc:"OPERADOR DE TURISMO"},
  {sinan:"1859",code:"761357",desc:"OPERADOR DE URDIDEIRA"},
  {sinan:"1628",code:"721220",desc:"OPERADOR DE USINAGEM CONVENCIONAL POR ABRASAO"},
  {sinan:"2326",code:"862155",desc:"OPERADOR DE UTILIDADE (PRODUCAO E DISTRIBUICAO DE VAPOR,GAS,OLEO,COMBUSTIVEL,ENERGIA,OXIGE"},
  {sinan:"1649",code:"722230",desc:"OPERADOR DE VAZAMENTO (LINGOTAMENTO)"},
  {sinan:"2035",code:"781305",desc:"OPERADOR DE VEICULOS SUBAQUATICOS CONTROLADOS REMOTAMENTE"},
  {sinan:"1671",code:"723235",desc:"OPERADOR DE ZINCAGEM (PROCESSO ELETROLITICO)"},
  {sinan:"2399",code:"954125",desc:"OPERADOR ELETROMECANICO"},
  {sinan:"1826",code:"761005",desc:"OPERADOR POLIVALENTE DA INDUSTRIA TEXTIL"},
  {sinan:"1026",code:"374310",desc:"OPERADOR-MANTENEDOR DE PROJETOR CINEMATOGRAFICO"},
  {sinan:"991",code:"354820",desc:"ORGANIZADOR DE EVENTO"},
  {sinan:"540",code:"239410",desc:"ORIENTADOR EDUCACIONAL"},
  {sinan:"416",code:"223615",desc:"ORTOPTISTA"},
  {sinan:"2670",code:"226110",desc:"OSTEOPATA"},
  {sinan:"1790",code:"751125",desc:"OURIVES"},
  {sinan:"2507",code:"142340",desc:"OUVIDOR"},
  {sinan:"963",code:"352415",desc:"OUVIDOR (OMBUDSMAN) DO MEIO DE COMUNICACAO"},
  {sinan:"1693",code:"724310",desc:"OXICORTADOR A MAO E A MAQUINA"},
  {sinan:"1672",code:"723240",desc:"OXIDADOR"},
  {sinan:"2297",code:"848305",desc:"PADEIRO"},
  {sinan:"1975",code:"768620",desc:"PAGINADOR"},
  {sinan:"1890",code:"762335",desc:"PALECIONADOR DE COUROS E PELES"},
  {sinan:"238",code:"213430",desc:"PALEONTOLOGO"},
  {sinan:"1044",code:"376245",desc:"PALHACO"},
  {sinan:"954",code:"351815",desc:"PAPILOSCOPISTA POLICIAL"},
  {sinan:"1257",code:"516810",desc:"PARANORMAL"},
  {sinan:"1221",code:"515115",desc:"PARTEIRA LEIGA"},
  {sinan:"1908",code:"763325",desc:"PASSADEIRA DE PECAS CONFECCIONADAS"},
  {sinan:"1243",code:"516325",desc:"PASSADOR DE ROUPAS EM GERAL"},
  {sinan:"1250",code:"516415",desc:"PASSADOR DE ROUPAS,A MAO"},
  {sinan:"1860",code:"761360",desc:"PASSAMANEIRO A MAQUINA"},
  {sinan:"2294",code:"848205",desc:"PASTEURIZADOR"},
  {sinan:"1593",code:"716515",desc:"PASTILHEIRO"},
  {sinan:"900",code:"341220",desc:"PATRAO DE PESCA DE ALTO-MAR"},
  {sinan:"901",code:"341225",desc:"PATRAO DE PESCA NA NAVEGACAO INTERIOR"},
  {sinan:"541",code:"239415",desc:"PEDAGOGO"},
  {sinan:"1235",code:"516140",desc:"PEDICURE"},
  {sinan:"1552",code:"715210",desc:"PEDREIRO"},
  {sinan:"1553",code:"715215",desc:"PEDREIRO (CHAMINES INDUSTRIAIS)"},
  {sinan:"1554",code:"715220",desc:"PEDREIRO (MATERIAL REFRATARIO)"},
  {sinan:"1555",code:"715225",desc:"PEDREIRO (MINERACAO)"},
  {sinan:"2421",code:"992220",desc:"PEDREIRO DE CONSERVACAO DE VIAS PERMANENTES (EXCETO TRILHOS)"},
  {sinan:"1556",code:"715230",desc:"PEDREIRO DE EDIFICACOES"},
  {sinan:"874",code:"325015",desc:"PERFUMISTA"},
  {sinan:"2557",code:"223570",desc:"PERFUSIONISTA"},
  {sinan:"609",code:"252215",desc:"PERITO CONTABIL"},
  {sinan:"195",code:"204105",desc:"PERITO CRIMINAL"},
  {sinan:"1434",code:"631105",desc:"PESCADOR ARTESANAL DE AGUA DOCE"},
  {sinan:"1432",code:"631015",desc:"PESCADOR ARTESANAL DE LAGOSTAS"},
  {sinan:"1433",code:"631020",desc:"PESCADOR ARTESANAL DE PEIXES E CAMAROES"},
  {sinan:"1435",code:"631205",desc:"PESCADOR INDUSTRIAL"},
  {sinan:"1436",code:"631210",desc:"PESCADOR PROFISSIONAL"},
  {sinan:"182",code:"203305",desc:"PESQUISADOR DE CLINICA MEDICA"},
  {sinan:"176",code:"203205",desc:"PESQUISADOR DE ENGENHARIA CIVIL"},
  {sinan:"177",code:"203210",desc:"PESQUISADOR DE ENGENHARIA E TECNOLOGIA (OUTRAS AREAS DA ENGENHARIA)"},
  {sinan:"178",code:"203215",desc:"PESQUISADOR DE ENGENHARIA ELETRICA E ELETRONICA"},
  {sinan:"179",code:"203220",desc:"PESQUISADOR DE ENGENHARIA MECANICA"},
  {sinan:"180",code:"203225",desc:"PESQUISADOR DE ENGENHARIA METALURGICA,DE MINAS E DE MATERIAIS"},
  {sinan:"181",code:"203230",desc:"PESQUISADOR DE ENGENHARIA QUIMICA"},
  {sinan:"183",code:"203310",desc:"PESQUISADOR DE MEDICINA BASICA"},
  {sinan:"166",code:"203005",desc:"PESQUISADOR EM BIOLOGIA AMBIENTAL"},
  {sinan:"167",code:"203010",desc:"PESQUISADOR EM BIOLOGIA ANIMAL"},
  {sinan:"168",code:"203015",desc:"PESQUISADOR EM BIOLOGIA DE MICROORGANISMOS E PARASITAS"},
  {sinan:"169",code:"203020",desc:"PESQUISADOR EM BIOLOGIA HUMANA"},
  {sinan:"170",code:"203025",desc:"PESQUISADOR EM BIOLOGIA VEGETAL"},
  {sinan:"186",code:"203405",desc:"PESQUISADOR EM CIENCIAS AGRONOMICAS"},
  {sinan:"171",code:"203105",desc:"PESQUISADOR EM CIENCIAS DA COMPUTACAO E INFORMATICA"},
  {sinan:"192",code:"203515",desc:"PESQUISADOR EM CIENCIAS DA EDUCACAO"},
  {sinan:"187",code:"203410",desc:"PESQUISADOR EM CIENCIAS DA PESCA E AQUICULTURA"},
  {sinan:"172",code:"203110",desc:"PESQUISADOR EM CIENCIAS DA TERRA E MEIO AMBIENTE"},
  {sinan:"188",code:"203415",desc:"PESQUISADOR EM CIENCIAS DA ZOOTECNIA"},
  {sinan:"189",code:"203420",desc:"PESQUISADOR EM CIENCIAS FLORESTAIS"},
  {sinan:"190",code:"203505",desc:"PESQUISADOR EM CIENCIAS SOCIAIS E HUMANAS"},
  {sinan:"191",code:"203510",desc:"PESQUISADOR EM ECONOMIA"},
  {sinan:"173",code:"203115",desc:"PESQUISADOR EM FISICA"},
  {sinan:"193",code:"203520",desc:"PESQUISADOR EM HISTORIA"},
  {sinan:"174",code:"203120",desc:"PESQUISADOR EM MATEMATICA"},
  {sinan:"184",code:"203315",desc:"PESQUISADOR EM MEDICINA VETERINARIA"},
  {sinan:"160",code:"201205",desc:"PESQUISADOR EM METROLOGIA"},
  {sinan:"194",code:"203525",desc:"PESQUISADOR EM PSICOLOGIA"},
  {sinan:"175",code:"203125",desc:"PESQUISADOR EM QUIMICA"},
  {sinan:"185",code:"203320",desc:"PESQUISADOR EM SAUDE COLETIVA"},
  {sinan:"239",code:"213435",desc:"PETROGRAFO"},
  {sinan:"1862",code:"761366",desc:"PICOTADOR DE CARTOES JACQUARD"},
  {sinan:"896",code:"341120",desc:"PILOTO AGRICOLA"},
  {sinan:"893",code:"341105",desc:"PILOTO COMERCIAL (EXCETO LINHAS AEREAS)"},
  {sinan:"894",code:"341110",desc:"PILOTO COMERCIAL DE HELICOPTERO (EXCETO LINHAS AEREAS)"},
  {sinan:"315",code:"215305",desc:"PILOTO DE AERONAVES"},
  {sinan:"1061",code:"377135",desc:"PILOTO DE COMPETICAO AUTOMOBILISTICA"},
  {sinan:"316",code:"215310",desc:"PILOTO DE ENSAIOS EM VOO"},
  {sinan:"902",code:"341230",desc:"PILOTO FLUVIAL"},
  {sinan:"1674",code:"723310",desc:"PINTOR A PINCEL E ROLO (EXCETO OBRAS E ESTRUTURAS METALICAS)"},
  {sinan:"1814",code:"752430",desc:"PINTOR DE CERAMICA,A PINCEL"},
  {sinan:"1675",code:"723315",desc:"PINTOR DE ESTRUTURAS METALICAS"},
  {sinan:"1976",code:"768625",desc:"PINTOR DE LETREIROS"},
  {sinan:"1599",code:"716610",desc:"PINTOR DE OBRAS"},
  {sinan:"1676",code:"723320",desc:"PINTOR DE VEICULOS (FABRICACAO)"},
  {sinan:"2410",code:"991315",desc:"PINTOR DE VEICULOS (REPARACAO)"},
  {sinan:"1677",code:"723325",desc:"PINTOR POR IMERSAO"},
  {sinan:"1678",code:"723330",desc:"PINTOR,A PISTOLA (EXCETO OBRAS E ESTRUTURAS METALICAS)"},
  {sinan:"1309",code:"524310",desc:"PIPOQUEIRO AMBULANTE"},
  {sinan:"2138",code:"812105",desc:"PIROTECNICO"},
  {sinan:"2458",code:"513610",desc:"PIZZAIOLO"},
  {sinan:"1076",code:"391120",desc:"PLANEJISTA"},
  {sinan:"1525",code:"711325",desc:"PLATAFORMISTA (PETROLEO)"},
  {sinan:"1603",code:"717015",desc:"POCEIRO (EDIFICACOES)"},
  {sinan:"848",code:"322110",desc:"PODOLOGO"},
  {sinan:"663",code:"261525",desc:"POETA"},
  {sinan:"1262",code:"517210",desc:"POLICIAL RODOVIARIO FEDERAL"},
  {sinan:"1634",code:"721325",desc:"POLIDOR DE METAIS"},
  {sinan:"1539",code:"712220",desc:"POLIDOR DE PEDRAS"},
  {sinan:"1271",code:"517405",desc:"PORTEIRO (HOTEL)"},
  {sinan:"1272",code:"517410",desc:"PORTEIRO DE EDIFICIOS"},
  {sinan:"1273",code:"517415",desc:"PORTEIRO DE LOCAIS DE DIVERSAO"},
  {sinan:"7",code:"010305",desc:"PRACA DA AERONAUTICA"},
  {sinan:"9",code:"010315",desc:"PRACA DA MARINHA"},
  {sinan:"8",code:"010310",desc:"PRACA DO EXERCITO"},
  {sinan:"309",code:"215145",desc:"PRATICO DE PORTOS DA MARINHA MERCANTE"},
  {sinan:"42",code:"111250",desc:"PREFEITO"},
  {sinan:"1889",code:"762330",desc:"PRENSADOR DE COUROS E PELES"},
  {sinan:"2255",code:"841464",desc:"PRENSADOR DE FRUTAS (EXCETO OLEAGINOSAS)"},
  {sinan:"1707",code:"724515",desc:"PRENSISTA (OPERADOR DE PRENSA)"},
  {sinan:"1996",code:"773210",desc:"PRENSISTA DE AGLOMERADOS"},
  {sinan:"1997",code:"773215",desc:"PRENSISTA DE COMPENSADOS"},
  {sinan:"2195",code:"823130",desc:"PREPARADOR DE ADITIVOS"},
  {sinan:"1998",code:"773220",desc:"PREPARADOR DE AGLOMERANTES"},
  {sinan:"422",code:"224115",desc:"PREPARADOR DE ATLETA"},
  {sinan:"2193",code:"823120",desc:"PREPARADOR DE BARBOTINA"},
  {sinan:"1912",code:"764115",desc:"PREPARADOR DE CALCADOS"},
  {sinan:"1891",code:"762340",desc:"PREPARADOR DE COUROS CURTIDOS"},
  {sinan:"2194",code:"823125",desc:"PREPARADOR DE ESMALTES (CERAMICA)"},
  {sinan:"1689",code:"724220",desc:"PREPARADOR DE ESTRUTURAS METALICAS"},
  {sinan:"2283",code:"842205",desc:"PREPARADOR DE FUMO NA FABRICACAO DE CHARUTOS"},
  {sinan:"1629",code:"721225",desc:"PREPARADOR DE MAQUINAS-FERRAMENTA"},
  {sinan:"2190",code:"823105",desc:"PREPARADOR DE MASSA (FABRICACAO DE ABRASIVOS)"},
  {sinan:"2191",code:"823110",desc:"PREPARADOR DE MASSA (FABRICACAO DE VIDRO)"},
  {sinan:"2192",code:"823115",desc:"PREPARADOR DE MASSA DE ARGILA"},
  {sinan:"1954",code:"766325",desc:"PREPARADOR DE MATRIZES DE CORTE E VINCO"},
  {sinan:"2279",code:"842105",desc:"PREPARADOR DE MELADO E ESSENCIA DE FUMO"},
  {sinan:"1650",code:"722235",desc:"PREPARADOR DE PANELAS (LINGOTAMENTO)"},
  {sinan:"2256",code:"841468",desc:"PREPARADOR DE RACOES"},
  {sinan:"1913",code:"764120",desc:"PREPARADOR DE SOLAS E PALMILHAS"},
  {sinan:"2183",code:"821445",desc:"PREPARADOR DE SUCATA E APARAS"},
  {sinan:"739",code:"311715",desc:"PREPARADOR DE TINTAS"},
  {sinan:"740",code:"311720",desc:"PREPARADOR DE TINTAS (FABRICA DE TECIDOS)"},
  {sinan:"423",code:"224120",desc:"PREPARADOR FISICO"},
  {sinan:"33",code:"111205",desc:"PRESIDENTE DA REPUBLICA"},
  {sinan:"2428",code:"999995",desc:"PRESIDIARIO ( PESSOAS CONFINADAS EM INSTITUICOES PENAIS,INCLUSIVE MENORES DE IDADE )"},
  {sinan:"312",code:"215210",desc:"PRIMEIRO OFICIAL DE MAQUINAS DA MARINHA MERCANTE"},
  {sinan:"14",code:"020305",desc:"PRIMEIRO TENENTE DE POLICIA MILITAR"},
  {sinan:"2280",code:"842110",desc:"PROCESSADOR DE FUMO"},
  {sinan:"554",code:"241210",desc:"PROCURADOR AUTARQUICO"},
  {sinan:"580",code:"242410",desc:"PROCURADOR DA ASSISTENCIA JUDICIARIA"},
  {sinan:"555",code:"241215",desc:"PROCURADOR DA FAZENDA NACIONAL"},
  {sinan:"568",code:"242205",desc:"PROCURADOR DA REPUBLICA"},
  {sinan:"569",code:"242210",desc:"PROCURADOR DE JUSTICA"},
  {sinan:"570",code:"242215",desc:"PROCURADOR DE JUSTICA MILITAR"},
  {sinan:"556",code:"241220",desc:"PROCURADOR DO ESTADO"},
  {sinan:"557",code:"241225",desc:"PROCURADOR DO MUNICIPIO"},
  {sinan:"571",code:"242220",desc:"PROCURADOR DO TRABALHO"},
  {sinan:"558",code:"241230",desc:"PROCURADOR FEDERAL"},
  {sinan:"559",code:"241235",desc:"PROCURADOR FUNDACIONAL"},
  {sinan:"572",code:"242225",desc:"PROCURADOR REGIONAL DA REPUBLICA"},
  {sinan:"573",code:"242230",desc:"PROCURADOR REGIONAL DO TRABALHO"},
  {sinan:"1311",code:"612005",desc:"PRODUTOR AGRICOLA POLIVALENTE"},
  {sinan:"1310",code:"611005",desc:"PRODUTOR AGROPECUARIO,EM GERAL"},
  {sinan:"681",code:"262110",desc:"PRODUTOR CINEMATOGRAFICO"},
  {sinan:"1338",code:"612705",desc:"PRODUTOR DA CULTURA DE AMENDOIM"},
  {sinan:"1339",code:"612710",desc:"PRODUTOR DA CULTURA DE CANOLA"},
  {sinan:"1340",code:"612715",desc:"PRODUTOR DA CULTURA DE COCO-DA-BAIA"},
  {sinan:"1341",code:"612720",desc:"PRODUTOR DA CULTURA DE DENDE"},
  {sinan:"1342",code:"612725",desc:"PRODUTOR DA CULTURA DE GIRASSOL"},
  {sinan:"1343",code:"612730",desc:"PRODUTOR DA CULTURA DE LINHO"},
  {sinan:"1344",code:"612735",desc:"PRODUTOR DA CULTURA DE MAMONA"},
  {sinan:"1345",code:"612740",desc:"PRODUTOR DA CULTURA DE SOJA"},
  {sinan:"1317",code:"612205",desc:"PRODUTOR DE ALGODAO"},
  {sinan:"1312",code:"612105",desc:"PRODUTOR DE ARROZ"},
  {sinan:"1330",code:"612505",desc:"PRODUTOR DE ARVORES FRUTIFERAS"},
  {sinan:"1334",code:"612610",desc:"PRODUTOR DE CACAU"},
  {sinan:"1313",code:"612110",desc:"PRODUTOR DE CANA-DE-ACUCAR"},
  {sinan:"1314",code:"612115",desc:"PRODUTOR DE CEREAIS DE INVERNO"},
  {sinan:"1318",code:"612210",desc:"PRODUTOR DE CURAUA"},
  {sinan:"1335",code:"612615",desc:"PRODUTOR DE ERVA-MATE"},
  {sinan:"1346",code:"612805",desc:"PRODUTOR DE ESPECIARIAS"},
  {sinan:"1331",code:"612510",desc:"PRODUTOR DE ESPECIES FRUTIFERAS RASTEIRAS"},
  {sinan:"1332",code:"612515",desc:"PRODUTOR DE ESPECIES FRUTIFERAS TREPADEIRAS"},
  {sinan:"1326",code:"612405",desc:"PRODUTOR DE FLORES DE CORTE"},
  {sinan:"1327",code:"612410",desc:"PRODUTOR DE FLORES EM VASO"},
  {sinan:"1328",code:"612415",desc:"PRODUTOR DE FORRACOES"},
  {sinan:"1336",code:"612620",desc:"PRODUTOR DE FUMO"},
  {sinan:"1315",code:"612120",desc:"PRODUTOR DE GRAMINEAS FORRAGEIRAS"},
  {sinan:"1337",code:"612625",desc:"PRODUTOR DE GUARANA"},
  {sinan:"1319",code:"612215",desc:"PRODUTOR DE JUTA"},
  {sinan:"1316",code:"612125",desc:"PRODUTOR DE MILHO E SORGO"},
  {sinan:"1347",code:"612810",desc:"PRODUTOR DE PLANTAS AROMATICAS E MEDICINAIS"},
  {sinan:"1329",code:"612420",desc:"PRODUTOR DE PLANTAS ORNAMENTAIS"},
  {sinan:"682",code:"262115",desc:"PRODUTOR DE RADIO"},
  {sinan:"1320",code:"612220",desc:"PRODUTOR DE RAMI"},
  {sinan:"1321",code:"612225",desc:"PRODUTOR DE SISAL"},
  {sinan:"683",code:"262120",desc:"PRODUTOR DE TEATRO"},
  {sinan:"684",code:"262125",desc:"PRODUTOR DE TELEVISAO"},
  {sinan:"647",code:"261130",desc:"PRODUTOR DE TEXTO"},
  {sinan:"1325",code:"612320",desc:"PRODUTOR NA OLERICULTURA DE FRUTOS E SEMENTES"},
  {sinan:"1322",code:"612305",desc:"PRODUTOR NA OLERICULTURA DE LEGUMES"},
  {sinan:"1323",code:"612310",desc:"PRODUTOR NA OLERICULTURA DE RAIZES,BULBOS E TUBERCULOS"},
  {sinan:"1324",code:"612315",desc:"PRODUTOR NA OLERICULTURA DE TALOS,FOLHAS E FLORES"},
  {sinan:"1446",code:"631415",desc:"PROEIRO"},
  {sinan:"453",code:"233105",desc:"PROFESSOR DA AREA DE MEIO AMBIENTE"},
  {sinan:"429",code:"231205",desc:"PROFESSOR DA EDUCACAO DE JOVENS E ADULTOS DO ENSINO FUNDAMENTAL (PRIMEIRA A QUARTA SERIE"},
  {sinan:"529",code:"234810",desc:"PROFESSOR DE ADMINISTRACAO"},
  {sinan:"534",code:"239205",desc:"PROFESSOR DE ALUNOS COM DEFICIENCIA AUDITIVA E SURDOS"},
  {sinan:"535",code:"239210",desc:"PROFESSOR DE ALUNOS COM DEFICIENCIA FISICA"},
  {sinan:"536",code:"239215",desc:"PROFESSOR DE ALUNOS COM DEFICIENCIA MENTAL"},
  {sinan:"537",code:"239220",desc:"PROFESSOR DE ALUNOS COM DEFICIENCIA MULTIPLA"},
  {sinan:"538",code:"239225",desc:"PROFESSOR DE ALUNOS COM DEFICIENCIA VISUAL"},
  {sinan:"514",code:"234705",desc:"PROFESSOR DE ANTROPOLOGIA DO ENSINO SUPERIOR"},
  {sinan:"462",code:"233215",desc:"PROFESSOR DE APRENDIZAGEM E TREINAMENTO COMERCIAL"},
  {sinan:"473",code:"234305",desc:"PROFESSOR DE ARQUITETURA"},
  {sinan:"515",code:"234710",desc:"PROFESSOR DE ARQUIVOLOGIA DO ENSINO SUPERIOR"},
  {sinan:"531",code:"234905",desc:"PROFESSOR DE ARTES DO ESPETACULO NO ENSINO SUPERIOR"},
  {sinan:"439",code:"232105",desc:"PROFESSOR DE ARTES NO ENSINO MEDIO"},
  {sinan:"532",code:"234910",desc:"PROFESSOR DE ARTES VISUAIS NO ENSINO SUPERIOR (ARTES PLASTICAS E MULTIMIDIA)"},
  {sinan:"472",code:"234215",desc:"PROFESSOR DE ASTRONOMIA (ENSINO SUPERIOR)"},
  {sinan:"516",code:"234715",desc:"PROFESSOR DE BIBLIOTECONOMIA DO ENSIO SUPERIOR"},
  {sinan:"440",code:"232110",desc:"PROFESSOR DE BIOLOGIA NO ENSINO MEDIO"},
  {sinan:"517",code:"234720",desc:"PROFESSOR DE CIENCIA POLITICA DO ENSINO SUPERIOR"},
  {sinan:"477",code:"234405",desc:"PROFESSOR DE CIENCIAS BIOLOGICAS DO ENSINO SUPERIOR"},
  {sinan:"431",code:"231305",desc:"PROFESSOR DE CIENCIAS EXATAS E NATURAIS DO ENSINO FUNDAMENTAL"},
  {sinan:"468",code:"234120",desc:"PROFESSOR DE COMPUTACAO (NO ENSINO SUPERIOR)"},
  {sinan:"518",code:"234725",desc:"PROFESSOR DE COMUNICACAO SOCIAL DO ENSINO SUPERIOR"},
  {sinan:"530",code:"234815",desc:"PROFESSOR DE CONTABILIDADE"},
  {sinan:"709",code:"262830",desc:"PROFESSOR DE DANCA"},
  {sinan:"454",code:"233110",desc:"PROFESSOR DE DESENHO TECNICO"},
  {sinan:"519",code:"234730",desc:"PROFESSOR DE DIREITO DO ENSINO SUPERIOR"},
  {sinan:"441",code:"232115",desc:"PROFESSOR DE DISCIPLINAS PEDAGOGICAS NO ENSINO MEDIO"},
  {sinan:"528",code:"234805",desc:"PROFESSOR DE ECONOMIA"},
  {sinan:"432",code:"231310",desc:"PROFESSOR DE EDUCACAO ARTISTICA DO ENSINO FUNDAMENTAL"},
  {sinan:"433",code:"231315",desc:"PROFESSOR DE EDUCACAO FISICA DO ENSINO FUNDAMENTAL"},
  {sinan:"442",code:"232120",desc:"PROFESSOR DE EDUCACAO FISICA NO ENSINO MEDIO"},
  {sinan:"478",code:"234410",desc:"PROFESSOR DE EDUCACAO FISICA NO ENSINO SUPERIOR"},
  {sinan:"479",code:"234415",desc:"PROFESSOR DE ENFERMAGEM DO ENSINO SUPERIOR"},
  {sinan:"474",code:"234310",desc:"PROFESSOR DE ENGENHARIA"},
  {sinan:"489",code:"234505",desc:"PROFESSOR DE ENSINO SUPERIOR NA AREA DE DIDATICA"},
  {sinan:"490",code:"234510",desc:"PROFESSOR DE ENSINO SUPERIOR NA AREA DE ORIENTACAO EDUCACIONAL"},
  {sinan:"491",code:"234515",desc:"PROFESSOR DE ENSINO SUPERIOR NA AREA DE PESQUISA EDUCACIONAL"},
  {sinan:"492",code:"234520",desc:"PROFESSOR DE ENSINO SUPERIOR NA AREA DE PRATICA DE ENSINO"},
  {sinan:"467",code:"234115",desc:"PROFESSOR DE ESTATISTICA (NO ENSINO SUPERIOR)"},
  {sinan:"480",code:"234420",desc:"PROFESSOR DE FARMACIA E BIOQUIMICA"},
  {sinan:"511",code:"234676",desc:"PROFESSOR DE FILOLOGIA E CRITICA TEXTUAL"},
  {sinan:"520",code:"234735",desc:"PROFESSOR DE FILOSOFIA DO ENSINO SUPERIOR"},
  {sinan:"443",code:"232125",desc:"PROFESSOR DE FILOSOFIA NO ENSINO MEDIO"},
  {sinan:"470",code:"234205",desc:"PROFESSOR DE FISICA (ENSINO SUPERIOR)"},
  {sinan:"444",code:"232130",desc:"PROFESSOR DE FISICA NO ENSINO MEDIO"},
  {sinan:"481",code:"234425",desc:"PROFESSOR DE FISIOTERAPIA"},
  {sinan:"482",code:"234430",desc:"PROFESSOR DE FONOAUDIOLOGIA"},
  {sinan:"475",code:"234315",desc:"PROFESSOR DE GEOFISICA"},
  {sinan:"434",code:"231320",desc:"PROFESSOR DE GEOGRAFIA DO ENSINO FUNDAMENTAL"},
  {sinan:"521",code:"234740",desc:"PROFESSOR DE GEOGRAFIA DO ENSINO SUPERIOR"},
  {sinan:"445",code:"232135",desc:"PROFESSOR DE GEOGRAFIA NO ENSINO MEDIO"},
  {sinan:"476",code:"234320",desc:"PROFESSOR DE GEOLOGIA"},
  {sinan:"435",code:"231325",desc:"PROFESSOR DE HISTORIA DO ENSINO FUNDAMENTAL"},
  {sinan:"522",code:"234745",desc:"PROFESSOR DE HISTORIA DO ENSINO SUPERIOR"},
  {sinan:"446",code:"232140",desc:"PROFESSOR DE HISTORIA NO ENSINO MEDIO"},
  {sinan:"523",code:"234750",desc:"PROFESSOR DE JORNALISMO"},
  {sinan:"493",code:"234604",desc:"PROFESSOR DE LINGUA ALEMA"},
  {sinan:"447",code:"232145",desc:"PROFESSOR DE LINGUA E LITERATURA BRASILEIRA NO ENSINO MEDIO"},
  {sinan:"497",code:"234620",desc:"PROFESSOR DE LINGUA ESPANHOLA"},
  {sinan:"436",code:"231330",desc:"PROFESSOR DE LINGUA ESTRANGEIRA MODERNA DO ENSINO FUNDAMENTAL"},
  {sinan:"448",code:"232150",desc:"PROFESSOR DE LINGUA ESTRANGEIRA MODERNA NO ENSINO MEDIO"},
  {sinan:"495",code:"234612",desc:"PROFESSOR DE LINGUA FRANCESA"},
  {sinan:"496",code:"234616",desc:"PROFESSOR DE LINGUA INGLESA"},
  {sinan:"494",code:"234608",desc:"PROFESSOR DE LINGUA ITALIANA"},
  {sinan:"498",code:"234624",desc:"PROFESSOR DE LINGUA PORTUGUESA"},
  {sinan:"437",code:"231335",desc:"PROFESSOR DE LINGUA PORTUGUESA DO ENSINO FUNDAMENTAL"},
  {sinan:"509",code:"234668",desc:"PROFESSOR DE LINGUAS ESTRANGEIRAS MODERNAS"},
  {sinan:"510",code:"234672",desc:"PROFESSOR DE LINGUISTICA E LINGUISTICA APLICADA"},
  {sinan:"501",code:"234636",desc:"PROFESSOR DE LITERATURA ALEMA"},
  {sinan:"499",code:"234628",desc:"PROFESSOR DE LITERATURA BRASILEIRA"},
  {sinan:"502",code:"234640",desc:"PROFESSOR DE LITERATURA COMPARADA"},
  {sinan:"507",code:"234660",desc:"PROFESSOR DE LITERATURA DE LINGUAS ESTRANGEIRAS MODERNAS"},
  {sinan:"503",code:"234644",desc:"PROFESSOR DE LITERATURA ESPANHOLA"},
  {sinan:"504",code:"234648",desc:"PROFESSOR DE LITERATURA FRANCESA"},
  {sinan:"505",code:"234652",desc:"PROFESSOR DE LITERATURA INGLESA"},
  {sinan:"506",code:"234656",desc:"PROFESSOR DE LITERATURA ITALIANA"},
  {sinan:"500",code:"234632",desc:"PROFESSOR DE LITERATURA PORTUGUESA"},
  {sinan:"465",code:"234105",desc:"PROFESSOR DE MATEMATICA APLICADA (NO ENSINO SUPERIOR)"},
  {sinan:"438",code:"231340",desc:"PROFESSOR DE MATEMATICA DO ENSINO FUNDAMENTAL"},
  {sinan:"449",code:"232155",desc:"PROFESSOR DE MATEMATICA NO ENSINO MEDIO"},
  {sinan:"466",code:"234110",desc:"PROFESSOR DE MATEMATICA PURA (NO ENSINO SUPERIOR)"},
  {sinan:"483",code:"234435",desc:"PROFESSOR DE MEDICINA"},
  {sinan:"484",code:"234440",desc:"PROFESSOR DE MEDICINA VETERINARIA"},
  {sinan:"524",code:"234755",desc:"PROFESSOR DE MUSEOLOGIA DO ENSINO SUPERIOR"},
  {sinan:"533",code:"234915",desc:"PROFESSOR DE MUSICA NO ENSINO SUPERIOR"},
  {sinan:"882",code:"331105",desc:"PROFESSOR DE NIVEL MEDIO NA EDUCACAO INFANTIL"},
  {sinan:"884",code:"331205",desc:"PROFESSOR DE NIVEL MEDIO NO ENSINO FUNDAMENTAL"},
  {sinan:"885",code:"331305",desc:"PROFESSOR DE NIVEL MEDIO NO ENSINO PROFISSIONALIZANTE"},
  {sinan:"430",code:"231210",desc:"PROFESSOR DE NIVEL SUPERIOR DO ENSINO FUNDAMENTAL (PRIMEIRA A QUARTA SERIE)"},
  {sinan:"427",code:"231105",desc:"PROFESSOR DE NIVEL SUPERIOR NA EDUCACAO INFANTIL (QUATRO A SEIS ANOS)"},
  {sinan:"428",code:"231110",desc:"PROFESSOR DE NIVEL SUPERIOR NA EDUCACAO INFANTIL (ZERO A TRES ANOS)"},
  {sinan:"485",code:"234445",desc:"PROFESSOR DE NUTRICAO"},
  {sinan:"486",code:"234450",desc:"PROFESSOR DE ODONTOLOGIA"},
  {sinan:"508",code:"234664",desc:"PROFESSOR DE OUTRAS LINGUAS E LITERATURAS"},
  {sinan:"469",code:"234125",desc:"PROFESSOR DE PESQUISA OPERACIONAL (NO ENSINO SUPERIOR)"},
  {sinan:"525",code:"234760",desc:"PROFESSOR DE PSICOLOGIA DO ENSINO SUPERIOR"},
  {sinan:"450",code:"232160",desc:"PROFESSOR DE PSICOLOGIA NO ENSINO MEDIO"},
  {sinan:"471",code:"234210",desc:"PROFESSOR DE QUIMICA (ENSINO SUPERIOR)"},
  {sinan:"451",code:"232165",desc:"PROFESSOR DE QUIMICA NO ENSINO MEDIO"},
  {sinan:"512",code:"234680",desc:"PROFESSOR DE SEMIOTICA"},
  {sinan:"526",code:"234765",desc:"PROFESSOR DE SERVICO SOCIAL DO ENSINO SUPERIOR"},
  {sinan:"527",code:"234770",desc:"PROFESSOR DE SOCIOLOGIA DO ENSINO SUPERIOR"},
  {sinan:"452",code:"232170",desc:"PROFESSOR DE SOCIOLOGIA NO ENSINO MEDIO"},
  {sinan:"455",code:"233115",desc:"PROFESSOR DE TECNICAS AGRICOLAS"},
  {sinan:"456",code:"233120",desc:"PROFESSOR DE TECNICAS COMERCIAIS E SECRETARIAIS"},
  {sinan:"457",code:"233125",desc:"PROFESSOR DE TECNICAS DE ENFERMAGEM"},
  {sinan:"542",code:"239420",desc:"PROFESSOR DE TECNICAS E RECURSOS AUDIOVISUAIS"},
  {sinan:"458",code:"233130",desc:"PROFESSOR DE TECNICAS INDUSTRIAIS"},
  {sinan:"459",code:"233135",desc:"PROFESSOR DE TECNOLOGIA E CALCULO TECNICO"},
  {sinan:"513",code:"234684",desc:"PROFESSOR DE TEORIA DA LITERATURA"},
  {sinan:"487",code:"234455",desc:"PROFESSOR DE TERAPIA OCUPACIONAL"},
  {sinan:"488",code:"234460",desc:"PROFESSOR DE ZOOTECNIA DO ENSINO SUPERIOR"},
  {sinan:"463",code:"233220",desc:"PROFESSOR INSTRUTOR DE ENSINO E APRENDIZAGEM AGROFLORESTAL"},
  {sinan:"464",code:"233225",desc:"PROFESSOR INSTRUTOR DE ENSINO E APRENDIZAGEM EM SERVICOS"},
  {sinan:"886",code:"332105",desc:"PROFESSOR LEIGO NO ENSINO FUNDAMENTAL"},
  {sinan:"887",code:"332205",desc:"PROFESSOR PRATICO NO ENSINO PROFISSIONALIZANTE"},
  {sinan:"890",code:"333115",desc:"PROFESSORES DE CURSOS LIVRES"},
  {sinan:"1062",code:"377140",desc:"PROFISSIONAL DE ATLETISMO"},
  {sinan:"1282",code:"519805",desc:"PROFISSIONAL DO SEXO"},
  {sinan:"801",code:"317105",desc:"PROGRAMADOR DE INTERNET"},
  {sinan:"803",code:"317115",desc:"PROGRAMADOR DE MAQUINAS - FERRAMENTA COM COMANDO NUMERICO"},
  {sinan:"804",code:"317120",desc:"PROGRAMADOR DE MULTIMIDIA"},
  {sinan:"802",code:"317110",desc:"PROGRAMADOR DE SISTEMAS DE INFORMACAO"},
  {sinan:"1939",code:"766155",desc:"PROGRAMADOR VISUAL GRAFICO"},
  {sinan:"831",code:"318805",desc:"PROJETISTA DE MOVEIS"},
  {sinan:"1020",code:"374135",desc:"PROJETISTA DE SISTEMAS DE AUDIO"},
  {sinan:"1017",code:"374120",desc:"PROJETISTA DE SOM"},
  {sinan:"574",code:"242235",desc:"PROMOTOR DE JUSTICA"},
  {sinan:"1296",code:"521115",desc:"PROMOTOR DE VENDAS"},
  {sinan:"975",code:"354130",desc:"PROMOTOR DE VENDAS ESPECIALIZADO"},
  {sinan:"2529",code:"354150",desc:"PROPAGANDISTA DE PRODUTOS FAMACEUTICOS"},
  {sinan:"861",code:"322410",desc:"PROTETICO DENTARIO"},
  {sinan:"603",code:"251550",desc:"PSICANALISTA"},
  {sinan:"2620",code:"251555",desc:"PSICOLOGO ACUPUNTURISTA"},
  {sinan:"595",code:"251510",desc:"PSICOLOGO CLINICO"},
  {sinan:"596",code:"251515",desc:"PSICOLOGO DO ESPORTE"},
  {sinan:"601",code:"251540",desc:"PSICOLOGO DO TRABALHO"},
  {sinan:"600",code:"251535",desc:"PSICOLOGO DO TRANSITO"},
  {sinan:"594",code:"251505",desc:"PSICOLOGO EDUCACIONAL"},
  {sinan:"597",code:"251520",desc:"PSICOLOGO HOSPITALAR"},
  {sinan:"598",code:"251525",desc:"PSICOLOGO JURIDICO"},
  {sinan:"599",code:"251530",desc:"PSICOLOGO SOCIAL"},
  {sinan:"543",code:"239425",desc:"PSICOPEDAGOGO"},
  {sinan:"1063",code:"377145",desc:"PUGILISTA"},
  {sinan:"2295",code:"848210",desc:"QUEIJEIRO NA FABRICACAO DE LATICINIO"},
  {sinan:"228",code:"213205",desc:"QUIMICO"},
  {sinan:"229",code:"213210",desc:"QUIMICO INDUSTRIAL"},
  {sinan:"849",code:"322115",desc:"QUIROPRAXISTA"},
  {sinan:"1879",code:"762125",desc:"RACHADOR DE COUROS E PELES"},
  {sinan:"1004",code:"372210",desc:"RADIOTELEGRAFISTA"},
  {sinan:"1449",code:"632010",desc:"RAIZEIRO"},
  {sinan:"1883",code:"762220",desc:"REBAIXADOR DE COUROS"},
  {sinan:"2184",code:"821450",desc:"REBARBADOR DE METAL"},
  {sinan:"1688",code:"724215",desc:"REBITADOR A MARTELO PNEUMATICO"},
  {sinan:"1691",code:"724230",desc:"REBITADOR,A MAO"},
  {sinan:"1144",code:"421205",desc:"RECEBEDOR DE APOSTAS (LOTERIA)"},
  {sinan:"1145",code:"421210",desc:"RECEBEDOR DE APOSTAS (TURFE)"},
  {sinan:"1153",code:"422125",desc:"RECEPCIONISTA DE BANCO"},
  {sinan:"1291",code:"519945",desc:"RECEPCIONISTA DE CASAS DE ESPETACULOS"},
  {sinan:"1150",code:"422110",desc:"RECEPCIONISTA DE CONSULTORIO MEDICO OU DENTARIO"},
  {sinan:"1152",code:"422120",desc:"RECEPCIONISTA DE HOTEL"},
  {sinan:"1151",code:"422115",desc:"RECEPCIONISTA DE SEGURO SAUDE"},
  {sinan:"1149",code:"422105",desc:"RECEPCIONISTA,EM GERAL"},
  {sinan:"999",code:"371410",desc:"RECREADOR"},
  {sinan:"998",code:"371405",desc:"RECREADOR DE ACANTONAMENTO"},
  {sinan:"2174",code:"821335",desc:"RECUPERADOR DE GUIAS E CILINDROS"},
  {sinan:"623",code:"253110",desc:"REDATOR DE PUBLICIDADE"},
  {sinan:"664",code:"261530",desc:"REDATOR DE TEXTOS TECNICOS"},
  {sinan:"1962",code:"768120",desc:"REDEIRO"},
  {sinan:"1447",code:"631420",desc:"REDEIRO (PESCA)"},
  {sinan:"2257",code:"841472",desc:"REFINADOR DE OLEO E GORDURA"},
  {sinan:"2240",code:"841210",desc:"REFINADOR DE SAL"},
  {sinan:"622",code:"253105",desc:"RELACOES PUBLICAS"},
  {sinan:"1770",code:"741120",desc:"RELOJOEIRO (FABRICACAO)"},
  {sinan:"1771",code:"741125",desc:"RELOJOEIRO (REPARACAO)"},
  {sinan:"1861",code:"761363",desc:"REMETEDOR DE FIOS"},
  {sinan:"1757",code:"731330",desc:"REPARADOR DE APARELHOS DE TELECOMUNICACOES EM LABORATORIO"},
  {sinan:"2400",code:"954205",desc:"REPARADOR DE APARELHOS ELETRODOMESTICOS (EXCETO IMAGEM E SOM)"},
  {sinan:"2402",code:"954305",desc:"REPARADOR DE EQUIPAMENTOS DE ESCRITORIO"},
  {sinan:"2377",code:"915405",desc:"REPARADOR DE EQUIPAMENTOS FOTOGRAFICOS"},
  {sinan:"2374",code:"915210",desc:"REPARADOR DE INSTRUMENTOS MUSICAIS"},
  {sinan:"2401",code:"954210",desc:"REPARADOR DE RADIO,TV E SOM"},
  {sinan:"648",code:"261135",desc:"REPORTER (EXCLUSIVE RADIO E TELEVISAO)"},
  {sinan:"675",code:"261730",desc:"REPORTER DE RADIO E TELEVISAO"},
  {sinan:"1298",code:"521125",desc:"REPOSITOR DE MERCADORIAS"},
  {sinan:"679",code:"261820",desc:"REPOTER FOTOGRAFICO"},
  {sinan:"987",code:"354705",desc:"REPRESENTANTE COMERCIAL AUTONOMO"},
  {sinan:"2373",code:"915205",desc:"RESTAURADOR DE INSTRUMENTOS MUSICAIS (EXCETO CORDAS ARCADAS)"},
  {sinan:"1979",code:"768710",desc:"RESTAURADOR DE LIVROS"},
  {sinan:"2309",code:"848525",desc:"RETALHADOR DE CARNE"},
  {sinan:"1957",code:"766415",desc:"REVELADOR DE FILMES FOTOGRAFICOS,EM CORES"},
  {sinan:"1956",code:"766410",desc:"REVELADOR DE FILMES FOTOGRAFICOS,EM PRETO E BRANCO"},
  {sinan:"1600",code:"716615",desc:"REVESTIDOR DE INTERIORES (PAPEL,MATERIAL PLASTICO E EMBORRACHADOS)"},
  {sinan:"1582",code:"716110",desc:"REVESTIDOR DE SUPERFICIES DE CONCRETO"},
  {sinan:"649",code:"261140",desc:"REVISOR"},
  {sinan:"1871",code:"761810",desc:"REVISOR DE FIOS (PRODUCAO TEXTIL)"},
  {sinan:"1872",code:"761815",desc:"REVISOR DE TECIDOS ACABADOS"},
  {sinan:"1873",code:"761820",desc:"REVISOR DE TECIDOS CRUS"},
  {sinan:"1690",code:"724225",desc:"RISCADOR DE ESTRUTURAS METALICAS"},
  {sinan:"1900",code:"763120",desc:"RISCADOR DE ROUPAS"},
  {sinan:"1212",code:"514115",desc:"SACRISTAO"},
  {sinan:"2292",code:"848110",desc:"SALGADOR DE ALIMENTOS"},
  {sinan:"2293",code:"848115",desc:"SALSICHEIRO (FABRICACAO DE LINGUICA,SALSICHA E PRODUTOS SIMILARES)"},
  {sinan:"1260",code:"517115",desc:"SALVA-VIDAS"},
  {sinan:"1970",code:"768320",desc:"SAPATEIRO (CALCADOS SOB MEDIDA)"},
  {sinan:"26",code:"031110",desc:"SARGENTO BOMBEIRO MILITAR"},
  {sinan:"17",code:"021110",desc:"SARGENTO DA POLICIA MILITAR"},
  {sinan:"1988",code:"772115",desc:"SECADOR DE MADEIRA"},
  {sinan:"610",code:"252305",desc:"SECRETARIA EXECUTIVA"},
  {sinan:"612",code:"252315",desc:"SECRETARIA TRILINGUE"},
  {sinan:"36",code:"111220",desc:"SECRETARIO - EXECUTIVO"},
  {sinan:"611",code:"252310",desc:"SECRETARIO BILINGUE"},
  {sinan:"313",code:"215215",desc:"SEGUNDO OFICIAL DE MAQUINAS DA MARINHA MERCANTE"},
  {sinan:"15",code:"020310",desc:"SEGUNDO TENENTE DE POLICIA MILITAR"},
  {sinan:"2645",code:"519210",desc:"SELECIONADOR DE MATERIAL RECICLAVEL"},
  {sinan:"1971",code:"768325",desc:"SELEIRO"},
  {sinan:"29",code:"111105",desc:"SENADOR"},
  {sinan:"1253",code:"516610",desc:"SEPULTADOR"},
  {sinan:"1364",code:"613420",desc:"SERICULTOR"},
  {sinan:"1456",code:"632205",desc:"SERINGUEIRO"},
  {sinan:"1991",code:"773115",desc:"SERRADOR DE BORDAS NO DESDOBRAMENTO DE MADEIRA"},
  {sinan:"1992",code:"773120",desc:"SERRADOR DE MADEIRA"},
  {sinan:"1993",code:"773125",desc:"SERRADOR DE MADEIRA (SERRA CIRCULAR MULTIPLA)"},
  {sinan:"1994",code:"773130",desc:"SERRADOR DE MADEIRA (SERRA DE FITA MULTIPLA)"},
  {sinan:"1704",code:"724440",desc:"SERRALHEIRO"},
  {sinan:"1604",code:"717020",desc:"SERVENTE DE OBRAS"},
  {sinan:"1423",code:"623325",desc:"SEXADOR"},
  {sinan:"2045",code:"782145",desc:"SINALEIRO (PONTE-ROLANTE)"},
  {sinan:"2532",code:"515325",desc:"SOCIOEDUCADOR"},
  {sinan:"584",code:"251120",desc:"SOCIOLOGO"},
  {sinan:"2642",code:"515135",desc:"SOCORRISTA (EXCETO MEDICOS E ENFERMEIROS)"},
  {sinan:"2495",code:"3222B3",desc:"SOCORRISTA HABILITADO"},
  {sinan:"28",code:"031210",desc:"SOLDADO BOMBEIRO MILITAR"},
  {sinan:"19",code:"021210",desc:"SOLDADO DA POLICIA MILITAR"},
  {sinan:"1694",code:"724315",desc:"SOLDADOR"},
  {sinan:"1695",code:"724320",desc:"SOLDADOR A OXIGAS"},
  {sinan:"2406",code:"991120",desc:"SOLDADOR ALUMINOTERMICO EM CONSERVACAO DE TRILHOS"},
  {sinan:"1696",code:"724325",desc:"SOLDADOR ELETRICO"},
  {sinan:"1523",code:"711315",desc:"SONDADOR (POCOS DE PETROLEO E GAS)"},
  {sinan:"1524",code:"711320",desc:"SONDADOR DE POCOS (EXCETO DE PETROLEO E GAS)"},
  {sinan:"2167",code:"821255",desc:"SOPRADOR DE CONVERTEDOR"},
  {sinan:"1794",code:"752115",desc:"SOPRADOR DE VIDRO"},
  {sinan:"575",code:"242240",desc:"SUBPROCURADOR DE JUSTICA MILITAR"},
  {sinan:"576",code:"242245",desc:"SUBPROCURADOR-GERAL DA REPUBLICA"},
  {sinan:"577",code:"242250",desc:"SUBPROCURADOR-GERAL DO TRABALHO"},
  {sinan:"25",code:"031105",desc:"SUBTENENTE BOMBEIRO MILITAR"},
  {sinan:"16",code:"021105",desc:"SUBTENENTE DA POLICIA MILITAR"},
  {sinan:"314",code:"215220",desc:"SUPERINTENDENTE TECNICO NO TRANSPORTE AQUAVIARIO"},
  {sinan:"1823",code:"760405",desc:"SUPERVISOR (INDUSTRIA DE CALCADOS E ARTEFATOS DE COURO)"},
  {sinan:"1088",code:"410105",desc:"SUPERVISOR ADMINISTRATIVO"},
  {sinan:"924",code:"342540",desc:"SUPERVISOR DA ADMINISTRACAO DE AEROPORTOS"},
  {sinan:"1428",code:"630105",desc:"SUPERVISOR DA AQUICULTURA"},
  {sinan:"1429",code:"630110",desc:"SUPERVISOR DA AREA FLORESTAL"},
  {sinan:"1824",code:"760505",desc:"SUPERVISOR DA CONFECCAO DE ARTEFATOS DE TECIDOS,COUROS E AFINS"},
  {sinan:"2233",code:"840110",desc:"SUPERVISOR DA INDUSTRIA DE BEBIDAS"},
  {sinan:"2234",code:"840115",desc:"SUPERVISOR DA INDUSTRIA DE FUMO"},
  {sinan:"1781",code:"750205",desc:"SUPERVISOR DA INDUSTRIA DE MINERAIS NAO METALICOS (EXCETO OS DERIVADOS DE PETROLEO E CARVA"},
  {sinan:"2340",code:"910205",desc:"SUPERVISOR DA MANUTENCAO E REPARACAO DE VEICULOS LEVES"},
  {sinan:"2341",code:"910210",desc:"SUPERVISOR DA MANUTENCAO E REPARACAO DE VEICULOS PESADOS"},
  {sinan:"1765",code:"740105",desc:"SUPERVISOR DA MECANICA DE PRECISAO"},
  {sinan:"1825",code:"760605",desc:"SUPERVISOR DAS ARTES GRAFICAS (INDUSTRIA EDITORIAL E GRAFICA)"},
  {sinan:"1089",code:"410205",desc:"SUPERVISOR DE ALMOXARIFADO"},
  {sinan:"1170",code:"510115",desc:"SUPERVISOR DE ANDAR"},
  {sinan:"1496",code:"710105",desc:"SUPERVISOR DE APOIO OPERACIONAL NA MINERACAO"},
  {sinan:"1176",code:"510305",desc:"SUPERVISOR DE BOMBEIROS"},
  {sinan:"1132",code:"420105",desc:"SUPERVISOR DE CAIXAS E BILHETEIROS (EXCETO CAIXA DE BANCO)"},
  {sinan:"1090",code:"410210",desc:"SUPERVISOR DE CAMBIO"},
  {sinan:"914",code:"342315",desc:"SUPERVISOR DE CARGA E DESCARGA"},
  {sinan:"1133",code:"420110",desc:"SUPERVISOR DE COBRANCA"},
  {sinan:"1134",code:"420115",desc:"SUPERVISOR DE COLETADORES DE APOSTAS E DE JOGOS"},
  {sinan:"980",code:"354210",desc:"SUPERVISOR DE COMPRAS"},
  {sinan:"1091",code:"410215",desc:"SUPERVISOR DE CONTAS A PAGAR"},
  {sinan:"1617",code:"720160",desc:"SUPERVISOR DE CONTROLE DE TRATAMENTO TERMICO"},
  {sinan:"1092",code:"410220",desc:"SUPERVISOR DE CONTROLE PATRIMONIAL"},
  {sinan:"1093",code:"410225",desc:"SUPERVISOR DE CREDITO E COBRANCA"},
  {sinan:"1820",code:"760205",desc:"SUPERVISOR DE CURTIMENTO"},
  {sinan:"1108",code:"412120",desc:"SUPERVISOR DE DIGITACAO E OPERACAO"},
  {sinan:"2032",code:"780105",desc:"SUPERVISOR DE EMBALAGEM E ETIQUETAGEM"},
  {sinan:"925",code:"342545",desc:"SUPERVISOR DE EMPRESA AEREA EM AEROPORTOS"},
  {sinan:"544",code:"239430",desc:"SUPERVISOR DE ENSINO"},
  {sinan:"1135",code:"420120",desc:"SUPERVISOR DE ENTREVISTADORES E RECENSEADORES"},
  {sinan:"1365",code:"620105",desc:"SUPERVISOR DE EXPLORACAO AGRICOLA"},
  {sinan:"1366",code:"620110",desc:"SUPERVISOR DE EXPLORACAO AGROPECUARIA"},
  {sinan:"1367",code:"620115",desc:"SUPERVISOR DE EXPLORACAO PECUARIA"},
  {sinan:"1497",code:"710110",desc:"SUPERVISOR DE EXTRACAO DE SAL"},
  {sinan:"1766",code:"740110",desc:"SUPERVISOR DE FABRICACAO DE INSTRUMENTOS MUSICAIS"},
  {sinan:"2153",code:"820205",desc:"SUPERVISOR DE FABRICACAO DE PRODUTOS CERAMICOS,PORCELANATOS E AFINS"},
  {sinan:"2154",code:"820210",desc:"SUPERVISOR DE FABRICACAO DE PRODUTOS DE VIDRO"},
  {sinan:"1780",code:"750105",desc:"SUPERVISOR DE JOALHERIA"},
  {sinan:"1175",code:"510205",desc:"SUPERVISOR DE LAVANDERIA"},
  {sinan:"2311",code:"860105",desc:"SUPERVISOR DE MANUTENCAO (ELETROMECANICA)"},
  {sinan:"2335",code:"910110",desc:"SUPERVISOR DE MANUTENCAO DE APARELHOS TERMICOS,DE CLIMATIZACAO E DE REFRIGERACAO"},
  {sinan:"2336",code:"910115",desc:"SUPERVISOR DE MANUTENCAO DE BOMBAS,MOTORES,COMPRESSORES E EQUIPAMENTOS DE TRANSMISSA"},
  {sinan:"2337",code:"910120",desc:"SUPERVISOR DE MANUTENCAO DE MAQUINAS GRAFICAS"},
  {sinan:"2338",code:"910125",desc:"SUPERVISOR DE MANUTENCAO DE MAQUINAS INDUSTRIAIS TEXTEIS"},
  {sinan:"2339",code:"910130",desc:"SUPERVISOR DE MANUTENCAO DE MAQUINAS OPERATRIZES E DE USINAGEM"},
  {sinan:"2343",code:"910910",desc:"SUPERVISOR DE MANUTENCAO DE VIAS FERREAS"},
  {sinan:"2385",code:"950105",desc:"SUPERVISOR DE MANUTENCAO ELETRICA DE ALTA TENSAO INDUSTRIAL"},
  {sinan:"2388",code:"950305",desc:"SUPERVISOR DE MANUTENCAO ELETROMECANICA"},
  {sinan:"2386",code:"950110",desc:"SUPERVISOR DE MANUTENCAO ELETROMECANICA INDUSTRIAL,COMERCIAL E PREDIAL"},
  {sinan:"1734",code:"730105",desc:"SUPERVISOR DE MONTAGEM E INSTALACAO ELETROELETRONICA"},
  {sinan:"2312",code:"860110",desc:"SUPERVISOR DE OPERACAO DE FLUIDOS (DISTRIBUICAO,CAPTACAO,TRATAMENTO DE AGUA,GASES,VAPOR)"},
  {sinan:"2313",code:"860115",desc:"SUPERVISOR DE OPERACAO ELETRICA (GERACAO,TRANSMISSAO E DISTRIBUICAO DE ENERGIA ELETRICA)"},
  {sinan:"927",code:"342610",desc:"SUPERVISOR DE OPERACOES PORTUARIAS"},
  {sinan:"1094",code:"410230",desc:"SUPERVISOR DE ORCAMENTO"},
  {sinan:"1498",code:"710115",desc:"SUPERVISOR DE PERFURACAO E DESMONTE"},
  {sinan:"2232",code:"840105",desc:"SUPERVISOR DE PRODUCAO DA INDUSTRIA ALIMENTICIA"},
  {sinan:"1499",code:"710120",desc:"SUPERVISOR DE PRODUCAO NA MINERACAO"},
  {sinan:"1136",code:"420125",desc:"SUPERVISOR DE RECEPCIONISTAS"},
  {sinan:"2342",code:"910905",desc:"SUPERVISOR DE REPAROS LINHAS FERREAS"},
  {sinan:"1137",code:"420130",desc:"SUPERVISOR DE TELEFONISTAS"},
  {sinan:"1138",code:"420135",desc:"SUPERVISOR DE TELEMARKETING E ATENDIMENTO"},
  {sinan:"1095",code:"410235",desc:"SUPERVISOR DE TESOURARIA"},
  {sinan:"1500",code:"710125",desc:"SUPERVISOR DE TRANSPORTE NA MINERACAO"},
  {sinan:"1168",code:"510105",desc:"SUPERVISOR DE TRANSPORTES"},
  {sinan:"1504",code:"710220",desc:"SUPERVISOR DE USINA DE CONCRETO"},
  {sinan:"1293",code:"520110",desc:"SUPERVISOR DE VENDAS COMERCIAL"},
  {sinan:"1292",code:"520105",desc:"SUPERVISOR DE VENDAS DE SERVICOS"},
  {sinan:"1177",code:"510310",desc:"SUPERVISOR DE VIGILANTES"},
  {sinan:"1013",code:"373220",desc:"SUPERVISOR TECNICO OPERACIONAL DE SISTEMAS DE TELEVISAO E PRODUTORAS DE VIDEO"},
  {sinan:"1802",code:"752235",desc:"SURFASSAGISTA"},
  {sinan:"2459",code:"513615",desc:"SUSHIMAN"},
  {sinan:"566",code:"241335",desc:"TABELIAO DE NOTAS"},
  {sinan:"567",code:"241340",desc:"TABELIAO DE PROTESTOS"},
  {sinan:"1180",code:"511115",desc:"TAIFEIRO"},
  {sinan:"1985",code:"771120",desc:"TANOEIRO"},
  {sinan:"1597",code:"716535",desc:"TAQUEIRO"},
  {sinan:"941",code:"351510",desc:"TAQUIGRAFO"},
  {sinan:"881",code:"328110",desc:"TAXIDERMISTA"},
  {sinan:"1841",code:"761303",desc:"TECELAO (REDES)"},
  {sinan:"1842",code:"761306",desc:"TECELAO (RENDAS E BORDADOS)"},
  {sinan:"1843",code:"761309",desc:"TECELAO (TEAR AUTOMATICO)"},
  {sinan:"1844",code:"761312",desc:"TECELAO (TEAR JACQUARD)"},
  {sinan:"1959",code:"768105",desc:"TECELAO (TEAR MANUAL)"},
  {sinan:"1845",code:"761315",desc:"TECELAO (TEAR MECANICO DE MAQUINETA)"},
  {sinan:"1846",code:"761318",desc:"TECELAO (TEAR MECANICO DE XADREZ)"},
  {sinan:"1847",code:"761321",desc:"TECELAO (TEAR MECANICO LISO)"},
  {sinan:"1848",code:"761324",desc:"TECELAO (TEAR MECANICO,EXCETO JACQUARD)"},
  {sinan:"1850",code:"761330",desc:"TECELAO DE MALHAS (MAQUINA CIRCULAR)"},
  {sinan:"1851",code:"761333",desc:"TECELAO DE MALHAS (MAQUINA RETILINEA)"},
  {sinan:"1849",code:"761327",desc:"TECELAO DE MALHAS,A MAQUINA"},
  {sinan:"1853",code:"761339",desc:"TECELAO DE MEIAS (MAQUINA CIRCULAR)"},
  {sinan:"1854",code:"761342",desc:"TECELAO DE MEIAS (MAQUINA RETILINEA)"},
  {sinan:"1852",code:"761336",desc:"TECELAO DE MEIAS,A MAQUINA"},
  {sinan:"1960",code:"768110",desc:"TECELAO DE TAPETES,A MAO"},
  {sinan:"1855",code:"761345",desc:"TECELAO DE TAPETES,A MAQUINA"},
  {sinan:"839",code:"321105",desc:"TECNICO AGRICOLA"},
  {sinan:"840",code:"321110",desc:"TECNICO AGROPECUARIO"},
  {sinan:"634",code:"254110",desc:"TECNICO DA RECEITA FEDERAL"},
  {sinan:"783",code:"314705",desc:"TECNICO DE ACABAMENTO EM SIDERURGIA"},
  {sinan:"784",code:"314710",desc:"TECNICO DE ACIARIA EM SIDERURGIA"},
  {sinan:"877",code:"325205",desc:"TECNICO DE ALIMENTOS"},
  {sinan:"720",code:"301205",desc:"TECNICO DE APOIO A BIOENGENHARIA"},
  {sinan:"806",code:"317210",desc:"TECNICO DE APOIO AO USUARIO DE INFORMATICA (HELPDESK)"},
  {sinan:"1086",code:"395105",desc:"TECNICO DE APOIO EM PESQUISA E DESENVOLVIMENTO (EXCETO AGROPECUARIO E FLORESTAL)"},
  {sinan:"1087",code:"395110",desc:"TECNICO DE APOIO EM PESQUISA E DESENVOLVIMENTO AGROPECUARIO FLORESTAL"},
  {sinan:"722",code:"311110",desc:"TECNICO DE CELULOSE E PAPEL"},
  {sinan:"759",code:"313305",desc:"TECNICO DE COMUNICACAO DE DADOS"},
  {sinan:"928",code:"351105",desc:"TECNICO DE CONTABILIDADE"},
  {sinan:"728",code:"311505",desc:"TECNICO DE CONTROLE DE MEIO AMBIENTE"},
  {sinan:"424",code:"224125",desc:"TECNICO DE DESPORTO INDIVIDUAL E COLETIVO (EXCETO FUTEBOL)"},
  {sinan:"850",code:"322205",desc:"TECNICO DE ENFERMAGEM"},
  {sinan:"2630",code:"322245",desc:"TECNICO DE ENFERMAGEM DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"2496",code:"3222E1",desc:"TECNICO DE ENFERMAGEM DE SAUDE DA FAMILIA"},
  {sinan:"851",code:"322210",desc:"TECNICO DE ENFERMAGEM DE TERAPIA INTENSIVA"},
  {sinan:"852",code:"322215",desc:"TECNICO DE ENFERMAGEM DO TRABALHO"},
  {sinan:"853",code:"322220",desc:"TECNICO DE ENFERMAGEM PSIQUIATRICA"},
  {sinan:"743",code:"312205",desc:"TECNICO DE ESTRADAS"},
  {sinan:"785",code:"314715",desc:"TECNICO DE FUNDICAO EM SIDERURGIA"},
  {sinan:"1081",code:"391210",desc:"TECNICO DE GARANTIA DA QUALIDADE"},
  {sinan:"2498",code:"3224F1",desc:"TECNICO DE HIGIENE DENTAL DE SAUDE DA FAMILIA"},
  {sinan:"865",code:"322605",desc:"TECNICO DE IMOBILIZACAO ORTOPEDICA"},
  {sinan:"718",code:"301110",desc:"TECNICO DE LABORATORIO DE ANALISES FISICO-QUIMICAS (MATERIAIS DE CONSTRUCAO)"},
  {sinan:"425",code:"224130",desc:"TECNICO DE LABORATORIO E FISCALIZACAO DESPORTIVA"},
  {sinan:"717",code:"301105",desc:"TECNICO DE LABORATORIO INDUSTRIAL"},
  {sinan:"786",code:"314720",desc:"TECNICO DE LAMINACAO EM SIDERURGIA"},
  {sinan:"777",code:"314405",desc:"TECNICO DE MANUTENCAO DE SISTEMAS E INSTRUMENTOS"},
  {sinan:"752",code:"313120",desc:"TECNICO DE MANUTENCAO ELETRICA"},
  {sinan:"753",code:"313125",desc:"TECNICO DE MANUTENCAO ELETRICA DE MAQUINA"},
  {sinan:"755",code:"313205",desc:"TECNICO DE MANUTENCAO ELETRONICA"},
  {sinan:"756",code:"313210",desc:"TECNICO DE MANUTENCAO ELETRONICA (CIRCUITOS DE MAQUINAS COM COMANDO NUMERICO)"},
  {sinan:"1079",code:"391135",desc:"TECNICO DE MATERIA-PRIMA E MATERIAL"},
  {sinan:"729",code:"311510",desc:"TECNICO DE METEOROLOGIA"},
  {sinan:"793",code:"316305",desc:"TECNICO DE MINERACAO"},
  {sinan:"794",code:"316310",desc:"TECNICO DE MINERACAO (OLEO E PETROLEO)"},
  {sinan:"742",code:"312105",desc:"TECNICO DE OBRAS CIVIS"},
  {sinan:"2145",code:"813130",desc:"TECNICO DE OPERACAO (QUIMICA,PETROQUIMICA E AFINS)"},
  {sinan:"965",code:"353205",desc:"TECNICO DE OPERACOES E SERVICOS BANCARIOS - CAMBIO"},
  {sinan:"966",code:"353210",desc:"TECNICO DE OPERACOES E SERVICOS BANCARIOS - CREDITO IMOBILIARIO"},
  {sinan:"967",code:"353215",desc:"TECNICO DE OPERACOES E SERVICOS BANCARIOS - CREDITO RURAL"},
  {sinan:"968",code:"353220",desc:"TECNICO DE OPERACOES E SERVICOS BANCARIOS - LEASING"},
  {sinan:"969",code:"353225",desc:"TECNICO DE OPERACOES E SERVICOS BANCARIOS - RENDA FIXA E VARIAVEL"},
  {sinan:"864",code:"322505",desc:"TECNICO DE ORTOPEDIA"},
  {sinan:"1083",code:"391220",desc:"TECNICO DE PAINEL DE CONTROLE"},
  {sinan:"1077",code:"391125",desc:"TECNICO DE PLANEJAMENTO DE PRODUCAO"},
  {sinan:"1078",code:"391130",desc:"TECNICO DE PLANEJAMENTO E PROGRAMACAO DA MANUTENCAO"},
  {sinan:"797",code:"316325",desc:"TECNICO DE PRODUCAO EM REFINO DE PETROLEO"},
  {sinan:"760",code:"313310",desc:"TECNICO DE REDE (TELECOMUNICACOES)"},
  {sinan:"787",code:"314725",desc:"TECNICO DE REDUCAO NA SIDERURGIA (PRIMEIRA FUSAO)"},
  {sinan:"788",code:"314730",desc:"TECNICO DE REFRATARIO EM SIDERURGIA"},
  {sinan:"950",code:"351735",desc:"TECNICO DE RESSEGUROS"},
  {sinan:"744",code:"312210",desc:"TECNICO DE SANEAMENTO"},
  {sinan:"951",code:"351740",desc:"TECNICO DE SEGUROS"},
  {sinan:"761",code:"313315",desc:"TECNICO DE TELECOMUNICACOES (TELEFONIA)"},
  {sinan:"762",code:"313320",desc:"TECNICO DE TRANSMISSAO (TELECOMUNICACOES)"},
  {sinan:"640",code:"254415",desc:"TECNICO DE TRIBUTOS ESTADUAL"},
  {sinan:"641",code:"254420",desc:"TECNICO DE TRIBUTOS MUNICIPAL"},
  {sinan:"730",code:"311515",desc:"TECNICO DE UTILIDADE (PRODUCAO E DISTRIBUICAO DE VAPOR,GASES,OLEOS,COMBUSTIVEIS,ENERGIA)"},
  {sinan:"976",code:"354135",desc:"TECNICO DE VENDAS"},
  {sinan:"836",code:"319205",desc:"TECNICO DO MOBILIARIO"},
  {sinan:"754",code:"313130",desc:"TECNICO ELETRICISTA"},
  {sinan:"757",code:"313215",desc:"TECNICO ELETRONICO"},
  {sinan:"931",code:"351305",desc:"TECNICO EM ADMINISTRACAO"},
  {sinan:"932",code:"351310",desc:"TECNICO EM ADMINISTRACAO DE COMERCIO EXTERIOR"},
  {sinan:"745",code:"312305",desc:"TECNICO EM AGRIMENSURA"},
  {sinan:"977",code:"354140",desc:"TECNICO EM ATENDIMENTO E VENDAS"},
  {sinan:"774",code:"314305",desc:"TECNICO EM AUTOMOBILISTICA"},
  {sinan:"993",code:"371110",desc:"TECNICO EM BIBLIOTECONOMIA"},
  {sinan:"878",code:"325305",desc:"TECNICO EM BIOTECNOLOGIA"},
  {sinan:"837",code:"320105",desc:"TECNICO EM BIOTERISMO"},
  {sinan:"726",code:"311405",desc:"TECNICO EM BORRACHA"},
  {sinan:"834",code:"319105",desc:"TECNICO EM CALCADOS E ARTEFATOS DE COURO"},
  {sinan:"780",code:"314610",desc:"TECNICO EM CALDEIRARIA"},
  {sinan:"763",code:"313405",desc:"TECNICO EM CALIBRACAO"},
  {sinan:"844",code:"321310",desc:"TECNICO EM CARCINICULTURA"},
  {sinan:"835",code:"319110",desc:"TECNICO EM CONFECCOES DO VESTUARIO"},
  {sinan:"723",code:"311115",desc:"TECNICO EM CURTIMENTO"},
  {sinan:"964",code:"352420",desc:"TECNICO EM DIREITOS AUTORAIS"},
  {sinan:"716",code:"300305",desc:"TECNICO EM ELETROMECANICA"},
  {sinan:"2494",code:"3135D2",desc:"TECNICO EM EQUIPAMENTO MEDICO HOSPITALAR"},
  {sinan:"781",code:"314615",desc:"TECNICO EM ESTRUTURAS METALICAS"},
  {sinan:"2478",code:"325115",desc:"TECNICO EM FARMACIA"},
  {sinan:"766",code:"313505",desc:"TECNICO EM FOTONICA"},
  {sinan:"746",code:"312310",desc:"TECNICO EM GEODESIA E CARTOGRAFIA"},
  {sinan:"789",code:"316105",desc:"TECNICO EM GEOFISICA"},
  {sinan:"790",code:"316110",desc:"TECNICO EM GEOLOGIA"},
  {sinan:"791",code:"316115",desc:"TECNICO EM GEOQUIMICA"},
  {sinan:"792",code:"316120",desc:"TECNICO EM GEOTECNIA"},
  {sinan:"1014",code:"374105",desc:"TECNICO EM GRAVACAO DE AUDIO"},
  {sinan:"747",code:"312315",desc:"TECNICO EM HIDROGRAFIA"},
  {sinan:"860",code:"322405",desc:"TECNICO EM HIGIENE DENTAL"},
  {sinan:"838",code:"320110",desc:"TECNICO EM HISTOLOGIA"},
  {sinan:"879",code:"325310",desc:"TECNICO EM IMUNOBIOLOGICOS"},
  {sinan:"1015",code:"374110",desc:"TECNICO EM INSTALACAO DE EQUIPAMENTOS DE AUDIO"},
  {sinan:"764",code:"313410",desc:"TECNICO EM INSTRUMENTACAO"},
  {sinan:"876",code:"325110",desc:"TECNICO EM LABORATORIO DE FARMACIA"},
  {sinan:"841",code:"321205",desc:"TECNICO EM MADEIRA"},
  {sinan:"2372",code:"915115",desc:"TECNICO EM MANUTENCAO DE BALANCAS"},
  {sinan:"758",code:"313220",desc:"TECNICO EM MANUTENCAO DE EQUIPAMENTOS DE INFORMATICA"},
  {sinan:"2376",code:"915305",desc:"TECNICO EM MANUTENCAO DE EQUIPAMENTOS E INSTRUMENTOS MEDICO-HOSPITALARES"},
  {sinan:"2371",code:"915110",desc:"TECNICO EM MANUTENCAO DE HIDROMETROS"},
  {sinan:"2370",code:"915105",desc:"TECNICO EM MANUTENCAO DE INSTRUMENTOS DE MEDICAO E PRECISAO"},
  {sinan:"778",code:"314410",desc:"TECNICO EM MANUTENCAO DE MAQUINAS"},
  {sinan:"1016",code:"374115",desc:"TECNICO EM MASTERIZACAO DE AUDIO"},
  {sinan:"725",code:"311305",desc:"TECNICO EM MATERIAIS,PRODUTOS CERAMICOS E VIDROS"},
  {sinan:"767",code:"314105",desc:"TECNICO EM MECANICA DE PRECISAO"},
  {sinan:"714",code:"300105",desc:"TECNICO EM MECATRONICA - AUTOMACAO DA MANUFATURA"},
  {sinan:"715",code:"300110",desc:"TECNICO EM MECATRONICA - ROBOTICA"},
  {sinan:"867",code:"324105",desc:"TECNICO EM METODOS ELETROGRAFICOS EM ENCEFALOGRAFIA"},
  {sinan:"868",code:"324110",desc:"TECNICO EM METODOS GRAFICOS EM CARDIOLOGIA"},
  {sinan:"845",code:"321315",desc:"TECNICO EM MITILICULTURA"},
  {sinan:"1019",code:"374130",desc:"TECNICO EM MIXAGEM DE AUDIO"},
  {sinan:"995",code:"371210",desc:"TECNICO EM MUSEOLOGIA"},
  {sinan:"2455",code:"325210",desc:"TECNICO EM NUTRICAO E DIETETICA"},
  {sinan:"1011",code:"373210",desc:"TECNICO EM OPERACAO DE EQUIPAMENTO DE EXIBICAO DE TELEVISAO"},
  {sinan:"1010",code:"373205",desc:"TECNICO EM OPERACAO DE EQUIPAMENTOS DE PRODUCAO PARA TELEVISAO E PRODUTORAS DE VIDEO"},
  {sinan:"1012",code:"373215",desc:"TECNICO EM OPERACAO DE EQUIPAMENTOS DE TRANSMISSAO/RECEPCAO DE TELEVISAO"},
  {sinan:"858",code:"322305",desc:"TECNICO EM OPTICA"},
  {sinan:"859",code:"322310",desc:"TECNICO EM OPTOMETRIA"},
  {sinan:"2492",code:"2236I1",desc:"TECNICO EM ORIENTACAO E MOBILIDADE DE CEGOS E DEF VISUAIS"},
  {sinan:"870",code:"324205",desc:"TECNICO EM PATOLOGIA CLINICA"},
  {sinan:"866",code:"323105",desc:"TECNICO EM PECUARIA"},
  {sinan:"796",code:"316320",desc:"TECNICO EM PESQUISA MINERAL"},
  {sinan:"724",code:"311205",desc:"TECNICO EM PETROQUIMICA"},
  {sinan:"843",code:"321305",desc:"TECNICO EM PISCICULTURA"},
  {sinan:"798",code:"316330",desc:"TECNICO EM PLANEJAMENTO DE LAVRA DE MINAS"},
  {sinan:"727",code:"311410",desc:"TECNICO EM PLASTICO"},
  {sinan:"795",code:"316315",desc:"TECNICO EM PROCESSAMENTO MINERAL (EXCETO PETROLEO)"},
  {sinan:"996",code:"371305",desc:"TECNICO EM PROGRAMACAO VISUAL"},
  {sinan:"869",code:"324115",desc:"TECNICO EM RADIOLOGIA E IMAGENOLOGIA"},
  {sinan:"846",code:"321320",desc:"TECNICO EM RANICULTURA"},
  {sinan:"2493",code:"3135D1",desc:"TECNICO EM REABILITACAO"},
  {sinan:"2632",code:"322425",desc:"TECNICO EM SAUDE BUCAL DA ESTRATEGIA DE SAUDE DA FAMILIA"},
  {sinan:"940",code:"351505",desc:"TECNICO EM SECRETARIADO"},
  {sinan:"943",code:"351605",desc:"TECNICO EM SEGURANCA NO TRABALHO"},
  {sinan:"782",code:"314620",desc:"TECNICO EM SOLDAGEM"},
  {sinan:"1018",code:"374125",desc:"TECNICO EM SONORIZACAO"},
  {sinan:"731",code:"311520",desc:"TECNICO EM TRATAMENTO DE EFLUENTES"},
  {sinan:"988",code:"354805",desc:"TECNICO EM TURISMO"},
  {sinan:"842",code:"321210",desc:"TECNICO FLORESTAL"},
  {sinan:"997",code:"371310",desc:"TECNICO GRAFICO"},
  {sinan:"768",code:"314110",desc:"TECNICO MECANICO"},
  {sinan:"775",code:"314310",desc:"TECNICO MECANICO (AERONAVES)"},
  {sinan:"769",code:"314115",desc:"TECNICO MECANICO (CALEFACAO,VENTILACAO E REFRIGERACAO)"},
  {sinan:"776",code:"314315",desc:"TECNICO MECANICO (EMBARCACOES)"},
  {sinan:"770",code:"314120",desc:"TECNICO MECANICO (MAQUINAS)"},
  {sinan:"771",code:"314125",desc:"TECNICO MECANICO (MOTORES)"},
  {sinan:"772",code:"314205",desc:"TECNICO MECANICO NA FABRICACAO DE FERRAMENTAS"},
  {sinan:"773",code:"314210",desc:"TECNICO MECANICO NA MANUTENCAO DE FERRAMENTAS"},
  {sinan:"1085",code:"391230",desc:"TECNICO OPERACIONAL DE SERVICOS DE CORREIOS"},
  {sinan:"721",code:"311105",desc:"TECNICO QUIMICO"},
  {sinan:"719",code:"301115",desc:"TECNICO QUIMICO DE PETROLEO"},
  {sinan:"732",code:"311605",desc:"TECNICO TEXTIL"},
  {sinan:"733",code:"311610",desc:"TECNICO TEXTIL (TRATAMENTOS QUIMICOS)"},
  {sinan:"734",code:"311615",desc:"TECNICO TEXTIL DE FIACAO"},
  {sinan:"735",code:"311620",desc:"TECNICO TEXTIL DE MALHARIA"},
  {sinan:"736",code:"311625",desc:"TECNICO TEXTIL DE TECELAGEM"},
  {sinan:"2554",code:"222215",desc:"TECNOLOGO EM ALIMENTOS"},
  {sinan:"2510",code:"202120",desc:"TECNOLOGO EM AUTOMACAO INDUSTRIAL"},
  {sinan:"2545",code:"214280",desc:"TECNOLOGO EM CONSTRUCAO CIVIL"},
  {sinan:"270",code:"214360",desc:"TECNOLOGO EM ELETRICIDADE"},
  {sinan:"271",code:"214365",desc:"TECNOLOGO EM ELETRONICA"},
  {sinan:"2547",code:"214435",desc:"TECNOLOGO EM FABRICACAO MECANICA"},
  {sinan:"2628",code:"271110",desc:"TECNOLOGO EM GASTRONOMIA"},
  {sinan:"2538",code:"142120",desc:"TECNOLOGO EM GESTAO ADMINISTRATIVO- FINANCEIRA"},
  {sinan:"2539",code:"142535",desc:"TECNOLOGO EM GESTAO DA TECNOLOGIA DA INFORMACAO"},
  {sinan:"2536",code:"131215",desc:"TECNOLOGO EM GESTAO HOSPITALAR"},
  {sinan:"2636",code:"342125",desc:"TECNOLOGO EM LOGISTICA DE TRANSPORTE"},
  {sinan:"2509",code:"202115",desc:"TECNOLOGO EM MECATRONICA"},
  {sinan:"2544",code:"214010",desc:"TECNOLOGO EM MEIO AMBIENTE"},
  {sinan:"2549",code:"214615",desc:"TECNOLOGO EM METALURGIA"},
  {sinan:"2550",code:"214745",desc:"TECNOLOGO EM PETROLEO E GAS"},
  {sinan:"2542",code:"213215",desc:"TECNOLOGO EM PROCESSOS QUIMICOS"},
  {sinan:"2624",code:"262135",desc:"TECNOLOGO EM PRODUCAO AUDIOVISUAL"},
  {sinan:"2623",code:"262130",desc:"TECNOLOGO EM PRODUCAO FONOGRAFICA"},
  {sinan:"2552",code:"214930",desc:"TECNOLOGO EM PRODUCAO INDUSTRIAL"},
  {sinan:"2548",code:"214535",desc:"TECNOLOGO EM PRODUCAO SULCROALCOOLEIRA"},
  {sinan:"2634",code:"324120",desc:"TECNOLOGO EM RADIOLOGIA"},
  {sinan:"2551",code:"214750",desc:"TECNOLOGO EM ROCHAS ORNAMENTAIS"},
  {sinan:"2621",code:"252320",desc:"TECNOLOGO EM SECRETARIADO ESCOLAR"},
  {sinan:"2553",code:"214935",desc:"TECNOLOGO EM SEGURANCA DO TRABALHO"},
  {sinan:"2540",code:"142710",desc:"TECNOLOGO EM SISTEMAS BIOMEDICOS"},
  {sinan:"2546",code:"214370",desc:"TECNOLOGO EM TELECOMUNICACOES"},
  {sinan:"2527",code:"324125",desc:"TECNOLOGO OFTALMICO"},
  {sinan:"1154",code:"422205",desc:"TELEFONISTA"},
  {sinan:"1155",code:"422210",desc:"TELEOPERADOR"},
  {sinan:"1583",code:"716205",desc:"TELHADOR (TELHAS DE ARGILA E MATERIAS SIMILARES)"},
  {sinan:"1584",code:"716210",desc:"TELHADOR (TELHAS DE CIMENTO-AMIANTO)"},
  {sinan:"1585",code:"716215",desc:"TELHADOR (TELHAS METALICAS)"},
  {sinan:"1586",code:"716220",desc:"TELHADOR (TELHAS PLATICAS)"},
  {sinan:"1664",code:"723125",desc:"TEMPERADOR DE METAIS E DE COMPOSITOS"},
  {sinan:"2205",code:"823255",desc:"TEMPERADOR DE VIDRO"},
  {sinan:"24",code:"030305",desc:"TENENTE DO CORPO DE BOMBEIROS MILITAR"},
  {sinan:"22",code:"030115",desc:"TENENTE-CORONEL BOMBEIRO MILITAR"},
  {sinan:"11",code:"020110",desc:"TENENTE-CORONEL DA POLICIA MILITAR"},
  {sinan:"713",code:"263115",desc:"TEOLOGO"},
  {sinan:"2454",code:"322125",desc:"TERAPEUTA HOLISTICO"},
  {sinan:"417",code:"223620",desc:"TERAPEUTA OCUPACIONAL"},
  {sinan:"970",code:"353230",desc:"TESOUREIRO DE BANCO"},
  {sinan:"741",code:"311725",desc:"TINGIDOR DE COUROS E PELES"},
  {sinan:"1244",code:"516330",desc:"TINGIDOR DE ROUPAS"},
  {sinan:"1972",code:"768605",desc:"TIPOGRAFO"},
  {sinan:"1045",code:"376250",desc:"TITERITEIRO"},
  {sinan:"748",code:"312320",desc:"TOPOGRAFO"},
  {sinan:"1540",code:"712225",desc:"TORNEIRO (LAVRA DE PEDRA)"},
  {sinan:"2009",code:"773355",desc:"TORNEIRO NA USINAGEM CONVENCIONAL DE MADEIRA"},
  {sinan:"2265",code:"841625",desc:"TORRADOR DE CACAU"},
  {sinan:"2262",code:"841610",desc:"TORRADOR DE CAFE"},
  {sinan:"1526",code:"711330",desc:"TORRISTA (PETROLEO)"},
  {sinan:"1281",code:"519320",desc:"TOSADOR DE ANIMAIS DOMESTICOS"},
  {sinan:"1368",code:"621005",desc:"TRABALHADOR AGROPECUARIO EM GERAL"},
  {sinan:"1419",code:"623305",desc:"TRABALHADOR DA AVICULTURA DE CORTE"},
  {sinan:"1420",code:"623310",desc:"TRABALHADOR DA AVICULTURA DE POSTURA"},
  {sinan:"1416",code:"623205",desc:"TRABALHADOR DA CAPRINOCULTURA"},
  {sinan:"1377",code:"622205",desc:"TRABALHADOR DA CULTURA DE ALGODAO"},
  {sinan:"1373",code:"622105",desc:"TRABALHADOR DA CULTURA DE ARROZ"},
  {sinan:"1392",code:"622605",desc:"TRABALHADOR DA CULTURA DE CACAU"},
  {sinan:"1393",code:"622610",desc:"TRABALHADOR DA CULTURA DE CAFE"},
  {sinan:"1374",code:"622110",desc:"TRABALHADOR DA CULTURA DE CANA-DE-ACUCAR"},
  {sinan:"1394",code:"622615",desc:"TRABALHADOR DA CULTURA DE ERVA-MATE"},
  {sinan:"1405",code:"622805",desc:"TRABALHADOR DA CULTURA DE ESPECIARIAS"},
  {sinan:"1395",code:"622620",desc:"TRABALHADOR DA CULTURA DE FUMO"},
  {sinan:"1396",code:"622625",desc:"TRABALHADOR DA CULTURA DE GUARANA"},
  {sinan:"1375",code:"622115",desc:"TRABALHADOR DA CULTURA DE MILHO E SORGO"},
  {sinan:"1406",code:"622810",desc:"TRABALHADOR DA CULTURA DE PLANTAS AROMATICAS E MEDICINAIS"},
  {sinan:"1378",code:"622210",desc:"TRABALHADOR DA CULTURA DE SISAL"},
  {sinan:"1376",code:"622120",desc:"TRABALHADOR DA CULTURA DE TRIGO,AVEIA,CEVADA E TRITICALE"},
  {sinan:"1379",code:"622215",desc:"TRABALHADOR DA CULTURA DO RAMI"},
  {sinan:"1422",code:"623320",desc:"TRABALHADOR DA CUNICULTURA"},
  {sinan:"2209",code:"823320",desc:"TRABALHADOR DA ELABORACAO DE PRE-FABRICADOS (CIMENTO AMIANTO)"},
  {sinan:"2210",code:"823325",desc:"TRABALHADOR DA ELABORACAO DE PRE-FABRICADOS (CONCRETO ARMADO)"},
  {sinan:"1473",code:"632405",desc:"TRABALHADOR DA EXPLORACAO DE ACAI"},
  {sinan:"1459",code:"632305",desc:"TRABALHADOR DA EXPLORACAO DE ANDIROBA"},
  {sinan:"1477",code:"632505",desc:"TRABALHADOR DA EXPLORACAO DE ARVORES E ARBUSTOS PRODUTORES DE SUBSTANCIAS AROMAT.,MED"},
  {sinan:"1460",code:"632310",desc:"TRABALHADOR DA EXPLORACAO DE BABACU"},
  {sinan:"1461",code:"632315",desc:"TRABALHADOR DA EXPLORACAO DE BACABA"},
  {sinan:"1462",code:"632320",desc:"TRABALHADOR DA EXPLORACAO DE BURITI"},
  {sinan:"1463",code:"632325",desc:"TRABALHADOR DA EXPLORACAO DE CARNAUBA"},
  {sinan:"1474",code:"632410",desc:"TRABALHADOR DA EXPLORACAO DE CASTANHA"},
  {sinan:"1478",code:"632510",desc:"TRABALHADOR DA EXPLORACAO DE CIPOS PRODUTORES DE SUBSTANCIAS AROMATICAS,MEDICINAIS E TOX"},
  {sinan:"1464",code:"632330",desc:"TRABALHADOR DA EXPLORACAO DE COCO-DA-PRAIA"},
  {sinan:"1465",code:"632335",desc:"TRABALHADOR DA EXPLORACAO DE COPAIBA"},
  {sinan:"1457",code:"632210",desc:"TRABALHADOR DA EXPLORACAO DE ESPECIES PRODUTORAS DE GOMAS NAO ELASTICAS"},
  {sinan:"1479",code:"632515",desc:"TRABALHADOR DA EXPLORACAO DE MADEIRAS TANANTES"},
  {sinan:"1466",code:"632340",desc:"TRABALHADOR DA EXPLORACAO DE MALVA (PAINA)"},
  {sinan:"1467",code:"632345",desc:"TRABALHADOR DA EXPLORACAO DE MURUMURU"},
  {sinan:"1468",code:"632350",desc:"TRABALHADOR DA EXPLORACAO DE OITICICA"},
  {sinan:"1469",code:"632355",desc:"TRABALHADOR DA EXPLORACAO DE OURICURI"},
  {sinan:"1470",code:"632360",desc:"TRABALHADOR DA EXPLORACAO DE PEQUI"},
  {sinan:"1471",code:"632365",desc:"TRABALHADOR DA EXPLORACAO DE PIACAVA"},
  {sinan:"1475",code:"632415",desc:"TRABALHADOR DA EXPLORACAO DE PINHAO"},
  {sinan:"1476",code:"632420",desc:"TRABALHADOR DA EXPLORACAO DE PUPUNHA"},
  {sinan:"1480",code:"632520",desc:"TRABALHADOR DA EXPLORACAO DE RAIZES PRODUTORAS DE SUBSTANCIAS AROMATICAS,MEDICINAIS E TO"},
  {sinan:"1458",code:"632215",desc:"TRABALHADOR DA EXPLORACAO DE RESINAS"},
  {sinan:"1472",code:"632370",desc:"TRABALHADOR DA EXPLORACAO DE TUCUM"},
  {sinan:"1481",code:"632525",desc:"TRABALHADOR DA EXTRACAO DE SUBSTANCIAS AROMATICAS,MEDICINAIS E TOXICAS,EM GERAL"},
  {sinan:"2139",code:"812110",desc:"TRABALHADOR DA FABRICACAO DE MUNICAO E EXPLOSIVOS"},
  {sinan:"2211",code:"823330",desc:"TRABALHADOR DA FABRICACAO DE PEDRAS ARTIFICIAIS"},
  {sinan:"2095",code:"811125",desc:"TRABALHADOR DA FABRICACAO DE RESINAS E VERNIZES"},
  {sinan:"2411",code:"991405",desc:"TRABALHADOR DA MANUTENCAO DE EDIFICACOES"},
  {sinan:"1417",code:"623210",desc:"TRABALHADOR DA OVINOCULTURA"},
  {sinan:"1411",code:"623105",desc:"TRABALHADOR DA PECUARIA (ASININOS E MUARES)"},
  {sinan:"1412",code:"623110",desc:"TRABALHADOR DA PECUARIA (BOVINOS CORTE)"},
  {sinan:"1413",code:"623115",desc:"TRABALHADOR DA PECUARIA (BOVINOS LEITE)"},
  {sinan:"1414",code:"623120",desc:"TRABALHADOR DA PECUARIA (BUBALINOS)"},
  {sinan:"1415",code:"623125",desc:"TRABALHADOR DA PECUARIA (EQUINOS)"},
  {sinan:"1418",code:"623215",desc:"TRABALHADOR DA SUINOCULTURA"},
  {sinan:"1455",code:"632125",desc:"TRABALHADOR DE EXTRACAO FLORESTAL,EM GERAL"},
  {sinan:"2258",code:"841476",desc:"TRABALHADOR DE FABRICACAO DE MARGARINA"},
  {sinan:"2300",code:"848325",desc:"TRABALHADOR DE FABRICACAO DE SORVETE"},
  {sinan:"2096",code:"811130",desc:"TRABALHADOR DE FABRICACAO DE TINTAS"},
  {sinan:"2270",code:"841720",desc:"TRABALHADOR DE FABRICACAO DE VINHOS"},
  {sinan:"1409",code:"623015",desc:"TRABALHADOR DE PECUARIA POLIVALENTE"},
  {sinan:"2259",code:"841484",desc:"TRABALHADOR DE PREPARACAO DE PESCADOS (LIMPEZA)"},
  {sinan:"1218",code:"514225",desc:"TRABALHADOR DE SERVICOS DE MANUTENCAO DE EDIFICIOS E LOGRADOUROS"},
  {sinan:"2260",code:"841505",desc:"TRABALHADOR DE TRATAMENTO DO LEITE E FABRICACAO DE LATICINIOS E AFINS"},
  {sinan:"1929",code:"765405",desc:"TRABALHADOR DO ACABAMENTO DE ARTEFATOS DE TECIDOS E COUROS"},
  {sinan:"2310",code:"848605",desc:"TRABALHADOR DO BENEFICIAMENTO DE FUMO"},
  {sinan:"1424",code:"623405",desc:"TRABALHADOR EM CRIATORIOS DE ANIMAIS PRODUTORES DE VENENO"},
  {sinan:"1425",code:"623410",desc:"TRABALHADOR NA APICULTURA"},
  {sinan:"1397",code:"622705",desc:"TRABALHADOR NA CULTURA DE AMENDOIM"},
  {sinan:"1398",code:"622710",desc:"TRABALHADOR NA CULTURA DE CANOLA"},
  {sinan:"1399",code:"622715",desc:"TRABALHADOR NA CULTURA DE COCO-DA-BAIA"},
  {sinan:"1400",code:"622720",desc:"TRABALHADOR NA CULTURA DE DENDE"},
  {sinan:"1401",code:"622725",desc:"TRABALHADOR NA CULTURA DE MAMONA"},
  {sinan:"1402",code:"622730",desc:"TRABALHADOR NA CULTURA DE SOJA"},
  {sinan:"1403",code:"622735",desc:"TRABALHADOR NA CULTURA DO GIRASSOL"},
  {sinan:"1404",code:"622740",desc:"TRABALHADOR NA CULTURA DO LINHO"},
  {sinan:"2206",code:"823265",desc:"TRABALHADOR NA FABRICACAO DE PRODUTOS ABRASIVOS"},
  {sinan:"1426",code:"623415",desc:"TRABALHADOR NA MINHOCULTURA"},
  {sinan:"1380",code:"622305",desc:"TRABALHADOR NA OLERICULTURA (FRUTOS E SEMENTES)"},
  {sinan:"1381",code:"622310",desc:"TRABALHADOR NA OLERICULTURA (LEGUMES)"},
  {sinan:"1382",code:"622315",desc:"TRABALHADOR NA OLERICULTURA (RAIZES,BULBOS E TUBERCULOS)"},
  {sinan:"1383",code:"622320",desc:"TRABALHADOR NA OLERICULTURA (TALOS,FOLHAS E FLORES)"},
  {sinan:"1491",code:"643005",desc:"TRABALHADOR NA OPERACAO DE SISTEMA DE IRRIGACAO LOCALIZADA (MICROASPERSAO E GOTEJAMENTO"},
  {sinan:"1492",code:"643010",desc:"TRABALHADOR NA OPERACAO DE SISTEMA DE IRRIGACAO POR ASPERSAO (PIVO CENTRAL)"},
  {sinan:"1493",code:"643015",desc:"TRABALHADOR NA OPERACAO DE SISTEMAS CONVENCIONAIS DE IRRIGACAO POR ASPERSAO"},
  {sinan:"1494",code:"643020",desc:"TRABALHADOR NA OPERACAO DE SISTEMAS DE IRRIGACAO E ASPERSAO (ALTO PROPELIDO)"},
  {sinan:"1495",code:"643025",desc:"TRABALHADOR NA OPERACAO DE SISTEMAS DE IRRIGACAO POR SUPERFICIE E DRENAGEM"},
  {sinan:"1371",code:"622015",desc:"TRABALHADOR NA PRODUCAO DE MUDAS E SEMENTES"},
  {sinan:"1427",code:"623420",desc:"TRABALHADOR NA SERICICULTURA"},
  {sinan:"1389",code:"622505",desc:"TRABALHADOR NO CULTIVO DE ARVORES FRUTIFERAS"},
  {sinan:"1390",code:"622510",desc:"TRABALHADOR NO CULTIVO DE ESPECIES FRUTIFERAS RASTEIRAS"},
  {sinan:"1384",code:"622405",desc:"TRABALHADOR NO CULTIVO DE FLORES E FOLHAGENS DE CORTE"},
  {sinan:"1385",code:"622410",desc:"TRABALHADOR NO CULTIVO DE FLORES EM VASO"},
  {sinan:"1386",code:"622415",desc:"TRABALHADOR NO CULTIVO DE FORRACOES"},
  {sinan:"1387",code:"622420",desc:"TRABALHADOR NO CULTIVO DE MUDAS"},
  {sinan:"1388",code:"622425",desc:"TRABALHADOR NO CULTIVO DE PLANTAS ORNAMENTAIS"},
  {sinan:"1391",code:"622515",desc:"TRABALHADOR NO CULTIVO DE TREPADEIRAS FRUTIFERAS"},
  {sinan:"1909",code:"764005",desc:"TRABALHADOR POLIVALENTE DA CONFECCAO DE CALCADOS"},
  {sinan:"1874",code:"762005",desc:"TRABALHADOR POLIVALENTE DO CURTIMENTO DE COUROS E PELES"},
  {sinan:"1372",code:"622020",desc:"TRABALHADOR VOLANTE DA AGRICULTURA"},
  {sinan:"1541",code:"712230",desc:"TRACADOR DE PEDRAS"},
  {sinan:"658",code:"261420",desc:"TRADUTOR"},
  {sinan:"1709",code:"724610",desc:"TRANCADOR DE CABOS DE ACO"},
  {sinan:"1795",code:"752120",desc:"TRANSFORMADOR DE TUBOS DE VIDRO"},
  {sinan:"1046",code:"376255",desc:"TRAPEZISTA"},
  {sinan:"1410",code:"623020",desc:"TRATADOR DE ANIMAIS"},
  {sinan:"1487",code:"641015",desc:"TRATORISTA AGRICOLA"},
  {sinan:"1791",code:"751130",desc:"TREFILADOR (JOALHERIA E OURIVESARIA)"},
  {sinan:"2133",code:"811775",desc:"TREFILADOR DE BORRACHA"},
  {sinan:"1659",code:"722415",desc:"TREFILADOR DE METAIS,A MAQUINA"},
  {sinan:"426",code:"224135",desc:"TREINADOR PROFISSIONAL DE FUTEBOL"},
  {sinan:"1961",code:"768115",desc:"TRICOTEIRO,A MAO"},
  {sinan:"2069",code:"782810",desc:"TROPEIRO"},
  {sinan:"2664",code:"122520",desc:"TURISMOLOGO"},
  {sinan:"2476",code:"214130",desc:"URBANISTA"},
  {sinan:"1892",code:"762345",desc:"VAQUEADOR DE COUROS E PELES"},
  {sinan:"2026",code:"776430",desc:"VASSOUREIRO"},
  {sinan:"1308",code:"524305",desc:"VENDEDOR AMBULANTE"},
  {sinan:"1295",code:"521110",desc:"VENDEDOR DE COMERCIO VAREJISTA"},
  {sinan:"1294",code:"521105",desc:"VENDEDOR EM COMERCIO ATACADISTA"},
  {sinan:"1304",code:"524105",desc:"VENDEDOR EM DOMICILIO"},
  {sinan:"1307",code:"524215",desc:"VENDEDOR PERMISSIONARIO"},
  {sinan:"978",code:"354145",desc:"VENDEDOR PRACISTA"},
  {sinan:"32",code:"111120",desc:"VEREADOR"},
  {sinan:"1605",code:"717025",desc:"VIBRADORISTA"},
  {sinan:"40",code:"111240",desc:"VICE-GOVERNADOR DE ESTADO"},
  {sinan:"41",code:"111245",desc:"VICE-GOVERNADOR DO DISTRITO FEDERAL"},
  {sinan:"43",code:"111255",desc:"VICE-PREFEITO"},
  {sinan:"34",code:"111210",desc:"VICE-PRESIDENTE DA REPUBLICA"},
  {sinan:"1587",code:"716305",desc:"VIDRACEIRO"},
  {sinan:"1588",code:"716310",desc:"VIDRACEIRO (EDIFICACOES)"},
  {sinan:"1589",code:"716315",desc:"VIDRACEIRO (VITRAIS)"},
  {sinan:"1274",code:"517420",desc:"VIGIA"},
  {sinan:"1268",code:"517320",desc:"VIGIA FLORESTAL"},
  {sinan:"1269",code:"517325",desc:"VIGIA PORTUARIO"},
  {sinan:"1270",code:"517330",desc:"VIGILANTE"},
  {sinan:"2274",code:"841740",desc:"VINAGREIRO"},
  {sinan:"1222",code:"515120",desc:"VISITADOR SANITARIO"},
  {sinan:"310",code:"215150",desc:"VISTORIADOR NAVAL"},
  {sinan:"1033",code:"375115",desc:"VISUAL MERCHANDISER"},
  {sinan:"1450",code:"632015",desc:"VIVEIRISTA FLORESTAL"},
  {sinan:"2275",code:"841745",desc:"XAROPEIRO"},
  {sinan:"1213",code:"514120",desc:"ZELADOR DE EDIFICIO"},
  {sinan:"399",code:"223310",desc:"ZOOTECNISTA"},
];

const PARTES_CORPO = ["Olho","Cabeça","Pescoço","Tórax","Abdome","Mão","Membro superior","Membro inferior","Pé","Todo o corpo","Outro"];

// Mapeamento das partes do corpo oficiais do SINAN para as regiões consolidadas do mapa corporal
const BODY_REGIONS = [
  {key:'olho', label:'Olho', view:'front', match:['Olho']},
  {key:'cabeca', label:'Cabeça/Face', view:'front', match:['Cabeça','Pescoço']},
  {key:'torax', label:'Tórax/Abdome', view:'front', match:['Tórax','Abdome']},
  {key:'mao', label:'Dedo/Mão', view:'front', match:['Mão']},
  {key:'braco', label:'Pulso/Braço/Cotovelo', view:'front', match:['Membro superior']},
  {key:'perna', label:'Perna/Joelho', view:'back', match:['Membro inferior']},
  {key:'pe', label:'Pé/Tornozelo', view:'back', match:['Pé']},
  {key:'outros', label:'Outros', view:'back', match:['Todo o corpo','Outro']},
];
const AGRAVO_COLORS = { grave:'var(--c-grave)', biologico:'var(--c-bio)', mental:'var(--c-mental)', lerdort:'var(--c-lerdort)' };
const AGRAVO_HEX = { grave:'#2E6FB0', biologico:'#D97A2B', mental:'#1B8A72', lerdort:'#7B4FA0' };
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const EVOLUCAO_LABELS = {
  grave: {'1':'Cura','2':'Incapacidade temporária','3':'Incapacidade parcial permanente','4':'Incapacidade total permanente','5':'Óbito por acidente de trabalho grave','6':'Óbito por outras causas','7':'Outro','9':'Ignorado'},
  lerdort: {'1':'Cura','2':'Cura não confirmada','3':'Incapacidade Temporária','4':'Incapacidade Permanente Parcial','5':'Incapacidade Permanente Total','6':'Óbito por doença relacionada ao trabalho','7':'Óbito por Outra Causa','8':'Outro','9':'Ignorado'},
  mental: {'1':'Cura','2':'Cura não confirmada','3':'Incapacidade Temporária','4':'Incapacidade Permanente Parcial','5':'Incapacidade Permanente Total','6':'Óbito por doença relacionada ao trabalho','7':'Óbito por Outra Causa','8':'Outro','9':'Ignorado'},
  biologico: {'1':'Alta com conversão sorológica','2':'Alta sem conversão sorológica','3':'Alta paciente fonte negativo','4':'Abandono','5':'Óbito por acidente com exposição a material biológico','6':'Óbito por Outra Causa','9':'Ignorado'},
};
const RACA_LABELS = {'1':'Branca','2':'Preta','3':'Amarela','4':'Parda','5':'Indígena','9':'Ignorado'};
const ESCOLARIDADE_LABELS = {'0':'Analfabeto','1':'1ª a 4ª série incompleta EF','2':'4ª série completa EF','3':'5ª a 8ª série incompleta EF','4':'Ensino fundamental completo','5':'Ensino médio incompleto','6':'Ensino médio completo','7':'Educação superior incompleta','8':'Educação superior completa','9':'Ignorado','10':'Não se aplica'};

/* ============================= ESTADO ============================= */
let records = [];
let view = 'dashboard';
let editingId = null;
let formPage = 1;
let formData = {};
let tableState = { search:'', sortKey:'patientName', sortDir:1, filterAgravo:'', filterStatus:'', filterSituacao:'', page:1, pageSize:10 };
let dashFilters = { ano:'', periodoIni:'', periodoFim:'', mes:'', agravo:'', unidade:'', municipio:'', bairro:'', ocupacao:'', sexo:'', racaCor:'', escolaridade:'', tipoAcidente:'', status:'', obito:'' };
let bmSelectedRegion = null;
let pendingDeleteId = null;
let dashboardCardFilter = '';
let analyticsCardFilter = null;

/* ============================= SUPABASE ============================= */
const SUPABASE_URL = 'https://rjcjvxxmfvasymcncrge.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OqhyfChr2RxPl3xfxAPyuQ_sge3PV7j';
let supabaseClient = null;
try{
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}catch(e){
  console.error('Falha ao inicializar cliente Supabase (biblioteca não carregou):', e);
}

async function loadRecords(){
  try{
    const { data, error } = await supabaseClient
      .from('records')
      .select('data')
      .order('updated_at', { ascending: true });
    if(error) throw error;
    records = (data || []).map(row => row.data);
  }catch(e){
    console.error('Falha ao carregar registros do Supabase', e);
    records = [];
    showToast('Não foi possível conectar ao banco de dados.');
  }
}

async function upsertRecordRemote(record){
  try{
    const { error } = await supabaseClient
      .from('records')
      .upsert({ id: record.id, data: record, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if(error) throw error;
    return true;
  }catch(e){
    console.error('Falha ao salvar no Supabase', e);
    return false;
  }
}

async function deleteRecordRemote(id){
  try{
    const { error } = await supabaseClient.from('records').delete().eq('id', id);
    if(error) throw error;
    return true;
  }catch(e){
    console.error('Falha ao excluir no Supabase', e);
    return false;
  }
}

/* ============================= AUTENTICAÇÃO ============================= */
let currentUser = null;

const APP_SHELL_HTML = `
<div class="app">
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <div class="tag">Vigilância em Saúde do Trabalhador</div>
      <div class="title">SNAT — Notificação de Acidentes de Trabalho</div>
    </div>
    <div class="nav-item" data-view="dashboard"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>Painel</div>
    <div class="nav-item" data-view="analytics"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>Dashboard Analítico</div>
    <div class="nav-item" data-view="consulta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Consulta de Fichas</div>
    <div class="nav-item" data-view="form"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Novo Registro</div>
    <div class="foot" id="sidebarFoot">4 fichas oficiais do SINAN implementadas: Acidente Grave, Exposição a Material Biológico, Transtorno Mental e LER/DORT.</div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div>
        <h1 id="topbarTitle">Painel</h1>
        <div class="sub" id="topbarSub">Visão geral das notificações e pendências</div>
      </div>
      <div class="no-print" style="display:flex;gap:8px;align-items:center;">
        <span id="userEmailLabel" style="font-size:12.5px;color:var(--text-muted);margin-right:4px;"></span>
        <button class="btn btn-ghost btn-sm" id="logoutBtn">Sair</button>
        <button class="btn btn-primary" onclick="goTo('form')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Novo Registro
        </button>
      </div>
    </div>
    <div class="content" id="content"></div>
  </main>
</div>`;

function renderLogin(errorMsg){
  return `
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-brand">
        <div class="tag">Vigilância em Saúde do Trabalhador</div>
        <div class="title">SNAT</div>
        <div class="subtitle">Sistema de Notificação de Acidentes de Trabalho</div>
      </div>
      <form id="loginForm" class="login-form" autocomplete="on">
        <div class="field">
          <label>E-mail</label>
          <input type="email" id="loginEmail" autocomplete="username" value="${esc(getRememberedEmail())}" required>
        </div>
        <div class="field">
          <label>Senha</label>
          <div style="position:relative;">
            <input type="password" id="loginPassword" autocomplete="current-password" required style="width:100%;padding-right:38px;">
            <button type="button" id="togglePasswordBtn" title="Mostrar/ocultar senha" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:4px;color:var(--text-muted);display:flex;">
              <svg id="togglePasswordIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="field">
          <label style="display:flex;align-items:center;gap:7px;font-weight:400;cursor:pointer;">
            <input type="checkbox" id="rememberMeCheck" ${getRememberedEmail() ? 'checked' : ''}>
            Lembrar meu e-mail neste dispositivo
          </label>
          <div class="hint">Guardamos apenas o seu e-mail neste navegador para agilizar o próximo acesso. Por segurança, nunca salvamos sua senha — se quiser, o próprio navegador pode oferecer para lembrá-la de forma protegida.</div>
        </div>
        ${errorMsg ? `<div class="login-error">${esc(errorMsg)}</div>` : ''}
        <button type="submit" class="btn btn-primary" id="loginSubmitBtn" style="width:100%;justify-content:center;margin-top:4px;">Entrar</button>
      </form>
      <div class="login-hint">Acesso restrito à equipe autorizada. Fale com o administrador do sistema para obter uma conta.</div>
    </div>
  </div>`;
}

function traduzErroLogin(msg){
  if(/invalid login credentials/i.test(msg)) return 'E-mail ou senha inválidos.';
  if(/email not confirmed/i.test(msg)) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
  if(/rate limit/i.test(msg)) return 'Muitas tentativas. Aguarde um instante e tente novamente.';
  return 'Não foi possível entrar. Tente novamente.';
}

function getRememberedEmail(){
  try{ return localStorage.getItem('snat_remembered_email') || ''; }catch(e){ return ''; }
}
function setRememberedEmail(email){
  try{
    if(email){ localStorage.setItem('snat_remembered_email', email); }
    else{ localStorage.removeItem('snat_remembered_email'); }
  }catch(e){ /* localStorage indisponível — ignora silenciosamente */ }
}

function bindLoginEvents(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  form.addEventListener('submit', handleLoginSubmit);

  const toggleBtn = document.getElementById('togglePasswordBtn');
  const pwdInput = document.getElementById('loginPassword');
  if(toggleBtn && pwdInput){
    toggleBtn.addEventListener('click', ()=>{
      const isHidden = pwdInput.type === 'password';
      pwdInput.type = isHidden ? 'text' : 'password';
      const icon = document.getElementById('togglePasswordIcon');
      icon.innerHTML = isHidden
        ? '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
    });
  }
}

async function handleLoginSubmit(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMeCheck');
  setRememberedEmail(rememberMe && rememberMe.checked ? email : '');
  const btn = document.getElementById('loginSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Entrando...';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if(error){
    document.getElementById('appRoot').innerHTML = renderLogin(traduzErroLogin(error.message));
    bindLoginEvents();
    return;
  }
  currentUser = data.user;
  await startApp();
}

async function handleLogout(){
  await supabaseClient.auth.signOut();
  currentUser = null;
  records = [];
  document.getElementById('appRoot').innerHTML = renderLogin();
  bindLoginEvents();
}

function bindNavEvents(){
  document.querySelectorAll('.nav-item').forEach(el=>{
    el.addEventListener('click', ()=> goTo(el.dataset.view));
  });
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  const userLabel = document.getElementById('userEmailLabel');
  if(userLabel && currentUser) userLabel.textContent = currentUser.email || '';
}

async function startApp(){
  document.getElementById('appRoot').innerHTML = APP_SHELL_HTML;
  bindNavEvents();
  await loadRecords();
  render();
}



/* ============================= VALIDAÇÃO / ALERTAS ============================= */
const REQUIRED_COMMON = ['unidadeSaude','patientName','dataNascimento','sexo','dataNotificacao','municipioNotificacao','ufNotificacao','ocupacao','nomeEmpresa'];
const REQUIRED_GRAVE = ['dataAcidente','municipioOcorrencia','ufOcorrencia','tipoAcidente','ocorreuAtendimentoMedico'];
const REQUIRED_LERDORT = ['dataDiagnosticoLD','regimeTratamentoLD'];
const REQUIRED_MENTAL = ['dataDiagnosticoMental','regimeTratamentoMental'];
const REQUIRED_BIOLOGICO = ['dataAcidenteBio','tipoExposicao','materialOrganico'];

function isEmpty(v){ return v==null || v==='' || (Array.isArray(v) && v.length===0); }

function computeAlerts(r){
  const alerts = [];
  const missingCommon = REQUIRED_COMMON.filter(f => isEmpty(r[f]));
  let missingType = [];
  if(r.agravoType === 'grave') missingType = REQUIRED_GRAVE.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'lerdort') missingType = REQUIRED_LERDORT.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'mental') missingType = REQUIRED_MENTAL.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'biologico') missingType = REQUIRED_BIOLOGICO.filter(f => isEmpty(r[f]));
  if(missingCommon.length || missingType.length){
    alerts.push({level:'red', code:'campos_obrigatorios', label:`${missingCommon.length + missingType.length} campo(s) obrigatório(s) vazio(s)`});
  }
  if(r.foiEmitidaCAT === '2'){
    alerts.push({level:'red', code:'cat', label:'CAT não emitida'});
  }
  if(r.agravoType === 'grave'){
    if(isEmpty(r.diagnosticoLesaoCID10) && isEmpty(r.causaCID10)){
      alerts.push({level:'amber', code:'cid', label:'CID não informado'});
    }
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'red', code:'investigacao', label:'Acidente grave sem investigação registrada'});
    }
  } else if(r.agravoType === 'lerdort' || r.agravoType === 'mental'){
    if(isEmpty(r.diagnosticoCID10)){
      alerts.push({level:'amber', code:'cid', label:'CID não informado'});
    }
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'amber', code:'investigacao', label:'Ficha sem investigador registrado'});
    }
  } else if(r.agravoType === 'biologico'){
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'amber', code:'investigacao', label:'Ficha sem investigador registrado'});
    }
  }
  if(r.status === 'aguardando_investigacao'){
    alerts.push({level:'amber', code:'pendencia', label:'Aguardando investigação'});
  }
  if(!alerts.length){
    alerts.push({level:'green', code:'ok', label:'Sem pendências identificadas'});
  }
  return alerts;
}
function worstLevel(alerts){
  if(alerts.some(a=>a.level==='red')) return 'red';
  if(alerts.some(a=>a.level==='amber')) return 'amber';
  return 'green';
}

/* ============================= HELPERS ============================= */
function uid(){ return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function esc(s){ return (s==null?'':String(s)).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtDate(d){ if(!d) return '—'; const [y,m,day]=d.split('-'); return day&&m&&y ? `${day}/${m}/${y}` : d; }
function calcIdade(dob){
  if(!dob) return null;
  const b = new Date(dob+'T00:00:00'); const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const mDiff = now.getMonth() - b.getMonth();
  if(mDiff < 0 || (mDiff===0 && now.getDate() < b.getDate())) age--;
  return age;
}
function faixaEtaria(age){
  if(age==null) return '—';
  if(age<18) return 'Menor de 18 anos';
  if(age<=24) return '18–24 anos';
  if(age<=34) return '25–34 anos';
  if(age<=44) return '35–44 anos';
  if(age<=54) return '45–54 anos';
  if(age<=64) return '55–64 anos';
  return '65 anos ou mais';
}
function showToast(msg){
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>${esc(msg)}`;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2600);
}

/* ============================= NAVEGAÇÃO ============================= */
function goTo(v, id){
  view = v;
  if(v==='form'){
    editingId = id || null;
    formPage = 1;
    formData = id ? {...records.find(r=>r.id===id)} : { id: uid(), agravoType:'grave', status:'aguardando_investigacao', createdAt: new Date().toISOString() };
  } else if(v==='print'){
    editingId = id || editingId || null;
  }
  render();
}

/* ============================= RENDER RAIZ ============================= */
function render(){
  document.querySelectorAll('.nav-item').forEach(el=> el.classList.toggle('active', el.dataset.view===view));
  const titles = {
    dashboard:['Painel','Visão geral das notificações e pendências'],
    analytics:['Dashboard Analítico','Painel de Controle de Acidentes e Agravos Relacionados ao Trabalho'],
    consulta:['Consulta de Fichas','Buscar, filtrar e gerenciar notificações registradas'],
    form:[editingId? 'Editar Registro':'Novo Registro','Ficha de Investigação — Acidente de Trabalho'],
    print:['Visualizar / Imprimir','Ficha de Investigação — Acidente de Trabalho'],
  };
  document.getElementById('topbarTitle').textContent = titles[view][0];
  document.getElementById('topbarSub').textContent = titles[view][1];
  const c = document.getElementById('content');
  if(view==='dashboard') c.innerHTML = renderDashboard();
  else if(view==='analytics') c.innerHTML = renderAnalytics();
  else if(view==='consulta') c.innerHTML = renderConsulta();
  else if(view==='form') c.innerHTML = renderForm();
  else if(view==='print') c.innerHTML = renderPrint(editingId);
  if(view==='form') bindFormEvents();
  if(view==='consulta') bindConsultaEvents();
  if(view==='analytics') bindAnalyticsEvents();
}

/* ============================= DASHBOARD ANALÍTICO ============================= */
let lastBodyRegionData = {counts:{}, totalHits:0};

function pct(n,total){ return total? Math.round(n/total*1000)/10 : 0; }
function getEventDate(r){ return r.dataNotificacao || r.dataAcidente || r.dataAcidenteBio || r.dataDiagnosticoLD || r.dataDiagnosticoMental || ''; }
function isObito(r){
  const label = (EVOLUCAO_LABELS[r.agravoType]||{})[r.evolucaoCaso];
  return !!(label && label.toLowerCase().includes('óbito'));
}

// Indício analítico de acidente envolvendo motocicleta. O formulário não possui
// campo próprio de veículo; por isso a regra usa CID externo V20–V29 e ocupações
// explicitamente relacionadas a motocicleta, sem classificar todo motorista como moto.
const MOTO_CID_RE = /\bV2[0-9](?:\.[0-9A-Z]+)?\b/i;
const MOTO_OCCUPATION_TERMS = ['motociclista','motoboy','motoqueiro','motofretista','motocicleta','motociclo'];
function normalizeSearchText(value){
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function isMotoAccident(r){
  const cidText = [r.causaCID10].filter(Boolean).join(' ');
  const occupationText = normalizeSearchText(r.ocupacao);
  return MOTO_CID_RE.test(cidText) || MOTO_OCCUPATION_TERMS.some(term=>occupationText.includes(term));
}
function distinctValues(field){
  return [...new Set(records.map(r=>r[field]).filter(v=>v!==undefined && v!==null && v!==''))].sort((a,b)=> String(a).localeCompare(String(b),'pt-BR'));
}

const REQUIRED_FIELD_LABELS = {
  unidadeSaude:'Unidade de Saúde',
  patientName:'Nome do paciente',
  dataNascimento:'Data de nascimento',
  sexo:'Sexo',
  dataNotificacao:'Data da notificação',
  municipioNotificacao:'Município de notificação',
  ufNotificacao:'UF de notificação',
  ocupacao:'Ocupação',
  nomeEmpresa:'Nome da empresa',
  dataAcidente:'Data do acidente',
  municipioOcorrencia:'Município de ocorrência',
  ufOcorrencia:'UF de ocorrência',
  tipoAcidente:'Tipo de acidente',
  ocorreuAtendimentoMedico:'Atendimento médico',
  dataDiagnosticoLD:'Data do diagnóstico',
  regimeTratamentoLD:'Regime de tratamento',
  dataDiagnosticoMental:'Data do diagnóstico',
  regimeTratamentoMental:'Regime de tratamento',
  dataAcidenteBio:'Data do acidente/exposição',
  tipoExposicao:'Tipo de exposição',
  materialOrganico:'Material orgânico',
};

function getRequiredFieldsForRecord(r){
  let typeFields = [];
  if(r.agravoType === 'grave') typeFields = REQUIRED_GRAVE;
  else if(r.agravoType === 'lerdort') typeFields = REQUIRED_LERDORT;
  else if(r.agravoType === 'mental') typeFields = REQUIRED_MENTAL;
  else if(r.agravoType === 'biologico') typeFields = REQUIRED_BIOLOGICO;
  return [...new Set([...REQUIRED_COMMON, ...typeFields])];
}

function getMissingDataLabels(r){
  const missing = getRequiredFieldsForRecord(r)
    .filter(field => isEmpty(r[field]))
    .map(field => REQUIRED_FIELD_LABELS[field] || field);
  if(r.foiEmitidaCAT === '2') missing.push('Emissão da CAT');
  if(r.agravoType === 'grave'){
    if(isEmpty(r.diagnosticoLesaoCID10) && isEmpty(r.causaCID10)) missing.push('CID ou causa da lesão');
    if(isEmpty(r.investigadorNome)) missing.push('Nome do investigador');
  } else if(r.agravoType === 'lerdort' || r.agravoType === 'mental'){
    if(isEmpty(r.diagnosticoCID10)) missing.push('CID/diagnóstico');
    if(isEmpty(r.investigadorNome)) missing.push('Nome do investigador');
  } else if(r.agravoType === 'biologico' && isEmpty(r.investigadorNome)){
    missing.push('Nome do investigador');
  }
  if(r.status === 'aguardando_investigacao') missing.push('Investigação da ficha');
  return [...new Set(missing)];
}

function normalizeUnidadeSaude(value){
  const raw = String(value || '').trim();
  if(!raw) return 'Não informado';
  const normalized = raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\s+/g,' ');
  if(normalized.includes('PSMRO') || normalized.includes('PRONTO SOCORRO') || normalized.includes('PONTO SOCORRO')) return 'Pronto Socorro (PSMRO)';
  if(/\bUPA\b/.test(normalized)) return 'UPA';
  return raw;
}

function distinctNormalizedUnits(){
  return [...new Set(records.map(r=>normalizeUnidadeSaude(r.unidadeSaude)))].sort((a,b)=>String(a).localeCompare(String(b),'pt-BR'));
}
function limparFiltrosDash(){
  Object.keys(dashFilters).forEach(k=> dashFilters[k]='');
  render();
}
function applyDashFilters(list){
  return list.filter(r=>{
    const d = r.dataNotificacao || '';
    const y = d ? d.slice(0,4) : '';
    const m = d ? d.slice(5,7) : '';
    if(dashFilters.ano && y !== dashFilters.ano) return false;
    if(dashFilters.mes && m !== dashFilters.mes) return false;
    if(dashFilters.periodoIni && (!d || d < dashFilters.periodoIni)) return false;
    if(dashFilters.periodoFim && (!d || d > dashFilters.periodoFim)) return false;
    if(dashFilters.agravo && r.agravoType !== dashFilters.agravo) return false;
    if(dashFilters.unidade && normalizeUnidadeSaude(r.unidadeSaude) !== dashFilters.unidade) return false;
    if(dashFilters.municipio && r.municipioNotificacao !== dashFilters.municipio) return false;
    if(dashFilters.bairro && r.resBairro !== dashFilters.bairro) return false;
    if(dashFilters.ocupacao && !(r.ocupacao||'').toLowerCase().includes(dashFilters.ocupacao.toLowerCase())) return false;
    if(dashFilters.sexo && r.sexo !== dashFilters.sexo) return false;
    if(dashFilters.racaCor && r.racaCor !== dashFilters.racaCor) return false;
    if(dashFilters.escolaridade && r.escolaridade !== dashFilters.escolaridade) return false;
    if(dashFilters.tipoAcidente && r.tipoAcidente !== dashFilters.tipoAcidente) return false;
    if(dashFilters.status && r.status !== dashFilters.status) return false;
    if(dashFilters.obito){
      const ob = isObito(r);
      if(dashFilters.obito==='sim' && !ob) return false;
      if(dashFilters.obito==='nao' && ob) return false;
    }
    return true;
  });
}

function getAnalyticsSelection(filter){
  if(filter && filter.startsWith('unit:')) return {kind:'unit', value:decodeURIComponent(filter.slice(5))};
  if(filter && filter.startsWith('month:')) return {kind:'month', value:filter.slice(6)};
  return {kind:filter, value:null};
}
function setAnalyticsCardFilter(filter){
  analyticsCardFilter = analyticsCardFilter === filter ? null : filter;
  render();
}
function setAnalyticsUnitFilter(unit){
  // O valor chega codificado pelo atributo onclick; a decodificação ocorre em getAnalyticsSelection.
  setAnalyticsCardFilter(`unit:${unit}`);
}
function setAnalyticsMonthFilter(month){
  setAnalyticsCardFilter(`month:${month}`);
}

function renderAnalyticsSelection(list, filter){
  if(!filter || !list) return '';
  const selection = getAnalyticsSelection(filter);
  const title = selection.kind === 'all'
    ? 'Todas as fichas filtradas'
    : selection.kind === 'moto'
      ? 'Fichas com indício de acidente envolvendo motocicleta'
      : selection.kind === 'unit'
        ? `Fichas — ${selection.value}`
        : selection.kind === 'month'
          ? `Fichas — ${MESES[Number(selection.value)-1] || 'Mês selecionado'}`
          : (AGRAVOS[selection.kind]?.label || 'Fichas selecionadas');
  return `<div class="panel selection-panel analytics-selection-panel">
    <div class="selection-heading"><div><h2>${esc(title)}</h2><div class="selection-hint">Clique em uma ficha para abrir o cadastro completo.</div></div><span class="selection-count">${list.length}</span></div>
    ${renderFichaSelectionList(list)}
  </div>`;
}

function renderAnalytics(){
  const filtered = applyDashFilters(records);
  const total = filtered.length;
  const byType = {};
  Object.keys(AGRAVOS).forEach(k=> byType[k] = filtered.filter(r=>r.agravoType===k).length);
  const selection = getAnalyticsSelection(analyticsCardFilter);
  const analyticsSelected = selection.kind === 'all'
    ? filtered
    : selection.kind === 'moto'
      ? filtered.filter(isMotoAccident)
      : selection.kind === 'unit'
        ? filtered.filter(r=>normalizeUnidadeSaude(r.unidadeSaude) === selection.value)
        : selection.kind === 'month'
          ? filtered.filter(r=>(r.dataNotificacao || '').slice(5,7) === selection.value)
          : selection.kind
            ? filtered.filter(r=>r.agravoType===selection.kind)
            : null;
  const motoCount = filtered.filter(isMotoAccident).length;
  const unidades = distinctNormalizedUnits();
  const municipios = distinctValues('municipioNotificacao');
  const bairros = distinctValues('resBairro');
  const anos = [...new Set(records.map(r=>{ const d=r.dataNotificacao || ''; return d? d.slice(0,4):''; }).filter(Boolean))].sort().reverse();

  return `
  <div class="filter-bar">
    <div class="fb-grid">
      <div><label>Ano</label><select id="fAno"><option value="">Todos</option>${anos.map(a=>`<option value="${a}" ${dashFilters.ano===a?'selected':''}>${a}</option>`).join('')}</select></div>
      <div><label>Período inicial</label><input type="date" id="fPerIni" value="${dashFilters.periodoIni}"></div>
      <div><label>Período final</label><input type="date" id="fPerFim" value="${dashFilters.periodoFim}"></div>
      <div><label>Mês</label><select id="fMes"><option value="">Todos</option>${MESES.map((m,i)=>`<option value="${String(i+1).padStart(2,'0')}" ${dashFilters.mes===String(i+1).padStart(2,'0')?'selected':''}>${m}</option>`).join('')}</select></div>
      <div><label>Tipo de Agravo</label><select id="fAgravo"><option value="">Todos</option>${Object.entries(AGRAVOS).map(([k,v])=>`<option value="${k}" ${dashFilters.agravo===k?'selected':''}>${esc(v.label)}</option>`).join('')}</select></div>
      <div><label>Unidade de Notificação</label><select id="fUnidade"><option value="">Todas</option>${unidades.map(u=>`<option value="${esc(u)}" ${dashFilters.unidade===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Município</label><select id="fMunicipio"><option value="">Todos</option>${municipios.map(u=>`<option value="${esc(u)}" ${dashFilters.municipio===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Bairro</label><select id="fBairro"><option value="">Todos</option>${bairros.map(u=>`<option value="${esc(u)}" ${dashFilters.bairro===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Ocupação / CBO</label><input type="text" id="fOcupacao" placeholder="Buscar..." value="${esc(dashFilters.ocupacao)}"></div>
      <div><label>Sexo</label><select id="fSexo"><option value="">Todos</option><option value="M" ${dashFilters.sexo==='M'?'selected':''}>Masculino</option><option value="F" ${dashFilters.sexo==='F'?'selected':''}>Feminino</option><option value="I" ${dashFilters.sexo==='I'?'selected':''}>Ignorado</option></select></div>
      <div><label>Raça/Cor</label><select id="fRaca"><option value="">Todas</option>${Object.entries(RACA_LABELS).map(([k,l])=>`<option value="${k}" ${dashFilters.racaCor===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Escolaridade</label><select id="fEscolaridade"><option value="">Todas</option>${Object.entries(ESCOLARIDADE_LABELS).map(([k,l])=>`<option value="${k}" ${dashFilters.escolaridade===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Tipo de Acidente</label><select id="fTipoAcidente"><option value="">Todos</option><option value="1" ${dashFilters.tipoAcidente==='1'?'selected':''}>Típico</option><option value="2" ${dashFilters.tipoAcidente==='2'?'selected':''}>Trajeto</option><option value="9" ${dashFilters.tipoAcidente==='9'?'selected':''}>Ignorado</option></select></div>
      <div><label>Status da Investigação</label><select id="fStatus"><option value="">Todos</option>${STATUS_OPTIONS.map(([k,l])=>`<option value="${k}" ${dashFilters.status===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Óbito</label><select id="fObito"><option value="">Todos</option><option value="sim" ${dashFilters.obito==='sim'?'selected':''}>Sim</option><option value="nao" ${dashFilters.obito==='nao'?'selected':''}>Não</option></select></div>
    </div>
    <div class="fb-actions"><button class="btn btn-ghost btn-sm" onclick="limparFiltrosDash()">Limpar Filtros</button></div>
  </div>
  ${!records.length ? `<div class="panel"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg><div>Nenhuma notificação cadastrada ainda. Cadastre registros para visualizar o dashboard.</div></div></div>` : `
  <div class="analytics-layout">
      <div class="indicator-col">
      <div class="ind-card total is-clickable ${analyticsCardFilter==='all'?'selected':''}" role="button" tabindex="0" title="Clique para listar todas as fichas filtradas" onclick="setAnalyticsCardFilter('all')"><div class="n">${total}</div><div class="l">Total Geral de Ocorrências</div></div>
      ${Object.entries(AGRAVOS).map(([k,v])=>`
        <div class="ind-card ${k} is-clickable ${analyticsCardFilter===k?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas desta classificação" onclick="setAnalyticsCardFilter('${k}')"><div class="n">${byType[k]}</div><div class="l">${esc(v.label)}</div><div class="pct">${pct(byType[k],total)}% do total</div></div>
      `).join('')}
      <div class="ind-card moto is-clickable ${analyticsCardFilter==='moto'?'selected':''}" role="button" tabindex="0" title="Clique para listar os indícios de acidentes envolvendo motocicleta" onclick="setAnalyticsCardFilter('moto')"><div class="n">${motoCount}</div><div class="l">Acidentes envolvendo moto</div><div class="pct">${pct(motoCount,total)}% do total</div></div>
    </div>
    <div>
      <div class="charts-grid">
        ${renderChartTop5Unidades(filtered)}
        ${renderChartGenero(filtered)}
        ${renderChartStatusInvestigacao(filtered)}
        ${renderChartMensal(filtered)}
      </div>
      <div class="charts-grid cols-4">
        ${renderChartRaca(filtered)}
        ${renderChartEscolaridade(filtered)}
        ${renderChartTipoAcidente(filtered)}
        ${renderChartPiramide(filtered)}
      </div>
      <div class="charts-grid">
        ${renderChartBodyMap(filtered)}
        ${renderChartOcupacoes(filtered)}
        ${renderChartObitos(filtered)}
      </div>
      </div>
    </div>
    ${renderAnalyticsSelection(analyticsSelected, analyticsCardFilter)}
  `}
  <div class="bm-tooltip" id="bmTooltip"></div>
  `;
}

function renderChartTop5Unidades(list){
  const counts = {};
  list.forEach(r=>{ const u = normalizeUnidadeSaude(r.unidadeSaude); counts[u]=(counts[u]||0)+1; });
  const units = Object.entries(counts).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0],'pt-BR'));
  const max = units.length? units[0][1] : 1;
  return `<div class="chart-panel"><h3>Unidade de Saúde</h3>
    ${units.length? units.map(([u,n])=>`<div class="bar-row is-clickable" role="button" tabindex="0" title="Clique para listar as fichas desta unidade" onclick="setAnalyticsUnitFilter('${encodeURIComponent(u)}')"><div class="lbl" title="${esc(u)}">${esc(u)}</div><div class="track"><div class="fill" style="width:${(n/max*100)}%;background:var(--primary-2)"></div></div><div class="val">${n} (${pct(n,list.length)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados para os filtros aplicados</div>'}
  </div>`;
}

function renderChartMensal(list){
  const seriesData = {};
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  Object.keys(AGRAVOS).forEach(k=> seriesData[k] = Array(12).fill(0));
  list.forEach(r=>{
    const d = r.dataNotificacao || '';
    if(!d) return;
    const m = parseInt(d.slice(5,7),10);
    if(m>=1 && m<=12 && seriesData[r.agravoType]) seriesData[r.agravoType][m-1]++;
  });
  const maxVal = Math.max(1, ...Object.values(seriesData).flat());
  const W=960, H=230, padL=28, padR=18, padB=38, padT=18;
  const stepX = (W-padL-padR)/11;
  const xFor = i => padL+i*stepX;
  const toY = v => padT + (H-padT-padB) * (1 - v/maxVal);
  const pathFor = arr => arr.map((v,i)=> `${i===0?'M':'L'} ${xFor(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
  const seriesSvg = Object.entries(seriesData).map(([k,arr])=>{
    const points = arr.map((v,i)=> v ? `<circle class="monthly-point is-clickable" cx="${xFor(i).toFixed(1)}" cy="${toY(v).toFixed(1)}" r="4" fill="${AGRAVO_HEX[k]}" onclick="setAnalyticsMonthFilter('${String(i+1).padStart(2,'0')}')"/><text class="monthly-point-value is-clickable" x="${xFor(i).toFixed(1)}" y="${(toY(v)-8).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${AGRAVO_HEX[k]}" role="button" tabindex="0" aria-label="${v} ocorrência(s) em ${months[i]}" onclick="setAnalyticsMonthFilter('${String(i+1).padStart(2,'0')}')">${v}</text>` : '').join('');
    return `<path d="${pathFor(arr)}" fill="none" stroke="${AGRAVO_HEX[k]}" stroke-width="2.2"/>${points}`;
  }).join('');
  return `<div class="chart-panel wide wide-monthly"><h3>Quantidade de Acidentes por Mês</h3>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:230px" role="img" aria-label="Quantidade de acidentes por mês pela data de notificação">
      <line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="#DCE3E6"/>
      ${seriesSvg}
      ${months.map((m,i)=>`<text class="monthly-label" x="${xFor(i).toFixed(1)}" y="${H-10}" text-anchor="middle" font-size="11" font-weight="600" fill="#64747A">${m}</text>`).join('')}
    </svg>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:2px">
      ${Object.entries(AGRAVOS).map(([k,v])=>`<div class="legend-row" style="margin-bottom:0"><span class="sw" style="background:${AGRAVO_COLORS[k]}"></span><span class="lbl">${esc(v.label)}</span></div>`).join('')}
    </div>
  </div>`;
}

function donutSVG(segments, size, stroke){
  const total = segments.reduce((s,x)=>s+x.value,0) || 1;
  const r = (size-stroke)/2, c = size/2, circumference = 2*Math.PI*r;
  let offset = 0;
  const circles = segments.map(seg=>{
    const frac = seg.value/total;
    const dash = frac*circumference;
    const el = `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${stroke}" stroke-dasharray="${dash.toFixed(1)} ${(circumference-dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>`;
    offset += dash;
    return el;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${circles}<text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="20" font-weight="700" fill="#16262C">${total}</text></svg>`;
}
function pieSVG(segments, size){
  const total = segments.reduce((sum, segment)=>sum + segment.value, 0);
  if(!total) return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-label="Sem dados de gênero"><circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="#E8ECED"/></svg>`;
  const center = size/2;
  const radius = size/2-2;
  let start = -Math.PI/2;
  const paths = segments.filter(segment=>segment.value>0).map(segment=>{
    const angle = segment.value/total * Math.PI*2;
    const end = start + angle;
    const x1 = center + radius*Math.cos(start), y1 = center + radius*Math.sin(start);
    const x2 = center + radius*Math.cos(end), y2 = center + radius*Math.sin(end);
    const large = angle > Math.PI ? 1 : 0;
    const d = `M ${center} ${center} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
    start = end;
    return `<path d="${d}" fill="${segment.color}"/>`;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Distribuição por gênero">${paths}<circle cx="${center}" cy="${center}" r="1.5" fill="#fff"/></svg>`;
}
function renderChartGenero(list){
  const counts = {M:0,F:0,I:0};
  list.forEach(r=>{ counts[r.sexo] = (counts[r.sexo]||0) + 1; });
  const total = list.length;
  const segments = [
    {key:'M',label:'Masculino',value:counts.M,color:'#2E6FB0'},
    {key:'F',label:'Feminino',value:counts.F,color:'#D97A2B'},
    {key:'I',label:'Ignorado / não informado',value:counts.I,color:'#AAB8BD'},
  ];
  return `<div class="chart-panel gender-panel"><h3>Gênero</h3>
    <div class="donut-wrap">
      ${total? pieSVG(segments,136) : '<div class="empty-mini">Sem dados</div>'}
      <div class="donut-legend">${segments.map(segment=>`<div class="legend-row"><span class="sw" style="background:${segment.color}"></span><span class="lbl">${segment.label}</span><span class="val">${segment.value} (${pct(segment.value,total)}%)</span></div>`).join('')}</div>
    </div>
  </div>`;
}
function renderChartStatusInvestigacao(list){
  const fin = list.filter(r=>r.status==='finalizado').length;
  const agu = list.filter(r=>r.status==='aguardando_investigacao').length;
  const total = list.length;
  return `<div class="chart-panel"><h3>Status de Investigação</h3>
    <div class="donut-wrap">
      ${total? donutSVG([{value:fin,color:'#1B8A72'},{value:agu,color:'#B8791A'}],108,16) : '<div class="empty-mini">Sem dados</div>'}
      <div class="donut-legend">
        <div class="legend-row"><span class="sw" style="background:#1B8A72"></span><span class="lbl">Finalizado</span><span class="val">${fin} (${pct(fin,total)}%)</span></div>
        <div class="legend-row"><span class="sw" style="background:#B8791A"></span><span class="lbl">Aguardando Investigação</span><span class="val">${agu} (${pct(agu,total)}%)</span></div>
      </div>
    </div>
  </div>`;
}
function renderChartRaca(list){
  const counts = {}; Object.keys(RACA_LABELS).forEach(k=> counts[k]=0);
  let naoInformado = 0;
  list.forEach(r=>{ if(r.racaCor && counts[r.racaCor]!==undefined) counts[r.racaCor]++; else naoInformado++; });
  const total = list.length;
  const rows = Object.entries(RACA_LABELS).map(([k,l])=>[l,counts[k]]);
  rows.push(['Não informado', naoInformado]);
  const max = Math.max(1, ...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Raça/Cor</h3>
    ${total? rows.map(([l,n])=>`<div class="bar-row"><div class="lbl">${esc(l)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--primary-2)"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartEscolaridade(list){
  const counts = {}; Object.keys(ESCOLARIDADE_LABELS).forEach(k=> counts[k]=0);
  let naoInformado = 0;
  list.forEach(r=>{ if(r.escolaridade && counts[r.escolaridade]!==undefined) counts[r.escolaridade]++; else naoInformado++; });
  const total = list.length;
  const rows = Object.entries(ESCOLARIDADE_LABELS).filter(([k])=>counts[k]>0).map(([k,l])=>[l,counts[k]]);
  if(naoInformado) rows.push(['Não informado', naoInformado]);
  const max = Math.max(1, ...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Escolaridade</h3>
    ${total && rows.length? rows.sort((a,b)=>b[1]-a[1]).map(([l,n])=>`<div class="bar-row"><div class="lbl" title="${esc(l)}">${esc(l)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--accent)"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartTipoAcidente(list){
  const graves = list.filter(r=>r.agravoType==='grave');
  const total = graves.length;
  const counts = {'1':0,'2':0,'9':0,'':0};
  graves.forEach(r=>{ const k = r.tipoAcidente||''; counts[k] = (counts[k]||0)+1; });
  const rows = [['Típico',counts['1']],['Trajeto',counts['2']],['Ignorado',counts['9']],['Não informado',counts['']]].filter(r=>r[1]>0);
  const max = Math.max(1,...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Tipo de Acidente <span style="font-weight:400;text-transform:none;color:var(--text-muted)">(Grave)</span></h3>
    ${total && rows.length? rows.map(([l,n])=>`<div class="bar-row"><div class="lbl">${l}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:${AGRAVO_HEX.grave}"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem registros de Acidente Grave</div>'}
  </div>`;
}
function renderChartPiramide(list){
  const order = ['grave','biologico','mental','lerdort'];
  const counts = order.map(k=> ({k, n: list.filter(r=>r.agravoType===k).length}));
  const max = Math.max(1, ...counts.map(c=>c.n));
  const total = list.length;
  return `<div class="chart-panel"><h3>Pirâmide por Tipo de Agravo</h3>
    <div class="pyramid">
      ${counts.map(c=>`<div class="pyr-row" style="width:${total? (20+ (c.n/max*70)) : 20}%;background:${AGRAVO_HEX[c.k]}">${esc(AGRAVOS[c.k].label)}: ${c.n} (${pct(c.n,total)}%)</div>`).join('')}
    </div>
  </div>`;
}
function computeBodyRegionCounts(list){
  const graves = list.filter(r=> r.agravoType==='grave' && Array.isArray(r.partesCorpo) && r.partesCorpo.length);
  const counts = {}; BODY_REGIONS.forEach(b=> counts[b.key]=0);
  let totalHits = 0;
  graves.forEach(r=>{
    r.partesCorpo.forEach(p=>{
      const region = BODY_REGIONS.find(b=> b.match.includes(p));
      if(region){ counts[region.key]++; totalHits++; }
    });
  });
  return {counts, totalHits};
}
function bodyFigureSVG(view, counts, max){
  const hx = key => { const c=counts[key]||0; const t=c/max; return t>0.66? '#C6423B': t>0.33? '#E0A526' : t>0? '#2E9E6D' : '#E8ECED'; };
  const evt = k => `onmouseenter="showBmTooltip(event,'${k}')" onmouseleave="hideBmTooltip()" onclick="clickBmRegion('${k}')"`;
  if(view==='front'){
    return `<svg width="100" height="210" viewBox="0 0 110 230">
      <rect x="35" y="116" width="40" height="60" rx="10" fill="#F2F5F6" stroke="#DCE3E6"/>
      <rect class="region" data-region="braco" x="8" y="50" width="18" height="80" rx="9" fill="${hx('braco')}" ${evt('braco')}/>
      <rect class="region" data-region="braco" x="84" y="50" width="18" height="80" rx="9" fill="${hx('braco')}" ${evt('braco')}/>
      <circle class="region" data-region="mao" cx="17" cy="136" r="10" fill="${hx('mao')}" ${evt('mao')}/>
      <circle class="region" data-region="mao" cx="93" cy="136" r="10" fill="${hx('mao')}" ${evt('mao')}/>
      <rect class="region" data-region="torax" x="30" y="46" width="50" height="70" rx="12" fill="${hx('torax')}" ${evt('torax')}/>
      <circle class="region" data-region="cabeca" cx="55" cy="26" r="16" fill="${hx('cabeca')}" ${evt('cabeca')}/>
      <circle class="region" data-region="olho" cx="55" cy="26" r="4" fill="${hx('olho')}" ${evt('olho')}/>
    </svg>`;
  }
  return `<svg width="100" height="210" viewBox="0 0 110 230">
    <circle cx="55" cy="26" r="16" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="30" y="46" width="50" height="70" rx="12" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="8" y="50" width="18" height="80" rx="9" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="84" y="50" width="18" height="80" rx="9" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect class="region" data-region="perna" x="34" y="116" width="18" height="80" rx="9" fill="${hx('perna')}" ${evt('perna')}/>
    <rect class="region" data-region="perna" x="58" y="116" width="18" height="80" rx="9" fill="${hx('perna')}" ${evt('perna')}/>
    <ellipse class="region" data-region="pe" cx="43" cy="205" rx="12" ry="8" fill="${hx('pe')}" ${evt('pe')}/>
    <ellipse class="region" data-region="pe" cx="67" cy="205" rx="12" ry="8" fill="${hx('pe')}" ${evt('pe')}/>
  </svg>`;
}
function renderChartBodyMap(list){
  const {counts, totalHits} = computeBodyRegionCounts(list);
  lastBodyRegionData = {counts, totalHits};
  const max = Math.max(1, ...Object.values(counts));
  return `<div class="chart-panel wide"><h3>Partes do Corpo Atingida <span style="font-weight:400;text-transform:none;color:var(--text-muted)">(Acid. Grave)</span></h3>
    <div class="bodymap-wrap">
      <div>${bodyFigureSVG('front', counts, max)}<div class="bodymap-figure-label">Frente</div></div>
      <div>${bodyFigureSVG('back', counts, max)}<div class="bodymap-figure-label">Costas</div></div>
      <div>
        ${!totalHits? '<div class="empty-mini">Sem registros com parte do corpo atingida</div>' : BODY_REGIONS.map(b=>`
          <div class="bm-legend-item" onmouseenter="showBmTooltip(event,'${b.key}')" onmouseleave="hideBmTooltip()" onclick="clickBmRegion('${b.key}')">
            <span class="region-dot" style="background:${counts[b.key]>0?'#2E9E6D':'#DCE3E6'}"></span>
            <span class="lbl">${esc(b.label)}</span>
            <span class="qty">${counts[b.key]}</span>
            <span class="pct">${pct(counts[b.key], totalHits)}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}
function showBmTooltip(evt, key){
  const region = BODY_REGIONS.find(b=>b.key===key);
  if(!region) return;
  const n = lastBodyRegionData.counts[key]||0;
  const total = lastBodyRegionData.totalHits||0;
  const tip = document.getElementById('bmTooltip');
  if(!tip) return;
  tip.innerHTML = `<b>${esc(region.label)}</b><br>Quantidade: ${n}<br>Percentual: ${pct(n,total)}%`;
  tip.style.display='block';
  tip.style.left = (evt.clientX+14)+'px';
  tip.style.top = (evt.clientY+10)+'px';
}
function hideBmTooltip(){ const tip = document.getElementById('bmTooltip'); if(tip) tip.style.display='none'; }
function clickBmRegion(key){
  const region = BODY_REGIONS.find(b=>b.key===key);
  const n = lastBodyRegionData.counts[key]||0;
  const total = lastBodyRegionData.totalHits||0;
  showToast(`${region.label}: ${n} ocorrência(s) — ${pct(n,total)}% dos registros com parte do corpo atingida informada`);
}
function renderChartOcupacoes(list){
  const counts = {};
  list.forEach(r=>{ const o = r.ocupacao || 'Não informado'; counts[o]=(counts[o]||0)+1; });
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const max = Math.max(1, ...top.map(t=>t[1]));
  return `<div class="chart-panel"><h3>Principais Ocupações por Acidente</h3>
    ${top.length? top.map(([o,n])=>`<div class="bar-row"><div class="lbl" title="${esc(o)}">${esc(o)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--accent)"></div></div><div class="val">${n} (${pct(n,list.length)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartObitos(list){
  const obitos = list.filter(isObito);
  const total = obitos.length;
  const byType = {};
  Object.keys(AGRAVOS).forEach(k=> byType[k] = obitos.filter(r=>r.agravoType===k).length);
  return `<div class="chart-panel"><h3>Quantidade de Óbitos</h3>
    <div class="obito-panel">
      <div class="big">${total}</div>
      <div class="lbl">${total? 'ÓBITO(S) REGISTRADO(S)' : '0 ÓBITOS REGISTRADOS'}</div>
    </div>
    ${total? `<div style="margin-top:10px">${Object.entries(AGRAVOS).map(([k,v])=> byType[k] ? `<div class="legend-row"><span class="sw" style="background:${AGRAVO_COLORS[k]}"></span><span class="lbl">${esc(v.label)}</span><span class="val">${byType[k]}</span></div>` : '').join('')}</div>` : ''}
  </div>`;
}
function bindAnalyticsEvents(){
  const map = {fAno:'ano', fPerIni:'periodoIni', fPerFim:'periodoFim', fMes:'mes', fAgravo:'agravo', fUnidade:'unidade', fMunicipio:'municipio', fBairro:'bairro', fOcupacao:'ocupacao', fSexo:'sexo', fRaca:'racaCor', fEscolaridade:'escolaridade', fTipoAcidente:'tipoAcidente', fStatus:'status', fObito:'obito'};
  Object.entries(map).forEach(([id,key])=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener(el.tagName==='SELECT' ? 'change' : 'input', e=>{
      dashFilters[key]=e.target.value;
      render();
      if(id==='fOcupacao'){ requestAnimationFrame(()=>{ const f=document.getElementById('fOcupacao'); if(f){ f.focus(); f.selectionStart=f.selectionEnd=f.value.length; } }); }
    });
  });
}

/* ============================= DASHBOARD ============================= */
function setDashboardCardFilter(filter){
  dashboardCardFilter = dashboardCardFilter === filter ? '' : filter;
  render();
}

function renderDashboardSelection(list, filter){
  if(!filter) return '';
  const labels = {all:'Todas as fichas', red:'Fichas com pendência crítica', amber:'Fichas com pendência de atenção', green:'Fichas sem pendências'};
  return `<div class="panel selection-panel">
    <div class="selection-heading"><div><h2>${labels[filter] || 'Fichas selecionadas'}</h2><div class="selection-hint">Clique em uma ficha para abrir o cadastro completo.</div></div><span class="selection-count">${list.length}</span></div>
    ${renderFichaSelectionList(list)}
  </div>`;
}

function renderFichaSelectionList(list){
  if(!list.length) return '<div class="empty-mini">Nenhuma ficha encontrada nesta classificação.</div>';
  return `<div class="selection-list">${list.map(r=>{
    const level = worstLevel(computeAlerts(r));
    const alerts = computeAlerts(r).filter(a=>a.level!=='green');
    return `<div class="selection-item" onclick="goTo('form','${r.id}')">
      <div class="selection-item-main"><span class="selection-ficha">${esc(fichaLabel(r))}</span><b>${esc(r.patientName||'(sem nome)')}</b><span class="selection-agravo">${esc(AGRAVOS[r.agravoType]?.label||'')}</span></div>
      <div class="selection-item-meta"><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span><span>${fmtDate(r.dataNotificacao)}</span>${alerts.length?`<span>${alerts.length} alerta(s)</span>`:''}</div>
    </div>`;
  }).join('')}</div>`;
}

function renderDashboard(){
  const withAlerts = records.map(r=>({r, alerts:computeAlerts(r), level: null}));
  withAlerts.forEach(x=> x.level = worstLevel(x.alerts));
  const nRed = withAlerts.filter(x=>x.level==='red').length;
  const nAmber = withAlerts.filter(x=>x.level==='amber').length;
  const nGreen = withAlerts.filter(x=>x.level==='green').length;
  const nCatPend = records.filter(r=>r.agravoType==='grave' && r.foiEmitidaCAT==='2').length;

  if(!records.length){
    return `<div class="panel"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>
      <div>Nenhuma notificação registrada ainda.</div>
      <button class="btn btn-primary" style="margin-top:14px" onclick="goTo('form')">Criar primeiro registro</button>
    </div></div>`;
  }

  const alertCards = withAlerts.filter(x=>x.level!=='green')
    .sort((a,b)=> (a.level==='red'?0:1)-(b.level==='red'?0:1)).map(x=>{
      const missing = getMissingDataLabels(x.r);
      return `<div class="alert-card ${x.level}" onclick="goTo('form','${x.r.id}')">
        <div class="alert-card-main">
          <span class="dot ${x.level}"></span>
          <div class="alert-card-content">
            <div class="alert-card-head"><span class="alert-card-ficha">Nº da Ficha: ${esc(fichaLabel(x.r))}</span><span class="alert-card-type">${esc(AGRAVOS[x.r.agravoType]?.label||'')}</span></div>
            <div class="alert-card-name">${esc(x.r.patientName||'(sem nome)')}</div>
            <div class="alert-card-sub">Dados pendentes nesta ficha:</div>
            <ul class="alert-missing">${missing.length ? missing.map(item=>`<li>${esc(item)}</li>`).join('') : '<li>Verificar pendências do registro</li>'}</ul>
          </div>
          <span class="alert-card-open">Abrir ficha&nbsp; →</span>
        </div>
      </div>`;
    });

  const dashboardSelection = dashboardCardFilter === 'all' ? records : withAlerts.filter(x=>x.level===dashboardCardFilter).map(x=>x.r);

  return `
    <div class="grid-stats">
      <div class="stat-card primary is-clickable ${dashboardCardFilter==='all'?'selected':''}" role="button" tabindex="0" title="Clique para listar todas as fichas" onclick="setDashboardCardFilter('all')"><div class="n">${records.length}</div><div class="l">Total de registros</div></div>
      <div class="stat-card red is-clickable ${dashboardCardFilter==='red'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas com pendência crítica" onclick="setDashboardCardFilter('red')"><div class="n">${nRed}</div><div class="l">Com pendência crítica</div></div>
      <div class="stat-card amber is-clickable ${dashboardCardFilter==='amber'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas com pendência de atenção" onclick="setDashboardCardFilter('amber')"><div class="n">${nAmber}</div><div class="l">Com pendência de atenção</div></div>
      <div class="stat-card green is-clickable ${dashboardCardFilter==='green'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas sem pendências" onclick="setDashboardCardFilter('green')"><div class="n">${nGreen}</div><div class="l">Sem pendências</div></div>
    </div>
    ${renderDashboardSelection(dashboardSelection, dashboardCardFilter)}
    <div class="panel">
      <h2><span class="dot red"></span> Alertas ativos ${nCatPend? `<span style="font-weight:400;color:var(--text-muted);font-size:12px">— ${nCatPend} CAT não emitida(s)</span>`:''}</h2>
      ${alertCards.length ? alertCards.join('') : '<div style="color:var(--text-muted);font-size:13px">Nenhum alerta ativo. Todos os registros estão em dia.</div>'}
    </div>
    <div class="panel">
      <h2>Registros recentes</h2>
      ${renderMiniTable(records.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6))}
    </div>
  `;
}
function renderMiniTable(list){
  if(!list.length) return '<div style="color:var(--text-muted);font-size:13px">Sem registros.</div>';
  return `<table><thead><tr><th>Nome</th><th>Agravo</th><th>Data</th><th>Status</th><th></th></tr></thead><tbody>
    ${list.map(r=>{
      const level = worstLevel(computeAlerts(r));
      return `<tr>
        <td>${esc(r.patientName||'—')}</td>
        <td>${esc(AGRAVOS[r.agravoType]?.label||'—')}</td>
        <td>${fmtDate(r.dataNotificacao)}</td>
        <td><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span></td>
        <td><button class="btn btn-ghost btn-sm" onclick="goTo('form','${r.id}')">Abrir</button></td>
      </tr>`;
    }).join('')}
  </tbody></table>`;
}

/* ============================= CONSULTA ============================= */
function getFilteredRecords(){
  let list = records.slice();
  const s = tableState.search.trim().toLowerCase();
  if(s) list = list.filter(r => (r.patientName||'').toLowerCase().includes(s) || (r.municipioNotificacao||'').toLowerCase().includes(s) || (r.nomeEmpresa||'').toLowerCase().includes(s));
  if(tableState.filterAgravo) list = list.filter(r=> r.agravoType === tableState.filterAgravo);
  if(tableState.filterStatus) list = list.filter(r=> worstLevel(computeAlerts(r)) === tableState.filterStatus);
  if(tableState.filterSituacao) list = list.filter(r=> r.status === tableState.filterSituacao);
  list.sort((a,b)=>{
    let va = a[tableState.sortKey]||''; let vb = b[tableState.sortKey]||'';
    return (va > vb ? 1 : va < vb ? -1 : 0) * tableState.sortDir;
  });
  return list;
}
function renderConsulta(){
  const all = getFilteredRecords();
  const totalPages = Math.max(1, Math.ceil(all.length / tableState.pageSize));
  tableState.page = Math.min(tableState.page, totalPages);
  const pageItems = all.slice((tableState.page-1)*tableState.pageSize, tableState.page*tableState.pageSize);
  const sortIcon = k => tableState.sortKey===k ? (tableState.sortDir===1?' ▲':' ▼') : '';

  return `
  <div class="panel">
    <div class="toolbar">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="searchInput" placeholder="Buscar por nome, município ou empresa..." value="${esc(tableState.search)}">
      </div>
      <select id="filterAgravo">
        <option value="">Todos os agravos</option>
        ${Object.entries(AGRAVOS).map(([k,v])=>`<option value="${k}" ${tableState.filterAgravo===k?'selected':''}>${v.label}</option>`).join('')}
      </select>
      <select id="filterSituacao">
        <option value="">Todas as situações</option>
        ${STATUS_OPTIONS.map(([k,l])=>`<option value="${k}" ${tableState.filterSituacao===k?'selected':''}>${esc(l)}</option>`).join('')}
      </select>
      <select id="filterStatus">
        <option value="">Todos os alertas</option>
        <option value="red" ${tableState.filterStatus==='red'?'selected':''}>Crítico</option>
        <option value="amber" ${tableState.filterStatus==='amber'?'selected':''}>Atenção</option>
        <option value="green" ${tableState.filterStatus==='green'?'selected':''}>OK</option>
      </select>
      <button class="btn btn-ghost btn-sm" onclick="exportExcel()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
        Exportar Excel
      </button>
    </div>
    ${all.length ? `<table>
      <thead><tr>
        <th data-sort="fichaNumero">Nº da Ficha${sortIcon('fichaNumero')}</th>
        <th data-sort="patientName">Nome${sortIcon('patientName')}</th>
        <th data-sort="agravoType">Agravo${sortIcon('agravoType')}</th>
        <th data-sort="dataNotificacao">Data Notif.${sortIcon('dataNotificacao')}</th>
        <th data-sort="municipioNotificacao">Município${sortIcon('municipioNotificacao')}</th>
        <th data-sort="status">Situação${sortIcon('status')}</th>
        <th>Alertas</th>
        <th style="text-align:right">Ações</th>
      </tr></thead>
      <tbody>
        ${pageItems.map(r=>{
          const level = worstLevel(computeAlerts(r));
          const statusLabel = (STATUS_OPTIONS.find(s=>s[0]===r.status)||[,'—'])[1];
          return `<tr>
            <td style="font-family:var(--font-mono);color:var(--text-muted)">${esc(fichaLabel(r))}</td>
            <td><b>${esc(r.patientName||'—')}</b></td>
            <td>${esc(AGRAVOS[r.agravoType]?.label||'—')}</td>
            <td>${fmtDate(r.dataNotificacao)}</td>
            <td>${esc(r.municipioNotificacao||'—')}</td>
            <td><span class="badge ${r.status==='finalizado'?'green':'amber'}">${esc(statusLabel)}</span></td>
            <td><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span></td>
            <td><div class="row-actions" style="justify-content:flex-end">
              <button class="btn-icon" title="Visualizar" onclick="goTo('print','${r.id}')">${iconEye()}</button>
              <button class="btn-icon" title="Editar" onclick="goTo('form','${r.id}')">${iconEdit()}</button>
              <button class="btn-icon" title="Duplicar" onclick="duplicateRecord('${r.id}')">${iconCopy()}</button>
              <button class="btn-icon" title="Imprimir" onclick="printRecord('${r.id}')">${iconPrint()}</button>
              <button class="btn-icon" title="Excluir" onclick="askDelete('${r.id}')">${iconTrash()}</button>
            </div></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="pagination">
      <div>${all.length} registro(s) — página ${tableState.page} de ${totalPages}</div>
      <div class="pages">
        <button ${tableState.page<=1?'disabled':''} onclick="changePage(${tableState.page-1})">‹</button>
        ${Array.from({length:totalPages},(_,i)=>i+1).slice(0,6).map(p=>`<button class="${p===tableState.page?'active':''}" onclick="changePage(${p})">${p}</button>`).join('')}
        <button ${tableState.page>=totalPages?'disabled':''} onclick="changePage(${tableState.page+1})">›</button>
      </div>
    </div>
    ` : `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><div>Nenhum registro encontrado para os filtros aplicados.</div></div>`}
  </div>
  ${pendingDeleteId ? renderDeleteModal() : ''}
  `;
}
function iconEye(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;}
function iconEdit(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;}
function iconCopy(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;}
function iconPrint(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`;}
function iconTrash(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>`;}

function renderDeleteModal(){
  const r = records.find(x=>x.id===pendingDeleteId);
  return `<div class="modal-bg" onclick="if(event.target===this) cancelDelete()">
    <div class="modal">
      <h3>Excluir registro?</h3>
      <p>Isso removerá permanentemente a ficha de <b>${esc(r?.patientName||'este registro')}</b>. Essa ação não pode ser desfeita.</p>
      <div class="row">
        <button class="btn btn-ghost" onclick="cancelDelete()">Cancelar</button>
        <button class="btn btn-primary" style="background:var(--red)" onclick="confirmDelete()">Excluir</button>
      </div>
    </div>
  </div>`;
}
function askDelete(id){ pendingDeleteId=id; render(); }
function cancelDelete(){ pendingDeleteId=null; render(); }
async function confirmDelete(){
  const idToDelete = pendingDeleteId;
  const backup = records.find(r=>r.id===idToDelete);
  records = records.filter(r=>r.id!==idToDelete);
  pendingDeleteId=null;
  render();
  const ok = await deleteRecordRemote(idToDelete);
  if(ok){
    showToast('Registro excluído.');
  } else {
    if(backup) records.push(backup);
    render();
    showToast('Erro: não foi possível excluir no banco de dados. Verifique a conexão e tente novamente.');
  }
}
async function duplicateRecord(id){
  const orig = records.find(r=>r.id===id);
  if(!orig) return;
  const copy = {...orig, id: uid(), fichaNumero: '', patientName: orig.patientName + ' (cópia)', createdAt: new Date().toISOString()};
  records.push(copy);
  render();
  const ok = await upsertRecordRemote(copy);
  if(ok){
    showToast('Registro duplicado. Informe o novo Nº da Ficha.');
  } else {
    records = records.filter(r=>r.id!==copy.id);
    render();
    showToast('Erro: não foi possível duplicar no banco de dados. Verifique a conexão e tente novamente.');
  }
}
function printRecord(id){
  goTo('print', id);
  setTimeout(()=>{
    try{ window.print(); }
    catch(e){ showToast('Abra o arquivo em uma aba do navegador para imprimir.'); }
  }, 200);
}
function changePage(p){ tableState.page = p; render(); }
function bindConsultaEvents(){
  const si = document.getElementById('searchInput');
  if(si) si.addEventListener('input', e=>{ tableState.search=e.target.value; tableState.page=1; render(); si_focus(); });
  const fa = document.getElementById('filterAgravo');
  if(fa) fa.addEventListener('change', e=>{ tableState.filterAgravo=e.target.value; tableState.page=1; render(); });
  const fst = document.getElementById('filterSituacao');
  if(fst) fst.addEventListener('change', e=>{ tableState.filterSituacao=e.target.value; tableState.page=1; render(); });
  const fs = document.getElementById('filterStatus');
  if(fs) fs.addEventListener('change', e=>{ tableState.filterStatus=e.target.value; tableState.page=1; render(); });
  document.querySelectorAll('th[data-sort]').forEach(th=>{
    th.addEventListener('click', ()=>{
      const k = th.dataset.sort;
      if(tableState.sortKey===k) tableState.sortDir *= -1; else { tableState.sortKey=k; tableState.sortDir=1; }
      render();
    });
  });
}
function si_focus(){
  requestAnimationFrame(()=>{ const el=document.getElementById('searchInput'); if(el){ el.focus(); el.selectionStart=el.selectionEnd=el.value.length; } });
}
/* ============================= EXPORTAÇÃO EXCEL (POR TIPO DE AGRAVO) ============================= */
function labelOf(options, code){
  if(code===undefined || code===null || code==='') return '';
  const o = (options||[]).find(x=>x[0]===code);
  return o ? o[1] : code;
}
function arrJoin(v){ return Array.isArray(v) ? v.join('; ') : (v||''); }

const SIM_NAO_IGN = [['1','Sim'],['2','Não'],['9','Ignorado']];
const CAT_OPTIONS = [['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']];
const REGIME_TRAT_OPTIONS = [['1','Hospitalar'],['2','Ambulatorial'],['3','Ambos'],['9','Ignorado']];
const REGIME_TRAT_LD_OPTIONS = [['1','Hospitalar'],['2','Ambulatorial']];
const EVOLUCAO_DOENCA_OPTIONS = [['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']];

const EXPORT_COMMON_COLS = [
  ['Nº da Ficha', r=>fichaLabel(r)],
  ['Nº do SINAN', r=>r.numeroSinan||''],
  ['Unidade de Saúde (Notificadora)', r=>r.unidadeSaude||''],
  ['Data da Notificação', r=>fmtDate(r.dataNotificacao)],
  ['Data do Acidente', r=>fmtDate(r.dataAcidente)],
  ['Data de Lançamento', r=>fmtDate(r.dataLancamento)],
  ['Município de Notificação', r=>r.municipioNotificacao||''],
  ['UF de Notificação', r=>r.ufNotificacao||''],
  ['Status', r=>labelOf(STATUS_OPTIONS, r.status)],
  ['Nome do Paciente', r=>r.patientName||''],
  ['Nome da Mãe', r=>r.motherName||''],
  ['Data de Nascimento', r=>fmtDate(r.dataNascimento)],
  ['Idade', r=>{const a=calcIdade(r.dataNascimento); return a!=null?a:'';}],
  ['Faixa Etária', r=>{const a=calcIdade(r.dataNascimento); return a!=null?faixaEtaria(a):'';}],
  ['Sexo', r=>labelOf([['M','Masculino'],['F','Feminino'],['I','Ignorado']], r.sexo)],
  ['Raça/Cor', r=>labelOf([['1','Branca'],['2','Preta'],['3','Amarela'],['4','Parda'],['5','Indígena'],['9','Ignorado']], r.racaCor)],
  ['Escolaridade', r=>labelOf([['0','Analfabeto'],['1','1ª a 4ª série incompleta do EF'],['2','4ª série completa do EF'],['3','5ª a 8ª série incompleta do EF'],['4','Ensino fundamental completo'],['5','Ensino médio incompleto'],['6','Ensino médio completo'],['7','Educação superior incompleta'],['8','Educação superior completa'],['9','Ignorado'],['10','Não se aplica']], r.escolaridade)],
  ['Gestante', r=>labelOf([['1','1º Trimestre'],['2','2º Trimestre'],['3','3º Trimestre'],['4','Idade gestacional ignorada'],['5','Não'],['6','Não se aplica'],['9','Ignorado']], r.gestante)],
  ['Cartão SUS', r=>r.cartaoSus||''],
  ['UF de Residência', r=>r.resUf||''],
  ['Município de Residência', r=>r.resMunicipio||''],
  ['Distrito (Residência)', r=>r.resDistrito||''],
  ['Bairro (Residência)', r=>r.resBairro||''],
  ['Logradouro', r=>r.resLogradouro||''],
  ['Número (Residência)', r=>r.resNumero||''],
  ['Complemento', r=>r.resComplemento||''],
  ['CEP', r=>r.resCep||''],
  ['Zona', r=>labelOf([['1','Urbana'],['2','Rural'],['3','Periurbana'],['9','Ignorado']], r.resZona)],
  ['Ponto de Referência (Residência)', r=>r.resPontoReferencia||''],
  ['Telefone (Residência)', r=>r.resTelefone||''],
  ['País', r=>r.resPais||''],
  ['Ocupação (Profissão)', r=>r.ocupacao||''],
  ['Nº do SINAN', r=>r.numeroSinan||''],
  ['CBO', r=>r.cbo||''],
  ['Situação no Mercado de Trabalho', r=>labelOf([['01','Empregado registrado com carteira assinada'],['02','Empregado não registrado'],['03','Autônomo/conta própria'],['04','Servidor público estatutário'],['05','Servidor público celetista'],['06','Aposentado'],['07','Desempregado'],['08','Trabalho temporário'],['09','Cooperativado'],['10','Trabalhador avulso'],['11','Empregador'],['12','Outros'],['99','Ignorado']], r.situacaoMercado)],
  ['Tempo de Trabalho na Ocupação', r=>r.tempoTrabalhoOcupacao||''],
  ['CNPJ/CPF (Empresa)', r=>r.cnpjCpf||''],
  ['Nome da Empresa/Empregador', r=>r.nomeEmpresa||''],
  ['Classe CNAE (CONCLA)', r=>r.cnae||''],
  ['UF (Empresa)', r=>r.empUf||''],
  ['Município (Empresa)', r=>r.empMunicipio||''],
  ['Distrito (Empresa)', r=>r.empDistrito||''],
  ['Bairro (Empresa)', r=>r.empBairro||''],
  ['Endereço (Empresa)', r=>r.empEndereco||''],
  ['Número (Empresa)', r=>r.empNumero||''],
  ['Ponto de Referência (Empresa)', r=>r.empPontoReferencia||''],
  ['Telefone (Empresa)', r=>r.empTelefone||''],
  ['Empregador Terceirizado', r=>labelOf(CAT_OPTIONS, r.empregadorTerceirizada)],
];

const GRAVE_COLS = [
  ['Local do Acidente', r=>labelOf([['1','Instalações do contratante'],['2','Via pública'],['3','Instalações de terceiros'],['4','Domicílio próprio'],['9','Ignorado']], r.localAcidente)],
  ['CNAE Empresa Principal', r=>r.cnaeEmpresaPrincipal||''],
  ['CNPJ Empresa Principal', r=>r.cnpjEmpresaPrincipal||''],
  ['Razão Social Empresa Principal', r=>r.razaoSocialEmpresaPrincipal||''],
  ['Hora do Acidente', r=>r.horaAcidente||''],
  ['Horas Após Início da Jornada', r=>r.horasAposInicioJornada||''],
  ['UF de Ocorrência', r=>r.ufOcorrencia||''],
  ['Município de Ocorrência', r=>r.municipioOcorrencia||''],
  ['Causa do Acidente (CID-10)', r=>r.causaCID10||''],
  ['Tipo de Acidente', r=>labelOf([['1','Típico'],['2','Trajeto'],['9','Ignorado']], r.tipoAcidente)],
  ['Outros Trabalhadores Atingidos', r=>labelOf(SIM_NAO_IGN, r.houveOutrosTrabalhadores)],
  ['Quantos Trabalhadores', r=>r.quantosTrabalhadores||''],
  ['Ocorreu Atendimento Médico', r=>labelOf(SIM_NAO_IGN, r.ocorreuAtendimentoMedico)],
  ['Data do Atendimento', r=>fmtDate(r.dataAtendimento)],
  ['UF do Atendimento', r=>r.ufAtendimento||''],
  ['Município do Atendimento', r=>r.municipioAtendimento||''],
  ['Unidade de Atendimento', r=>r.nomeUnidadeAtendimento||''],
  ['Partes do Corpo Atingidas', r=>arrJoin(r.partesCorpo)],
  ['Diagnóstico da Lesão (CID-10)', r=>r.diagnosticoLesaoCID10||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_OPTIONS, r.regimeTratamento)],
  ['Evolução do Caso', r=>labelOf([['1','Cura'],['2','Incapacidade temporária'],['3','Incapacidade parcial permanente'],['4','Incapacidade total permanente'],['5','Óbito por acidente de trabalho grave'],['6','Óbito por outras causas'],['7','Outro'],['9','Ignorado']], r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Descrição Sumária', r=>r.descricaoSumaria||''],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const LERDORT_COLS = [
  ['Data do Diagnóstico', r=>fmtDate(r.dataDiagnosticoLD)],
  ['Tempo de Exposição ao Risco', r=>r.tempoExposicaoRiscoLD||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_LD_OPTIONS, r.regimeTratamentoLD)],
  ['Agravos Associados', r=>arrJoin(r.agravosAssociados)],
  ['Outros Agravos Associados', r=>r.agravosAssociadosOutras||''],
  ['Sinais e Sintomas', r=>arrJoin(r.sinaisSintomas)],
  ['Outro Sinal/Sintoma', r=>r.sinaisSintomasOutro||''],
  ['Limitação/Incapacidade', r=>labelOf(SIM_NAO_IGN, r.limitacaoIncapacidade)],
  ['Exposição no Trabalho', r=>arrJoin(r.exposicaoTrabalho)],
  ['Diagnóstico Específico (CID-10)', r=>r.diagnosticoCID10||''],
  ['Houve Afastamento para Tratamento', r=>labelOf(SIM_NAO_IGN, r.houveAfastamentoTratamento)],
  ['Tempo de Afastamento', r=>r.tempoAfastamentoTrabalho||''],
  ['Evolução com Afastamento', r=>labelOf([['1','Melhora'],['2','Piora'],['9','Ignorado']], r.evolucaoComAfastamento)],
  ['Outros Trabalhadores com Mesma Doença', r=>labelOf(SIM_NAO_IGN, r.outrosTrabalhadoresMesmaDoenca)],
  ['Conduta Geral', r=>arrJoin(r.condutaGeral)],
  ['Outra Conduta', r=>r.condutaGeralOutros||''],
  ['Evolução do Caso', r=>labelOf(EVOLUCAO_DOENCA_OPTIONS, r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const MENTAL_COLS = [
  ['Data do Diagnóstico', r=>fmtDate(r.dataDiagnosticoMental)],
  ['Tempo de Exposição ao Risco', r=>r.tempoExposicaoRiscoMental||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_LD_OPTIONS, r.regimeTratamentoMental)],
  ['Diagnóstico Específico (CID-10)', r=>r.diagnosticoCID10||''],
  ['Hábitos', r=>arrJoin(r.habitos)],
  ['Hábito de Fumar', r=>labelOf([['1','Sim'],['2','Não'],['3','Ex-fumante'],['9','Ignorado']], r.habitoFumar)],
  ['Tempo de Exposição ao Tabaco', r=>r.tempoExposicaoTabaco||''],
  ['Conduta Geral', r=>arrJoin(r.condutaGeralMental)],
  ['Outra Conduta', r=>r.condutaGeralMentalOutros||''],
  ['Afastamento do Local de Trabalho', r=>labelOf(SIM_NAO_IGN, r.afastamentoLocalTrabalhoMental)],
  ['Outros Trabalhadores com Mesma Doença', r=>labelOf(SIM_NAO_IGN, r.outrosTrabalhadoresMesmaDoenca)],
  ['Encaminhado a CAPS', r=>labelOf(SIM_NAO_IGN, r.encaminhadoCAPS)],
  ['Evolução do Caso', r=>labelOf(EVOLUCAO_DOENCA_OPTIONS, r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const BIOLOGICO_COLS = [
  ['Data do Acidente', r=>fmtDate(r.dataAcidenteBio)],
  ['Tipo de Exposição', r=>arrJoin(r.tipoExposicao)],
  ['Outro Tipo de Exposição', r=>r.tipoExposicaoOutro||''],
  ['Material Orgânico', r=>labelOf([['1','Sangue'],['2','Líquor'],['3','Líquido pleural'],['4','Líquido ascítico'],['5','Líquido amniótico'],['6','Fluido com sangue'],['7','Soro/plasma'],['8','Outros'],['9','Ignorado']], r.materialOrganico)],
  ['Outro Material Orgânico', r=>r.materialOrganicoOutro||''],
  ['Circunstância do Acidente', r=>labelOf([['01','Administração de medicação endovenosa'],['02','Administração de medicação intramuscular'],['03','Administração de medicação subcutânea'],['04','Administração de medicação intradérmica'],['05','Punção venosa/arterial para coleta de sangue'],['06','Punção venosa/arterial não especificada'],['07','Descarte inadequado de material perfurocortante em bancada, cama, chão etc.'],['08','Descarte inadequado de material perfurocortante em saco de lixo'],['09','Lavanderia'],['10','Lavagem de material'],['11','Manipulação de caixa com material perfurocortante'],['12','Procedimento cirúrgico'],['13','Procedimento odontológico'],['14','Procedimento laboratorial'],['15','Dextro'],['16','Reencape'],['98','Outros'],['99','Ignorado']], r.circunstanciaAcidente)],
  ['Agente', r=>labelOf([['1','Agulha com lúmen (luz)'],['2','Agulha sem lúmen/maciça'],['3','Intracath'],['4','Vidros'],['5','Lâmina/lanceta (qualquer tipo)'],['9','Ignorado']], r.agenteBiologico)],
  ['Uso de EPI', r=>arrJoin(r.usoEPI)],
  ['Outro EPI', r=>r.usoEPIOutro||''],
  ['Situação Vacinal Hepatite B', r=>labelOf([['1','Vacinado'],['2','Não vacinado'],['9','Ignorado']], r.situacaoVacinalHepB)],
  ['Anti-HIV', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHIV)],
  ['HbsAg', r=>labelOf(RESULT_EXAME_OPTIONS, r.examHbsAg)],
  ['Anti-HBs', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHBs)],
  ['Anti-HCV', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHCV)],
  ['Paciente Fonte Conhecida', r=>labelOf(SIM_NAO_IGN, r.pacienteFonteConhecida)],
  ['Fonte — HbsAg', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteHbsAg)],
  ['Fonte — Anti-HBc', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHBc)],
  ['Fonte — Anti-HIV', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHIV)],
  ['Fonte — Anti-HCV', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHCV)],
  ['Conduta no Momento do Acidente', r=>arrJoin(r.condutaMomentoAcidente)],
  ['Outro Esquema ARV', r=>r.outroEsquemaARV||''],
  ['Evolução do Caso', r=>labelOf([['1','Alta com conversão sorológica'],['2','Alta sem conversão sorológica'],['3','Alta paciente fonte negativo'],['4','Abandono'],['5','Óbito por acidente com exposição a material biológico'],['6','Óbito por Outra Causa'],['9','Ignorado']], r.evolucaoCaso)],
  ['Se Conversão Sorológica, Vírus', r=>r.especificarVirus||''],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

function exportExcel(){
  const list = getFilteredRecords();
  if(!list.length){ showToast('Nada para exportar.'); return; }
  if(typeof XLSX === 'undefined'){ showToast('Não foi possível carregar a biblioteca de exportação. Verifique sua conexão com a internet.'); return; }
  const sheetsDef = [
    {key:'grave', name:'Acidente Grave', cols: GRAVE_COLS},
    {key:'biologico', name:'Exposição Biológica', cols: BIOLOGICO_COLS},
    {key:'mental', name:'Transtorno Mental', cols: MENTAL_COLS},
    {key:'lerdort', name:'LER-DORT', cols: LERDORT_COLS},
  ];
  const wb = XLSX.utils.book_new();
  let anySheet = false;
  sheetsDef.forEach(sd=>{
    const recs = list.filter(r=>r.agravoType===sd.key);
    const allCols = [...EXPORT_COMMON_COLS, ...sd.cols];
    const header = allCols.map(c=>c[0]);
    const data = recs.map(r => allCols.map(c => { const v = c[1](r); return (v===undefined||v===null) ? '' : v; }));
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    ws['!cols'] = header.map(()=>({wch:24}));
    XLSX.utils.book_append_sheet(wb, ws, sd.name);
    if(recs.length) anySheet = true;
  });
  if(!anySheet){ showToast('Nenhum registro nos tipos de agravo disponíveis para exportação.'); }
  XLSX.writeFile(wb, 'notificacoes_acidentes_trabalho.xlsx');
  showToast('Excel exportado com sucesso.');
}

/* ============================= FORMULÁRIO ============================= */
function field(opts){
  const {num, label, key, type='text', required=false, span='', options=null, hint='', readOnly=false} = opts;
  const val = formData[key] ?? '';
  const invalid = required && !val;
  let input = '';
  if(type==='select'){
    input = `<select data-k="${key}" ${required?'required':''}>
      <option value="">Selecione...</option>
      ${options.map(o=>`<option value="${o[0]}" ${val===o[0]?'selected':''}>${esc(o[1])}</option>`).join('')}
    </select>`;
  } else if(type==='textarea'){
    input = `<textarea data-k="${key}" rows="3">${esc(val)}</textarea>`;
  } else {
    input = `<input type="${type}" data-k="${key}" value="${esc(val)}" ${required?'required':''} ${readOnly?'readonly':''}>`;
  }
  return `<div class="field ${span} ${invalid?'invalid':''}">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)} ${required?'<span class="req">*</span>':''}</label>
    ${input}
    ${hint?`<span class="hint">${esc(hint)}</span>`:''}
  </div>`;
}
function autocompleteField(opts){
  const {num, label, key, db, required=false, hint} = opts;
  const val = formData[key] ?? '';
  return `<div class="field span2 autocomplete">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)} ${required?'<span class="req">*</span>':''}</label>
    <input type="text" data-k="${key}" data-ac="${db}" value="${esc(val)}" placeholder="Digite o código ou a descrição..." autocomplete="off">
    <div class="ac-list" id="ac-${key}"></div>
    ${hint?`<span class="hint">${esc(hint)}</span>`:''}
  </div>`;
}
function cnaeClassField(){
  const val = formData.cnae ?? '';
  return `<div class="field span2 cnae-field">
    <label>Classe CNAE (CONCLA)</label>
    <input type="text" data-k="cnae" value="${esc(val)}" readonly placeholder="Será consultada pelo CONCLA após selecionar a ocupação">
    <span class="hint" id="cnaeLookupStatus">${val ? 'Classe CNAE armazenada neste registro.' : 'Selecione uma ocupação para consultar a Classe CNAE oficial no CONCLA/IBGE.'}</span>
    <div id="cnaeLookupList" class="cnae-lookup-list"></div>
  </div>`;
}

function checkboxGroup(opts){
  const {num, label, key, options} = opts;
  const val = Array.isArray(formData[key]) ? formData[key] : [];
  return `<div class="field full">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)}</label>
    <div class="checkbox-list" style="flex-direction:row;flex-wrap:wrap;gap:14px">
      ${options.map(o=>`<label><input type="checkbox" data-ck="${key}" value="${o}" ${val.includes(o)?'checked':''}> ${esc(o)}</label>`).join('')}
    </div>
  </div>`;
}

function renderForm(){
  const type = formData.agravoType || 'grave';
  const impl = AGRAVOS[type]?.implemented;
  return `
    <div class="stepper">
      <div class="step ${formPage===1?'active':''}" onclick="switchPage(1)">1. Dados Comuns da Notificação</div>
      <div class="step ${formPage===2?'active':''} ${!impl?'disabled':''}" onclick="${impl?'switchPage(2)':''}">2. Questionário Específico — ${esc(AGRAVOS[type]?.label||'')}</div>
    </div>
    <form id="mainForm">
      ${formPage===1 ? renderPage1() : renderPage2(type)}
      <div class="form-actions no-print">
        <button type="button" class="btn btn-ghost" onclick="goTo('consulta')">Cancelar</button>
        <div style="display:flex;gap:8px">
          ${formPage===2?'<button type="button" class="btn btn-ghost" onclick="switchPage(1)">Voltar</button>':''}
          ${formPage===1 && impl ? `<button type="button" class="btn btn-primary" onclick="switchPage(2)">Avançar para Página 2</button>` : ''}
          <button type="button" class="btn btn-primary" id="saveRecordBtn" onclick="saveRecord()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Salvar Registro
          </button>
        </div>
      </div>
    </form>
  `;
}
function switchPage(p){
  syncFormFromDOM();
  formPage = p;
  render();
}
function renderPage1(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Tipo de agravo (define a página 2)</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${Object.entries(AGRAVOS).map(([k,v])=>`
          <div class="type-pill ${formData.agravoType===k?'selected':''} ${!v.implemented?'soon':''}" onclick="${v.implemented || formData.agravoType!==k ? `selectAgravo('${k}')`:''}">
            ${esc(v.label)} ${!v.implemented?'<span class="soon-tag">Em breve</span>':''}
          </div>`).join('')}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Controle da Ficha</div>
      <div class="field-grid">
        ${field({num:'', label:'Nº da Ficha', key:'fichaNumero', hint:'Preenchimento manual'})}
        ${field({num:'', label:'Data de Lançamento', key:'dataLancamento', type:'date'})}
        ${field({num:'', label:'Status', key:'status', type:'select', required:true, options: STATUS_OPTIONS})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Notificação Individual</div>
      <div class="field-grid">
        ${field({num:'', label:'Unidade de Saúde (ou outra fonte notificadora)', key:'unidadeSaude', required:true, span:'span2'})}
        ${field({num:'', label:'Data da Notificação', key:'dataNotificacao', type:'date', required:true})}
        ${field({num:'', label:'Data do Acidente', key:'dataAcidente', type:'date'})}
        ${field({num:'', label:'Município de Notificação', key:'municipioNotificacao', required:true})}
        ${field({num:'', label:'UF de Notificação', key:'ufNotificacao', type:'select', required:true, options: UFS.map(u=>[u,u])})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados Gerais do Paciente</div>
      <div class="field-grid">
        ${field({num:'', label:'Nome do Paciente', key:'patientName', required:true, span:'span2'})}
        ${field({num:'', label:'Nome da Mãe', key:'motherName', span:'span2'})}
        ${field({num:'', label:'Data de Nascimento', key:'dataNascimento', type:'date', required:true})}
        <div class="field"><label>Idade / Faixa Etária (automático)</label><div class="readonly-chip" id="idadeChip">${idadeChipText()}</div></div>
        ${field({num:'', label:'Sexo', key:'sexo', type:'select', required:true, options:[['M','Masculino'],['F','Feminino'],['I','Ignorado']]})}
        ${field({num:'', label:'Raça/Cor', key:'racaCor', type:'select', options:[['1','Branca'],['2','Preta'],['3','Amarela'],['4','Parda'],['5','Indígena'],['9','Ignorado']]})}
        ${field({num:'', label:'Escolaridade', key:'escolaridade', type:'select', options:[['0','Analfabeto'],['1','1ª a 4ª série incompleta do EF'],['2','4ª série completa do EF'],['3','5ª a 8ª série incompleta do EF'],['4','Ensino fundamental completo'],['5','Ensino médio incompleto'],['6','Ensino médio completo'],['7','Educação superior incompleta'],['8','Educação superior completa'],['9','Ignorado'],['10','Não se aplica']], span:'span2'})}
        ${field({num:'', label:'Gestante', key:'gestante', type:'select', options:[['1','1º Trimestre'],['2','2º Trimestre'],['3','3º Trimestre'],['4','Idade gestacional ignorada'],['5','Não'],['6','Não se aplica'],['9','Ignorado']]})}
        ${field({num:'', label:'Número do Cartão SUS', key:'cartaoSus'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados de Residência</div>
      <div class="field-grid">
        ${field({num:'', label:'UF', key:'resUf', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:'', label:'Município de Residência', key:'resMunicipio'})}
        ${field({num:'', label:'Distrito', key:'resDistrito'})}
        ${field({num:'', label:'Bairro', key:'resBairro'})}
        ${field({num:'', label:'Logradouro (rua, avenida...)', key:'resLogradouro', span:'span2'})}
        ${field({num:'', label:'Número', key:'resNumero'})}
        ${field({num:'', label:'Complemento (apto., casa...)', key:'resComplemento'})}
        ${field({num:'', label:'CEP', key:'resCep'})}
        ${field({num:'', label:'Zona', key:'resZona', type:'select', options:[['1','Urbana'],['2','Rural'],['3','Periurbana'],['9','Ignorado']]})}
        ${field({num:'', label:'Ponto de Referência', key:'resPontoReferencia', span:'span2'})}
        ${field({num:'', label:'Telefone (DDD + número)', key:'resTelefone', type:'tel'})}
        ${field({num:'', label:'País (se residente fora do Brasil)', key:'resPais'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Antecedentes Epidemiológicos — Ocupação</div>
      <div class="field-grid">
        ${autocompleteField({num:'', label:'Ocupação (Profissão)', key:'ocupacao', db:'cbo', required:true, hint:'Digite a profissão e selecione uma ocupação da base oficial SINAN/CBO'})}
        ${field({num:'', label:'Nº do SINAN', key:'numeroSinan', readOnly:true, hint:'Preenchido automaticamente a partir da ocupação selecionada'})}
        ${field({num:'', label:'Nº do CBO', key:'cbo', readOnly:true, hint:'Preenchido automaticamente a partir da ocupação selecionada'})}
        ${cnaeClassField()}
        ${field({num:'', label:'Situação no Mercado de Trabalho', key:'situacaoMercado', type:'select', span:'span2', options:[
          ['01','Empregado registrado com carteira assinada'],['02','Empregado não registrado'],['03','Autônomo/conta própria'],
          ['04','Servidor público estatutário'],['05','Servidor público celetista'],['06','Aposentado'],['07','Desempregado'],
          ['08','Trabalho temporário'],['09','Cooperativado'],['10','Trabalhador avulso'],['11','Empregador'],['12','Outros'],['99','Ignorado']]})}
        ${field({num:'', label:'Tempo de Trabalho na Ocupação', key:'tempoTrabalhoOcupacao', hint:'Ex.: 2 anos, 6 meses'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados da Empresa Contratante</div>
      <div class="field-grid">
        ${field({num:'', label:'Registro / CNPJ ou CPF', key:'cnpjCpf'})}
        ${field({num:'', label:'Nome da Empresa ou Empregador', key:'nomeEmpresa', required:true, span:'span2'})}
        ${field({num:'', label:'UF', key:'empUf', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:'', label:'Município', key:'empMunicipio'})}
        ${field({num:'', label:'Distrito', key:'empDistrito'})}
        ${field({num:'', label:'Bairro', key:'empBairro'})}
        ${field({num:'', label:'Endereço', key:'empEndereco', span:'span2'})}
        ${field({num:'', label:'Número', key:'empNumero'})}
        ${field({num:'', label:'Ponto de Referência', key:'empPontoReferencia'})}
        ${field({num:'', label:'Telefone (DDD + número)', key:'empTelefone', type:'tel'})}
        ${field({num:'', label:'O Empregador é Empresa Terceirizada', key:'empregadorTerceirizada', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>
  </div>`;
}
function idadeChipText(){
  const age = calcIdade(formData.dataNascimento);
  if(age==null) return 'Informe a data de nascimento';
  return `${age} anos — ${faixaEtaria(age)}`;
}
function selectAgravo(k){
  syncFormFromDOM();
  formData.agravoType = k;
  render();
}

function renderPage2(type){
  if(type === 'lerdort') return renderPage2LerDort();
  if(type === 'mental') return renderPage2Mental();
  if(type === 'biologico') return renderPage2Biologico();
  return renderPage2Grave();
}
function renderPage2Grave(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Dados do Acidente</div>
      <div class="field-grid">
        ${field({num:34, label:'Local Onde Ocorreu o Acidente', key:'localAcidente', type:'select', span:'span2', options:[['1','Instalações do contratante'],['2','Via pública'],['3','Instalações de terceiros'],['4','Domicílio próprio'],['9','Ignorado']]})}
        ${field({num:47, label:'Se Empresa Terceirizada, CNAE da Empresa Principal', key:'cnaeEmpresaPrincipal'})}
        ${field({num:48, label:'CNPJ da Empresa Principal', key:'cnpjEmpresaPrincipal'})}
        ${field({num:49, label:'Razão Social (Empresa Principal)', key:'razaoSocialEmpresaPrincipal', span:'span2'})}
        ${field({num:'', label:'Data do Acidente', key:'dataAcidente', type:'date', required:true})}
        ${field({num:50, label:'Hora do Acidente', key:'horaAcidente', type:'text', hint:'Formato HH:MM'})}
        ${field({num:51, label:'Horas Após o Início da Jornada', key:'horasAposInicioJornada', hint:'Formato HH:MM'})}
        ${field({num:52, label:'UF de Ocorrência', key:'ufOcorrencia', type:'select', required:true, options: UFS.map(u=>[u,u])})}
        ${field({num:53, label:'Município de Ocorrência do Acidente', key:'municipioOcorrencia', required:true, span:'span2'})}
        ${autocompleteField({num:54, label:'Código da Causa do Acidente (CID-10, V01 a Y98)', key:'causaCID10', db:'cid'})}
        ${field({num:55, label:'Tipo de Acidente', key:'tipoAcidente', type:'select', required:true, options:[['1','Típico'],['2','Trajeto'],['9','Ignorado']]})}
        ${field({num:56, label:'Houve Outros Trabalhadores Atingidos', key:'houveOutrosTrabalhadores', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:57, label:'Se Sim, Quantos', key:'quantosTrabalhadores', type:'number'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados do Atendimento Médico</div>
      <div class="field-grid">
        ${field({num:58, label:'Ocorreu Atendimento Médico?', key:'ocorreuAtendimentoMedico', type:'select', required:true, options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:59, label:'Data do Atendimento', key:'dataAtendimento', type:'date'})}
        ${field({num:60, label:'UF do Atendimento', key:'ufAtendimento', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:61, label:'Município do Atendimento', key:'municipioAtendimento'})}
        ${field({num:62, label:'Nome da Unidade de Saúde de Atendimento', key:'nomeUnidadeAtendimento', span:'span2'})}
        ${checkboxGroup({num:63, label:'Partes do Corpo Atingidas', key:'partesCorpo', options: PARTES_CORPO})}
        ${autocompleteField({num:64, label:'Diagnóstico da Lesão (CID-10)', key:'diagnosticoLesaoCID10', db:'cid'})}
        ${field({num:65, label:'Regime de Tratamento', key:'regimeTratamento', type:'select', options:[['1','Hospitalar'],['2','Ambulatorial'],['3','Ambos'],['9','Ignorado']]})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Conclusão</div>
      <div class="field-grid">
        ${field({num:66, label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:[
          ['1','Cura'],['2','Incapacidade temporária'],['3','Incapacidade parcial permanente'],['4','Incapacidade total permanente'],
          ['5','Óbito por acidente de trabalho grave'],['6','Óbito por outras causas'],['7','Outro'],['9','Ignorado']]})}
        ${field({num:67, label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
        ${field({num:68, label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Descrição e Investigação</div>
      <div class="field-grid">
        ${field({num:'', label:'Descrição sumária de como ocorreu o acidente/atividade/causas/condições/objeto/agentes que concorreram direta ou indiretamente para a ocorrência', key:'descricaoSumaria', type:'textarea', span:'full'})}
        ${field({num:'', label:'Informações complementares e observações', key:'informacoesComplementares', type:'textarea', span:'full'})}
        ${field({num:'', label:'Município/Unidade de Saúde do Investigador', key:'investigadorMunicipioUnidade', span:'span2'})}
        ${field({num:'', label:'Código da Unidade de Saúde', key:'codUnidadeSaude'})}
        ${field({num:'', label:'Nome do Investigador', key:'investigadorNome'})}
        ${field({num:'', label:'Função', key:'investigadorFuncao'})}
        ${field({num:'', label:'Assinatura', key:'investigadorAssinatura', hint:'Registro textual da assinatura'})}
      </div>
    </div>
  </div>`;
}

function renderPage2LerDort(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Doença Relacionada ao Trabalho — LER/DORT</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Diagnóstico', key:'dataDiagnosticoLD', type:'date', required:true})}
        ${field({num:46, label:'Tempo de Exposição ao Agente de Risco', key:'tempoExposicaoRiscoLD', hint:'Ex.: 3 anos'})}
        ${field({num:47, label:'Regime de Tratamento', key:'regimeTratamentoLD', type:'select', required:true, options:[['1','Hospitalar'],['2','Ambulatorial']]})}
        ${checkboxGroup({num:48, label:'Agravos Associados', key:'agravosAssociados', options:['Hipertensão Arterial','Diabetes Mellitus','Transtorno Mental','Tuberculose','Hanseníase','Asma']})}
        ${field({num:'', label:'Outros Agravos Associados', key:'agravosAssociadosOutras'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Lesões por Esforços Repetitivos / Doenças Osteomusculares Relacionadas ao Trabalho</div>
      <div class="field-grid">
        ${checkboxGroup({num:49, label:'Sinais e Sintomas', key:'sinaisSintomas', options:['Alteração de sensibilidade','Dor','Diminuição de força muscular','Limitação de movimentos','Diminuição do movimento','Sinais flogísticos']})}
        ${field({num:'', label:'Outro Sinal/Sintoma', key:'sinaisSintomasOutro'})}
        ${field({num:50, label:'Limitação e Incapacidade para o Exercício de Tarefas', key:'limitacaoIncapacidade', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${checkboxGroup({num:51, label:'O Paciente está Exposto em seu Local de Trabalho a', key:'exposicaoTrabalho', options:['Há tempo de pausas','Jornada de trabalho de mais de 6 horas','Prêmios de produção','Movimentos repetitivos','Ambiente estressante']})}
        ${autocompleteField({num:52, label:'Diagnóstico Específico (CID-10)', key:'diagnosticoCID10', db:'cid'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Afastamento e Conduta</div>
      <div class="field-grid">
        ${field({num:53, label:'Houve Afastamento do Trabalho para Tratamento?', key:'houveAfastamentoTratamento', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'Tempo de Afastamento do Trabalho para Tratamento', key:'tempoAfastamentoTrabalho'})}
        ${field({num:55, label:'Com Afastamento do Trabalho', key:'evolucaoComAfastamento', type:'select', options:[['1','Melhora'],['2','Piora'],['9','Ignorado']]})}
        ${field({num:56, label:'Há ou Houve Outros Trabalhadores com a Mesma Doença no Local de Trabalho?', key:'outrosTrabalhadoresMesmaDoenca', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${checkboxGroup({num:57, label:'Conduta Geral', key:'condutaGeral', options:['Afastamento do agente do risco com mudança de função e/ou posto de trabalho','Adoção de proteção individual','Adoção de mudança na organização do trabalho','Adoção de proteção coletiva','Nenhum']})}
        ${field({num:'', label:'Outra Conduta', key:'condutaGeralOutros'})}
      </div>
    </div>
    ${renderConclusaoBlock({evolucaoOptions:[
      ['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],
      ['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']]})}
    ${renderInvestigadorBlock()}
  </div>`;
}

function renderPage2Mental(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Doença Relacionada ao Trabalho — Transtornos Mentais</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Diagnóstico', key:'dataDiagnosticoMental', type:'date', required:true})}
        ${field({num:46, label:'Tempo de Exposição ao Agente de Risco', key:'tempoExposicaoRiscoMental', hint:'Ex.: 8 meses'})}
        ${field({num:47, label:'Regime de Tratamento', key:'regimeTratamentoMental', type:'select', required:true, options:[['1','Hospitalar'],['2','Ambulatorial']]})}
        ${autocompleteField({num:48, label:'Diagnóstico Específico (CID-10)', key:'diagnosticoCID10', db:'cid'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Hábitos</div>
      <div class="field-grid">
        ${checkboxGroup({num:49, label:'Hábitos (aceita mais de uma opção)', key:'habitos', options:['Álcool','Psicofármacos','Drogas psicoativas']})}
        ${field({num:'', label:'Hábito de Fumar', key:'habitoFumar', type:'select', options:[['1','Sim'],['2','Não'],['3','Ex-fumante'],['9','Ignorado']]})}
        ${field({num:50, label:'Tempo de Exposição ao Tabaco', key:'tempoExposicaoTabaco'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conduta e Encaminhamento</div>
      <div class="field-grid">
        ${checkboxGroup({num:52, label:'Conduta Geral', key:'condutaGeralMental', options:['Afastamento da situação de desgaste mental','Adoção de proteção individual','Adoção de mudança na organização do trabalho','Adoção de proteção coletiva','Nenhum']})}
        ${field({num:'', label:'Outra Conduta', key:'condutaGeralMentalOutros'})}
        ${field({num:'', label:'Afastamento do Local de Trabalho', key:'afastamentoLocalTrabalhoMental', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:53, label:'Há ou Houve Outros Trabalhadores com a Mesma Doença no Local de Trabalho?', key:'outrosTrabalhadoresMesmaDoenca', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'O Paciente foi Encaminhado a um CAPS ou Outro Serviço Especializado em Transtornos Mentais?', key:'encaminhadoCAPS', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
      </div>
    </div>
    ${renderConclusaoBlock({evolucaoOptions:[
      ['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],
      ['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']]})}
    ${renderInvestigadorBlock()}
  </div>`;
}

function renderPage2Biologico(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Acidente com Exposição a Material Biológico</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Acidente', key:'dataAcidenteBio', type:'date', required:true})}
        ${checkboxGroup({num:46, label:'Tipo de Exposição', key:'tipoExposicao', options:['Percutânea','Mucosa (oral/ocular)','Pele íntegra','Pele não íntegra']})}
        ${field({num:'', label:'Outro Tipo de Exposição', key:'tipoExposicaoOutro'})}
        ${field({num:47, label:'Material Orgânico', key:'materialOrganico', type:'select', required:true, options:[['1','Sangue'],['2','Líquor'],['3','Líquido pleural'],['4','Líquido ascítico'],['5','Líquido amniótico'],['6','Fluido com sangue'],['7','Soro/plasma'],['8','Outros'],['9','Ignorado']]})}
        ${field({num:'', label:'Outro Material Orgânico', key:'materialOrganicoOutro'})}
        ${field({num:48, label:'Circunstância do Acidente', key:'circunstanciaAcidente', type:'select', span:'span2', options:[
          ['01','Administração de medicação endovenosa'],['02','Administração de medicação intramuscular'],['03','Administração de medicação subcutânea'],
          ['04','Administração de medicação intradérmica'],['05','Punção venosa/arterial para coleta de sangue'],['06','Punção venosa/arterial não especificada'],
          ['07','Descarte inadequado de material perfurocortante em bancada, cama, chão etc.'],['08','Descarte inadequado de material perfurocortante em saco de lixo'],
          ['09','Lavanderia'],['10','Lavagem de material'],['11','Manipulação de caixa com material perfurocortante'],['12','Procedimento cirúrgico'],
          ['13','Procedimento odontológico'],['14','Procedimento laboratorial'],['15','Dextro'],['16','Reencape'],['98','Outros'],['99','Ignorado']]})}
        ${field({num:49, label:'Agente', key:'agenteBiologico', type:'select', options:[['1','Agulha com lúmen (luz)'],['2','Agulha sem lúmen/maciça'],['3','Intracath'],['4','Vidros'],['5','Lâmina/lanceta (qualquer tipo)'],['9','Ignorado']]})}
        ${checkboxGroup({num:50, label:'Uso de EPI (aceita mais de uma opção)', key:'usoEPI', options:['LUVA','Avental','Óculos','Máscara','Proteção facial','Bota']})}
        ${field({num:'', label:'Outro EPI', key:'usoEPIOutro'})}
        ${field({num:51, label:'Situação Vacinal do Acidentado em Relação à Hepatite B (3 doses)', key:'situacaoVacinalHepB', type:'select', span:'span2', options:[['1','Vacinado'],['2','Não vacinado'],['9','Ignorado']]})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Resultados de Exames do Acidentado (no momento do acidente — data ZERO)</div>
      <div class="field-grid">
        ${field({num:52, label:'Anti-HIV', key:'examAntiHIV', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'HbsAg', key:'examHbsAg', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Anti-HBs', key:'examAntiHBs', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Anti-HCV', key:'examAntiHCV', type:'select', options: RESULT_EXAME_OPTIONS})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Paciente Fonte</div>
      <div class="field-grid">
        ${field({num:53, label:'Paciente Fonte Conhecida?', key:'pacienteFonteConhecida', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'Fonte — HbsAg', key:'fonteHbsAg', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HBc', key:'fonteAntiHBc', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HIV', key:'fonteAntiHIV', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HCV', key:'fonteAntiHCV', type:'select', options: RESULT_EXAME_OPTIONS})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conduta no Momento do Acidente</div>
      <div class="field-grid">
        ${checkboxGroup({num:55, label:'Conduta (aceita mais de uma opção)', key:'condutaMomentoAcidente', options:['Sem indicação de quimioprofilaxia','Recusou quimioprofilaxia indicada','AZT+3TC','AZT+3TC+Indinavir','AZT+3TC+Nelfinavir','Imunoglobulina humana contra hepatite B (HBIG)','Vacina contra hepatite B']})}
        ${field({num:'', label:'Outro Esquema de ARV (especifique)', key:'outroEsquemaARV', span:'span2'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conclusão</div>
      <div class="field-grid">
        ${field({num:56, label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:[
          ['1','Alta com conversão sorológica'],['2','Alta sem conversão sorológica'],['3','Alta paciente fonte negativo'],
          ['4','Abandono'],['5','Óbito por acidente com exposição a material biológico'],['6','Óbito por Outra Causa'],['9','Ignorado']]})}
        ${field({num:'', label:'Se Conversão Sorológica, Especificar Vírus', key:'especificarVirus'})}
        ${field({num:57, label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
        ${field({num:58, label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>
    ${renderInvestigadorBlock()}
  </div>`;
}
const RESULT_EXAME_OPTIONS = [['1','Positivo'],['2','Negativo'],['3','Inconclusivo'],['4','Não realizado'],['9','Ignorado']];

function renderConclusaoBlock(opts){
  return `<div class="form-section">
    <div class="sec-title">Conclusão</div>
    <div class="field-grid">
      ${field({num:'', label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:opts.evolucaoOptions})}
      ${field({num:'', label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
      ${field({num:'', label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
    </div>
  </div>`;
}
function renderInvestigadorBlock(){
  return `<div class="form-section">
    <div class="sec-title">Investigador e Observações</div>
    <div class="field-grid">
      ${field({num:'', label:'Informações Complementares e Observações', key:'informacoesComplementares', type:'textarea', span:'full'})}
      ${field({num:'', label:'Município/Unidade de Saúde do Investigador', key:'investigadorMunicipioUnidade', span:'span2'})}
      ${field({num:'', label:'Código da Unidade de Saúde', key:'codUnidadeSaude'})}
      ${field({num:'', label:'Nome do Investigador', key:'investigadorNome'})}
      ${field({num:'', label:'Função', key:'investigadorFuncao'})}
      ${field({num:'', label:'Assinatura', key:'investigadorAssinatura', hint:'Registro textual da assinatura'})}
    </div>
  </div>`;
}

function syncFormFromDOM(){
  document.querySelectorAll('#mainForm [data-k]').forEach(el=>{
    formData[el.dataset.k] = el.value;
  });
  const groups = {};
  document.querySelectorAll('#mainForm [data-ck]').forEach(el=>{
    const k = el.dataset.ck;
    groups[k] = groups[k] || [];
    if(el.checked) groups[k].push(el.value);
  });
  Object.keys(groups).forEach(k => formData[k] = groups[k]);
}

let cnaeLookupToken = 0;
const CONCLA_SEARCH_URL = 'https://concla.ibge.gov.br/busca-online-cnae.html';

function setFormFieldValue(key, value){
  formData[key] = value ?? '';
  const input = document.querySelector(`#mainForm [data-k="${key}"]`);
  if(input) input.value = formData[key];
}
function clearOccupationDerivedFields(){
  setFormFieldValue('numeroSinan', '');
  setFormFieldValue('cbo', '');
  setFormFieldValue('cnae', '');
  const status = document.getElementById('cnaeLookupStatus');
  const choices = document.getElementById('cnaeLookupList');
  if(status) status.textContent = 'Selecione uma ocupação para consultar a Classe CNAE oficial no CONCLA/IBGE.';
  if(choices) choices.innerHTML = '';
}
function conclaSearchUrl(query){
  const params = new URLSearchParams({
    option:'com_cnae', view:'atividades', Itemid:'6160', tipo:'cnae', chave:query,
    versao_classesubclasse:'10.1.0', versao_classe:'7.0.0', versao_subclasse:'10.1.0'
  });
  return `${CONCLA_SEARCH_URL}?${params.toString()}`;
}
function classeFromSubclasse(code){
  const m = String(code||'').match(/^(\d{2})(\d{2}-\d)\/\d{2}$/);
  return m ? `${m[1]}.${m[2]}` : '';
}
function parseConclaClasses(html){
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const found = new Map();
  doc.querySelectorAll('tr').forEach(row=>{
    const link = row.querySelector('a[href*="subclasse"]');
    if(!link) return;
    const codeMatch = link.textContent.trim().match(/\d{4}-\d\/\d{2}/);
    if(!codeMatch) return;
    const code = codeMatch[0];
    const classe = classeFromSubclasse(code);
    if(!classe) return;
    const cells = [...row.querySelectorAll('td')].map(td=>td.textContent.replace(/\s+/g,' ').trim());
    const description = cells[1] || link.parentElement?.nextElementSibling?.textContent?.replace(/\s+/g,' ').trim() || '';
    if(!found.has(classe)) found.set(classe, {classe, subclasse:code, description});
  });
  return [...found.values()];
}
function selectCnaeClass(option){
  setFormFieldValue('cnae', option.classe);
  const status = document.getElementById('cnaeLookupStatus');
  const choices = document.getElementById('cnaeLookupList');
  if(status) status.textContent = `Classe CNAE selecionada: ${option.classe}${option.description ? ` — ${option.description}` : ''}`;
  if(choices) choices.innerHTML = '';
}
function renderCnaeChoices(options){
  const list = document.getElementById('cnaeLookupList');
  if(!list) return;
  list.innerHTML = options.map((option, index)=>`<button type="button" class="cnae-choice" data-cnae-index="${index}"><strong>${esc(option.classe)}</strong><span>${esc(option.description || `Resultado ${index+1}`)}</span><small>Subclasse encontrada: ${esc(option.subclasse)}</small></button>`).join('');
  list.querySelectorAll('.cnae-choice').forEach(button=>button.addEventListener('click', ()=>selectCnaeClass(options[Number(button.dataset.cnaeIndex)])));
}
async function lookupCnaeForOccupation(occupation){
  const status = document.getElementById('cnaeLookupStatus');
  const choices = document.getElementById('cnaeLookupList');
  const token = ++cnaeLookupToken;
  if(status) status.textContent = 'Consultando a Classe CNAE oficial no CONCLA/IBGE...';
  if(choices) choices.innerHTML = '';
  try{
    const response = await fetch(conclaSearchUrl(occupation), {headers:{Accept:'text/html'}, cache:'no-store'});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    if(token !== cnaeLookupToken) return;
    const options = parseConclaClasses(html);
    if(!options.length){
      if(status) status.textContent = 'Nenhuma Classe CNAE foi encontrada no CONCLA para esta ocupação. O campo pode ser revisado manualmente.';
      return;
    }
    if(options.length === 1){
      selectCnaeClass(options[0]);
    } else {
      if(status) status.textContent = 'O CONCLA encontrou mais de uma Classe CNAE. Selecione a atividade correspondente:';
      renderCnaeChoices(options);
    }
  }catch(error){
    if(token !== cnaeLookupToken) return;
    if(status) status.textContent = 'Não foi possível consultar o CONCLA agora. Verifique sua conexão e tente selecionar a ocupação novamente.';
    console.warn('Falha na consulta ao CONCLA', error);
  }
}
function bindFormEvents(){
  const form = document.getElementById('mainForm');
  if(!form) return;
  form.addEventListener('input', e=>{
    if(e.target.dataset.k === 'dataNascimento'){
      formData.dataNascimento = e.target.value;
      const chip = document.getElementById('idadeChip');
      if(chip) chip.textContent = idadeChipText();
    }
    if(e.target.dataset.k === 'ocupacao'){
      formData.ocupacao = e.target.value;
      const selected = CBO_DB.some(item=>normalizeSearchText(item.desc) === normalizeSearchText(e.target.value));
      if(!selected) clearOccupationDerivedFields();
    }
    if(e.target.dataset.ac){
      handleAutocomplete(e.target);
    }
  });
  document.querySelectorAll('.ac-list').forEach(list=>{
    list.addEventListener('mousedown', e=>{
      const item = e.target.closest('.ac-item');
      if(!item || item.dataset.value === undefined) return;
      const inputKey = list.id.replace('ac-','');
      const input = document.querySelector(`[data-k="${inputKey}"]`);
      if(inputKey === 'ocupacao' && item.dataset.sinan){
        input.value = item.dataset.value;
        formData.ocupacao = item.dataset.value;
        setFormFieldValue('numeroSinan', item.dataset.sinan);
        setFormFieldValue('cbo', item.dataset.cbo);
        setFormFieldValue('cnae', '');
        const choices = document.getElementById('cnaeLookupList');
        if(choices) choices.innerHTML = '';
        list.classList.remove('open');
        lookupCnaeForOccupation(item.dataset.value);
      } else {
        input.value = item.dataset.value;
        formData[inputKey] = item.dataset.value;
        list.classList.remove('open');
      }
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.autocomplete')) document.querySelectorAll('.ac-list').forEach(l=>l.classList.remove('open'));
  });
}
function handleAutocomplete(input){
  const db = input.dataset.ac === 'cbo' ? CBO_DB : CID10_DB;
  const key = input.dataset.k;
  const query = normalizeSearchText(input.value.trim());
  const list = document.getElementById('ac-'+key);
  if(!query){ list.classList.remove('open'); return; }
  const matches = db.filter(item=>{
    const haystack = [item.code, item.desc, item.sinan].filter(Boolean).map(normalizeSearchText).join(' ');
    return haystack.includes(query);
  }).slice(0,10);
  if(!matches.length){ list.innerHTML = `<div class="ac-item" style="color:var(--text-muted)">Nenhum resultado na base local</div>`; list.classList.add('open'); return; }
  if(input.dataset.ac === 'cbo'){
    list.innerHTML = matches.map(item=>`<div class="ac-item" data-value="${esc(item.desc)}" data-sinan="${esc(item.sinan)}" data-cbo="${esc(item.code)}"><b>${esc(item.desc)}</b><small>SINAN ${esc(item.sinan)} · CBO ${esc(item.code)}</small></div>`).join('');
  } else {
    list.innerHTML = matches.map(item=>`<div class="ac-item" data-value="${esc(item.code+' - '+item.desc)}"><b>${esc(item.code)}</b> — ${esc(item.desc)}</div>`).join('');
  }
  list.classList.add('open');
}

async function saveRecord(){
  syncFormFromDOM();
  const idx = records.findIndex(r=>r.id===formData.id);
  if(idx>=0){
    records[idx] = formData;
  } else {
    records.push(formData);
  }
  const btn = document.getElementById('saveRecordBtn');
  if(btn){ btn.disabled = true; btn.textContent = 'Salvando...'; }
  const ok = await upsertRecordRemote(formData);
  if(ok){
    showToast('Registro salvo com sucesso.');
    goTo('consulta');
  } else {
    if(idx>=0){
      // idx era o registro original antes da edição local; não temos como restaurar
      // o valor anterior aqui, então apenas avisamos e deixamos os dados no formulário
      // para o usuário tentar salvar de novo.
    } else {
      records = records.filter(r=>r.id!==formData.id);
    }
    if(btn){ btn.disabled = false; btn.textContent = 'Salvar Registro'; }
    showToast('Erro: o registro NÃO foi salvo no banco de dados. Verifique sua conexão e tente novamente.');
  }
}
function fichaLabel(r){
  return r.fichaNumero ? '#' + String(r.fichaNumero) : '—';
}

/* ============================= IMPRESSÃO ============================= */
function renderPrint(id){
  const r = records.find(x=>x.id===id);
  if(!r) return `<div class="panel">Registro não encontrado.</div>`;
  const age = calcIdade(r.dataNascimento);
  const rows = (pairs) => pairs.map(([l,v])=>`<tr><td style="width:45%;color:var(--text-muted)">${esc(l)}</td><td><b>${esc(v||'—')}</b></td></tr>`).join('');
  return `
  <div class="panel no-print" style="display:flex;justify-content:space-between;align-items:center">
    <div>Visualização para impressão</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm" onclick="goTo('consulta')">Voltar</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()">Imprimir</button>
    </div>
  </div>
  <div class="panel">
    <h2 style="font-size:16px">Ficha de Investigação — ${esc(AGRAVOS[r.agravoType]?.label||'')} <span style="font-family:var(--font-mono);color:var(--text-muted);font-size:13px">(${esc(fichaLabel(r))})</span></h2>
    <table>${rows([
      ['Unidade de Saúde', r.unidadeSaude],['Data da Notificação', fmtDate(r.dataNotificacao)],
      ['Data do Acidente', fmtDate(r.dataAcidente)],
      ['Nome do Paciente', r.patientName],['Data de Nascimento', fmtDate(r.dataNascimento)+ (age!=null?` (${age} anos — ${faixaEtaria(age)})`:'')],
      ['Sexo', r.sexo],['Município/UF de Notificação', (r.municipioNotificacao||'')+' / '+(r.ufNotificacao||'')],
      ['Ocupação', r.ocupacao],['Nº do SINAN', r.numeroSinan],['CBO', r.cbo],['Classe CNAE (CONCLA)', r.cnae],['Empresa', r.nomeEmpresa],['CNPJ/CPF', r.cnpjCpf],
    ])}</table>
    ${r.agravoType==='grave' ? `<h2 style="font-size:14px;margin-top:16px">Acidente de Trabalho Grave</h2><table>${rows([
      ['Tipo de Acidente', r.tipoAcidente==='1'?'Típico':r.tipoAcidente==='2'?'Trajeto':r.tipoAcidente],
      ['Município/UF de Ocorrência', (r.municipioOcorrencia||'')+' / '+(r.ufOcorrencia||'')],
      ['Causa (CID-10)', r.causaCID10],['Diagnóstico da Lesão (CID-10)', r.diagnosticoLesaoCID10],
      ['Partes do Corpo Atingidas', (r.partesCorpo||[]).join(', ')],
      ['Evolução do Caso', r.evolucaoCaso],['CAT Emitida', r.foiEmitidaCAT==='1'?'Sim':r.foiEmitidaCAT==='2'?'Não':r.foiEmitidaCAT],
      ['Investigador', r.investigadorNome],
    ])}</table>
    <div style="margin-top:12px"><b>Descrição sumária:</b><br>${esc(r.descricaoSumaria||'—')}</div>` : ''}
  </div>`;
}

/* ============================= INIT ============================= */
(async function init(){
  try{
    if(!supabaseClient){
      throw new Error('Não foi possível conectar ao banco de dados (biblioteca do Supabase não carregou). Verifique sua conexão ou bloqueadores de script e recarregue a página.');
    }
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(session && session.user){
      currentUser = session.user;
      await startApp();
    } else {
      document.getElementById('appRoot').innerHTML = renderLogin();
      bindLoginEvents();
    }

    supabaseClient.auth.onAuthStateChange((event, session)=>{
      if(event === 'SIGNED_OUT'){
        currentUser = null;
      } else if(session && session.user && !currentUser){
        // Sessão restaurada em outra aba/token renovado antes de startApp já ter rodado
        currentUser = session.user;
      }
    });
  }catch(e){
    console.error('Erro ao iniciar o SNAT', e);
    document.getElementById('appRoot').innerHTML = `
      <div class="login-wrap">
        <div class="login-card">
          <div class="login-brand">
            <div class="tag">Erro ao iniciar</div>
            <div class="title" style="color:var(--red);font-size:20px;">Algo deu errado</div>
          </div>
          <div class="login-error">${esc(e.message || 'Erro desconhecido ao carregar a aplicação.')}</div>
          <div class="login-hint">Recarregue a página. Se o problema continuar, verifique o console do navegador (F12) para mais detalhes.</div>
        </div>
      </div>`;
  }
})();
