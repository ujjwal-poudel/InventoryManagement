import { useState } from 'react';

const ProductForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouse, setWarehouse] = useState('Warehouse A');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate inputs
    if (productId.trim() === '' || quantity.trim() === '') {
      setError('Product ID and Quantity cannot be empty');
      return;
    }

    if (!Number.isInteger(Number(productId)) || !Number.isInteger(Number(quantity))) {
      setError('Product ID and Quantity must be integers');
      return;
    }

    // Prepare data to send
    const data = {
      productId: parseInt(productId, 10),
      quantity: parseInt(quantity, 10),
      warehouse: warehouse,
    };

    try {
      const res = await fetch('http://ujjwal-oracle.onrender.com/createtables/', 
        {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2)); // Pretty-print the JSON response
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Product ID:
            <input
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Warehouse Location:
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
              <option value="Warehouse D">Warehouse D</option>
            </select>
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Submit</button>
      </form>
      {response && <div><h2>Response:</h2><pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>{response}</pre></div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}><h2>Error:</h2><pre>{error}</pre></div>}
    </div>
  );
};

export default ProductForm;
