import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80"
                        onClick={() => onOpenChange(false)}
                    />
                    {children}
                </div>
            )}
        </AnimatePresence>
    );
}

interface DialogContentProps {
    className?: string;
    children: React.ReactNode;
}

export function DialogContent({ className = '', children }: DialogContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative z-[100] m-auto ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </motion.div>
    );
}

interface DialogTitleProps {
    className?: string;
    children: React.ReactNode;
}

export function DialogTitle({ className = '', children }: DialogTitleProps) {
    return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}
