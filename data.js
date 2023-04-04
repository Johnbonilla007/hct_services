const categories = [
  {
    name: 'software',
    active: 1,
  },
  {
    name: 'audio',
    active: 1,
  },
  {
    name: 'accesorios',
    active: 1,
  },
  {
    name: 'laptop',
    active: 1,
  },
];

const cities = [
  {
    acronym: 'SPS',
    name: 'San Pedro Sula',
    active: 1,
  },
  {
    acronym: 'TGU',
    name: 'Tegucigalpa',
    active: 1,
  },
];

const carrusels = [
  {
    enable: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/carrusel%2FgbeqE07702.jpg?alt=media&token=7b5bb186-8feb-4832-ae29-8e25e1ff6eb2',
  },
  {
    enable: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/carrusel%2Fshare-2022.jpg?alt=media&token=85682279-01d0-4654-99e5-b663c3a02872',
  },
  {
    enable: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/carrusel%2FHot-Sale-2022-fechas-descuentos.jpg?alt=media&token=af6bafa4-6015-4ca7-b78a-d5e495816861',
  },
];

const products = [
  {
    id: 'NGjzSTHYnZwOFS7MwQhl',
    city: {
      Tegucigalpa: 3,
      'San Pedro Sula': 9,
    },
    quantity_available: 12,
    description: 'S.O. Windows 11 Home 64bit',
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2Fw11.jpg?alt=media&token=36939509-0c5a-4846-867a-7f5e6ae69de2',
    date_creation: 1657923287999,
    condition: 'Totalmente nuevo, envios por correo',
    category: ['software', 'windows'],
    features: '',
    brand: 'Microsoft',
    date_modification: 1661002910129,
    name: 'Windows 11',
    rating: 2.375,
    price: 2566,
    available: true,
  },
  {
    id: 'OycbQ7FxjuEt9JBqbIJ5',
    brand: 'hp',
    condition: 'Totalmente nueva, envios por cargo expreso',
    quantity_available: 10,
    date_modification: 1660778832026,
    category: ['laptop', 'computadoras', 'hp'],
    rating: 3.2,
    features:
      'Intel Core i7-1165G7,12 MBH L3 cache, 4 core,8gb de Ram, 250Gb SSD',
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2FHp-spectre.jpg?alt=media&token=d68561f2-5f9b-4601-b6d8-5e6c80b0e734',
    city: {
      Tegucigalpa: 6,
      'San Pedro Sula': 4,
    },
    name: 'HP Spectre',
    description: "HP Spectre x360 13-aw2024na 13.3'computadora portatil",
    available: true,
    date_creation: 1656524333730,
    price: 15966,
  },
  {
    id: 'QNeg92UCTMOLvREIUKqF',
    features:
      'Intel Core i7-7700HQ 2.8 GHz Hexa-Core, 8GB DDR4, 256GB SSD, retroiluminada',
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2FMSI.jpg?alt=media&token=a937198d-5f3c-4ba5-928f-6a76183474c9',
    city: {
      Tegucigalpa: 3,
      'San Pedro Sula': 9,
    },
    name: 'MSI GL26M',
    rating: 4,
    condition: 'Totalmente nueva, envios por cargo expreso',
    date_creation: 1657663253815,
    description: "MSI GL26M  15.6', AMD computadora portatil",
    quantity_available: 12,
    brand: 'MSI',
    price: 23566,
    available: true,
    category: ['laptop', 'msi', 'computadoras'],
    date_modification: 1658270250666,
  },
  {
    id: 'QfCRslwU5apDdr7h31Vv',
    date_modification: 1660084029449,
    manufacturer_number: 'XCTOL552015MMCLA',
    features:
      'Intel® Core™ i5-1145G7 de 11.ª generación (4 núcleos, caché de 8 M, base de 2,6 GHz hasta 4,4 GHz, vPro),Pantalla HD de 15,6" (1366 x 768), sin función táctil, antirreflejo, TN, 220 nits, WLAN/WWAN, cámara HD',
    description: 'Dell Latitude Intel® Core™ i5-1145G7 de 11.ª generación',
    category: ['laptop', 'computadoras'],
    date_creation: 1660081947455,
    brand: 'Dell',
    rating: 4,
    quantity_available: 5,
    available: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2Ffondo%20products.jpg?alt=media&token=664ca056-9cee-4701-828f-4c0218dac86d',
    condition: 'Totalmente nueva, entregas por cargo express',
    price: 27540,
    name: 'Dell Latitude 15" 5520',
  },
  {
    id: 'Ub23bMzNPcz7u81rJfgB',
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2FAcer.jpg?alt=media&token=ffa34ed0-6be7-4290-97ea-5ce670539870',
    date_creation: 1656525141153,
    city: {
      Tegucigalpa: 3,
      'San Pedro Sula': 9,
    },
    available: true,
    quantity_available: 12,
    category: ['acer', 'laptop', 'computadora'],
    name: 'Acer Aspire 5',
    price: 12566,
    date_modification: 1659548847757,
    description: "Acer Aspire 5 Ryzen 5, 15.6'computadora portatil",
    features: 'Ryzen 5 5500U Hexa-Core, 8GB DDR4, 256GB SSD, retroiluminada',
    brand: 'Acer',
    condition: 'Totalmente nueva, envios por cargo expreso',
    rating: 3.7,
  },
  {
    id: 'pr6awLaP2TReLsMljGKb',
    city: {
      'San Pedro Sula': 9,
      Tegucigalpa: 3,
    },
    price: 12566,
    available: true,
    category: ['lenovo', 'laptop', 'computadoras'],
    name: 'Lenovo V14',
    quantity_available: 12,
    date_creation: 1656719556371,
    rating: 3.8333333333333335,
    condition: 'Totalmente nueva, envios por cargo expreso',
    features: 'Ryzen 3 3500U Hexa-Core, 8GB DDR4, 256GB SSD, retroiluminada',
    image:
      'https://firebasestorage.googleapis.com/v0/b/web-hct.appspot.com/o/products%2Flenovo.jpg?alt=media&token=234fbca1-5268-4277-9d2b-1e2a02b84441',
    description: "Lenovo V14  14', Serie V, AMD Ryzen computadora portatil",
    date_modification: 1661002954307,
    brand: 'lenovo',
  },
];

