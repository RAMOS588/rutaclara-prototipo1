// ============================================
// RUTA CLARA HUANCAYO - v2
// ============================================

// ---------- NAVEGACIÓN PRINCIPAL ----------
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.view;
    navButtons.forEach(b => b.classList.remove('active'));
    views.forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`view-${target}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ============================================
// DATOS: HORARIOS (Horario → Empresa → Rutas)
// ============================================
const datosHorarios = [
  {
    turno: '🌅 Turno Mañana (05:00 - 12:00)',
    empresas: [
      {
        nombre: 'ETSA Huancayo',
        rutas: [
          { hora: '05:30', ruta: 'Línea 5 · Central → Universidad' },
          { hora: '06:00', ruta: 'Línea 5 · Central → Universidad' },
          { hora: '06:30', ruta: 'Línea 8 · El Tambo → Chilca' },
          { hora: '07:00', ruta: 'Línea 3 · Mercado → Estadio' },
        ],
      },
      {
        nombre: 'Transportes Andinos',
        rutas: [
          { hora: '05:45', ruta: 'Línea 12 · Chilca → Centro' },
          { hora: '06:15', ruta: 'Línea 12 · Chilca → Centro' },
          { hora: '06:45', ruta: 'Línea 7 · San Carlos → Terminal' },
        ],
      },
    ],
  },
  {
    turno: '🌞 Turno Tarde (12:00 - 19:00)',
    empresas: [
      {
        nombre: 'ETSA Huancayo',
        rutas: [
          { hora: '12:30', ruta: 'Línea 5 · Universidad → Central' },
          { hora: '13:00', ruta: 'Línea 8 · Chilca → El Tambo' },
          { hora: '14:15', ruta: 'Línea 3 · Estadio → Mercado' },
        ],
      },
      {
        nombre: 'Transportes Andinos',
        rutas: [
          { hora: '12:45', ruta: 'Línea 12 · Centro → Chilca' },
          { hora: '13:30', ruta: 'Línea 7 · Terminal → San Carlos' },
        ],
      },
    ],
  },
  {
    turno: '🌙 Turno Noche (19:00 - 23:00)',
    empresas: [
      {
        nombre: 'ETSA Huancayo',
        rutas: [
          { hora: '19:30', ruta: 'Línea 5 · Central → Universidad' },
          { hora: '20:30', ruta: 'Línea 8 · El Tambo → Chilca' },
        ],
      },
      {
        nombre: 'Transportes Andinos',
        rutas: [
          { hora: '20:00', ruta: 'Línea 12 · Chilca → Centro' },
          { hora: '21:00', ruta: 'Línea 7 · San Carlos → Terminal' },
        ],
      },
    ],
  },
];

// ============================================
// DATOS: EMPRESAS (info completa)
// ============================================
const datosEmpresas = [
  {
    nombre: 'ETSA Huancayo',
    dueno: 'Carlos Quispe Rivera',
    conductores: 25,
    tarifas: 'S/ 1.50 general · S/ 0.80 estudiantes',
    rutas: ['Línea 5: Central → Universidad', 'Línea 8: El Tambo → Chilca', 'Línea 3: Mercado → Estadio'],
    comentarios: [
      { usuario: 'María L.', estrellas: '★★★★★', texto: 'Buses limpios y puntuales.' },
      { usuario: 'José P.', estrellas: '★★★★☆', texto: 'Buen servicio, a veces se retrasan.' },
    ],
  },
  {
    nombre: 'Transportes Andinos',
    dueno: 'Rosa Huamán Túpac',
    conductores: 18,
    tarifas: 'S/ 1.50 general · S/ 1.00 escolar',
    rutas: ['Línea 12: Chilca → Centro', 'Línea 7: San Carlos → Terminal'],
    comentarios: [
      { usuario: 'Luis R.', estrellas: '★★★★☆', texto: 'Cumplen los horarios.' },
    ],
  },
  {
    nombre: 'Expreso Wanka',
    dueno: 'Pedro Yupanqui Salas',
    conductores: 12,
    tarifas: 'S/ 2.00 general · S/ 1.20 estudiantes',
    rutas: ['Línea 20: Huancayo → Pilcomayo'],
    comentarios: [
      { usuario: 'Ana C.', estrellas: '★★★★★', texto: 'Muy recomendado, cómodo.' },
      { usuario: 'Jorge M.', estrellas: '★★★☆☆', texto: 'A veces se llenan mucho.' },
    ],
  },
];

// ============================================
// RENDER: ACORDEÓN DE HORARIOS
// ============================================
const contHorarios = document.getElementById('acordeon-horarios');

datosHorarios.forEach((turno, idx) => {
  const item = document.createElement('div');
  item.className = 'acordeon-item';

  const header = document.createElement('div');
  header.className = 'acordeon-header';
  header.innerHTML = `<span>${turno.turno}</span><span class="chevron">▼</span>`;

  const content = document.createElement('div');
  content.className = 'acordeon-content';

  const inner = document.createElement('div');
  inner.className = 'acordeon-content-inner';

  turno.empresas.forEach(emp => {
    const sub = document.createElement('div');
    sub.className = 'sub-acordeon';

    const subHeader = document.createElement('div');
    subHeader.className = 'sub-header';
    subHeader.innerHTML = `<span>🏢 ${emp.nombre}</span><span class="chevron-sm">▼</span>`;

    const subContent = document.createElement('div');
    subContent.className = 'sub-content';

    const rutasLista = document.createElement('div');
    rutasLista.className = 'rutas-lista';

    emp.rutas.forEach(r => {
      const fila = document.createElement('div');
      fila.className = 'ruta-fila';
      fila.innerHTML = `
        <span class="ruta-hora">${r.hora}</span>
        <span class="ruta-nombre">${r.ruta}</span>
      `;
      rutasLista.appendChild(fila);
    });

    subContent.appendChild(rutasLista);
    sub.appendChild(subHeader);
    sub.appendChild(subContent);

    // Toggle sub-acordeón
    subHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      sub.classList.toggle('open');
    });

    inner.appendChild(sub);
  });

  content.appendChild(inner);
  item.appendChild(header);
  item.appendChild(content);

  // Toggle acordeón principal
  header.addEventListener('click', () => {
    item.classList.toggle('open');
  });

  contHorarios.appendChild(item);
});

// ============================================
// RENDER: ACORDEÓN DE EMPRESAS
// ============================================
const contEmpresas = document.getElementById('acordeon-empresas');

datos