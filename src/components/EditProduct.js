import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const history = useNavigate();
    const { id } = useParams();

    const editProduct = async (e) => {
        e.preventDefault(); // biar gak reload page
        
        await axios.patch('http://localhost:5000/products/'+id, {
            title: title,
            price: price
        });    

        history('/');
    }

    useEffect(() => {
      getProductById();  
    }, []);

    const getProductById = async () => {
        const response = await axios.get('http://localhost:5000/products/'+id);
        setTitle(response.data.title);
        setPrice(response.data.price);

    }

  return (
    <div className='mt-3'>
        <form onSubmit={ editProduct }>
            <div className='field'>
                <label className='label'>Title</label>
                <input
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                    className='input' type='text' placeholder='Title cok'/>
            </div>
            <div className='field'>
                <label className='label'>Price</label>
                <input
                    value={ price }
                    onChange={ (e) => setPrice(e.target.value) }
                    className='input' type='text' placeholder='Title cok'/>
            </div>
            <div className='field'>
                <button className="button is-warning">edit</button>
            </div>
        </form>
    </div>
  )
}

export default EditProduct