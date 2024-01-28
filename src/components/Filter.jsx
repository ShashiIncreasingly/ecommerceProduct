import React, { useEffect, useState } from 'react'

function Filter({ products, filterByBrands, filterByCategories,resetFilter }) {

   const [activeFilterProduct, setActiveFilterProduct] = useState(null)

   function filterDuplicates(data, key) {
      const uniqueKeys = new Set();
      return data.filter(obj => {
         const value = obj[key];
         if (!uniqueKeys.has(value)) {
            uniqueKeys.add(value);
            return true;
         }
         return false;
      });
   }

   const removeDuplicate = () => {
      let filterCategories = filterDuplicates(products, 'brand')
      let filterBrands = filterDuplicates(filterCategories, 'category')
      setActiveFilterProduct(filterBrands)
   }
   useEffect(() => {
      removeDuplicate()
   }, [])

   if (!activeFilterProduct) {
      return <div>Loading</div>
   }

   return (
      <div className=''>


         <div className='p-5 flex space-y-3 flex flex-col filter_block'>
            <div className='flex flex-col resetfilter'>
               <div className='filterText'><span>Quick Filter Option </span></div>
               <button onClick={() => resetFilter()} href="#_" className="inline-flex items-center justify-center px-2 py-2 text-sm  leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                  Reset Filter
               </button>
            </div>
            <div className='flex flex-col filterbrand'>
               <label className='text-sm text-gray-700 mb-1'>Filter By Brand </label>
               <select className='rounded px-2 py-1 text-sm' onChange={(e) => filterByBrands(e.target.value)}>
                  {activeFilterProduct.map((product) => {
                     return (<option>{product.brand}</option>)
                  })}
               </select>
            </div>
            <div className='flex flex-col filtercategory'>
               <label className='text-sm text-gray-700 mb-1'>Filter By Category </label>
               <select className='rounded px-2 py-1 text-sm' onChange={(e) => filterByCategories(e.target.value)}>
                  {activeFilterProduct.map((product) => {
                     return (<option key={product.id}>{product.category}</option>)
                  })}
               </select>
            </div>
         </div>
      </div>
   )
}

export default Filter