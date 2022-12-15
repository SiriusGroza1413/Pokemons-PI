import React from 'react';
import styles from "./Paginate.module.css"

const Paginate = ({pokemonsXpage, allPokemons, paginateFunct}) => {

    const pageNumbers = [] // ------> [ 1, 2, 3, 4]     4 paginas

//                                48 POKEMONS / 12 POKEMONS ==== 4
    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsXpage); i++ ){
        pageNumbers.push(i)
    }

    return(
        <div className={styles.pagination}>
                    {
                        pageNumbers?.map(num => {
                            return(
                                    <button key={num} onClick={()=> paginateFunct(num)}>{num}</button>
                            )
                        })
                    }
        </div>
    )
}

export default Paginate