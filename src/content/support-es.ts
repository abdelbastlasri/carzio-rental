import type { SupportKey, SupportPageContent } from './support';

export const es: Record<SupportKey, SupportPageContent> = {
  automatic: {
    key: 'automatic',
    slug: 'alquiler-coche-automatico-agadir',
    title: 'Alquiler de coche automático en Agadir | Carzio',
    description:
      'Alquila un coche automático en Agadir con Carzio: modelos recientes, kilometraje ilimitado, 0 MAD de fianza, recogida gratuita en el aeropuerto y cancelación gratuita hasta 24 h.',
    h1: 'Alquiler de coche automático en Agadir',
    intro:
      'Si prefieres no conducir un coche manual, Carzio tiene modelos automáticos en el aeropuerto de Agadir Al Massira. Elige tu coche, envíanos tus fechas y recógelo a la llegada.',
    sections: [
      {
        title: 'Modelos automáticos de la flota',
        paragraphs: [
          'La selección automática incluye el Dacia Sandero Stepway, el Renault Clio 5, el Hyundai i10 BVA, el Dacia Duster BVA y el Volkswagen T-Roc. La disponibilidad depende de tus fechas.',
          'Todos los coches son recientes, se revisan antes de la entrega e incluyen aire acondicionado, kilometraje ilimitado y seguro estándar.',
        ],
      },
      {
        title: 'Precio y condiciones',
        paragraphs: [
          'El precio diario aparece en la ficha de cada coche. El alquiler mínimo es de 72 horas, facturadas en bloques de 24 h; un día empezado cuenta como un día completo.',
          'No hay fianza ni bloqueo de tarjeta. El pago se realiza al entregar las llaves. La cancelación es gratuita hasta 24 horas antes de la recogida.',
        ],
      },
      {
        title: 'Recogida en el aeropuerto de Agadir',
        paragraphs: [
          'Nuestro equipo te espera en la sala de llegadas del aeropuerto de Agadir Al Massira. Envíanos tu número de vuelo para que podamos seguir tu llegada, incluso si el vuelo se retrasa.',
          'El conductor debe tener al menos 23 años y llevar como mínimo 4 años con el carné de conducir. Presenta tu pasaporte o documento de identidad y una tarjeta bancaria para el pago.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Los coches automáticos son más caros?',
        a: 'El precio diario depende del modelo y de la temporada. La ficha de cada coche muestra el precio actual antes de enviar la solicitud.',
      },
      {
        q: '¿Puedo elegir el modelo automático exacto?',
        a: 'Puedes solicitar un modelo. Si no está disponible en tus fechas, confirmamos un coche automático equivalente antes de aceptar la reserva.',
      },
      {
        q: '¿La recogida en el aeropuerto está incluida?',
        a: 'Sí. La recogida y la devolución en el aeropuerto de Agadir Al Massira están incluidas.',
      },
      {
        q: '¿Qué fianza hace falta?',
        a: '0 MAD. No bloqueamos dinero en tu tarjeta.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'renault-clio-5', 'hyundai-i10-bva', 'dacia-duster-bva', 'vw-troc-automatic'],
    image: '/images/fleet/dacia-sandero-stepway.webp',
    imageAlt: 'Dacia Sandero Stepway automático disponible en el aeropuerto de Agadir',
  },
  suv: {
    key: 'suv',
    slug: 'alquiler-suv-agadir',
    title: 'Alquiler de SUV en Agadir | Carzio',
    description:
      'Alquila un SUV en Agadir con Carzio: Dacia Duster, Jogger, Kia Sportage y Hyundai Tucson, kilometraje ilimitado, 0 MAD de fianza y recogida en el aeropuerto.',
    h1: 'Alquiler de SUV en Agadir',
    intro:
      'Un SUV te da más espacio para el equipaje, los viajes en familia y las carreteras alrededor de Agadir, Taghazout y el valle del Souss. Carzio ofrece varios modelos SUV y crossover.',
    sections: [
      {
        title: 'Modelos SUV y familiares',
        paragraphs: [
          'La flota incluye el Dacia Duster, el Dacia Jogger de 7 plazas, el Kia Sportage y el Hyundai Tucson. Algunos modelos son automáticos; otros, manuales.',
          'Son coches de carretera prácticos, no 4x4. Para pistas de montaña o rutas por el desierto, cuéntanos tu itinerario para que confirmemos qué coche es el adecuado.',
        ],
      },
      {
        title: 'Espacio para pasajeros y equipaje',
        paragraphs: [
          'El Jogger tiene hasta 7 plazas y un maletero generoso. El Duster, el Sportage y el Tucson son SUV de 5 plazas con sitio para maletas y equipo de playa.',
          'Las sillas infantiles y los elevadores son gratuitos bajo petición, según disponibilidad.',
        ],
      },
      {
        title: 'Reserva y recogida',
        paragraphs: [
          'La recogida se hace en el aeropuerto de Agadir Al Massira o en nuestra agencia de MAG N2, Agadir Airport. El alquiler mínimo es de 72 horas.',
          'El precio incluye kilometraje ilimitado y seguro estándar. El seguro a todo riesgo es opcional y se muestra antes de confirmar.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Necesito un 4x4 para Taghazout o Paradise Valley?',
        a: 'Las carreteras principales están asfaltadas. Un SUV estándar basta para conducir con normalidad; dinos si tienes previsto salir del asfalto.',
      },
      {
        q: '¿Cuántas maletas caben en el Jogger?',
        a: 'El Jogger tiene un maletero grande y hasta 7 plazas. El espacio depende de cuántas plazas uses; cuéntanos tu equipaje y te lo confirmamos.',
      },
      {
        q: '¿Hay SUV con cambio automático?',
        a: 'Sí, el Dacia Duster BVA y otros modelos automáticos están disponibles según tus fechas.',
      },
      {
        q: '¿La fianza es distinta para un SUV?',
        a: 'No. La fianza es de 0 MAD para toda la flota, sin bloqueo de tarjeta.',
      },
    ],
    carIds: ['dacia-duster-bva', 'dacia-duster-manual', 'dacia-jogger', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger SUV de alquiler en Agadir',
  },
  'zero-deposit': {
    key: 'zero-deposit',
    slug: 'alquiler-coche-sin-deposito-marruecos',
    title: 'Alquiler de coche sin fianza en Marruecos | Carzio',
    description:
      'Alquila un coche en Agadir con 0 MAD de fianza, sin bloqueo de tarjeta y pago al entregar las llaves. Cancelación gratuita hasta 24 h y recogida en el aeropuerto incluida.',
    h1: 'Alquiler de coche con 0 MAD de fianza',
    intro:
      'La fianza suele ser la parte más estresante de un alquiler. En Carzio no hay fianza ni bloqueo en tu tarjeta bancaria. Pagas el precio del alquiler al entregar las llaves.',
    sections: [
      {
        title: 'Cómo funciona la fianza de 0 MAD',
        paragraphs: [
          'No se cobra ni se reserva ningún importe en tu tarjeta al reservar. Se aceptan tarjetas de débito y de crédito, así que tu límite de gasto sigue disponible durante el viaje.',
          'El importe que pagas en la entrega es el precio del alquiler. El seguro estándar está incluido; el seguro a todo riesgo es opcional.',
        ],
      },
      {
        title: 'Cancelación y alquiler mínimo',
        paragraphs: [
          'Puedes cancelar gratis hasta 24 horas antes de la recogida. El alquiler mínimo es de 72 horas, facturadas en bloques de 24 h.',
          'La reserva se confirma por correo electrónico después de comprobar la disponibilidad real. Nunca se confirma de forma automática.',
        ],
      },
      {
        title: 'Documentos y edad del conductor',
        paragraphs: [
          'El conductor principal debe tener al menos 23 años y llevar como mínimo 4 años con el carné de conducir. Presenta un pasaporte o documento de identidad y una tarjeta bancaria para el pago.',
          'Se puede añadir un segundo conductor gratis con las mismas condiciones. Las sillas de bebé y los elevadores son gratuitos bajo petición.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿De verdad no hay fianza?',
        a: 'Sí. La fianza es de 0 MAD y no bloqueamos dinero en tu tarjeta.',
      },
      {
        q: '¿Puedo pagar con tarjeta de débito?',
        a: 'Sí. Se aceptan tarjetas de débito y de crédito para el pago al entregar las llaves.',
      },
      {
        q: '¿La fianza de 0 MAD significa que el seguro está incluido?',
        a: 'El seguro estándar está incluido en el precio del alquiler. El seguro a todo riesgo es opcional y se muestra antes de confirmar.',
      },
      {
        q: '¿Qué pasa si cancelo?',
        a: 'La cancelación es gratuita hasta 24 horas antes de la recogida. Contáctanos por correo electrónico o WhatsApp.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/hero/carzio-pickup.webp',
    imageAlt: 'Entrega de llaves de Carzio sin fianza',
  },
  'one-way-marrakech': {
    key: 'one-way-marrakech',
    slug: 'alquiler-coche-ida-agadir-marrakech',
    title: 'Alquiler de coche solo ida Agadir - Marrakech | Carzio',
    description:
      'Alquila un coche en Agadir y devuélvelo en Marrakech con Carzio. Entrega en Marrakech-Menara por 80 € por trayecto, confirmada antes de la reserva.',
    h1: 'Alquiler de coche solo ida de Agadir a Marrakech',
    intro:
      'Puedes recoger tu coche en Agadir y devolverlo en Marrakech. Así te ahorras el viaje de vuelta y puedes continuar tu ruta desde el aeropuerto de Marrakech-Menara o desde la ciudad.',
    sections: [
      {
        title: 'Cómo funciona el alquiler solo ida',
        paragraphs: [
          'Indícanos la fecha de recogida en Agadir y la fecha de devolución en Marrakech. Comprobamos la disponibilidad y confirmamos las condiciones de solo ida antes de aceptar la reserva.',
          'La entrega o recogida en Marrakech cuesta 80 € por trayecto. El importe exacto se confirma por escrito antes de pagar.',
        ],
      },
      {
        title: 'El trayecto entre Agadir y Marrakech',
        paragraphs: [
          'La distancia es de unos 250 km y el trayecto suele durar unas 3 horas por autopista. Haz una pausa y comprueba el nivel de combustible antes de salir de Agadir.',
          'El alquiler mínimo es de 72 horas. El coche debe devolverse en el lugar y la hora acordados en Marrakech.',
        ],
      },
      {
        title: 'Qué está incluido',
        paragraphs: [
          'El alquiler incluye kilometraje ilimitado y seguro estándar. La tarifa de entrega solo ida se suma al precio del alquiler.',
          'El seguro a todo riesgo es opcional. El conductor debe tener al menos 23 años y llevar como mínimo 4 años con el carné de conducir.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puedo devolver el coche en el aeropuerto de Marrakech?',
        a: 'Sí, la devolución en el aeropuerto de Marrakech-Menara está disponible bajo petición. La tarifa de entrega es de 80 € por trayecto.',
      },
      {
        q: '¿La tarifa solo ida es por día?',
        a: 'No. Es una tarifa fija por trayecto, confirmada antes de la reserva.',
      },
      {
        q: '¿Puedo hacer la ruta inversa, de Marrakech a Agadir?',
        a: 'Sí, bajo petición. Envíanos tus fechas y confirmaremos la disponibilidad y la tarifa.',
      },
      {
        q: '¿Cuánto dura el trayecto?',
        a: 'Unas 3 horas por autopista, según el tráfico y las pausas.',
      },
    ],
    carIds: ['dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/journal/news-post-agadir-marrakech-essaouira.webp',
    imageAlt: 'Ruta por carretera de Agadir a Marrakech',
  },
  essaouira: {
    key: 'essaouira',
    slug: 'alquiler-coche-agadir-essaouira',
    title: 'Alquiler de coche Agadir - Essaouira | Carzio',
    description:
      'Alquila un coche en Agadir y viaja a Essaouira con Carzio: kilometraje ilimitado, 0 MAD de fianza, seguro estándar y entrega con presupuesto antes de reservar.',
    h1: 'Alquiler de coche de Agadir a Essaouira',
    intro:
      'Essaouira está a unos 175 km al norte de Agadir, por la costa atlántica. Un coche de alquiler te permite salir a tu ritmo y parar en los pueblos del camino.',
    sections: [
      {
        title: 'Conducir de Agadir a Essaouira',
        paragraphs: [
          'El trayecto suele durar unas 3 horas, según la ruta y las paradas. La carretera de la costa es panorámica, pero más lenta que la autopista.',
          'Comprueba el nivel de combustible antes de salir y haz una pausa en Taghazout, Tamraght o en alguno de los pequeños pueblos de la costa.',
        ],
      },
      {
        title: 'Recogida y devolución en Essaouira',
        paragraphs: [
          'La recogida se hace en el aeropuerto de Agadir Al Massira o en nuestra agencia. La entrega y la recogida en Essaouira están disponibles bajo petición y con presupuesto antes de reservar.',
          'Las condiciones de solo ida o de entrega se confirman por escrito antes de pagar. No publicamos una tarifa fija para Essaouira porque depende de las fechas y del coche.',
        ],
      },
      {
        title: 'Condiciones del alquiler',
        paragraphs: [
          'El alquiler mínimo es de 72 horas, con kilometraje ilimitado y seguro estándar incluidos. La fianza es de 0 MAD.',
          'El seguro a todo riesgo es opcional. El conductor debe tener al menos 23 años y llevar como mínimo 4 años con el carné de conducir.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿La entrega en Essaouira es gratuita?',
        a: 'No. La entrega y la recogida en Essaouira se presupuestan antes de reservar, según las fechas y el coche.',
      },
      {
        q: '¿Puedo quedarme el coche para ir y volver?',
        a: 'Sí. Puedes recogerlo en Agadir, ir a Essaouira y devolverlo en Agadir. Se aplica el precio diario normal.',
      },
      {
        q: '¿Cuánto dura el trayecto?',
        a: 'Unas 3 horas, según la ruta y las paradas.',
      },
      {
        q: '¿La carretera es apta para un coche estándar?',
        a: 'Sí. Las carreteras principales están asfaltadas. Dinos si tienes previsto tomar pistas sin asfaltar.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/journal/essaouira-port.webp',
    imageAlt: 'Carretera de la costa atlántica entre Agadir y Essaouira',
  },
  'taghazout-tamraght': {
    key: 'taghazout-tamraght',
    slug: 'alquiler-coche-taghazout-tamraght',
    title: 'Alquiler de coche en Taghazout y Tamraght | Carzio',
    description:
      'Alquila un coche para Taghazout y Tamraght con Carzio: recogida en el aeropuerto de Agadir, 0 MAD de fianza, kilometraje ilimitado y entrega con presupuesto antes de reservar.',
    h1: 'Alquiler de coche para Taghazout y Tamraght',
    intro:
      'Taghazout y Tamraght son dos pueblos de surf al norte de Agadir. Un coche te da libertad para llegar a las playas, los cafés y las carreteras de la costa sin depender de un traslado.',
    sections: [
      {
        title: 'Del aeropuerto de Agadir a Taghazout o Tamraght',
        paragraphs: [
          'Taghazout está a unos 19 km de Agadir, normalmente a 30-40 minutos en coche. Tamraght está a unos 14 km, normalmente a 25 minutos.',
          'Puedes recoger el coche en el aeropuerto de Agadir Al Massira o en nuestra agencia. La entrega en Taghazout o Tamraght está disponible bajo petición y con presupuesto antes de reservar.',
        ],
      },
      {
        title: 'Viajes de surf y equipaje',
        paragraphs: [
          'Dinos si viajas con tablas de surf o equipaje extra para que confirmemos el coche adecuado. El Dacia Jogger y los SUV ofrecen más espacio.',
          'Las sillas infantiles y los elevadores son gratuitos bajo petición, según disponibilidad.',
        ],
      },
      {
        title: 'Condiciones',
        paragraphs: [
          'El alquiler mínimo es de 72 horas, con kilometraje ilimitado, seguro estándar y 0 MAD de fianza.',
          'La cancelación es gratuita hasta 24 horas antes de la recogida. El conductor debe tener al menos 23 años y llevar como mínimo 4 años con el carné de conducir.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Podéis llevar el coche a mi surf camp?',
        a: 'La entrega en Taghazout o Tamraght está disponible bajo petición. Envíanos la dirección y las fechas; confirmamos las condiciones antes de reservar.',
      },
      {
        q: '¿A qué distancia está Taghazout del aeropuerto de Agadir?',
        a: 'A unos 19 km, normalmente 30-40 minutos en coche.',
      },
      {
        q: '¿Qué coche es mejor para las tablas de surf?',
        a: 'El Jogger y los SUV tienen más espacio. Indícanos la longitud de las tablas y el número de pasajeros para que podamos confirmarlo.',
      },
      {
        q: '¿Es fácil aparcar en Taghazout?',
        a: 'El aparcamiento es limitado en el centro del pueblo, sobre todo en temporada alta. Usa las plazas marcadas y no bloquees los accesos.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'dacia-jogger', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/taghazout-beach.webp',
    imageAlt: 'Playa de Taghazout cerca de Agadir',
  },
  family: {
    key: 'family',
    slug: 'alquiler-coche-familiar-agadir',
    title: 'Alquiler de coche familiar en Agadir | Carzio',
    description:
      'Alquila un coche familiar en Agadir con Carzio: Dacia Jogger de 7 plazas, SUV amplios, sillas infantiles gratis bajo petición, 0 MAD de fianza y recogida en el aeropuerto.',
    h1: 'Alquiler de coche familiar en Agadir',
    intro:
      'Un viaje en familia necesita espacio para los pasajeros, el equipaje y las sillas infantiles. Carzio ofrece un Jogger de 7 plazas y varios SUV que facilitan la recogida en el aeropuerto y las excursiones.',
    sections: [
      {
        title: 'Coches para familias',
        paragraphs: [
          'El Dacia Jogger tiene hasta 7 plazas y un maletero generoso. El Dacia Duster, el Kia Sportage y el Hyundai Tucson ofrecen 5 plazas con más espacio para el equipaje que un utilitario pequeño.',
          'Dinos cuántos adultos, niños y maletas sois para que te recomendemos el modelo adecuado.',
        ],
      },
      {
        title: 'Sillas infantiles y equipaje',
        paragraphs: [
          'Las sillas de bebé y los elevadores son gratuitos bajo petición, según disponibilidad. Envíanos la edad y el peso del niño para que te demos la silla adecuada.',
          'El Jogger es la mejor opción para 6 o 7 pasajeros. Para 4 o 5 pasajeros, un SUV suele ser suficiente.',
        ],
      },
      {
        title: 'Recogida en el aeropuerto y condiciones',
        paragraphs: [
          'Te esperamos en el aeropuerto de Agadir Al Massira y te ayudamos a instalar las sillas infantiles. El alquiler mínimo es de 72 horas.',
          'El precio incluye kilometraje ilimitado y seguro estándar. La fianza es de 0 MAD y la cancelación es gratuita hasta 24 horas antes de la recogida.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué coche tiene 7 plazas?',
        a: 'El Dacia Jogger tiene hasta 7 plazas, según la configuración de asientos y el equipaje.',
      },
      {
        q: '¿Las sillas infantiles son gratuitas?',
        a: 'Sí, las sillas de bebé y los elevadores son gratuitos bajo petición, según disponibilidad.',
      },
      {
        q: '¿Podéis instalar la silla en el aeropuerto?',
        a: 'Sí. Nuestro equipo puede ayudarte a instalarla durante la entrega en el aeropuerto de Agadir Al Massira.',
      },
      {
        q: '¿Hay sitio suficiente para las maletas?',
        a: 'Depende del número de pasajeros. Envíanos los detalles del equipaje y te confirmaremos el mejor coche.',
      },
    ],
    carIds: ['dacia-jogger', 'dacia-duster-manual', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger de siete plazas para alquiler familiar en Agadir',
  },
  'child-seat': {
    key: 'child-seat',
    slug: 'alquiler-coche-silla-infantil-agadir',
    title: 'Alquiler de coche con silla infantil en Agadir | Carzio',
    description:
      'Alquila un coche en Agadir con silla de bebé o elevador gratis bajo petición. Carzio te ayuda con la instalación y ofrece recogida en el aeropuerto.',
    h1: 'Alquiler de coche con silla infantil en Agadir',
    intro:
      'Viajar con un bebé o un niño pequeño es más fácil si la silla ya está en el coche. Carzio proporciona sillas de bebé y elevadores gratis bajo petición, según disponibilidad.',
    sections: [
      {
        title: 'Sillas de bebé y elevadores',
        paragraphs: [
          'Indícanos la edad y el peso del niño cuando envíes tu solicitud. Te daremos la silla de bebé o el elevador adecuado y lo confirmaremos antes de la reserva.',
          'Las sillas son gratuitas. Están sujetas a disponibilidad, así que solicítalas cuanto antes, sobre todo en julio y agosto.',
        ],
      },
      {
        title: 'Instalación en el aeropuerto',
        paragraphs: [
          'Nuestro equipo puede ayudarte a instalar la silla durante la entrega en el aeropuerto de Agadir Al Massira. Pregúntanos si no tienes claro cómo se monta.',
          'Comprueba que la silla está bien sujeta antes de arrancar y ajusta el arnés al niño.',
        ],
      },
      {
        title: 'Elegir el coche adecuado',
        paragraphs: [
          'Un coche compacto es suficiente para uno o dos niños. Para tres niños o un carrito grande, elige un SUV o el Jogger de 7 plazas.',
          'El alquiler mínimo es de 72 horas, con kilometraje ilimitado, seguro estándar y 0 MAD de fianza.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿La silla infantil es realmente gratuita?',
        a: 'Sí. Las sillas de bebé y los elevadores son gratuitos bajo petición, según disponibilidad.',
      },
      {
        q: '¿Cómo elijo la silla adecuada?',
        a: 'Envíanos la edad y el peso del niño. Te confirmaremos la silla de bebé o el elevador adecuado.',
      },
      {
        q: '¿Puedo llevar mi propia silla infantil?',
        a: 'Sí. Puedes usar tu propia silla. Dínoslo para no reservar una sin necesidad.',
      },
      {
        q: '¿Tenéis sillas para recién nacidos?',
        a: 'Indícanos la edad y el peso del bebé; confirmaremos si hay una silla adecuada disponible en tus fechas.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-jogger', 'dacia-duster-manual'],
    image: '/images/hero/agadir-airport-arrival.webp',
    imageAlt: 'Entrega de un coche Carzio con silla infantil en el aeropuerto',
  },
};
