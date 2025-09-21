import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Users, 
  CheckCircle, 
  Award, 
  BarChart3, 
  Database, 
  Cog, 
  TrendingUp, 
  Lightbulb, 
  Shield, 
  UserCheck, 
  PieChart, 
  FileText, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Menu, 
  X, 
  Brain, 
  ArrowUp 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import DarkVeil from '../components/DarkVeil';
import AnimatedContent from '../components/AnimatedContent';

const AIReadinessLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };

    const slideInterval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 2);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideInterval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pillars for the Seven Pillars section
  const pillars = [
    { icon: <Users className="h-8 w-8 text-white" />, title: 'Strategy & Leadership', description: 'Vision, sponsorship, literacy, board awareness, national alignment' },
    { icon: <BarChart3 className="h-8 w-8 text-white" />, title: 'Business Readiness', description: 'Use cases, ROI, KPIs, innovation, stakeholder communication' },
    { icon: <Cog className="h-8 w-8 text-white" />, title: 'Infrastructure Readiness', description: 'Cloud/on-prem, cybersecurity, legacy integration, scalability, disaster recovery' },
    { icon: <UserCheck className="h-8 w-8 text-white" />, title: 'People & Skills', description: 'AI literacy, upskilling, leadership training, change management, inclusivity' },
    { icon: <Shield className="h-8 w-8 text-white" />, title: 'AI Governance & Ethics', description: 'Principles, privacy, risk, explainability, accountability' },
    { icon: <Lightbulb className="h-8 w-8 text-white" />, title: 'AI Organization & Culture', description: 'Innovation, collaboration, champions, agility, recognition' },
    { icon: <Database className="h-8 w-8 text-white" />, title: 'Data Readiness', description: 'Governance, quality, metadata, observability, accessibility' },
  ];

  // Features for the Assessment Features section
  const features = [
    { icon: <BarChart3 className="h-8 w-8 text-white" />, title: 'Interactive Dashboard', description: 'Visualize your AI readiness with radar charts, progress bars, and comprehensive scoring metrics', link: '/dashboard' },
    { icon: <BarChart3 className="h-8 w-8 text-white" />, title: 'Industry Benchmarking', description: 'Compare your scores against industry standards and see how you rank among peers', link: '/benchmarking' },
    { icon: <Lightbulb className="h-8 w-8 text-white" />, title: 'Smart Recommendations', description: 'Get personalized action plans and recommendations based on your assessment results', link: '/recommendations' },
    { icon: <BarChart3 className="h-8 w-8 text-white" />, title: 'Detailed Reports', description: 'Generate comprehensive PDF reports with detailed insights and actionable recommendations', link: '/detailed-report' },
    { icon: <CheckCircle className="h-8 w-8 text-white" />, title: 'Multi-Step Assessment', description: 'Complete evaluation across 133+ questions covering all four critical AI readiness pillars', link: '/assessment' },
  ];

  return (
    <>
      {/* Animated DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <DarkVeil hueShift={20} noiseIntensity={0.08} scanlineIntensity={0.12} speed={0.7} scanlineFrequency={2.5} warpAmount={0.08} resolutionScale={1} />
      </div>
      <div className="min-h-screen relative z-10 text-white">
        {/* Navbar & Carousel */}
        <nav className={`navbar navbar-expand-lg navbar-dark px-5 py-3 py-lg-0 bg-dark ${isScrolled ? 'scrolled' : ''}`}>
          <div className="flex items-center justify-between w-full">
            <a href="#" className="navbar-brand p-0 flex items-center">
              <span className="text-white text-2xl font-bold flex items-center"><i className="fa fa-brain me-2" />AI Readiness</span>
            </a>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/assessment')} className="bg-primary text-white">Start Assessment</Button>
            </div>
          </div>
        </nav>
        {/* Hero Section (Carousel) */}
        <section className="relative w-full h-[500px] flex items-center justify-center bg-header">
          <div className="absolute inset-0 bg-dark bg-opacity-70 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-6">AI Readiness Assessment Platform</h1>
              <p className="text-xl text-white mb-8">Comprehensive & Data-Driven AI Readiness Assessment for Organizations</p>
              <Button onClick={() => navigate('/assessment')} className="bg-primary text-white text-lg px-8 py-3">Start Assessment</Button>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section className="container mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h5 className="text-primary text-lg font-bold mb-2">About the Platform</h5>
              <h2 className="text-3xl font-bold mb-4 text-white">Comprehensive AI Readiness Assessment for Modern Organizations</h2>
              <p className="mb-4 text-white">Our AI Readiness Assessment Platform provides a comprehensive evaluation of your organization's preparedness for artificial intelligence adoption. Through our four-pillar framework, we analyze your organizational structure, data infrastructure, business processes, and technical capabilities to deliver actionable insights and recommendations.</p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center text-white"><i className="fa fa-check text-primary mr-2" />Data-Driven Analysis</li>
                <li className="flex items-center text-white"><i className="fa fa-check text-primary mr-2" />Industry Benchmarking</li>
                <li className="flex items-center text-white"><i className="fa fa-check text-primary mr-2" />Actionable Insights</li>
                <li className="flex items-center text-white"><i className="fa fa-check text-primary mr-2" />Personalized Recommendations</li>
              </ul>
              {/* Moved down for spacing */}
              <div className="flex items-center mb-4 mt-8">
                <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mr-4"><i className="fa fa-chart-line text-white text-2xl" /></div>
                <div>
                  <h5 className="mb-2 text-white">Get your AI readiness score</h5>
                  <h4 className="text-primary mb-0">133+ Assessment Questions</h4>
                </div>
              </div>
              <Button onClick={() => navigate('/assessment')} className="bg-primary text-white mt-4">Start Assessment</Button>
            </div>
            <div className="min-h-[400px] flex items-center justify-center">
              <img src="/public/vite.svg" alt="About" className="rounded-xl w-full h-full object-cover" />
            </div>
          </div>
        </section>
        {/* Seven Pillars Section */}
        <section className="container mx-auto py-16" id="pillars">
          <div className="text-center mb-12">
            <h5 className="text-primary text-lg font-bold mb-2">Seven Critical Pillars</h5>
            <h2 className="text-3xl font-bold mb-4 text-white">Comprehensive AI Readiness Evaluation Framework</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <AnimatedContent key={idx}>
                <div className="bg-primary rounded-xl p-6 text-white shadow flex flex-col items-center justify-center">
                  <div className="mb-4">{pillar.icon}</div>
                  <h4 className="font-bold mb-2">{pillar.title}</h4>
                  <p className="text-center text-white text-sm">{pillar.description}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>
        {/* Assessment Features Section */}
        <section className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h5 className="text-primary text-lg font-bold mb-2">Assessment Features</h5>
            <h2 className="text-3xl font-bold mb-4 text-white">Comprehensive AI Readiness Evaluation Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <AnimatedContent key={idx}>
                <div className="bg-light rounded-xl p-6 text-center shadow flex flex-col items-center justify-center">
                  <div className="service-icon mb-4">{feature.icon}</div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="mb-4">{feature.description}</p>
                  <Button onClick={() => navigate(feature.link)} className="bg-primary text-white">Learn More</Button>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>
        {/* Quote Section */}
        <section className="container mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h5 className="text-primary text-lg font-bold mb-2">Request A Quote</h5>
              <h2 className="text-3xl font-bold mb-4 text-white">Need A Free Quote? Please Feel Free to Contact Us</h2>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center text-white"><i className="fa fa-reply text-primary mr-2" />Reply within 24 hours</li>
                <li className="flex items-center text-white"><i className="fa fa-phone-alt text-primary mr-2" />24 hrs telephone support</li>
              </ul>
              <p className="mb-4 text-white">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
              <div className="flex items-center mt-2">
                <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mr-4"><i className="fa fa-phone-alt text-white text-2xl" /></div>
                <div>
                  <h5 className="mb-2 text-white">Call to ask any question</h5>
                  <h4 className="text-primary mb-0">+012 345 6789</h4>
                </div>
              </div>
            </div>
            <AnimatedContent>
              <div className="bg-primary rounded-xl p-8 flex flex-col justify-center items-center">
                <form className="w-full max-w-md">
                  <input type="text" className="form-control bg-light border-0 mb-4 w-full p-3 rounded text-black" placeholder="Your Name" />
                  <input type="email" className="form-control bg-light border-0 mb-4 w-full p-3 rounded text-black" placeholder="Your Email" />
                  <select className="form-select bg-light border-0 mb-4 w-full p-3 rounded text-black">
                    <option>Select A Service</option>
                    <option value="1">Service 1</option>
                    <option value="2">Service 2</option>
                    <option value="3">Service 3</option>
                  </select>
                  <textarea className="form-control bg-light border-0 mb-4 w-full p-3 rounded text-black" rows={3} placeholder="Message"></textarea>
                  <Button className="bg-dark text-white w-full py-3">Request A Quote</Button>
                </form>
              </div>
            </AnimatedContent>
          </div>
        </section>
        {/* Footer Section */}
        <footer className="bg-black text-light mt-5 py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedContent>
              <div className="flex flex-col items-center justify-center text-center bg-primary p-4 rounded-xl">
                <span className="text-white text-2xl font-bold flex items-center mb-2"><i className="fa fa-brain me-2" />AI Readiness</span>
                <p className="mt-3 mb-4">AI Readiness Assessment Platform helps organizations evaluate and accelerate their AI adoption journey. Get actionable insights, benchmark your readiness, and receive personalized recommendations for success.</p>
                <form className="w-full max-w-xs mx-auto">
                  <div className="flex">
                    <input type="text" className="form-control border-white p-3 rounded-l w-full" placeholder="Your Email" />
                    <Button className="bg-dark text-white rounded-r">Subscribe</Button>
                  </div>
                </form>
              </div>
            </AnimatedContent>
            <div>
              <h3 className="text-light font-bold mb-4">Get In Touch</h3>
              <div className="flex items-center mb-2"><i className="fa bi-geo-alt text-primary mr-2" /><span>Abu Dhabi, UAE</span></div>
              <div className="flex items-center mb-2"><i className="fa bi-envelope-open text-primary mr-2" /><span>info@example.com</span></div>
              <div className="flex items-center mb-2"><i className="fa bi-telephone text-primary mr-2" /><span>+971 123 4567</span></div>
              <div className="flex mt-4 gap-2">
                <a className="btn btn-primary btn-square" href="mailto:info@example.com"><i className="fa fa-envelope" /></a>
                <a className="btn btn-primary btn-square" href="tel:+9711234567"><i className="fa fa-phone" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-light mb-0 font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <a className="text-light" href="#">Home</a>
                <a className="text-light" href="#pillars">Seven Pillars</a>
                <a className="text-light" href="/assessment">Assessment</a>
                <a className="text-light" href="/dashboard">Dashboard</a>
                <a className="text-light" href="/recommendations">Recommendations</a>
                <a className="text-light" href="/contact">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="text-light mb-0 font-bold mb-4">Popular Links</h3>
              <div className="flex flex-col gap-2">
                <a className="text-light" href="#">Home</a>
                <a className="text-light" href="#pillars">Seven Pillars</a>
                <a className="text-light" href="/assessment">Assessment</a>
                <a className="text-light" href="/dashboard">Dashboard</a>
                <a className="text-light" href="/recommendations">Recommendations</a>
                <a className="text-light" href="/faq">FAQ</a>
                <a className="text-light" href="/contact">Contact</a>
              </div>
            </div>
          </div>
          <div className="container mx-auto text-center mt-8">
            <p className="text-white">&copy; C DAC. All Rights Reserved.</p>
          </div>
        </footer>
        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed right-8 bottom-8 z-50 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default AIReadinessLanding;