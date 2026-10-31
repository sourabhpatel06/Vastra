import React from 'react';
import Mens from '../components/MensComponent/Mens.js';
import Womens from '../components/WomensComponent/Womens.js';
import Kids from '../components/KidsComponent/Kids.js';

function Shop() {
  return (
    <div>
      <h2 className="text-center my-4">Our Products</h2>
      <Mens />
      <Womens />
      <Kids />
    </div>
  );
}

export default Shop;
