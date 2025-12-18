import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number;
    className?: string;
}

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
    return (
        <div className={`h-3 bg-slate-800 rounded-full overflow-hidden border border-bright-cyan/30 ${className}`}>
            <motion.div
                className="h-full bg-gradient-to-r from-bright-cyan to-warm-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
        </div>
    );
}
