import type { PartnersContent, CompareContent, OffersContent } from './marketing';

export const es: { partners: PartnersContent; compare: CompareContent; offers: OffersContent } = {
  partners: {
    slug: 'partners',
    title: 'Colabora con Carzio | Alquiler de coches en el aeropuerto de Agadir',
    description:
      'Surf camps, hoteles, empresas de traslados y agencias de viajes: ofrece a tus clientes un coche que les espera en el aeropuerto de Agadir Al Massira, con 0 MAD de fianza y cancelación gratuita hasta 24 h.',
    h1: 'Ofrece a tus clientes un coche en el aeropuerto de Agadir',
    intro:
      'Carzio es una agencia local de alquiler de coches situada en el aeropuerto de Agadir Al Massira. Trabajamos con surf camps, pequeños hoteles, empresas de traslados y agencias de viajes que buscan una opción de coche sencilla y fiable para sus clientes.',
    sections: [
      {
        title: 'Un socio local en el aeropuerto',
        paragraphs: [
          'Tus clientes aterrizan en Agadir Al Massira y recogen su coche a la llegada. Nuestro equipo habla francés, inglés, alemán, español y polaco, y la agencia está abierta 24/7.',
          'El alquiler incluye kilometraje ilimitado, seguro estándar y 0 MAD de fianza. El pago se realiza al entregar las llaves y la cancelación es gratuita hasta 24 horas antes de la recogida.',
        ],
      },
      {
        title: 'Qué podemos ofrecer a tus clientes',
        paragraphs: [
          'Podemos preparar un enlace de reserva dedicado para tu alojamiento, priorizar la recogida en las horas de llegada más concurridas y ofrecer una silla infantil o un elevador gratis bajo petición.',
          'La ventaja exacta para socios se confirma por escrito antes de empezar. No prometemos comisiones en efectivo salvo que se hayan acordado y firmado con el propietario.',
        ],
      },
      {
        title: 'Cómo empezar',
        paragraphs: [
          'Envíanos el nombre de tu alojamiento o agencia, la ciudad, los idiomas que hablas y el tipo de clientes que recibes. Te responderemos con una propuesta sencilla y un enlace dedicado.',
          'No hay cuota de alta ni exclusividad. Sigues siendo libre de recomendar otro proveedor si Carzio no encaja con tus clientes.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Pagáis comisión a los socios?',
        a: 'La comisión se trata caso por caso y solo se confirma por escrito. No anunciamos una tarifa pública.',
      },
      {
        q: '¿Podéis priorizar la recogida de nuestros clientes?',
        a: 'Sí, la recogida prioritaria puede organizarse para socios, según los horarios de vuelo y la disponibilidad.',
      },
      {
        q: '¿Ofrecéis un enlace de reserva dedicado?',
        a: 'Sí. Podemos crear un enlace con seguimiento para que tú y tus clientes lleguéis a la página correcta.',
      },
      {
        q: '¿Qué idiomas habla vuestro equipo?',
        a: 'Francés, inglés, alemán, español y polaco, además de árabe marroquí.',
      },
    ],
    audience: [
      'Surf camps en Taghazout y Tamraght',
      'Riads y pequeños hoteles en Agadir',
      'Empresas de traslados al aeropuerto',
      'Agencias de viajes en Europa',
    ],
    perks: [
      'Silla infantil gratis bajo petición',
      'Recogida prioritaria en horas punta',
      'Enlace de reserva dedicado',
      'Asistencia local 24/7',
    ],
  },
  compare: {
    slug: 'compare',
    title: 'Carzio frente a las plataformas internacionales de alquiler | Agadir',
    description:
      'Compara la reserva directa con Carzio en el aeropuerto de Agadir y una plataforma internacional de alquiler: fianza, cancelación, entrega en el aeropuerto, pago y asistencia.',
    h1: 'Carzio frente a las plataformas de alquiler internacionales',
    intro:
      'Las plataformas internacionales pueden mostrar muchos coches, pero el alquiler lo gestiona una agencia local. Esto es lo que cambia cuando reservas directamente con Carzio en el aeropuerto de Agadir Al Massira.',
    rows: [
      {
        label: 'Con quién reservas',
        carzio: 'Carzio, una agencia local con base en el aeropuerto de Agadir',
        platform: 'Un intermediario; la empresa de alquiler se asigna más tarde',
      },
      {
        label: 'Fianza',
        carzio: '0 MAD, sin bloqueo de tarjeta',
        platform: 'Depende de la empresa de alquiler y de la tarifa',
      },
      {
        label: 'Cancelación',
        carzio: 'Gratuita hasta 24 h antes de la recogida',
        platform: 'Depende de la tarifa y de la plataforma',
      },
      {
        label: 'Entrega en el aeropuerto',
        carzio: 'Recepción en la llegada, gratis',
        platform: 'Depende de la empresa; puede haber lanzadera o mostrador',
      },
      {
        label: 'Pago',
        carzio: 'Al entregar las llaves',
        platform: 'A menudo prepago online o en el mostrador',
      },
      {
        label: 'Asistencia',
        carzio: 'Equipo local en el aeropuerto, 24/7',
        platform: 'Centro de llamadas y luego la empresa local',
      },
      {
        label: 'Precio',
        carzio: 'Mostrado por coche y por día',
        platform: 'Depende de las tarifas, seguros y extras añadidos al pagar',
      },
    ],
    faqs: [
      {
        q: '¿Reservar directamente es siempre más barato?',
        a: 'No siempre. Una plataforma puede mostrar un precio de reclamo más bajo y añadir extras después. Compara el precio total, la fianza y las condiciones de cancelación.',
      },
      {
        q: '¿Por qué la fianza es de 0 MAD?',
        a: 'Carzio no bloquea dinero en tu tarjeta. Pagas el precio del alquiler al entregar las llaves.',
      },
      {
        q: '¿Puedo cancelar una reserva directa?',
        a: 'Sí, gratis hasta 24 horas antes de la recogida.',
      },
      {
        q: '¿Recibo el mismo coche que en la plataforma?',
        a: 'Con Carzio eliges un modelo o un equivalente. La confirmación indica el coche o la categoría de sustitución antes de pagar.',
      },
    ],
  },
  offers: {
    slug: 'offers',
    title: 'Ofertas de temporada de alquiler de coches en Agadir | Carzio',
    description:
      'Ofertas de temporada de Carzio en Agadir: Navidad, Semana Santa y verano. Silla infantil gratis, día extra y 0 MAD de fianza, según disponibilidad y confirmación.',
    h1: 'Ofertas de temporada de alquiler de coches en Agadir',
    intro:
      'Nuestras ofertas de temporada son sencillas y se confirman antes de reservar. Están sujetas a disponibilidad y no siempre pueden combinarse con otra promoción.',
    offers: [
      {
        id: 'christmas-2026',
        period: 'Navidad 2026',
        title: '10 % de descuento en alquileres de 5 días o más',
        description:
          'Reserva un coche para 5 días o más durante el periodo de Navidad y solicita la oferta del 10 %. El descuento se aplica al precio del alquiler antes de la confirmación.',
        conditions: [
          'Mínimo 5 días facturados',
          'Según disponibilidad',
          'Solicitar la oferta antes de reservar',
          'No acumulable con otra promoción',
        ],
      },
      {
        id: 'easter-2027',
        period: 'Semana Santa 2027',
        title: 'Silla infantil gratis + 0 MAD de fianza',
        description:
          '¿Viajas con niños? Solicita una silla de bebé o un elevador gratis y conserva la fianza estándar de 0 MAD. La silla está sujeta a disponibilidad.',
        conditions: [
          'Una silla o elevador por alquiler',
          'Según disponibilidad',
          'Solicitar la silla antes de reservar',
          'Fianza de 0 MAD en toda la flota',
        ],
      },
      {
        id: 'summer-2027',
        period: 'Verano 2027',
        title: 'Un día extra gratis a partir de 7 días',
        description:
          'Alquila 7 días facturados o más en verano y solicita un día extra gratis. El día se añade al periodo de alquiler, según disponibilidad.',
        conditions: [
          'Mínimo 7 días facturados',
          'Según disponibilidad',
          'Solicitar la oferta antes de reservar',
          'El día extra no se puede canjear por dinero',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Las ofertas son automáticas?',
        a: 'No. Solicita la oferta al enviar tu reserva. La confirmamos por escrito antes de que pagues.',
      },
      {
        q: '¿Puedo combinar dos ofertas?',
        a: 'Normalmente no. Pregúntanos antes de reservar y te confirmaremos qué es posible en tus fechas.',
      },
      {
        q: '¿Las ofertas están disponibles en todos los coches?',
        a: 'Dependen de la disponibilidad y de las fechas del alquiler. Confirmamos el coche y la oferta antes de aceptar la reserva.',
      },
      {
        q: '¿La fianza sigue siendo de 0 MAD con una oferta?',
        a: 'Sí, la fianza estándar de 0 MAD se aplica salvo que una oferta concreta indique lo contrario.',
      },
    ],
  },
};
