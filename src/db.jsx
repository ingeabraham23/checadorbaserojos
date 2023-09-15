import Dexie from 'dexie';

const db = new Dexie('myDB');
db.version(1).stores({
    unidades: '++id, numeroUnidad',
    roles: '++id, nombre',
    rol: '++id, nombre',
    reporte: '++id, ruta, numeroUnidad'
});

export default db;