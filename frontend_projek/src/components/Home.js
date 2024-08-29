import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [csvData, setCsvData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setCsvData(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleCheckboxChange = (row) => {
        setSelectedRows(prev =>
            prev.includes(row)
                ? prev.filter(item => item !== row)
                : [...prev, row]
        );
    };

    const handleImport = async () => {
        try {
            await axios.post('http://localhost:5000/import', selectedRows);
            alert('Data successfully imported!');
        } catch (error) {
            console.error('Error importing data:', error);
        }
    };

    return (
        <div className=''>
            <input type="file" onChange={handleFileUpload} className="mb-4" />
            {csvData.length > 0 && (
                <>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Telepon</th>
                                <th>Alamat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(row)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-300">{row.id}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{row.nama}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{row.email}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{row.telepon}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{row.alamat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleImport} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Import Selected
                    </button>
                </>
            )}
        </div>
    );
}

export default Home;