const rating = [
  {
    id_produdct: 'OycbQ7FxjuEt9JBqbIJ5',
    uid: 'uEsBg1dhrzTCdOtZMPcoU6OuhzI2',
    email: 'lindapp@yourappland.com',
    vote: 3,
    commet: 'cdfergdf',
  },
  {
    id_produdct: 'Ub23bMzNPcz7u81rJfgB',
    uid: 'U2m0V7Q1HZdWsI2FPUftveRfCSW2',
    email: 'jsantos@yourappland.com',
    vote: 3.5,
    commet: 'una pc muy buena, calidad precio',
  },
  {
    id_produdct: 'NGjzSTHYnZwOFS7MwQhl',
    uid: 'U2m0V7Q1HZdWsI2FPUftveRfCSW2',
    email: 'jsantos@yourappland.com',
    vote: 3.5,
    commet:
      'ultimamente el sistema va bien ya se han solucionado varios errores, es casi igual de bueno que windows 10 tiene potencial',
  },
  {
    id_produdct: 'NGjzSTHYnZwOFS7MwQhl',
    uid: '2p1wI9nLq8QCbxgmMoR8XW2cltv2',
    email: 'ccaballero@yourappland.com',
    vote: 0.5,
    commet: 'El sistema se traba cada vez que utilizo la computadora',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: 'w2HqptbpAqNHGMXfKpKAGOPfxTc2',
    email: 'jsantos@yourappland.com',
    vote: 3,
    commet: 'cumple con las espectativas',
  },
  {
    id_produdct: 'QfCRslwU5apDdr7h31Vv',
    uid: 'MxaPCTg1Q6am2D3bAzPydpEaH0e2',
    email: 'kevin_js8@hotmail.com',
    vote: 4,
    commet: 'muy buena pc',
  },
  {
    id_produdct: 'NGjzSTHYnZwOFS7MwQhl',
    uid: 'OD9UdM5JLSh3KgwxaCQI6dA1mkI2',
    email: 'ccaballero@yourappland.com',
    vote: 4,
    commet: 'Es excelente',
  },
  {
    id_produdct: 'QNeg92UCTMOLvREIUKqF',
    uid: 'w2HqptbpAqNHGMXfKpKAGOPfxTc2',
    email: 'jsantos@yourappland.com',
    vote: 4,
    commet: 'laptop muy buena para jugar',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: 'uEsBg1dhrzTCdOtZMPcoU6OuhzI2',
    email: 'lindapp@yourappland.com',
    vote: 3.5,
    commet: 'muy buena pc',
  },
  {
    id_produdct: 'Ub23bMzNPcz7u81rJfgB',
    uid: 'Tn7KPZcEpqeCRfYOeiByuELMmAn1',
    email: 'glenda18e_i515f@tigpe.com',
    vote: 3.5,
    commet: 'Esta laptop acer me gusta',
  },
  {
    id_produdct: 'OycbQ7FxjuEt9JBqbIJ5',
    uid: 'IZLLUgqQ3iQm4qBHc9F7hgxN8o92',
    email: 'javier.ss896@gmail.com',
    vote: 3.5,
    commet: 'A mi si me parece un buen pc',
  },
  {
    id_produdct: 'Ub23bMzNPcz7u81rJfgB',
    uid: 'IZLLUgqQ3iQm4qBHc9F7hgxN8o92',
    email: 'javier.ss896@gmail.com',
    vote: 2.5,
    commet:
      'este pese me gusta mucho ya que el rendimiento es muy bueno, pero creo  que su precio es muy elevado para sus caracteristicas',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: 'A0TUSLqm41grSQTuH9xwgF1zeKl2',
    email: 'kjsantos@unah.hn',
    vote: 4.5,
    commet: 'una laptop ultra degalda muy bonita',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: '2p1wI9nLq8QCbxgmMoR8XW2cltv2',
    email: 'ccaballero@yourappland.com',
    vote: 5,
    commet: 'Es excelente, rápida, y  ligera',
  },
  {
    id_produdct: 'Ub23bMzNPcz7u81rJfgB',
    uid: 'MxaPCTg1Q6am2D3bAzPydpEaH0e2',
    email: 'kevin_js8@hotmail.com',
    vote: 5,
    commet: 'me encanta esta pc, calidad precio',
  },
  {
    id_produdct: 'Ub23bMzNPcz7u81rJfgB',
    uid: 'uEsBg1dhrzTCdOtZMPcoU6OuhzI2',
    email: 'lindapp@yourappland.com',
    vote: 4,
    commet: 'Esta laptop acer es muy bueno cumple con lo especificado',
  },
  {
    id_produdct: 'OycbQ7FxjuEt9JBqbIJ5',
    uid: 'MxaPCTg1Q6am2D3bAzPydpEaH0e2',
    email: 'kevin_js8@hotmail.com',
    vote: 3.5,
    commet: 'es comentario',
  },
  {
    id_produdct: 'OycbQ7FxjuEt9JBqbIJ5',
    uid: '5OFVxP0kE3ewXZ9hhPenjJwy8Cg1',
    email: 'javier.ss8962@gmail.com',
    vote: 4,
    commet: 'un comentario mas',
  },
  {
    id_produdct: 'OycbQ7FxjuEt9JBqbIJ5',
    uid: 'w2HqptbpAqNHGMXfKpKAGOPfxTc2',
    email: 'jsantos@yourappland.com',
    vote: 2,
    commet: 'mala calidad de pc',
  },
  {
    id_produdct: 'NGjzSTHYnZwOFS7MwQhl',
    uid: 'IZLLUgqQ3iQm4qBHc9F7hgxN8o92',
    email: 'javier.ss896@gmail.com',
    vote: 1.5,
    commet: 'de momento un sistema operativo con muchos bugs',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: 'OD9UdM5JLSh3KgwxaCQI6dA1mkI2',
    email: 'ccaballero@yourappland.com',
    vote: 2,
    commet: 'lenta',
  },
  {
    id_produdct: 'pr6awLaP2TReLsMljGKb',
    uid: 'IZLLUgqQ3iQm4qBHc9F7hgxN8o92',
    email: 'javier.ss896@gmail.com',
    vote: 5,
    commet:
      'una computadora muy bnonita, y liviana perfecta para llevar a cualquier parte',
  },
];

