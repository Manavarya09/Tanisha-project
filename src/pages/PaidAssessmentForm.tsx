import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { ChevronLeft, ChevronRight, Building, Users, BarChart3, Server, CreditCard, Check } from 'lucide-react';
import { assessmentQuestions, AssessmentData, parseAssessmentCSV, PillarQuestions, parseAirtableCSVByRegion, PillarQuestionsUnique } from '../utils/assessmentLogic';
import csvText from '../../AI_Readiness_Assessment_Core35.csv?raw';
import airtableCsv from '../../Airtable AI Readiness File To Import (1).csv?raw';
import { parseAssessmentCSVUnique } from '../utils/assessmentLogic';
import AnimatedContent from '../components/AnimatedContent';
import DarkVeil from '../components/DarkVeil';

// Use the same pillar questions structure as the free assessment
// Questions will be built dynamically based on selected region

export default function PaidAssessmentForm() {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    companyName: '',
    industry: '',
    companySize: '',
    region: 'Global',
    responses: {}
  });

  // Payment info state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: ''
  });

  // Same steps as the free assessment
  const steps = [
    {
      title: 'Company Information',
      icon: Building,
      description: 'Tell us about your organization'
    },
    {
      title: 'Strategy & Leadership',
      icon: Users,
      description: 'Vision, sponsorship, literacy, board, national alignment'
    },
    {
      title: 'Business Readiness',
      icon: BarChart3,
      description: 'Use cases, ROI, KPIs, innovation, communication'
    },
    {
      title: 'Infrastructure Readiness',
      icon: Server,
      description: 'Cloud/on-prem, security, legacy, scalability, recovery'
    },
    {
      title: 'People & Skills',
      icon: Users,
      description: 'Talent, training, change management, external support'
    }
  ];

  // Handle payment submission
  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      
      // Move to company information step after successful payment
      setTimeout(() => {
        setShowPayment(false);
      }, 1500);
    }, 2000);
  };

  // Handle form input changes for company info
  const handleChange = (field: keyof AssessmentData, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle response changes
  const handleResponseChange = (questionId: string, value: number) => {
    setAssessmentData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: value
      }
    }));
  };

  // Move to next step
  const handleNext = () => {
    if (currentStep === 0) {
      if (!assessmentData.companyName || !assessmentData.industry || !assessmentData.companySize) {
        alert('Please fill in all required fields.');
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      navigate('/results', { state: { assessmentData, isPremium: true } });
    }
  };

  // Go back to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Render payment page if needed
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <DarkVeil />
        <div className="container mx-auto px-4 py-12">
          <AnimatedContent>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-lg border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Premium AI Readiness Assessment</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get access to our comprehensive assessment with detailed insights and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isPaid ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Total</h3>
                        <span className="text-xl font-semibold">$199.00</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName" 
                            placeholder="John Smith" 
                            className="bg-slate-800 border-slate-700" 
                            value={paymentInfo.cardName} 
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="4242 4242 4242 4242" 
                            className="bg-slate-800 border-slate-700" 
                            value={paymentInfo.cardNumber} 
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiration">Expiration</Label>
                            <Input 
                              id="expiration" 
                              placeholder="MM/YY" 
                              className="bg-slate-800 border-slate-700" 
                              value={paymentInfo.expiration} 
                              onChange={(e) => setPaymentInfo({...paymentInfo, expiration: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123" 
                              className="bg-slate-800 border-slate-700" 
                              value={paymentInfo.cvv} 
                              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={handlePaymentSubmit} 
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <CreditCard className="mr-2" size={18} />
                              Pay $199.00
                            </span>
                          )}
                        </Button>
                        
                        <p className="text-sm text-slate-400 text-center">
                          Your payment is secure and encrypted. No real charges will be processed.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                        <Check size={32} className="text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                      <p className="text-slate-300 mb-6">Thank you for your purchase. Redirecting to assessment...</p>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full animate-pulse" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </AnimatedContent>
        </div>
      </div>
    );
  }

  const region = assessmentData.region || 'Global';
  const pillarQuestions: PillarQuestionsUnique = useMemo(() => {
    const pq = parseAirtableCSVByRegion(airtableCsv, region);
    const fallback = parseAssessmentCSVUnique(csvText);
    return { ...fallback, ...pq };
  }, [region]);

  // Render assessment form (similar to free version)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DarkVeil />
      <div className="container mx-auto px-4 py-12">
        <AnimatedContent>
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Premium Assessment Progress</h2>
                <span className="text-sm font-medium">{currentStep + 1} of {steps.length}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-slate-700" indicatorClassName="bg-blue-500" />
            </div>
            
            {currentStep === 0 ? (
              // Company Information Step
              <Card className="bg-white/10 backdrop-blur-lg border-slate-700 text-white">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Building size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
                      <CardDescription className="text-slate-300">{steps[currentStep].description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      placeholder="Enter your company name" 
                      className="bg-slate-800 border-slate-700" 
                      value={assessmentData.companyName} 
                      onChange={(e) => handleChange('companyName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={assessmentData.industry} 
                      onValueChange={(value) => handleChange('industry', value)}
                    >
                      <SelectTrigger id="industry" className="bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="telecom">Telecommunications</SelectItem>
                        <SelectItem value="energy">Energy & Utilities</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select 
                      value={assessmentData.companySize} 
                      onValueChange={(value) => handleChange('companySize', value)}
                    >
                      <SelectTrigger id="companySize" className="bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1,000 employees</SelectItem>
                        <SelectItem value="1001-5000">1,001-5,000 employees</SelectItem>
                        <SelectItem value="5001+">5,001+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select
                      value={assessmentData.region}
                      onValueChange={(value) => handleChange('region' as any, value)}
                    >
                      <SelectTrigger id="region" className="bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="Middle East">Middle East</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="EU">EU</SelectItem>
                        <SelectItem value="ME">ME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Questions Steps
              <Card className="bg-white/10 backdrop-blur-lg border-slate-700 text-white">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      {(() => { const Icon = steps[currentStep].icon; return <Icon size={20} className="text-blue-400" />; })()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
                      <CardDescription className="text-slate-300">{steps[currentStep].description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {Object.entries(pillarQuestions[steps[currentStep].title] || {}).map(([subcategory, questions], subIndex) => (
                      <div key={`${currentStep}-${subIndex}`} className="space-y-6">
                        <h3 className="text-xl font-semibold">{subcategory}</h3>
                        
                        {questions.map((question, qIndex) => (
                          <div key={question.question} className="space-y-3 border-l-2 border-blue-500/30 pl-4 py-2">
                            <h4 className="text-lg font-medium">{question.question}</h4>

                            <div className="grid gap-2">
                              {[1, 2, 3, 4, 5].map(value => (
                                <div
                                  key={`${question.question}-${value}`}
                                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                    assessmentData.responses[question.question] === value
                                      ? 'border-blue-500 bg-blue-500/20'
                                      : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                                  }`}
                                  onClick={() => handleResponseChange(question.question, value)}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                                        assessmentData.responses[question.question] === value
                                          ? 'border-blue-500 bg-blue-500'
                                          : 'border-slate-500'
                                      }`}
                                    >
                                      {assessmentData.responses[question.question] === value && (
                                        <Check size={12} className="text-white" />
                                      )}
                                    </div>
                                    <span className="font-medium">Level {value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button onClick={handlePrevious} variant="outline" className="border-slate-700 text-slate-300">
                  <ChevronLeft size={16} className="mr-2" /> Previous
                </Button>
              )}
              <div className={currentStep === 0 ? 'ml-auto' : ''}>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  {currentStep < steps.length - 1 ? 'Next' : 'Submit'} <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
