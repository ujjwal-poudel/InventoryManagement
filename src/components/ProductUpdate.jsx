import React, { useState } from 'react';

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
            prod_id: parseInt(productId, 10),
            quantity: parseInt(quantity, 10),
            warehouse: warehouse,
        };

        console.log('Sending data:', data);  // Log the data being sent

        try {
            const res = await fetch('http://127.0.0.1:8000/createtables/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Network response was not ok');
            }

            setResponse(JSON.stringify(result, null, 2)); // Pretty-print the JSON response
            setError('');
        } catch (err) {
            setError(err.message);
            setResponse('');
        }
    };

<<<<<<< HEAD
    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h1 style={{ fontSize: '30px'}}>Product Update form</h1>
            <p>This form update the products quantity and warehouse location in PJ_INVENTORY TABLE</p>
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
            {response && (
                <div style={{ margin: '20px 0' }}>
                    <h2>Response:</h2>
                    <pre style={{ backgroundColor: '#e1f5fe', padding: '15px', borderRadius: '8px', border: '1px solid #b3e5fc', color: '#333', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {response}
                    </pre>
                </div>
            )}
            {error && (
                <div style={{ color: '#d32f2f', marginTop: '20px' }}>
                    <h2>Error:</h2>
                    <pre style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px', border: '1px solid #f44336', color: '#333', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {error}
                    </pre>
                </div>
            )}
=======
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
>>>>>>> f5096dd337ee5965c699d76eb5f02d6a752649f7

        </div>
    );
};

export default ProductForm;