import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

interface Material {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    type: 'pdf' | 'video' | 'notes';
}

export const MaterialsList = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            const querySnapshot = await getDocs(collection(db, 'materials'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Material));
            setMaterials(data);
            setLoading(false);
        };
        fetchMaterials();
    }, []);

    if (loading) return <div>Loading materials...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map(mat => (
                <div key={mat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {mat.type === 'pdf' ? <FileText className="text-primary w-6 h-6" /> : 
                         mat.type === 'video' ? <Video className="text-primary w-6 h-6" /> : <BookOpen className="text-primary w-6 h-6" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">{mat.title}</h4>
                        <p className="text-sm text-slate-500 mb-4">{mat.description}</p>
                        <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            <Download className="w-4 h-4" /> Download
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};
