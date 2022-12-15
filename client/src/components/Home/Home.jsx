import React from "react"
import { Link } from "react-router-dom"
import style from "./Home.module.css"

/* ---------------------------------------------IMPORTAR HOOKS NECESARIOS------------------------------------------------- */
import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"


/* --------------------------------------- IMPORTAR ACCIONES NECESARIAS PARA DESPACHARLAS -------------------------------- */
import { getPokemons, getTypes, orderPokemons, filterByType, filterCreated, filterAttack, deletePokemon } from '../../redux/actions'


/* --------------------------------------- IMPORTAR CHILDREN COMPONENTS DE HOME ------------------------------------------ */
import Card from "../Card/Card"
import Paginate from "../Paginate/Paginate"
import SearchBar from "../SearchBar/SearchBar"
import pikachuLoading from "../../assets/pikachu-running.gif"

/* ------------------------------------------------------------------------------------------------------------------------*/
export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)


    // ESTADOS Y VARIABLES PARA MANEJAR EL PAGINADO
    const [currentPage, setCurrentPage] = useState(1) //1
    const [pokemonsXpage, setPokemonsXPage] = useState(12) 
    const indexOfLastPokemon = currentPage * pokemonsXpage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsXpage // 0  =  12  -  12

//                                                0                    12     =========>  1,2,3,4,5,6,7,8,9,10,11
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
//                                                      0                   11


    const [order, setOrder] = useState("")


// FUNCION QUE SE EJECUTA CUANDO PULSO UN NUMERO DEL ARRAY PARA MOSTRAR LA PAGINA CORRESPONDIENTE DE ESE NUMERO
    const paginateFunct = (numberOfPage) => {
        setCurrentPage(numberOfPage)
    }



//  POKEMONS A MOSTRAR TRAIDOS DEL ESTADO GLOBAL
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])




// RECARGAR POKEMONS
    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemons())
        setCurrentPage(1)
    }


//FILTRAR POKEMONS POR TIPO
    function handleFilterChange(e){
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

// FILTRAR SI VIENEN DE LA BASE DE DATOS O DE LA API O TODOS
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

//ORDENAR ALFABETICAMENTE(AZ O ZA) O POR ATAQUE MAS FUERTE/DEBIL
    function handleSort(e){
        e.preventDefault()
        dispatch(orderPokemons(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }


    function filterbyattack(){
        dispatch(filterAttack())
    }


    return(
        <div className={style.containerHome}>
            
        <SearchBar/>

            <div>
                <button onClick={(e) => handleClick(e)}>
                    Reload Pokemons
                </button>
                <Link to= "/create">
                    <button>
                        Create your own Pokemon!
                    </button>
                </Link>
            </div>


            <div className={style.options}>
                {/* FILTRAR POR TIPO DE POKEMON, EXISTENTE O CREADO POR NOSOTROS */}
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Api">Existing</option>
                    <option value="createdInDb">Created</option>
                </select>

                <select onChange={(e) => handleFilterChange(e)}>
                    <option value="All">All types</option>
                    {
                        allTypes?.map(t => {
                            return(
                                <option value={t.name} key={t.id}> {t.name} </option>
                            )
                        })
                    }
                </select>

                {/* ORDENAR POR AZ, ZA*/}
                <select onChange={(e) => handleSort(e)}>
                    <option value="des">A-Z</option>
                    <option value="asc">Z-A</option>
                    <option value="stronger">stronger</option>
                    <option value="weaker">weaker</option>
                    
                </select>
            </div>

            <select onChange={() => filterbyattack()}>
                <option value=""/>
                <option value="-50">-50</option>
            </select>


            <div className={style.paginate}>
                <Paginate 
                pokemonsXpage={pokemonsXpage}
                allPokemons={allPokemons.length}
                paginateFunct= {paginateFunct}
                />
            </div>
            
            <div className={style.cards}>
            {
                currentPokemons.length?
                currentPokemons?.map(p => {
                    return(
                    <div>
                        <Link to={`/home/${p.id}`} style={{ textDecoration: 'none' }} >
                                <Card className={style.card}
                                key={p.key}
                                name={p.name}
                                img={p.img}
                                attack={p.attack}
                                types={p.types}
                                />
                        </Link>
                    </div>    
                    )
                }) : <div>
                    <img src={pikachuLoading}/>
                    <h2>Loading...</h2>
                    </div>
                
            } 
            </div>
        </div>
    )
}


