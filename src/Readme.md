# Habilitar la ruta el puerto.

## Dentro del componente Unidades.jsx

1. Habilitar el codigo necesario dentro del useEffect.

```
//Contar cuantas veces existe tacopan y tepepan y puerto para que se descarten del rol principal al agregar la siguiente ruta
  useEffect(() => {
    const fetchData = async () => {
      const roles = await db.rol.toArray();
      const unidades = await db.unidades.toArray();
      const reporte = await db.reporte.toArray();
      const countTacopan = await db.reporte
        .where("ruta")
        .equals("Tacopan")
        .count();

      const countTepepan = await db.reporte
        .where("ruta")
        .equals("Tepepan")
        .count();

      /* const countPuerto = await db.reporte
        .where("ruta")
        .equals("Puerto")
        .count(); */

      let countTacopanTepepan = countTacopan + countTepepan ; //+ countPuerto Agregar cuando se vaya atrabajar con la ruta EL PUERTO

      //const rolUnico = roles.length > 0 ? roles[0] : null;
      let rolUnico = null;
      if (roles.length > 0) {
        rolUnico = roles[0];
      }

      const rutasPredeterminadas =
        rolUnico && rolUnico.rutas ? rolUnico.rutas : [];
      //const rutasPredeterminadas = rolUnico ? rolUnico.rutas : [];

      let numeroUnidades;
      let existeTacopanTepepan = 0;

      const existeTepepan = unidades.some(
        (unidad) => unidad.ruta === "Tepepan"
      );
      if (existeTepepan) existeTacopanTepepan++;

      const existeTacopan = unidades.some(
        (unidad) => unidad.ruta === "Tacopan"
      );

      if (existeTacopan) existeTacopanTepepan++;

      //HABILITAR SOLO CUANDO SE VAYA  ATRABAJAR CON LA RUTA EL PUERTO
      /* const existePuerto = unidades.some((unidad) => unidad.ruta === "Puerto");

      if (existePuerto) existeTacopanTepepan++; */

      numeroUnidades =
        unidades.length +
        reporte.length -
        countTacopanTepepan -
        existeTacopanTepepan;

      const indiceRutaPredeterminada =
        numeroUnidades % rutasPredeterminadas.length;

      const rutasRotadas = [
        ...rolUnico.rutas.slice(indiceRutaPredeterminada),
        ...rolUnico.rutas.slice(0, indiceRutaPredeterminada),
      ];

      setSelectedRutas(rutasRotadas);
      setUnidades(unidades); // Actualizar el estado 'unidades' con los datos obtenidos
    };
    fetchData();
  }, [unidades]);
```

2. Habilitar la funcion hancleAssignPuerto

```
   //Habilitar solo cuando se vaya a trabajar con la ruta EL PUERTO
 const handleAssignPuerto = async (numeroUnidad) => {
   const unidadSeleccionada = unidades.find(
     (unidad) => unidad.numeroUnidad === numeroUnidad
   );

   if (unidadSeleccionada) {
     const rutaPuertoExistente = unidades.some(
       (unidad) => unidad.ruta === "Puerto"
     );

     if (!rutaPuertoExistente) {
       const indexUnidadSeleccionada = unidades.indexOf(unidadSeleccionada);
       // Guardar la ruta y el color actual de la unidad seleccionada
       let rutaActual = unidadSeleccionada.ruta;
       let colorActual = unidadSeleccionada.color;
       let mensajeActual = unidadSeleccionada.mensaje;
       // Asignar "Tacopan" y su color a la unidad seleccionada
       unidadSeleccionada.ruta = "Puerto";
       unidadSeleccionada.color = "#FFF";
       unidadSeleccionada.mensaje =
         "Pasajeros con destino a: el puerto y cristo rey,  favor de abordar la unidad {numeroUnidad}. el puerto. cristo rey, unidad {numeroUnidad}. el puerto. cristo rey, unidad {numeroUnidad}. el puerto. cristo rey, unidad {numeroUnidad}.";
       // Heredar las rutas y los colores anteriores a las unidades siguientes
       for (let i = indexUnidadSeleccionada + 1; i < unidades.length; i++) {
         const rutaAnterior = unidades[i].ruta;
         const colorAnterior = unidades[i].color;
         const mensajeAnterior = unidades[i].mensaje;
         unidades[i].ruta = rutaActual;
         unidades[i].color = colorActual;
         unidades[i].mensaje = mensajeActual;
         rutaActual = rutaAnterior;
         colorActual = colorAnterior;
         mensajeActual = mensajeAnterior;
       }
       setUnidades([...unidades]);
       // Guardar las unidades actualizadas en la base de datos
       await db.unidades.clear();
       await db.unidades.bulkPut(unidades);
       toast.success("La ruta Puerto se asigno correctamente.");
     } else {
       toast.warn("La ruta Puerto ya está asignada a otra unidad.");
     }
   }
 };
```

3. Habilitar la prop para pasar la funcion al componente ListaUnidades.jsx

```
   <ListaUnidades
          unidades={unidades}
          onDeleteUnidad={handleDeleteUnidad}
          onMoveUp={handleMoveUp}
          onMoveUpRuta={handleMoveUpRuta}
          onAssignTacopan={handleAssignTacopan}
          //Habilitar solo cuando se vaya a trabajar con la ruta EL PUERTO
          // onAssignPuerto={handleAssignPuerto}
          onMoveUnidadToEnd={handleMoveUnidadToEnd}
          onAssignCoatzala={handleAssignCoatzala}
        ></ListaUnidades>
```
## Dentro del componente ListaUnidades.jsx

1. Habilitar el icono faCross dentro del import de fontAwesome

```
import {
  faTrash,
  faArrowUp91,
  faCircleUp,
  faMountainSun,
  faBullhorn,
  faArrowsTurnToDots,
  faArrowDownShortWide,
  faVolumeXmark,
  faVanShuttle,
  faTruckMedical,
  faTree,
  faArrowRightToBracket,
  faInfoCircle,
  faChurch,
  faMinimize,
  //Habilitar solo cuando se vaya a trabajar con la ruta EL PUERTO
  //faCross,
} from "@fortawesome/free-solid-svg-icons";
```

2. Habilitar la funcion onAssignPuerto.

```
function ListaUnidades({
  unidades,
  onDeleteUnidad,
  onMoveUp,
  onMoveUpRuta,
  onAssignTacopan,
  //Habilitar solo cuando se vaya a trabajar con la ruta EL PUERTO
  //onAssignPuerto,
  onAssignCoatzala,
  onMoveUnidadToEnd,
})
```

3. Habilitar el boton para llamar la funcion onAssignPuerto.

```
{/*Habilitar solo cuando se vaya a trabajar con la ruta EL PUERTO*/}
                {/*<button
                  className="button-puerto"
                  onClick={() => {
                    const confirmed = window.confirm("¿Asignar a Puerto?");
                    if (confirmed) {
                      onAssignPuerto(unidad.numeroUnidad);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faCross} />
                </button>*/}
```