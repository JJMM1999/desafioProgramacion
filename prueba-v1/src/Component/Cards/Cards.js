import React from 'react';
import styles from './Cards.module.scss';

const Cards = ({results}) => {
    let display;
    
    if(results){
        display = results.map(character =>{
            let {id, name,image,location, status,species,type} = character;
            return( 
                <div key={id} className='col-4 mb-4 position-relative aline-item-center'>
                    <div className={styles.card}>
                    {image === "https://rickandmortyapi.com/api/character/avatar/19.jpeg" ? (
                            <div className="fs-1 fw-bold mb-4 #0bff48">SIN IMAGEN</div>
                        ) : (
                            <img src={image} className={`${styles.img} img-fluid`}/>
                        )}
                        <div className='content'>
                            <div className='fs-4 fw-bold mb-4'>{name===""?"SIN INFORMACION":name}</div>
                            <div className=''>
                                <div className='fs-6'> Ultima ubicación</div>
                                <div className='fs-5'>{location.name===""?"SIN INFORMACION":location.name}</div>
                                <div className='fs-6'> Especie</div>
                                <div className='fs-5'>{species===""?"SIN INFORMACION":species}</div>
                                <div className='fs-6'> Tipo</div>
                                <div className='fs-5'>{type===""?"SIN INFORMACION":type }</div>
                            </div>
                        </div>
                    </div>
                    {(()=>{
                        if (status === "Dead"){
                            return(
                                <div className={`${styles.badge} position absolute badge bg-danger`}>
                                    {status}
                                </div>
                            )
                        }else if( status === "Alive"){
                            return(
                                <div className={`${styles.badge} position absolute badge bg-success`}>
                                    {status}
                                </div>
                            )
                        }else{
                            return(
                                <div className={`${styles.badge} position absolute badge bg-secondary`}>
                                    {status}
                                </div>
                            )
                        }
                    })()}                                    
                </div>                
            )
        });
    }else{
        console.log("no character found");
    }
    return <>{display}</>;
}

export default Cards
