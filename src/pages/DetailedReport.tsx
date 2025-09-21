import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Download, FileText, BarChart3, TrendingUp, Target } from 'lucide-react';
import { AssessmentData, AssessmentResults, calculateAssessmentResults } from '../utils/assessmentLogic';
import AnimatedContent from '../components/AnimatedContent';

export default function DetailedReport() {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    if (!savedData) {
      navigate('/assessment');
      return;
    }

    const data: AssessmentData = JSON.parse(savedData);
    const calculatedResults = calculateAssessmentResults(data);
    
    setAssessmentData(data);
    setResults(calculatedResults);
  }, [navigate]);

  if (!results || !assessmentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating detailed report...</p>
        </div>
      </div>
    );
  }

  const handleExportReport = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF export functionality would be implemented here. The report would include all assessment data, visualizations, and recommendations.');
  };

  const getInsightForPillar = (pillar: string, percentage: number) => {
    const insights = {
      'Organization': {
        high: 'Your organization demonstrates strong leadership commitment and cultural readiness for AI adoption. The executive team shows clear understanding of AI potential and has allocated appropriate resources.',
        medium: 'Your organization shows moderate readiness with some leadership support, but may need to strengthen change management capabilities and AI literacy across teams.',
        low: 'Your organization needs significant improvement in leadership commitment, cultural change management, and AI skills development before pursuing major AI initiatives.'
      },
      'Data': {
        high: 'Your data infrastructure is well-positioned for AI initiatives with good quality, governance, and accessibility. You have the foundation needed for successful AI implementations.',
        medium: 'Your data readiness shows promise but requires improvements in quality management, governance frameworks, or accessibility to fully support AI initiatives.',
        low: 'Your data infrastructure needs substantial improvements in quality, governance, and accessibility before it can effectively support AI applications.'
      },
      'Business': {
        high: 'Your business strategy is well-aligned for AI adoption with clear use cases, documented processes, and strong measurement capabilities. You\'re ready to pursue AI initiatives with confidence.',
        medium: 'Your business readiness is developing with some strategic clarity, but would benefit from better use case definition, process optimization, or measurement frameworks.',
        low: 'Your business strategy needs significant development in AI use case identification, process documentation, and outcome measurement before pursuing AI initiatives.'
      },
      'Infrastructure': {
        high: 'Your technical infrastructure is modern and scalable, with strong security measures and good integration capabilities. You\'re well-equipped to support AI workloads.',
        medium: 'Your infrastructure shows good potential but may need upgrades in scalability, security, or integration capabilities to fully support AI applications.',
        low: 'Your infrastructure requires significant modernization, security enhancements, and integration improvements before it can effectively support AI workloads.'
      }
    };

    const level = percentage >= 70 ? 'high' : percentage >= 50 ? 'medium' : 'low';
    return insights[pillar as keyof typeof insights]?.[level] || 'Assessment data available for detailed analysis.';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/results')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Detailed Assessment Report</span>
              </div>
            </div>
            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Readiness Assessment Report
            </h1>
            <div className="text-lg text-gray-600 space-y-1">
              <div><strong>{assessmentData.companyName}</strong></div>
              <div>{assessmentData.industry} • {assessmentData.companySize}</div>
              <div>Assessment Date: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Executive Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overall Assessment</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-3xl font-bold text-blue-600">{results.overallPercentage}%</span>
                    <Badge className="text-lg px-3 py-1">
                      {results.overallLevel}
                    </Badge>
                  </div>
                  <p className="text-gray-700">
                    {assessmentData.companyName} demonstrates {results.overallLevel.toLowerCase()} AI readiness, 
                    scoring in the {Math.round(results.industryPercentile)}th percentile compared to other {assessmentData.industry.toLowerCase()} companies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Findings</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• {results.pillarScores.reduce((max, pillar) => pillar.percentage > max.percentage ? pillar : max).name} is your strongest pillar ({results.pillarScores.reduce((max, pillar) => pillar.percentage > max.percentage ? pillar : max).percentage}%)</li>
                    <li>• {results.pillarScores.reduce((min, pillar) => pillar.percentage < min.percentage ? pillar : min).name} needs the most attention ({results.pillarScores.reduce((min, pillar) => pillar.percentage < min.percentage ? pillar : min).percentage}%)</li>
                    <li>• {results.recommendations.filter(r => r.priority === 'High').length} high-priority recommendations identified</li>
                    <li>• Estimated timeline for readiness improvement: 6-12 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Pillar Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Pillar Analysis</h2>
          <div className="space-y-6">
            {results.pillarScores.map((pillar, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" style={{ color: pillar.color }} />
                      <span>{pillar.name} Readiness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold" style={{ color: pillar.color }}>
                        {pillar.percentage}%
                      </span>
                      <Badge>{pillar.level}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${pillar.percentage}%`,
                          backgroundColor: pillar.color 
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-700">
                      {getInsightForPillar(pillar.name, pillar.percentage)}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{pillar.score}</div>
                        <div className="text-sm text-gray-600">Raw Score</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{pillar.maxScore}</div>
                        <div className="text-sm text-gray-600">Max Possible</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{pillar.level}</div>
                        <div className="text-sm text-gray-600">Performance Level</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Benchmarking Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span>Industry Benchmarking</span>
            </CardTitle>
            <CardDescription>
              How your organization compares to industry peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Industry Position</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Your Score:</span>
                    <span className="font-semibold text-blue-600">{results.overallPercentage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Industry Percentile:</span>
                    <span className="font-semibold">{Math.round(results.industryPercentile)}th</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Performance Level:</span>
                    <Badge>{results.overallLevel}</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Competitive Analysis</h3>
                <p className="text-sm text-gray-700">
                  Your organization performs {results.industryPercentile > 50 ? 'above' : 'below'} the industry median 
                  in AI readiness. This positions you {results.industryPercentile > 75 ? 'as a leader' : 
                  results.industryPercentile > 50 ? 'competitively' : 'with room for improvement'} in the {assessmentData.industry} sector.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-purple-600" />
              <span>Strategic Recommendations</span>
            </CardTitle>
            <CardDescription>
              Priority actions to accelerate your AI readiness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {['High', 'Medium', 'Low'].map(priority => {
                const priorityRecs = results.recommendations.filter(r => r.priority === priority);
                if (priorityRecs.length === 0) return null;
                
                return (
                  <div key={priority}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        priority === 'High' ? 'bg-red-500' : 
                        priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <span>{priority} Priority Actions</span>
                    </h3>
                    <div className="space-y-3">
                      {priorityRecs.map((rec, index) => (
                        <div key={index} className="border-l-4 border-gray-200 pl-4">
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Pillar: {rec.pillar}</span>
                            <span>Timeline: {rec.timeline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assessment Methodology</CardTitle>
            <CardDescription>
              Understanding how your AI readiness score was calculated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Scoring Framework</h3>
                <p className="text-sm text-gray-700 mb-3">
                  The AI Readiness Assessment evaluates organizations across four critical pillars using a comprehensive 
                  scoring methodology. Each pillar contains 3 detailed questions scored on a 5-point scale.
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  {results.pillarScores.map((pillar, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">{pillar.name}</div>
                      <div className="text-sm text-gray-600">3 questions</div>
                      <div className="text-sm text-gray-600">Max: {pillar.maxScore} points</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance Levels</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Exceptional (90-100%):</strong> Industry-leading AI readiness
                  </div>
                  <div>
                    <strong>Advanced (80-89%):</strong> Strong foundation for AI adoption
                  </div>
                  <div>
                    <strong>Above Average (70-79%):</strong> Good readiness with minor gaps
                  </div>
                  <div>
                    <strong>Average (60-69%):</strong> Moderate readiness, some improvements needed
                  </div>
                  <div>
                    <strong>Below Average (50-59%):</strong> Significant improvements required
                  </div>
                  <div>
                    <strong>Needs Improvement (&lt;50%):</strong> Substantial development needed
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            This report was generated on {new Date().toLocaleDateString()} for {assessmentData.companyName}
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Full Report
            </Button>
            <Button variant="outline" onClick={() => navigate('/recommendations')}>
              View Action Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}