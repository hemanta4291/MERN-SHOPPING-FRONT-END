import React, { Component } from 'react';
// import axios from '../utils/axiosInstance';
import axios from 'axios';
import { saveAs } from 'file-saver';


class PdfCreate extends Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/pdf/create`, this.state)
      .then(() => axios.get(`${import.meta.env.VITE_BASE_URL}/pdf/fetch`, { responseType: 'blob' }))
      .then((res) => {
        console.log(res)
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="container w-4/12 mx-auto mt-8">
        <input className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button className='bg-green-100 rounded-3xl py-2 px-6 text-base font-bold border-2' onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default PdfCreate;