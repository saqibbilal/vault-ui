"use client";
import { motion } from "framer-motion";
import { Upload, ScanEye, BrainCircuit, Search } from "lucide-react";

const steps = [
    {
        title: "Secure Upload",
        desc: "Drop your files into the vault. We support images, PDFs, and notes.",
        icon: Upload,
        color: "bg-blue-500"
    },
    {
        title: "AI Vision Scan",
        desc: "Gemini 1.5 Flash reads your documents, extracting every PO number and address.",
        icon: ScanEye,
        color: "bg-indigo-500"
    },
    {
        title: "Semantic Indexing",
        desc: "We convert text into 3072-dimension vectors to understand the 'meaning' of your data.",
        icon: BrainCircuit,
        color: "bg-violet-500"
    },
    {
        title: "Instant Retrieval",
        desc: "Search by concept, not just keywords. Find 'Shipment' even if the file says 'Freight'.",
        icon: Search,
        color: "bg-fuchsia-500"
    }
];

export default function HowItWorks() {
    return (
        <section className="pt-16 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How Keepr Thinks</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Traditional folders are static. Keepr uses a multimodal AI pipeline to make your data interactive.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }} // Triggers slightly before it enters view
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15, // Creates the staggered "wave" effect
                                ease: [0.21, 0.47, 0.32, 0.98] // Premium "springy" ease
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.2 }
                            }}
                            className="relative group p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-shadow"
                        >
                            {/* Add a subtle glow behind the icon on hover */}
                            <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-10 blur transition duration-500`} />

                            <div className="relative bg-white rounded-[2.3rem] h-full w-full">
                                <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                                    <step.icon className="text-white h-7 w-7" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}