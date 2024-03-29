import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Category from './components/Category';

function App() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  React.useEffect(()=>{ 
    fetch("http://localhost:3001/categories").then(response => response.json())
    .then(data => {
        console.log(data);
        setCategories(data);
    })
  },[])

  const handleCategoryClick = id => {
    fetch("http://localhost:3001/products?catId=" + id)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProducts(data);
    })
  }

  const renderCategories = () => {
    return categories.map( c =>
      <Category key={c.id} id={c.id} title={c.title} onCategoryClick={() => handleCategoryClick(c.id)}/>
    );
  }

  const renderProducts = () => {
    return products.map(p =>
      <div>{p.title}</div> 
    )
  }

  return (
  <>
  <section id="hero-banner">
            <nav>
                <div class="right-side">
                    <a>Home</a>
                    <a>About Us</a>
                    <a>Services</a>
                    <a>Project Gallery</a>
                    <a>Contact Us</a>
                </div>
            </nav>
            
            <h1>Urban roofing innovation for the modern home</h1>
            <a id="button">   
                Learn More
            </a>
  </section>


  
  <section>
    <nav>
      {categories && renderCategories()}
    </nav>
    
    <article>
      <h1>Products</h1>
      {products && renderProducts()}
    </article>
  </section>

  <footer>
    footer
  </footer>
  </>
  );
}

export default App;
