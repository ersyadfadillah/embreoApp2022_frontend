import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const history = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault(); // biar gak reload page
        
        await axios.post('http://localhost:5000/products', {
            title: title,
            price: price
        });    

        history('/');
    }

  return (
    <div className='mt-3'>
        <form onSubmit={ saveProduct }>
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
                <button className="button is-primary">simpan</button>
            </div>
        </form>


        {/* { title } - { price } */}
    </div>
  )
}

export default AddProduct