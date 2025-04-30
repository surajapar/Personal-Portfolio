import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    User,
    Terminal,
    Zap,
    ShieldCheck,
    Folder,
    MessageSquare,
    ArrowRight,
    CheckCircle,
    AlertTriangle,
    Loader2,
    File, // Added for Resume icon
    Menu, // Hamburger Icon
    X, // Close Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Placeholder for TryHackMe badge images (replace with actual URLs if available)
const THM_BADGES = {
    metasploit: 'https://via.placeholder.com/150x50/222/FFF?text=Metasploit',
    blue: 'https://via.placeholder.com/150x50/222/FFF?text=Blue',
    owasp10: 'https://via.placeholder.com/150x50/222/FFF?text=OWASP+Top+10',
    crackthehash: 'https://via.placeholder.com/150x50/222/FFF?text=Crack+the+Hash',
    // Add more as needed
};

// --- Helper Components ---

// Typing Effect Component
const TypingEffect = ({ text, delay = 150, className }: { text: string; delay?: number, className?: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [index, text, delay]);

    return <span className={className}>{displayedText}</span>;
};

// Section Title Component
const SectionTitle = ({ title, icon: Icon, className }: { title: string; icon?: React.FC<React.SVGProps<SVGSVGElement>>; className?: string }) => (
    <div className={cn("flex items-center gap-4 mb-8", className)}>
        {Icon && <Icon className="w-6 h-6 text-blue-400" />}
        <h2 className="text-3xl font-bold text-white uppercase tracking-wider border-b-2 border-blue-500/30 pb-2">
            {title}
        </h2>
    </div>
);

// Project Card Component
const ProjectCard = ({ title, description, technologies, link }: { title: string; description: string; technologies: string[]; link?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
    >
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
                <span
                    key={tech}
                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                >
                    {tech}
                </span>
            ))}
        </div>
        {link && (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
                View Project <ArrowRight className="w-4 h-4" />
            </a>
        )}
    </motion.div>
);

