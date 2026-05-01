import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const WhatsAppButton = () => {
    return (
        <motion.a
            href="https://wa.me/918414001064?text=Hello%2C%20I%20want%20to%20know%20about%20admission%20in%20Edufeedus%20Group%20of%20Institutes"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Chat with us on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </motion.a>
    );
};
