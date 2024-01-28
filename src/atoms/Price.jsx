import React from 'react'

function Price({price,discounted_price}) {
    if(discounted_price){
        return (
            <div className='flex item-center price_block'>
                <div className='text-sm mr-2'>₹{discounted_price}</div>
                <div className='text-sm line-through '>₹{price}</div>
            </div>
        )
    }
    return (
        <div className='flex text-sm mt-2 price_block'>₹{price}</div>
    )
}
export default Price