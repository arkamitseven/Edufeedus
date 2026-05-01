import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Upload } from 'lucide-react';

export const MaterialsUploadForm = () => {
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [type, setType] = useState<'pdf' | 'video' | 'notes'>('pdf');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addDoc(collection(db, 'materials'), {
            title,
            fileUrl,
            type,
            createdAt: serverTimestamp()
        });
        alert('Material uploaded!');
        setTitle('');
        setFileUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-lg mb-4">Upload Study Material</h4>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" required />
            <input type="url" placeholder="File URL" value={fileUrl} onChange={e => setFileUrl(e.target.value)} className="w-full p-3 border rounded-lg" required />
            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full p-3 border rounded-lg">
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="notes">Notes</option>
            </select>
            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload Material
            </button>
        </form>
    );
};
