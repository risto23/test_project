import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleExport = () => {
        window.location.href = 'http://localhost:5000/export';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contacts List</h1>
            <button onClick={handleExport} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
                Export to Excel
            </button>
            {contacts.length > 0 ? (
                <table className="min-w-full bg-white table-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Telepon</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border-b border-gray-300">{contact.id}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{contact.nama}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{contact.email}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{contact.telepon}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{contact.alamat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts available.</p>
            )}
        </div>
    );
}

export default Contacts;
