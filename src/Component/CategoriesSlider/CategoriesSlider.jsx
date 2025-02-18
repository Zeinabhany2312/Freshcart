import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function CategoriesSlider() {

    let [categoryList, setCategorySlider] = useState([])

    useEffect(() => {
        getCategory()
    })
    async function getCategory() {
        let req = await axios.get('https://ecommerce.routemisr.com/api/v1/categories').catch((err) => {
            console.log(err);
        })
        setCategorySlider(req.data.data)
    }
    return (
        <>
            <OwlCarousel items={6} loop>
                {categoryList.map((element, id) => {
                    return <div key={id} className='item'>
                        <img src={element.image} alt='' height={200} />
                    </div>
                })}
            </OwlCarousel>
        </>
    )
}
