import { useMemo, useState } from "react";

const products = [
    { id: 1, name: "Laptop", price: 50000},
    { id: 2, name: "Phone", price: 30000 },
    { id: 3, name: "Monitor", price: 20000 },
    { id: 4, name: "Keyboard", price: 500 },
    { id: 5, name: "Mouse", price: 500}
];

function ProductDashboard(){
    const [search, setSearch] = useState("");
    const [searchPrice, setSearchPrice] = useState <number | "">("");
    // const [count, setCount] = useState(0);
    const [sortOption, setSortOption] = useState("default");
    
    
    const filteredProducts = useMemo(() =>{
        // console.log("Latest Count: ", count);
        
        let result = searchPrice === "" 
        ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        : (products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) && product.price <= (searchPrice))) ;
    
        if(sortOption === "lowToHigh"){
            result = [...result].sort((a, b) => a.price - b.price);
        }else if (sortOption === "highToLow") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if(sortOption === "aToZ"){
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        } else if(sortOption === "zToA"){
            result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        }
        return result;
        
    }, [search, searchPrice, sortOption]);

    const reset = () => {
        setSearch("");
        setSearchPrice("");
        setSortOption("default");
    };

    const filteredCount = filteredProducts.length;
    
    
    return(
        <div className="product-dashboard">
            <h2>This is product dashboard</h2>
            <div className="filter-group">Search: 
                <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="search product"/>
            </div>
            <div className="filter-group">Maximum Price: 
                <input type="number" value={searchPrice} onChange={(event) => setSearchPrice( event.target.value === "" ? "" : Number(event.target.value))} placeholder="set max price" />
            </div>
            <div className="filter-group">Sort by:
                <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
                    <option value= "default">Default</option>
                    <option value= "lowToHigh">Price: Low → High</option>
                    <option value= "highToLow">Price: High → Low</option>
                    <option value= "aToZ">Name: A → Z</option>
                    <option value= "zToA">Name: Z → A</option>
                </select>
            </div>
            <div>
                <button onClick={reset}>Reset Filters</button>
            </div>
            {/* <p>Count: {count}</p> */}
            <p className="product-count">Filtered Product Count: {filteredCount}</p>
            {/* <button onClick={() => setCount(prev => prev +1)}>Increase Count</button> */}
            
            <h2>Filtered Product: </h2>
            <ul className="product-list">
                {
                    filteredProducts.map(filterProduct => 
                    <li className="product-item" key={filterProduct.id}>
                        {filterProduct.name} {filterProduct.price}
                    </li>)
                }   
            </ul>
        </div>
    )
}
export default ProductDashboard;