const affiliates = [
  {
    indentification_card: '1706-1995-00135',
    name: 'Diana Santos',
    email: 'javier.ss8962@gmail.com',
    phone: '50495060180',
    city: 'Tegucigalpa',
    address: 'Col. la Esperanza final del blvd, morazan',
    uid: '5OFVxP0kE3ewXZ9hhPenjJwy8Cg1',
  },
  {
    indentification_card: '',
    name: 'Maria Daniela Solano',
    email: 'lindapp@yourappland.com',
    phone: '50499999999',
    city: 'San Pedro Sula',
    address:
      'colonia Satelite, calle principal una cuadra abajo las canchas de futbol por comedor Doña Tila',
    uid: 'uEsBg1dhrzTCdOtZMPcoU6OuhzI2',
  },
  {
    indentification_card: '',
    name: 'Kevin Javier Santos Sanchez',
    email: 'kjsantos@unah.hn',
    phone: '50495060180',
    city: 'Tegucigalpa',
    address:
      'colonia San Miguel, calle principal una cuadra abajo las canchas de futbol',
    uid: 'A0TUSLqm41grSQTuH9xwgF1zeKl2',
  },
  {
    indentification_card: '0801-1995-14262',
    name: 'Cinthia Caballero',
    email: 'ccaballero@yourappland.com',
    phone: '50497215549',
    city: 'San Pedro Sula',
    address: 'Quesada',
    uid: '2p1wI9nLq8QCbxgmMoR8XW2cltv2',
  },
  {
    indentification_card: '',
    name: 'Juan Diego Santos Figueroa',
    email: 'kevin_js8@hotmail.com',
    phone: '50495060180',
    city: 'Tegucigalpa',
    address:
      'colonia Kennedy calle principal, una cuadra abajo la posta de policia, calle la flecha',
    uid: 'MxaPCTg1Q6am2D3bAzPydpEaH0e2',
  },
  {
    indentification_card: '0801-1999-44505',
    name: 'Ana Maria Salgado',
    email: 'javier.ss8963@gmail.com',
    phone: '50499999999',
    city: 'San Pedro Sula',
    address: 'Col. la Esperanza final del blvd, morazan',
    uid: 'yF3F5AuSlFVTnbwjDPTDkWwlRyU2',
  },
  {
    indentification_card: '',
    name: 'Kevin Javier Santos',
    email: 'jsantos@yourappland.com',
    phone: '50495060180',
    city: 'San Pedro Sula',
    address:
      'Tegucigalpa, colonia San Miguel, calle principal una cuadra abajo las canchas de futbol;',
    uid: 'U2m0V7Q1HZdWsI2FPUftveRfCSW2',
  },
  {
    indentification_card: '',
    name: 'Sharon Irias',
    email: 'glenda18e_i515f@tigpe.com',
    phone: '98810177',
    city: 'San Pedro Sula',
    address:
      'Tegucigalpa, colonia San Miguel, calle principal una cuadra abajo las canchas de futbol;',
    uid: 'Tn7KPZcEpqeCRfYOeiByuELMmAn1',
  },
  {
    indentification_card: '1706-1996-00047',
    name: 'kevin Santos',
    email: 'javier.ss8961@gmail.com',
    phone: '50495060190',
    city: 'Tegucigalpa',
    address: 'Col. la Esperanza final del blvd, morazan',
    uid: 'R8gcH9j3H5fFVhUF7Ub0yXfHrNX2',
  },
  {
    indentification_card: '1706-1996-00047',
    name: 'Kevin santos',
    email: 'javier.ss896@gmail.com',
    phone: '98810177',
    city: 'Tegucigalpa',
    address:
      'Tegucigalpa, colonia San Miguel, calle principal una cuadra abajo las canchas de futbol;',
    uid: 'IZLLUgqQ3iQm4qBHc9F7hgxN8o92',
  },
];

module.exports = {
  categories,
  cities,
  carrusels,
  affiliates,
  products,
  rating,
};