// Form Input Component
const FormInput = ({ label, name, placeholder, value, onChange, error, ...props }: { label: string; name: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; error?: string; [key: string]: any; }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
            {label}
        </label>
        <Input
            type="text"
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
                "bg-gray-800 text-white border-gray-700 placeholder:text-gray-500",
                error && "border-red-500 focus:ring-red-500"
            )}
            {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error on input change
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: undefined }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string | undefined } = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmissionStatus('idle');

        // Simulate an API call (replace with your actual backend logic)
        try {
            // Replace with your actual API endpoint
            // await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(formData),
            // });

            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you'd check for a successful response here
            // For this example, we'll just assume success
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear the form
        } catch (error) {
            console.error('Form submission failed:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
                label="Name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
            />
            <FormInput
                label="Email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                type="email"
                disabled={isSubmitting}
            />
            <FormInput
                label="Message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                as={Textarea}
                rows={4}
                disabled={isSubmitting}
            />
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 transition-colors duration-300"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Send Message'
                )}
            </Button>

            <AnimatePresence>
                {submissionStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Message sent successfully!
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {submissionStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <AlertTriangle className="w-5 h-5" />
                        Failed to send message. Please try again.
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
};

// --- Main App Component ---
const CybersecurityPortfolio = () => {
    const typingPhrases = [
        "Cyber Defender",
        "Security Researcher",
        "Ethical Hacker",
        "Penetration Tester",
    ];
    const [typingText, setTypingText] = useState(typingPhrases[0]);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [letterIndex, setLetterIndex] = useState(0);
    const typingSpeed = 150;
    const deletingSpeed = 75;
    const pauseDuration = 2000;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            const currentPhrase = typingPhrases[phraseIndex];
            const shouldPause = !isDeleting && letterIndex === currentPhrase.length;

            if (isDeleting) {
                setTypingText(currentPhrase.substring(0, letterIndex - 1));
                setLetterIndex(letterIndex - 1);
            } else {
                setTypingText(currentPhrase.substring(0, letterIndex + 1));
                setLetterIndex(letterIndex + 1);
            }

            if (shouldPause) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, pauseDuration);
            } else if (!isDeleting && letterIndex >= currentPhrase.length) {
                setIsDeleting(true);
            } else if (isDeleting && letterIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex((phraseIndex + 1) % typingPhrases.length);
                setLetterIndex(0);
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(typingTimeout);
    }, [isDeleting, letterIndex, phraseIndex, typingPhrases, deletingSpeed, typingSpeed, pauseDuration]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* --- Navigation Bar --- */}
            <header className="bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Brand Name */}
                    <a href="#" className="text-2xl font-bold text-white">
                        CyberSec
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        <a
                            href="#home"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#skills"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Skills
                        </a>
                        <a
                            href="#certifications"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Certifications
                        </a>
                        <a
                            href="#projects"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="text-gray-300 hover:text-white"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden bg-gray-900 border-b border-gray-800 px-4 py-2"
                        >
                            <div className="flex flex-col space-y-4">
                                <a
                                    href="#home"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    Home
                                </a>
                                <a
                                    href="#about"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    About
                                </a>
                                <a
                                    href="#skills"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    Skills
                                </a>
                                <a
                                    href="#certifications"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    Certifications
                                </a>
                                <a
                                    href="#projects"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    Contact
                                </a>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            {/* --- Hero Section --- */}
            <header id="home" className="bg-gradient-to-br from-gray-900 to-gray-800 pt-16">
                <div className="container mx-auto px-4 text-center py-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="fade-in"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Hi, I'm <span className="text-blue-400">Suraj</span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                            Future <span className="typing-effect text-blue-400">{typingText}</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Cybersecurity student passionate about ethical hacking, network security,
                            and protecting digital systems from threats.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button
                                variant="outline"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                                onClick={() => {
                                    const contactSection = document.querySelector('#contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                Contact Me
                            </Button>
                            <Button
                                variant="outline"
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 border-none"
                                onClick={() => {
                                    const projectsSection = document.querySelector('#projects');
                                    if (projectsSection) {
                                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                View Projects
                            </Button>
                            <Button
                                variant="outline"
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border-none"
                                //  Add a link to your resume file.  Replace 'your-resume.pdf' with the actual path.
                                onClick={() => {
                                    window.open('/your-resume.pdf', '_blank');
                                }}
                            >
                                <File className="w-4 h-4" />
                                Resume
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="container mx-auto px-4 py-16">
                {/* --- About Me Section --- */}
                <section id="about" className="mb-20">
                    <SectionTitle title="About Me" icon={User} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <p className="text-gray-400 mb-4">
                                Hello! I&apos;m I'm Suraj Apar, a highly motivated cybersecurity student currently pursuing a Bachelor of Science in Cyber and Digital Science at Dr. D. Y. Patil Arts, Commerce & Science College, Pimpri, Pune, affiliated with Savitribai Phule Pune University.
                            </p>
                            <p className="text-gray-400 mb-4">
                                I&apos;m deeply passionate about securing digital systems and networks, and I&apos;m committed to continuous learning in this ever-evolving field. My goal is to leverage my skills and knowledge to protect organizations from cyber threats and contribute to a safer digital world.
                            </p>
                            <p className="text-gray-400">
                                I am eager to apply my academic foundation and hands-on experience to real-world cybersecurity challenges.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            {/* Replace with a more relevant image or abstract graphic */}
                            <img
                                src="https://via.placeholder.com/400x400/222/FFF?text=About+Me"
                                alt="About Me"
                                className="rounded-lg shadow-lg border border-gray-700"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* --- Skills Section --- */}
                <section id="skills" className="mb-20">
                    <SectionTitle title="Skills" icon={Terminal} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                    >
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-2">Tools</h4>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                                <li>Metasploit</li>
                                <li>Wireshark</li>
                                <li>SQLMap</li>
                                // <li>TrueCrypt</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-2">Techniques</h4>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                                <li>Network Analysis</li>
                                <li>Vulnerability Assessment</li>
                                <li>Incident Response</li>
                                <li>Penetration Testing</li>
                                <li>Reverse Engineering</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-2">Programming</h4>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>C</li>
                            </ul>
                        </div>
                    </motion.div>
                </section>

                {/* --- Certifications/Badges Section --- */}
                <section id="certifications" className="mb-20">
                    <SectionTitle title="Certifications & Badges" icon={ShieldCheck} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {Object.entries(THM_BADGES).map(([key, url]) => (
                            <div
                                key={key}
                                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-700 flex items-center justify-center"
                            >
                                {/* Replace with actual badge images/components */}
                               <img src={url} alt={key} className="max-h-16 max-w-full" />
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* --- Projects Section --- */}
                <section id="projects" className="mb-20">
                    <SectionTitle title="Projects" icon={Folder} />
                    <div className="grid md:grid-cols-2 gap-8">
                        <ProjectCard
                            title="Project 1: Secure File Transfer"
                            description="Developed a secure file transfer application using Python and cryptography libraries to encrypt and decrypt files."
                            technologies={['Python', 'Cryptography', 'TCP/IP']}
                        />
                        <ProjectCard
                            title="Project 2: Network Intrusion Detection System"
                            description="Implemented a network intrusion detection system using Wireshark and Snort to identify and log malicious network activity."
                            technologies={['Wireshark', 'Snort', 'Network Analysis']}
                        />
                        <ProjectCard
                            title="Project 3: Vulnerability Scanner"
                            description="Created a vulnerability scanner using Python and Nmap to identify open ports and potential vulnerabilities on target systems."
                            technologies={['Python', 'Nmap', 'Vulnerability Assessment']}
                        />
                        <ProjectCard
                            title="Project 4: Password Cracking Tool"
                            description="Built a password cracking tool using John the Ripper and hashcat to crack password hashes using various techniques."
                            technologies={['John the Ripper', 'Hashcat', 'Password Cracking']}
                        />
                    </div>
                </section>

                {/* --- Contact Section --- */}
                <section id="contact" className="mb-20">
                    <SectionTitle title="Contact Me" icon={MessageSquare} />
                    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-700">
                        <ContactForm />
                    </div>
                    <div className="mt-8 flex justify-center space-x-6">
                        <a
                            href="https://github.com/surajapar" // Replace with your actual GitHub username
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Github className="w-7 h-7" />
                        </a>
                        <a
                            href="https://linkedin.com/in/surajapar"  // Replace with your actual LinkedIn username
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Linkedin className="w-7 h-7" />
                        </a>
                        <a
                            href="aparsuraj@gmail.com"  // Replace with your actual email address
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Mail className="w-7 h-7" />
                        </a>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-gray-900 py-6 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Suraj Apar. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default CybersecurityPortfolio;
